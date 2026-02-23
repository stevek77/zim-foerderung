import { CheckCircle, ArrowRight, TrendingUp, Shield, Award, Zap } from "lucide-react";

const trustPoints = [
  "bis zu 60% Zuschuss für FuE-Projekte",
  "rein erfolgsbasierte Vergütung",
  "kostenlose Erstberatung",
  "Bewilligungsquote über 85%",
];

export default function Hero() {
  return (
    <section className="pt-[80px] relative overflow-hidden">
      {/* Dschungel Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/hintergrund-foerder-kompass.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/40" />

      <div className="container-main py-16 md:py-20 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <p className="text-primary-DEFAULT font-semibold text-sm tracking-wide uppercase">
              ZIM &middot; Innovationsförderung &middot; BMWK
            </p>

            <h1 className="text-[2.25rem] md:text-[2.6rem] lg:text-[2.85rem] leading-[1.12] tracking-tight text-white">
              Jetzt bis zu{" "}
              <span className="text-primary-DEFAULT">
                60% staatliche Förderung
              </span>{" "}
              für Ihre FuE-Projekte sichern.
            </h1>

            <p className="text-white/80 text-[17px] leading-relaxed max-w-xl">
              Unser Team vom{" "}
              <strong className="text-white">Förder-Kompass</strong>{" "}
              beantragt die ZIM Förderung für Sie{" "}
              <strong className="text-white">auf Erfolgsbasis.</strong>{" "}
              Erhalten Sie nicht-rückzahlbare Zuschüsse für Ihre
              Innovationsprojekte.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-start gap-2.5">
                  <CheckCircle className="w-[18px] h-[18px] text-primary-DEFAULT shrink-0 mt-0.5" />
                  <span className="text-white/90 text-[15px] leading-snug">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-3">
              <a
                href="https://calendly.com/kovacs-termin"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark shadow-lg shadow-primary-DEFAULT/30"
              >
                Termin vereinbaren
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#zim-foerderung"
                className="btn-pill border-2 border-white/30 text-white hover:bg-white/10"
              >
                Mehr erfahren
              </a>
            </div>
          </div>

          {/* Right: Animated Stats/Feature Display */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
              {/* Main stat */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-primary-DEFAULT/20 text-primary-DEFAULT px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                  <TrendingUp className="w-4 h-4" />
                  ZIM Erfolgsquote
                </div>
                <div className="text-6xl md:text-7xl font-bold text-white mb-2">
                  85<span className="text-primary-DEFAULT">%+</span>
                </div>
                <p className="text-white/60 text-sm">
                  Bewilligungsquote unserer Anträge
                </p>
              </div>

              {/* Feature cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                  <Shield className="w-8 h-8 text-primary-DEFAULT mb-2" />
                  <p className="text-white font-semibold text-sm">Kein Risiko</p>
                  <p className="text-white/50 text-xs mt-0.5">
                    Erfolgsbasiert
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                  <Award className="w-8 h-8 text-primary-DEFAULT mb-2" />
                  <p className="text-white font-semibold text-sm">50+ Projekte</p>
                  <p className="text-white/50 text-xs mt-0.5">
                    Erfolgreich bewilligt
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                  <Zap className="w-8 h-8 text-primary-DEFAULT mb-2" />
                  <p className="text-white font-semibold text-sm">4-8 Wochen</p>
                  <p className="text-white/50 text-xs mt-0.5">
                    Bis zur Einreichung
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                  <TrendingUp className="w-8 h-8 text-primary-DEFAULT mb-2" />
                  <p className="text-white font-semibold text-sm">Bis 60%</p>
                  <p className="text-white/50 text-xs mt-0.5">
                    Förderzuschuss
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="container-main py-4">
          <p className="text-center text-white/60 text-sm">
            100+ innovative Partner vertrauen unserer Förderberatung
          </p>
        </div>
      </div>
    </section>
  );
}
