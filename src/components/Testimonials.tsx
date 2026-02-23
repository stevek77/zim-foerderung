import content from "@/data/content-testimonials.json";

export default function Testimonials() {
  return (
    <section className="py-20 section-warm">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-primary-DEFAULT font-medium text-sm uppercase tracking-wider mb-3">
            {content.label}
          </p>
          <h2 className="text-[2rem] md:text-[2.25rem]">
            {content.heading}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {content.items.map((t) => (
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
