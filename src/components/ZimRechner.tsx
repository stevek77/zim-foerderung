"use client";

import { useState, useMemo } from "react";
import {
  Calculator,
  Euro,
  ArrowRight,
  Info,
  Phone,
  Download,
} from "lucide-react";

type ProjectType = "einzelprojekt" | "koop_national" | "koop_international";
type CompanySize =
  | "kleine_strukturschwach"
  | "kleine_junge"
  | "kleine"
  | "mittlere"
  | "unternehmen_3_1_1b";

const FUNDING_RATES: Record<ProjectType, Record<CompanySize, number>> = {
  einzelprojekt: {
    kleine_strukturschwach: 0.45,
    kleine_junge: 0.45,
    kleine: 0.4,
    mittlere: 0.35,
    unternehmen_3_1_1b: 0.25,
  },
  koop_national: {
    kleine_strukturschwach: 0.55,
    kleine_junge: 0.5,
    kleine: 0.45,
    mittlere: 0.4,
    unternehmen_3_1_1b: 0.3,
  },
  koop_international: {
    kleine_strukturschwach: 0.6,
    kleine_junge: 0.6,
    kleine: 0.55,
    mittlere: 0.5,
    unternehmen_3_1_1b: 0.4,
  },
};

const COST_CAPS: Record<string, number> = {
  einzelprojekt: 690000,
  koop: 560000,
  gesamt: 3000000,
};

const projectTypeLabels: Record<ProjectType, string> = {
  einzelprojekt: "Einzelprojekt",
  koop_national: "Kooperationsprojekt (national)",
  koop_international: "Kooperationsprojekt (international)",
};

const companySizeLabels: Record<CompanySize, string> = {
  kleine_strukturschwach: "Kleines Unternehmen (strukturschwache Region)",
  kleine_junge: "Kleines junges Unternehmen (< 10 Jahre)",
  kleine: "Kleines Unternehmen (< 50 MA)",
  mittlere: "Mittleres Unternehmen (< 250 MA)",
  unternehmen_3_1_1b: "Unternehmen nach §3.1.1b (< 500 MA)",
};

