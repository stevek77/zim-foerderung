"use client";

import { useState, useMemo } from "react";
import {
  Calculator,
  Info,
  Phone,
  AlertTriangle,
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

function SliderInput({
  label,
  sublabel,
  min,
  max,
  step,
  value,
  onChange,
  formatValue,
  warning,
}: {
  label: string;
  sublabel: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  formatValue: (v: number) => string;
  warning?: string;
}) {
  return (
    <div>
      <label className="block text-heading font-medium mb-1">{label}</label>
      <p className="text-body-light text-sm mb-3">{sublabel}</p>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-primary-light rounded-lg appearance-none cursor-pointer accent-primary-DEFAULT"
      />
      <div className="flex justify-between mt-2">
        <span className="text-xs text-body-light">{formatValue(min)}</span>
        <span className="text-lg font-semibold text-primary-DEFAULT">
          {formatValue(value)}
        </span>
        <span className="text-xs text-body-light">{formatValue(max)}</span>
      </div>
      {warning && (
        <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-600">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          {warning}
        </div>
      )}
    </div>
  );
}

export default function ZimRechner() {
  const [projectType, setProjectType] = useState<ProjectType>("koop_national");
  const [companySize, setCompanySize] = useState<CompanySize>("kleine");
  const [personalkosten, setPersonalkosten] = useState(200000);
  const [auftraegeDritte, setAuftraegeDritte] = useState(50000);
  const [materialkosten, setMaterialkosten] = useState(20000);
  const [geraeteAbschreibung, setGeraeteAbschreibung] = useState(10000);
  const [laufzeitMonate, setLaufzeitMonate] = useState(24);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);

  // Aufträge an Dritte: max 35% der Personalkosten
  const auftraegeMax = Math.round(personalkosten * 0.35);
  const auftraegeWarning =
    auftraegeDritte > auftraegeMax
      ? `Überschreitet 35% der Personalkosten (${formatCurrency(auftraegeMax)}). Der Überhang kann ggf. über die Gemeinkostenpauschale abgebildet werden.`
      : undefined;

  const result = useMemo(() => {
    const foerderquote = FUNDING_RATES[projectType][companySize];

    // Aufträge an Dritte: max 35% der Personalkosten directly eligible
    const auftraegeAnrechenbar = Math.min(auftraegeDritte, personalkosten * 0.35);

    // Direct project costs (Personalkosten + Aufträge + Material + Geräte)
    const direkteKosten =
      personalkosten + auftraegeAnrechenbar + materialkosten + geraeteAbschreibung;

    // Gemeinkosten: max 20% der direkten Projektkosten (AGVO 2023)
    const gemeinkosten = Math.round(direkteKosten * 0.2);

    // Total eligible costs
    const zuwendungsfaehigeKosten = direkteKosten + gemeinkosten;

    // Apply cost cap on zuwendungsfähige Kosten
    const cap =
      projectType === "einzelprojekt" ? COST_CAPS.einzelprojekt : COST_CAPS.koop;
    const gedeckelteKosten = Math.min(zuwendungsfaehigeKosten, cap);

    // Calculate funding
    const zuwendung = Math.round(gedeckelteKosten * foerderquote);

    // Eigenanteil based on actual project costs
    const eigenanteil = zuwendungsfaehigeKosten - zuwendung;

    return {
      foerderquote,
      personalkosten,
      auftraegeAnrechenbar,
      materialkosten,
      geraeteAbschreibung,
      direkteKosten,
      gemeinkosten,
      zuwendungsfaehigeKosten,
      gedeckelteKosten,
      zuwendung,
      eigenanteil,
      cap,
      isCapped: zuwendungsfaehigeKosten > cap,
    };
  }, [
    projectType,
    companySize,
    personalkosten,
    auftraegeDritte,
    materialkosten,
    geraeteAbschreibung,
    laufzeitMonate,
  ]);

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
              {/* 1. Project Type */}
              <div>
                <label className="block text-heading font-medium mb-3">
                  1. Projektform
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(
                    Object.entries(projectTypeLabels) as [ProjectType, string][]
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

              {/* 2. Company Size */}
              <div>
                <label className="block text-heading font-medium mb-3">
                  2. Unternehmensgröße
                </label>
                <select
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value as CompanySize)}
                  className="w-full p-3 rounded-xl border border-border-DEFAULT bg-surface-DEFAULT text-body focus:border-primary-DEFAULT focus:ring-2 focus:ring-primary-DEFAULT/20 outline-none"
                >
                  {(
                    Object.entries(companySizeLabels) as [CompanySize, string][]
                  ).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Personalkosten */}
              <SliderInput
                label="3. Personalkosten (FuE)"
                sublabel="Bruttogehälter der am Projekt beteiligten Mitarbeiter"
                min={50000}
                max={800000}
                step={10000}
                value={personalkosten}
                onChange={setPersonalkosten}
                formatValue={formatCurrency}
              />

              {/* 4. Aufträge an Dritte */}
              <SliderInput
                label="4. Aufträge an Dritte"
                sublabel="FuE-Aufträge an externe Dienstleister (max. 35% der Personalkosten)"
                min={0}
                max={300000}
                step={5000}
                value={auftraegeDritte}
                onChange={setAuftraegeDritte}
                formatValue={formatCurrency}
                warning={auftraegeWarning}
              />

              {/* 5. Material & Geräte */}
              <div className="grid grid-cols-2 gap-6">
                <SliderInput
                  label="5. Materialkosten"
                  sublabel="Verbrauchsmaterial, Rohstoffe"
                  min={0}
                  max={150000}
                  step={5000}
                  value={materialkosten}
                  onChange={setMaterialkosten}
                  formatValue={formatCurrency}
                />
                <SliderInput
                  label="6. Geräteabschreibung"
                  sublabel="Anteilige Abschreibung FuE-Geräte"
                  min={0}
                  max={150000}
                  step={5000}
                  value={geraeteAbschreibung}
                  onChange={setGeraeteAbschreibung}
                  formatValue={formatCurrency}
                />
              </div>

              {/* 7. Project Duration */}
              <div>
                <label className="block text-heading font-medium mb-2">
                  7. Projektlaufzeit
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
            <div className="bg-forest-dark rounded-2xl p-8 text-white sticky top-8">
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
                    (gedeckelt auf {formatCurrency(result.cap)})
                  </span>
                )}
              </div>

              <div className="space-y-2.5 text-sm">
                <div className="text-white/40 text-xs uppercase tracking-wider mb-1">
                  Kostenaufstellung
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60">Personalkosten</span>
                  <span>{formatCurrency(result.personalkosten)}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60">Aufträge an Dritte</span>
                  <span>{formatCurrency(result.auftraegeAnrechenbar)}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60">Materialkosten</span>
                  <span>{formatCurrency(result.materialkosten)}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60">Geräteabschreibung</span>
                  <span>{formatCurrency(result.geraeteAbschreibung)}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/60">
                    Gemeinkosten (20% Pauschale)
                  </span>
                  <span>{formatCurrency(result.gemeinkosten)}</span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-2 pt-1 font-medium">
                  <span className="text-white/80">Zuwendungsfähige Kosten</span>
                  <span>{formatCurrency(result.zuwendungsfaehigeKosten)}</span>
                </div>

                <div className="text-white/40 text-xs uppercase tracking-wider mt-3 mb-1">
                  Ergebnis
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Förderquote</span>
                  <span className="font-medium">
                    {(result.foerderquote * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-white font-semibold">ZIM-Zuschuss</span>
                  <span className="text-primary-DEFAULT font-bold text-xl">
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
                    Dies ist eine Schätzung basierend auf der aktuellen
                    ZIM-Richtlinie V5. Die Gemeinkostenpauschale beträgt max.
                    20% der direkten Projektkosten (AGVO). Aufträge an Dritte
                    sind bis 35% der Personalkosten direkt ansetzbar. Die
                    tatsächliche Förderhöhe kann je nach Projektdetails
                    abweichen.
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
                Unsere ZIM-Experten prüfen Ihr Projekt kostenlos und erstellen
                eine individuelle Kalkulation mit optimierter Kostenplanung.
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
