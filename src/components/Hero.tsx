import { CheckCircle, ArrowRight } from "lucide-react";
import Script from "next/script";
import content from "@/data/content-hero.json";

export default function Hero() {
  return (
    <>
      {/* Wistia Player Scripts (official web component embed) */}
      <Script
        src="https://fast.wistia.com/player.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://fast.wistia.com/embed/1ayfjjajmu.js"
        strategy="lazyOnload"
        type="module"
      />

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

        <div className="container-main py-24 md:py-[134px] lg:py-[154px] relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <p className="text-primary-DEFAULT font-semibold text-sm tracking-wide uppercase">
                {content.badge}
              </p>

              <h1 className="text-[2.25rem] md:text-[2.6rem] lg:text-[2.85rem] leading-[1.12] tracking-tight text-white">
                {content.headline}{" "}
                <span className="text-primary-DEFAULT">
                  {content.headlineHighlight}
                </span>{" "}
                {content.headlineSuffix}
              </h1>

              <p className="text-white/80 text-[17px] leading-relaxed max-w-xl">
                {content.bodyPrefix}{" "}
                <strong className="text-white">{content.bodyBrand}</strong>{" "}
                {content.bodyMiddle}{" "}
                <strong className="text-white">{content.bodyHighlight}</strong>{" "}
                {content.bodySuffix}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {content.trustPoints.map((point) => (
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
                  {content.ctaPrimary}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#zim-foerderung"
                  className="btn-pill border-2 border-white/30 text-white hover:bg-white/10"
                >
                  {content.ctaSecondary}
                </a>
              </div>
            </div>

            {/* Right: Wistia Motion Video */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15">
              {/* @ts-expect-error - wistia-player is a custom web component */}
              <wistia-player
                media-id="1ayfjjajmu"
                aspect="1.7777777777777777"
                style={{
                  display: "block",
                  width: "100%",
                }}
              />
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-sm">
          <div className="container-main py-4">
            <p className="text-center text-white/60 text-sm">
              {content.trustBar}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
