import { CheckCircle } from "lucide-react";

const trustPoints = [
  "bis zu 60% Zuschuss für FuE-Projekte",
  "rein erfolgsbasierte Vergütung",
  "kostenlose Erstberatung",
  "Bewilligungsquote über 85%",
];

export default function Hero() {
  return (
    <section className="pt-[72px] bg-white">
      <div className="container-main py-16 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <p className="text-primary-DEFAULT font-medium text-sm">
              ZIM &middot; Innovationsförderung &middot; BMWK-Förderprogramm
            </p>

            <h1 className="text-[2.25rem] md:text-[2.6rem] lg:text-[2.75rem] leading-[1.15] tracking-tight">
              Jetzt bis zu{" "}
              <span className="text-primary-DEFAULT">60% staatliche Förderung</span>{" "}
              für Ihre FuE-Projekte sichern.
            </h1>

            <p className="text-body text-[17px] leading-relaxed max-w-xl">
              Unser Team vom <strong className="text-heading">Förder-Kompass</strong>{" "}
              beantragt die ZIM Förderung für Sie{" "}
              <strong className="text-heading">auf Erfolgsbasis.</strong> Erhalten Sie
              nicht-rückzahlbare Zuschüsse für Ihre Innovationsprojekte.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-start gap-2.5">
                  <CheckCircle className="w-[18px] h-[18px] text-primary-DEFAULT shrink-0 mt-0.5" />
                  <span className="text-body text-[15px] leading-snug">{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <a
                href="https://calendly.com/kovacs-termin"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark"
              >
                Termin vereinbaren
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video bg-surface-soft rounded-lg overflow-hidden border border-border-DEFAULT flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary-DEFAULT/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-primary-DEFAULT ml-1" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-body-light text-sm">Einführung in die ZIM Förderung</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border-DEFAULT bg-surface-soft">
        <div className="container-main py-4">
          <p className="text-center text-body-light text-sm">
            100+ innovative Partner vertrauen unserer Förderberatung
          </p>
        </div>
      </div>
    </section>
  );
}
