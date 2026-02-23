import { Phone, ArrowRight, CheckCircle } from "lucide-react";

const benefits = [
  "Kostenlose Erstberatung in 30 Minuten",
  "Förderfähigkeitsprüfung Ihrer Projektidee",
  "Individuelle Förderstrategie",
  "Keine Kosten bei Ablehnung",
];

export default function CTASection() {
  return (
    <section className="py-20 bg-forest-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-DEFAULT rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-DEFAULT rounded-full blur-3xl" />
      </div>

      <div className="container-main relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-[2.5rem] text-white mb-6">
            Bereit, Ihre ZIM Förderung zu beantragen?
          </h2>
          <p className="text-white/70 text-lg mb-10 leading-relaxed">
            Vereinbaren Sie jetzt Ihre kostenlose Erstberatung. Wir prüfen Ihre
            Projektidee auf ZIM-Förderfähigkeit und zeigen Ihnen den Weg zu bis
            zu 60% Zuschuss.
          </p>

          {/* Benefits */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-10">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2 text-white/90"
              >
                <CheckCircle className="w-5 h-5 text-primary-DEFAULT shrink-0" />
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
              className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark inline-flex items-center justify-center gap-2 text-lg shadow-lg shadow-primary-DEFAULT/25"
            >
              <Phone className="w-5 h-5" />
              Termin vereinbaren
            </a>
            <a
              href="/zim-rechner/"
              className="btn-pill bg-white/10 text-white hover:bg-white/20 border border-white/20 inline-flex items-center justify-center gap-2 text-lg backdrop-blur-sm"
            >
              ZIM-Rechner nutzen
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* Contact Info */}
          <div className="mt-10 text-white/50 text-sm">
            <p>
              Oder rufen Sie uns direkt an:{" "}
              <a
                href="tel:+4977718988861"
                className="text-white/80 hover:text-primary-DEFAULT transition-colors"
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
