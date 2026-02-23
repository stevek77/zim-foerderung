import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Klaus König",
    company: "jetzt GmbH",
    role: "Geschäftsführer",
    text: "Die Zusammenarbeit mit Förder-Kompass war hervorragend. Der ZIM-Antrag wurde professionell erstellt und innerhalb kürzester Zeit bewilligt. Die erfolgsbasierte Vergütung hat uns besonders überzeugt.",
    rating: 5,
    projectType: "ZIM Kooperationsprojekt",
  },
  {
    name: "Mosaik Physiotherapie Köln",
    company: "NESTling Projekt",
    role: "Projektleitung",
    text: "Das NESTling-Projekt – ein intelligenter Schnuller zur Gesundheitsüberwachung von Neugeborenen – wurde durch die ZIM-Förderung erst möglich. Förder-Kompass hat uns durch den gesamten Antragsprozess begleitet.",
    rating: 5,
    projectType: "ZIM Kooperationsprojekt",
  },
  {
    name: "Dr. Thomas M.",
    company: "MedTech Startup",
    role: "CTO",
    text: "Als junges Unternehmen war die ZIM-Förderung entscheidend für unsere FuE-Aktivitäten. Die Beratung war kompetent, effizient und hat unsere Erwartungen übertroffen.",
    rating: 5,
    projectType: "ZIM Einzelprojekt",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-surface-DEFAULT">
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-DEFAULT font-medium text-sm uppercase tracking-wider">
            Kundenstimmen
          </span>
          <h2 className="text-3xl md:text-[2.5rem] mt-3 mb-6">
            Was unsere Kunden über die ZIM-Beratung sagen
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-surface-soft rounded-2xl p-8 border border-border-DEFAULT hover:shadow-lg transition-shadow"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-primary-DEFAULT/30 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-body leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t border-border-DEFAULT pt-4">
                <div className="font-semibold text-heading">
                  {testimonial.name}
                </div>
                <div className="text-body-light text-sm">
                  {testimonial.role} · {testimonial.company}
                </div>
                <span className="inline-block mt-2 text-xs bg-primary-light text-primary-DEFAULT rounded-full px-3 py-1">
                  {testimonial.projectType}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
