import { Phone, ArrowRight, CheckCircle } from "lucide-react";
import content from "@/data/content-cta.json";
import TrackedCalendlyLink from "@/components/TrackedCalendlyLink";

export default function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
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
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/55 to-black/65" />

      <div className="container-main relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[2rem] md:text-[2.25rem] text-white mb-5">
            {content.heading}
          </h2>
          <p className="text-white/80 text-[17px] mb-8 leading-relaxed">
            {content.description}
          </p>

          {/* Benefits */}
          <div className="grid sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-8">
            {content.benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2 text-white/90"
              >
                <CheckCircle className="w-4 h-4 text-white/70 shrink-0" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TrackedCalendlyLink
              location="cta-section"
              className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark font-semibold shadow-lg shadow-primary-DEFAULT/30"
            >
              <Phone className="w-4 h-4" />
              {content.ctaPrimary}
            </TrackedCalendlyLink>
            <a
              href="/zim-rechner/"
              className="btn-pill bg-white/15 text-white hover:bg-white/25 border border-white/25 backdrop-blur-sm"
            >
              {content.ctaSecondary}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-white/60 text-sm">
            <p>
              {content.contactPrefix}{" "}
              <a
                href="tel:+4977718988861"
                className="text-white/80 hover:text-white transition-colors"
              >
                {content.phone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
