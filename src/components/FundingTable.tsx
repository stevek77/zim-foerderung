import { ArrowRight } from "lucide-react";

const fundingRates = [
  {
    type: "Kleine U. (strukturschwach)",
    einzelprojekt: "45%",
    koopNational: "55%",
    koopInternational: "60%",
  },
  {
    type: "Kleine junge U.",
    einzelprojekt: "45%",
    koopNational: "50%",
    koopInternational: "60%",
  },
  {
    type: "Kleine Unternehmen",
    einzelprojekt: "40%",
    koopNational: "45%",
    koopInternational: "55%",
  },
  {
    type: "Mittlere Unternehmen",
    einzelprojekt: "35%",
    koopNational: "40%",
    koopInternational: "50%",
  },
  {
    type: "Unternehmen (§3.1.1b)",
    einzelprojekt: "25%",
    koopNational: "30%",
    koopInternational: "40%",
  },
  {
    type: "Forschungseinrichtung",
    einzelprojekt: "–",
    koopNational: "100%",
    koopInternational: "–",
  },
];

const costCaps = [
  { label: "Einzelprojekt (Unternehmen)", value: "690.000 €" },
  { label: "Kooperationsprojekt (pro Unternehmen)", value: "560.000 €" },
  { label: "Forschungseinrichtung (pro Projekt)", value: "280.000 €" },
  { label: "Gesamtprojekt max. Zuwendung", value: "3.000.000 €" },
];

export default function FundingTable() {
  return (
    <section className="py-20 bg-surface-soft">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-primary-DEFAULT font-medium text-sm uppercase tracking-wider mb-3">
            Fördersätze & Konditionen
          </p>
          <h2 className="text-[2rem] md:text-[2.25rem] mb-5">
            ZIM Fördersätze 2025/2026
          </h2>
          <p className="text-body text-[17px] leading-relaxed">
            Die Höhe der ZIM-Förderung hängt von der Unternehmensgröße und der
            Projektform ab. Hier finden Sie die aktuellen Fördersätze auf Basis
            der ZIM-Richtlinie V5 vom November 2024.
          </p>
        </div>

        {/* Funding Rates Table */}
        <div className="overflow-x-auto mb-12">
          <table className="w-full bg-white rounded-lg overflow-hidden border border-border-DEFAULT">
            <thead>
              <tr className="bg-surface-soft border-b-2 border-primary-DEFAULT/20">
                <th className="text-left px-6 py-4 font-semibold text-heading text-sm">
                  Unternehmenstyp
                </th>
                <th className="text-center px-6 py-4 font-semibold text-heading text-sm">
                  Einzelprojekt
                </th>
                <th className="text-center px-6 py-4 font-semibold text-heading text-sm">
                  Koop (national)
                </th>
                <th className="text-center px-6 py-4 font-semibold text-heading text-sm">
                  Koop (international)
                </th>
              </tr>
            </thead>
            <tbody>
              {fundingRates.map((rate, i) => (
                <tr
                  key={rate.type}
                  className={`border-t border-border-DEFAULT ${
                    i % 2 === 0 ? "bg-white" : "bg-surface-soft/50"
                  }`}
                >
                  <td className="px-6 py-3.5 font-medium text-heading text-[15px]">
                    {rate.type}
                  </td>
                  <td className="text-center px-6 py-3.5 text-body text-[15px]">
                    {rate.einzelprojekt}
                  </td>
                  <td className="text-center px-6 py-3.5">
                    <span className="font-semibold text-primary-DEFAULT text-[15px]">
                      {rate.koopNational}
                    </span>
                  </td>
                  <td className="text-center px-6 py-3.5">
                    <span className="font-semibold text-primary-DEFAULT text-[15px]">
                      {rate.koopInternational}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cost Caps */}
        <h3 className="text-[1.35rem] font-semibold text-center mb-7">
          Maximale Zuwendungsbeträge
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {costCaps.map((cap) => (
            <div
              key={cap.label}
              className="bg-white rounded-lg p-6 border border-border-DEFAULT text-center"
            >
              <div className="text-2xl font-bold text-primary-DEFAULT mb-1.5">
                {cap.value}
              </div>
              <div className="text-body text-sm">{cap.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-body mb-5 text-[15px]">
            Berechnen Sie Ihre individuelle Förderhöhe mit unserem kostenlosen
            ZIM-Rechner.
          </p>
          <a
            href="/zim-rechner/"
            className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark"
          >
            ZIM-Rechner starten
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
