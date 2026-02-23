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
    <section id="ueber-uns" className="py-20 section-warm">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: About Content */}
          <div>
            <p className="text-primary-DEFAULT font-medium text-sm uppercase tracking-wider mb-3">
              Über Förder-Kompass
            </p>
            <h2 className="text-[2rem] md:text-[2.25rem] mb-5">
              Ihr Partner für ZIM Fördermittelberatung
            </h2>
            <div className="space-y-4 text-body text-[17px] leading-relaxed">
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
          <div className="grid grid-cols-2 gap-5">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-lg p-6 border border-border-DEFAULT"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-light text-primary-DEFAULT flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-[15px] font-semibold mb-1.5">
                  {item.title}
                </h3>
                <p className="text-body text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Links */}
        <div className="mt-14 text-center">
          <p className="text-body-light text-sm mb-5 uppercase tracking-wider">
            Weitere Leistungen
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <a
              href="https://forschungszulagenantrag.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-body hover:text-primary-DEFAULT transition-colors font-medium text-[15px]"
            >
              Forschungszulage
            </a>
            <span className="text-border-DEFAULT">|</span>
            <a
              href="https://foerder-kompass.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-body hover:text-primary-DEFAULT transition-colors font-medium text-[15px]"
            >
              Alle Fördermittel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
