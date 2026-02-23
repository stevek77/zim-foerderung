import { Award, Brain, Target, Clock } from "lucide-react";

const highlights = [
  {
    icon: Award,
    title: "Erfahrene ZIM-Spezialisten",
    text: "Über 50 erfolgreich bewilligte ZIM-Projekte. Wir kennen die Bewertungskriterien der Gutachter und optimieren Ihren Antrag darauf.",
  },
  {
    icon: Brain,
    title: "KI-gestützter Antragsprozess",
    text: "Unser proprietärer ZIM-Antragsgenerator nutzt KI-Technologie, um den Erstellungsprozess zu beschleunigen und die Qualität zu maximieren.",
  },
  {
    icon: Target,
    title: "Rein erfolgsbasiert",
    text: "Sie zahlen nur bei erfolgreicher Bewilligung. Kein Risiko für Sie – unser Erfolg ist Ihr Erfolg.",
  },
  {
    icon: Clock,
    title: "Schneller Prozess",
    text: "Von der Erstberatung bis zur Antragseinreichung in 4-8 Wochen. Wir wissen, worauf es ankommt und arbeiten effizient.",
  },
];

export default function AboutSection() {
  return (
    <section id="ueber-uns" className="py-20 bg-surface-soft">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: About Content */}
          <div>
            <span className="text-primary-DEFAULT font-medium text-sm uppercase tracking-wider">
              Über Förder-Kompass
            </span>
            <h2 className="text-3xl md:text-[2.5rem] mt-3 mb-6">
              Ihr Partner für ZIM Fördermittelberatung
            </h2>
            <div className="space-y-4 text-body text-lg leading-relaxed">
              <p>
                Förder-Kompass ist eine spezialisierte Fördermittelberatung mit
                Sitz am Bodensee. Unter der Leitung von Steve Kovacs
                unterstützen wir kleine und mittlere Unternehmen dabei, ihre
                Innovationsprojekte durch öffentliche Fördermittel zu
                finanzieren.
              </p>
              <p>
                Unser Schwerpunkt liegt auf dem ZIM-Förderprogramm und der
                Forschungszulage. Mit einer Bewilligungsquote von über 85%
                gehören wir zu den erfolgreichsten ZIM-Beratern in Deutschland.
              </p>
              <p>
                Was uns auszeichnet: Wir arbeiten branchenübergreifend und
                haben besondere Expertise in den Bereichen KI, Digitalisierung,
                Medizintechnik und Nachhaltigkeit. Viele unserer erfolgreichsten
                Projekte verbinden klassische Industrie mit modernster
                KI-Technologie.
              </p>
            </div>
          </div>

          {/* Right: Highlights Grid */}
          <div className="grid grid-cols-2 gap-6">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="bg-surface-DEFAULT rounded-2xl p-6 border border-border-DEFAULT"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-light text-primary-DEFAULT flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-body text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Logos / Trust */}
        <div className="mt-16 text-center">
          <p className="text-body-light text-sm mb-6 uppercase tracking-wider">
            Weitere Leistungen
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <a
              href="https://forschungszulagenantrag.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-body hover:text-primary-DEFAULT transition-colors font-medium"
            >
              Forschungszulage
            </a>
            <span className="text-border-DEFAULT">|</span>
            <a
              href="https://foerder-kompass.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-body hover:text-primary-DEFAULT transition-colors font-medium"
            >
              Alle Fördermittel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
