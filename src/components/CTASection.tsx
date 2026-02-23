import { Phone, ArrowRight, CheckCircle } from "lucide-react";

const benefits = [
  "Kostenlose Erstberatung in 30 Minuten",
  "Förderfähigkeitsprüfung Ihrer Projektidee",
  "Individuelle Förderstrategie",
  "Keine Kosten bei Ablehnung",
];

export default function CTASection() {
  return (
    <section className="py-20 bg-primary-DEFAULT relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container-main relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[2rem] md:text-[2.25rem] text-white mb-5">
            Bereit, Ihre ZIM Förderung zu beantragen?
          </h2>
          <p className="text-white/80 text-[17px] mb-8 leading-relaxed">
            Vereinbaren Sie jetzt Ihre kostenlose Erstberatung. Wir prüfen Ihre
            Projektidee auf ZIM-Förderfähigkeit und zeigen Ihnen den Weg zu bis
            zu 60% Zuschuss.
          </p>

          {/* Benefits */}
          <div className="grid sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-8">
            {benefits.map((benefit) => (
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
            <a
              href="https://calendly.com/kovacs-termin"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill bg-white text-primary-DEFAULT hover:bg-white/90 font-semibold"
            >
              <Phone className="w-4 h-4" />
              Termin vereinbaren
            </a>
            <a
              href="/zim-rechner/"
              className="btn-pill bg-white/15 text-white hover:bg-white/25 border border-white/25 backdrop-blur-sm"
            >
              ZIM-Rechner nutzen
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-white/60 text-sm">
            <p>
              Oder rufen Sie uns direkt an:{" "}
              <a
                href="tel:+4977718988861"
                className="text-white/80 hover:text-white transition-colors"
              >
                +49 7771 8988 861
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