export default function ZimRechner() {
  const [projectType, setProjectType] = useState<ProjectType>("koop_national");
  const [companySize, setCompanySize] = useState<CompanySize>("kleine");
  const [personalkosten, setPersonalkosten] = useState(200000);
  const [auftraegeDritte, setAuftraegeDritte] = useState(50000);
  const [laufzeitMonate, setLaufzeitMonate] = useState(24);

  const result = useMemo(() => {
    const foerderquote = FUNDING_RATES[projectType][companySize];

    // Calculate übrige Kosten (Pauschale) = up to 100% of Personalkosten
    const uebrigeKostenMax = personalkosten * 1.0;

    // Aufträge an Dritte: up to 35% of Personalkosten directly eligible
    const auftraegeDirekt = Math.min(
      auftraegeDritte,
      personalkosten * 0.35
    );
    // The rest can go into übrige Kosten pauschale
    const auftraegeUeberGemeinkosten = auftraegeDritte - auftraegeDirekt;
    const uebrigeKostenPauschale = Math.min(
      uebrigeKostenMax,
      uebrigeKostenMax - auftraegeUeberGemeinkosten > 0
        ? uebrigeKostenMax
        : uebrigeKostenMax
    );

    // Total eligible costs
    const gesamtkosten =
      personalkosten + auftraegeDirekt + uebrigeKostenPauschale;

    // Calculate raw funding
    const rohfoerderung = gesamtkosten * foerderquote;

    // Apply cost cap
    const cap =
      projectType === "einzelprojekt" ? COST_CAPS.einzelprojekt : COST_CAPS.koop;
    const zuwendung = Math.min(rohfoerderung, cap);

    // Eigenanteil
    const eigenanteil = gesamtkosten - zuwendung;

    return {
      foerderquote,
      personalkosten,
      auftraegeDirekt,
      uebrigeKostenPauschale,
      gesamtkosten,
      rohfoerderung,
      zuwendung,
      eigenanteil,
      cap,
      isCapped: rohfoerderung > cap,
    };
  }, [projectType, companySize, personalkosten, auftraegeDritte, laufzeitMonate]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <section className="py-16 bg-surface-soft">
      <div className="container-main">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Input Form */}
          <div className="lg:col-span-3 bg-surface-DEFAULT rounded-2xl p-8 border border-border-DEFAULT">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary-light text-primary-DEFAULT flex items-center justify-center">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">ZIM-Förderrechner</h2>
                <p className="text-body-light text-sm">
                  Basierend auf ZIM-Richtlinie V5 (Nov. 2024)
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Project Type */}
              <div>
                <label className="block text-heading font-medium mb-3">
                  1. Projektform
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(
                    Object.entries(projectTypeLabels) as [
                      ProjectType,
                      string
                    ][]
                  ).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setProjectType(key)}
                      className={`p-4 rounded-xl border text-sm text-left transition-all ${
                        projectType === key
                          ? "border-primary-DEFAULT bg-primary-light/50 text-primary-DEFAULT font-medium"
                          : "border-border-DEFAULT bg-surface-soft hover:border-primary-DEFAULT/30 text-body"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Company Size */}
              <div>
                <label className="block text-heading font-medium mb-3">
                  2. Unternehmensgröße
                </label>
                <select
                  value={companySize}
                  onChange={(e) =>
                    setCompanySize(e.target.value as CompanySize)
                  }
                  className="w-full p-3 rounded-xl border border-border-DEFAULT bg-surface-DEFAULT text-body focus:border-primary-DEFAULT focus:ring-2 focus:ring-primary-DEFAULT/20 outline-none"
                >
                  {(
                    Object.entries(companySizeLabels) as [
                      CompanySize,
                      string
                    ][]
                  ).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Personalkosten */}
              <div>
                <label className="block text-heading font-medium mb-2">
                  3. Geplante Personalkosten (FuE)
                </label>
                <p className="text-body-light text-sm mb-3">
                  Bruttogehälter der am Projekt beteiligten Mitarbeiter
                </p>
                <div className="relative">
                  <input
                    type="range"
                    min={50000}
                    max={800000}
                    step={10000}
                    value={personalkosten}
                    onChange={(e) =>
                      setPersonalkosten(Number(e.target.value))
                    }
                    className="w-full h-2 bg-primary-light rounded-lg appearance-none cursor-pointer accent-primary-DEFAULT"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-body-light">50.000 €</span>
                    <span className="text-lg font-semibold text-primary-DEFAULT">
                      {formatCurrency(personalkosten)}
                    </span>
                    <span className="text-xs text-body-light">800.000 €</span>
                  </div>
                </div>
              </div>

              {/* Aufträge an Dritte */}
              <div>
                <label className="block text-heading font-medium mb-2">
                  4. Aufträge an Dritte
                </label>
                <p className="text-body-light text-sm mb-3">
                  FuE-Aufträge an externe Dienstleister
                </p>
                <div className="relative">
                  <input
                    type="range"
                    min={0}
                    max={300000}
                    step={5000}
                    value={auftraegeDritte}
                    onChange={(e) =>
                      setAuftraegeDritte(Number(e.target.value))
                    }
                    className="w-full h-2 bg-primary-light rounded-lg appearance-none cursor-pointer accent-primary-DEFAULT"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-body-light">0 €</span>
                    <span className="text-lg font-semibold text-primary-DEFAULT">
                      {formatCurrency(auftraegeDritte)}
                    </span>
                    <span className="text-xs text-body-light">300.000 €</span>
                  </div>
                </div>
              </div>

              {/* Project Duration */}
              <div>
                <label className="block text-heading font-medium mb-2">
                  5. Projektlaufzeit
                </label>
                <div className="flex gap-3 flex-wrap">
                  {[12, 18, 24, 30, 36].map((months) => (
                    <button
                      key={months}
                      onClick={() => setLaufzeitMonate(months)}
                      className={`px-5 py-2 rounded-full text-sm transition-all ${
                        laufzeitMonate === months
                          ? "bg-primary-DEFAULT text-white"
                          : "bg-surface-soft border border-border-DEFAULT text-body hover:border-primary-DEFAULT/30"
                      }`}
                    >
                      {months} Monate
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Result Card */}
            <div className="bg-forest-dark rounded-2xl p-8 text-white">
              <h3 className="text-lg font-medium text-white/80 mb-2">
                Ihre geschätzte ZIM-Förderung
              </h3>
              <div className="text-4xl font-bold text-primary-DEFAULT mb-1">
                {formatCurrency(result.zuwendung)}
              </div>
              <div className="text-white/60 text-sm mb-6">
                bei {(result.foerderquote * 100).toFixed(0)}% Förderquote
                {result.isCapped && (
                  <span className="text-yellow-400 ml-2">
                    (Cap: {formatCurrency(result.cap)})
                  </span>
                )}
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60">Förderquote</span>
                  <span className="font-medium">
                    {(result.foerderquote * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60">Personalkosten</span>
                  <span>{formatCurrency(result.personalkosten)}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60">Aufträge an Dritte</span>
                  <span>{formatCurrency(result.auftraegeDirekt)}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60">
                    Übrige Kosten (Pauschale)
                  </span>
                  <span>
                    {formatCurrency(result.uebrigeKostenPauschale)}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2 font-medium">
                  <span className="text-white/80">Gesamtkosten</span>
                  <span>{formatCurrency(result.gesamtkosten)}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-white/80 font-medium">
                    ZIM-Zuschuss
                  </span>
                  <span className="text-primary-DEFAULT font-bold text-lg">
                    {formatCurrency(result.zuwendung)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Ihr Eigenanteil</span>
                  <span>{formatCurrency(result.eigenanteil)}</span>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-primary-light/50 rounded-2xl p-6 border border-primary-DEFAULT/20">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-primary-DEFAULT shrink-0 mt-0.5" />
                <div className="text-sm text-body">
                  <p className="font-medium text-heading mb-1">
                    Hinweis zur Berechnung
                  </p>
                  <p>
                    Dies ist eine Schätzung basierend auf den aktuellen
                    ZIM-Richtlinien. Die tatsächliche Förderhöhe kann je nach
                    Projektdetails abweichen. Die übrigen Kosten werden als
                    Pauschale (max. 100% der Personalkosten) berechnet.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-surface-DEFAULT rounded-2xl p-6 border border-border-DEFAULT space-y-4">
              <h3 className="text-lg font-semibold">
                Exakte Berechnung gewünscht?
              </h3>
              <p className="text-body text-sm">
                Unsere ZIM-Experten prüfen Ihr Projekt kostenlos und
                erstellen eine individuelle Kalkulation.
              </p>
              <a
                href="https://calendly.com/kovacs-termin"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark w-full text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Kostenlose Beratung
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
