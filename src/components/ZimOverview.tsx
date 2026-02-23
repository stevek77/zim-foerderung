import {
  Lightbulb,
  Users,
  Globe,
  FileText,
  ArrowRight,
  TrendingUp,
  Euro,
} from "lucide-react";

const projectTypes = [
  {
    icon: Lightbulb,
    title: "ZIM Einzelprojekte",
    description:
      "Für einzelne KMU, die eigenständig ein FuE-Projekt durchführen. Ideal für Unternehmen mit eigener Entwicklungsabteilung.",
    funding: "Bis zu 45% Förderquote",
    maxAmount: "Max. 690.000 €",
    highlight: false,
  },
  {
    icon: Users,
    title: "ZIM Kooperationsprojekte",
    description:
      "Für mindestens zwei KMU oder ein KMU mit einer Forschungseinrichtung. Die häufigste und erfolgreichste Projektform.",
    funding: "Bis zu 55% Förderquote",
    maxAmount: "Max. 560.000 € pro Partner",
    highlight: true,
  },
  {
    icon: Globe,
    title: "ZIM International (IraSME)",
    description:
      "Für grenzüberschreitende FuE-Kooperationen, z.B. mit Partnern aus der Schweiz, Österreich oder weiteren Ländern.",
    funding: "Bis zu 60% Förderquote",
    maxAmount: "Max. 560.000 € pro Partner",
    highlight: false,
  },
  {
    icon: FileText,
    title: "Durchführbarkeitsstudien",
    description:
      "Zur Prüfung der technischen Machbarkeit und wirtschaftlichen Erfolgsaussichten vor dem eigentlichen FuE-Projekt.",
    funding: "Bis zu 55% Förderquote",
    maxAmount: "Max. 125.000 € (Einzel)",
    highlight: false,
  },
];

const keyFacts = [
  { icon: Euro, value: "Bis zu 60%", label: "Förderquote" },
  { icon: TrendingUp, value: "3 Mio. €", label: "Max. Gesamtförderung" },
  { icon: Users, value: "KMU", label: "Bis 499 Beschäftigte" },
  { icon: FileText, value: "24 Monate", label: "Typische Projektlaufzeit" },
];

export default function ZimOverview() {
  return (
    <section id="zim-foerderung" className="py-20 bg-surface-DEFAULT">
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-DEFAULT font-medium text-sm uppercase tracking-wider">
            Das Förderprogramm
          </span>
          <h2 className="text-3xl md:text-[2.5rem] mt-3 mb-6">
            Was ist die ZIM Förderung?
          </h2>
          <p className="text-body text-lg leading-relaxed">
            Das Zentrale Innovationsprogramm Mittelstand (ZIM) ist das
            wichtigste technologieoffene Förderprogramm des Bundesministeriums
            für Wirtschaft und Klimaschutz (BMWK). Es unterstützt kleine und
            mittlere Unternehmen bei der Durchführung innovativer Forschungs-
            und Entwicklungsprojekte mit nicht-rückzahlbaren Zuschüssen.
          </p>
        </div>

        {/* Key Facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {keyFacts.map((fact) => (
            <div
              key={fact.label}
              className="text-center p-6 rounded-2xl bg-surface-soft border border-border-DEFAULT"
            >
              <fact.icon className="w-8 h-8 text-primary-DEFAULT mx-auto mb-3" />
              <div className="text-2xl font-semibold text-heading">
                {fact.value}
              </div>
              <div className="text-body-light text-sm mt-1">{fact.label}</div>
            </div>
          ))}
        </div>

        {/* Project Types */}
        <h3 className="text-2xl md:text-[2rem] text-center mb-10">
          ZIM Projektformen im Überblick
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {projectTypes.map((type) => (
            <div
              key={type.title}
              className={`p-8 rounded-2xl border transition-shadow hover:shadow-lg ${
                type.highlight
                  ? "border-primary-DEFAULT bg-primary-light/30"
                  : "border-border-DEFAULT bg-surface-DEFAULT"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    type.highlight
                      ? "bg-primary-DEFAULT text-white"
                      : "bg-primary-light text-primary-DEFAULT"
                  }`}
                >
                  <type.icon className="w-6 h-6" />
                </div>
                <div className="space-y-3">
                  <h4 className="text-xl font-semibold">{type.title}</h4>
                  <p className="text-body leading-relaxed">
                    {type.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-DEFAULT bg-primary-light rounded-full px-3 py-1">
                      {type.funding}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm text-body-light bg-surface-soft rounded-full px-3 py-1">
                      {type.maxAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://calendly.com/kovacs-termin"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark inline-flex items-center gap-2 shadow-lg shadow-primary-DEFAULT/20"
          >
            Jetzt ZIM-Potenzial prüfen lassen
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
