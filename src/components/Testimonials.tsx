const testimonials = [
  {
    initials: "KK",
    name: "Klaus König",
    company: "jetzt GmbH",
    role: "Geschäftsführer",
    text: "Als Innovationsunternehmen im Bereich Prototypenbau arbeiten wir bei der Förderung unserer F&E-Vorhaben eng mit Herrn Kovacs vom Förder-Kompass zusammen. Die strukturierte Vorgehensweise, das tiefe Fördermittel-Know-how und die praxisnahe Beratung unterstützen uns und unsere Partner dabei Entwicklungsprojekte erfolgreich fördern zu lassen.",
  },
  {
    initials: "SE",
    name: "Stephen John Evans",
    company: "riidmii GmbH",
    role: "Geschäftsführung",
    text: "Mit Herrn Kovacs vom Förder-Kompass konnten wir unsere F&E-Arbeiten an unserer digitalen Kinderbuchplattform riidmii erfolgreich fördern lassen. Von der Antragstellung bis zur Bewilligung überzeugten uns die klare Struktur, die fachliche Tiefe und die sehr engagierte Begleitung.",
  },
  {
    initials: "SR",
    name: "Simon Rock",
    company: "Rock Invest Beteiligungs-GmbH",
    role: "Geschäftsführer",
    text: "Dank der Unterstützung durch das Team des Förder-Kompass konnten wir uns Fördermittel für Digitalisierungs- und F&E-Projekte unserer Firmengruppe sichern und uns voll auf die inhaltliche Weiterentwicklung konzentrieren.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 section-warm">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-primary-DEFAULT font-medium text-sm uppercase tracking-wider mb-3">
            Kundenstimmen
          </p>
          <h2 className="text-[2rem] md:text-[2.25rem]">
            Was unsere Kunden sagen
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-surface-soft rounded-lg p-7 border border-border-DEFAULT"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-primary-DEFAULT/10 text-primary-DEFAULT font-semibold text-sm flex items-center justify-center shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-heading text-sm">{t.name}</div>
                  <div className="text-body-light text-xs">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
              <p className="text-body text-[15px] leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
