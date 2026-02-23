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
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-DEFAULT font-medium text-sm uppercase tracking-wider">
            Fördersätze & Konditionen
          </span>
          <h2 className="text-3xl md:text-[2.5rem] mt-3 mb-6">
            ZIM Fördersätze 2025/2026
          </h2>
          <p className="text-body text-lg leading-relaxed">
            Die Höhe der ZIM-Förderung hängt von der Unternehmensgröße und der
            Projektform ab. Hier finden Sie die aktuellen Fördersätze auf Basis
            der ZIM-Richtlinie V5 vom November 2024.
          </p>
        </div>

        {/* Funding Rates Table */}
        <div className="overflow-x-auto mb-12">
          <table className="w-full bg-surface-DEFAULT rounded-2xl overflow-hidden border border-border-DEFAULT">
            <thead>
              <tr className="bg-forest-dark text-white">
                <th className="text-left px-6 py-4 font-semibold">
                  Unternehmenstyp
                </th>
                <th className="text-center px-6 py-4 font-semibold">
                  Einzelprojekt
                </th>
                <th className="text-center px-6 py-4 font-semibold">
                  Koop (national)
                </th>
                <th className="text-center px-6 py-4 font-semibold">
                  Koop (international)
                </th>
              </tr>
            </thead>
            <tbody>
              {fundingRates.map((rate, i) => (
                <tr
                  key={rate.type}
                  className={`border-t border-border-DEFAULT ${
                    i % 2 === 0 ? "bg-surface-DEFAULT" : "bg-surface-soft"
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-heading">
                    {rate.type}
                  </td>
                  <td className="text-center px-6 py-4 text-body">
                    {rate.einzelprojekt}
                  </td>
                  <td className="text-center px-6 py-4">
                    <span className="font-semibold text-primary-DEFAULT">
                      {rate.koopNational}
                    </span>
                  </td>
                  <td className="text-center px-6 py-4">
                    <span className="font-semibold text-primary-DEFAULT">
                      {rate.koopInternational}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cost Caps */}
        <h3 className="text-2xl font-semibold text-center mb-8">
          Maximale Zuwendungsbeträge
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {costCaps.map((cap) => (
            <div
              key={cap.label}
              className="bg-surface-DEFAULT rounded-2xl p-6 border border-border-DEFAULT text-center"
            >
              <div className="text-2xl font-bold text-primary-DEFAULT mb-2">
                {cap.value}
              </div>
              <div className="text-body text-sm">{cap.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-body mb-6">
            Berechnen Sie Ihre individuelle Förderhöhe mit unserem kostenlosen
            ZIM-Rechner.
          </p>
          <a
            href="/zim-rechner/"
            className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark inline-flex items-center gap-2 shadow-lg shadow-primary-DEFAULT/20"
          >
            ZIM-Rechner starten
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
