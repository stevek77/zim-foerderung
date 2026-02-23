import { CheckCircle, ArrowRight, Play } from "lucide-react";

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

      <div className="container-main py-20 md:py-28 lg:py-32 relative z-10">
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

          {/* Right: Motion Video Placeholder */}
          <div className="relative">
            {/*
              TODO: Motion Video hier einbetten.
              Ersetze den Platzhalter mit dem fertigen Video-Embed (z.B. von Replit Animation).
              Beispiel: <iframe src="VIDEO_URL" ... />
            */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 aspect-video bg-black/20 backdrop-blur-sm">
              {/* Video Platzhalter - wird durch echtes Motion Video ersetzt */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary-DEFAULT/90 flex items-center justify-center mb-4 shadow-lg shadow-primary-DEFAULT/40 hover:scale-105 transition-transform cursor-pointer">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <p className="text-white/70 text-sm font-medium">
                  ZIM Förderung erklärt
                </p>
                <p className="text-white/40 text-xs mt-1">
                  In 90 Sekunden alles Wichtige erfahren
                </p>
              </div>
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-DEFAULT/10 via-transparent to-primary-DEFAULT/5 pointer-events-none" />
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
