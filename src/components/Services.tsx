import {
  Search,
  FileCheck,
  PenTool,
  BarChart3,
  Shield,
  Handshake,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Kostenlose Erstberatung",
    description:
      "Wir prüfen Ihre Projektidee auf ZIM-Förderfähigkeit und identifizieren die optimale Projektform und Förderquote.",
  },
  {
    number: "02",
    icon: FileCheck,
    title: "Förderfähigkeitsprüfung",
    description:
      "Detaillierte Analyse Ihres Unternehmens, des Innovationsgrads und der technischen Risiken. Abgleich mit allen ZIM-Anforderungen.",
  },
  {
    number: "03",
    icon: PenTool,
    title: "Antragserstellung",
    description:
      "Professionelle Erstellung der Projektbeschreibung (Anhänge 1-4), Kostenplanung und aller Antragsformulare nach ZIM-Richtlinie.",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Kalkulation & Compliance",
    description:
      "Optimierung der Kostenplanung innerhalb der ZIM-Fördergrenzen. PM-Verteilung, Personalkostenkalkulation, Drittkosten-Optimierung.",
  },
  {
    number: "05",
    icon: Shield,
    title: "Qualitätssicherung",
    description:
      "Gutachter-Simulation und Konsistenzprüfung. Wir kennen die Bewertungskriterien und optimieren Ihren Antrag darauf.",
  },
  {
    number: "06",
    icon: Handshake,
    title: "Einreichung & Begleitung",
    description:
      "Einreichung beim Projektträger, Begleitung bei Rückfragen und Unterstützung bei der Zuwendungsvereinbarung.",
  },
];

export default function Services() {
  return (
    <section id="leistungen" className="py-20 bg-surface-soft">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-primary-DEFAULT font-medium text-sm uppercase tracking-wider mb-3">
            Unser Prozess
          </p>
          <h2 className="text-[2rem] md:text-[2.25rem] mb-5">
            So begleiten wir Ihren ZIM-Antrag
          </h2>
          <p className="text-body text-[17px] leading-relaxed">
            Von der ersten Idee bis zur Bewilligung – unser bewährter
            6-Schritte-Prozess maximiert Ihre Erfolgschancen bei der ZIM
            Förderung.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-lg p-7 border border-border-DEFAULT hover:border-primary-DEFAULT/30 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-primary-DEFAULT/15 text-3xl font-bold leading-none">
                  {step.number}
                </span>
                <div className="w-10 h-10 rounded-lg bg-primary-light text-primary-DEFAULT flex items-center justify-center group-hover:bg-primary-DEFAULT group-hover:text-white transition-colors">
                  <step.icon className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-body text-[15px] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* USPs - clean light design instead of dark box */}
        <div className="mt-14 bg-white rounded-lg border border-border-DEFAULT p-8 lg:p-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-[1.5rem] md:text-[1.75rem] mb-4">
                Warum Förder-Kompass?
              </h3>
              <p className="text-body text-[17px] leading-relaxed">
                Als spezialisierte ZIM-Fördermittelberatung kombinieren wir
                tiefes Fachwissen mit modernster Technologie. Unser
                KI-gestützter Antragsprozess reduziert den Aufwand für Sie
                erheblich.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {[
                { value: ">85%", label: "Bewilligungsquote" },
                { value: "50+", label: "Bewilligte Projekte" },
                { value: "100%", label: "Erfolgsbasiert" },
                { value: "0 €", label: "Bei Ablehnung" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 bg-surface-soft rounded-lg"
                >
                  <div className="text-2xl font-bold text-primary-DEFAULT">
                    {stat.value}
                  </div>
                  <div className="text-body-light text-sm mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href="https://calendly.com/kovacs-termin"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark"
          >
            Jetzt kostenlos beraten lassen
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
