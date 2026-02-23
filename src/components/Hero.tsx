import { CheckCircle } from "lucide-react";
import Script from "next/script";

const trustPoints = [
  "bis zu 60% Zuschuss für FuE-Projekte",
  "rein erfolgsbasierte Vergütung",
  "kostenlose Erstberatung",
  "Bewilligungsquote über 85%",
];

export default function Hero() {
  return (
    <>
      {/* Wistia Player Script */}
      <Script
        src="https://fast.wistia.com/embed/medias/9b07etnmsp.jsonp"
        strategy="lazyOnload"
      />
      <Script
        src="https://fast.wistia.com/assets/external/E-v1.js"
        strategy="lazyOnload"
      />

      <section className="pt-[80px] section-warm">
        <div className="container-main py-16 md:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <p className="text-primary-DEFAULT font-semibold text-sm tracking-wide uppercase">
                ZIM &middot; Innovationsförderung &middot; BMWK
              </p>

              <h1 className="text-[2.25rem] md:text-[2.6rem] lg:text-[2.85rem] leading-[1.12] tracking-tight">
                Jetzt bis zu{" "}
                <span className="text-primary-DEFAULT">
                  60% staatliche Förderung
                </span>{" "}
                für Ihre FuE-Projekte sichern.
              </h1>

              <p className="text-body text-[17px] leading-relaxed max-w-xl">
                Unser Team vom{" "}
                <strong className="text-heading">Förder-Kompass</strong>{" "}
                beantragt die ZIM Förderung für Sie{" "}
                <strong className="text-heading">auf Erfolgsbasis.</strong>{" "}
                Erhalten Sie nicht-rückzahlbare Zuschüsse für Ihre
                Innovationsprojekte.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {trustPoints.map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <CheckCircle className="w-[18px] h-[18px] text-primary-DEFAULT shrink-0 mt-0.5" />
                    <span className="text-body text-[15px] leading-snug">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <a
                  href="https://calendly.com/kovacs-termin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark shadow-lg shadow-primary-DEFAULT/20"
                >
                  Termin vereinbaren
                </a>
              </div>
            </div>

            {/* Right: Wistia Motion Video */}
            <div className="relative">
              <div className="wistia-embed-wrapper shadow-xl">
                <div
                  className="wistia_embed wistia_async_9b07etnmsp videoFoam=true"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  &nbsp;
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="border-t border-border-DEFAULT/50 bg-white/60 backdrop-blur-sm">
          <div className="container-main py-4">
            <p className="text-center text-body-light text-sm">
              100+ innovative Partner vertrauen unserer Förderberatung
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
