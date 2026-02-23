import {
  Lightbulb,
  Users,
  Globe,
  FileText,
  ArrowRight,
  TrendingUp,
  Euro,
} from "lucide-react";
import content from "@/data/content-overview.json";

const iconMap: Record<string, any> = { Lightbulb, Users, Globe, FileText, Euro, TrendingUp };

export default function ZimOverview() {
  return (
    <section id="zim-foerderung" className="py-20 bg-white">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-primary-DEFAULT font-medium text-sm uppercase tracking-wider mb-3">
            {content.label}
          </p>
          <h2 className="text-[2rem] md:text-[2.25rem] mb-5">
            {content.heading}
          </h2>
          <p className="text-body text-[17px] leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Key Facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14">
          {content.keyFacts.map((fact) => {
            const Icon = iconMap[fact.icon];
            return (
              <div
                key={fact.label}
                className="text-center p-6 rounded-lg bg-surface-soft border border-border-DEFAULT"
              >
                <Icon className="w-7 h-7 text-primary-DEFAULT mx-auto mb-3" />
                <div className="text-2xl font-semibold text-heading">
                  {fact.value}
                </div>
                <div className="text-body-light text-sm mt-1">{fact.label}</div>
              </div>
            );
          })}
        </div>

        {/* Project Types */}
        <h3 className="text-[1.5rem] md:text-[1.75rem] text-center mb-8">
          {content.projectTypesHeading}
        </h3>
        <div className="grid md:grid-cols-2 gap-5">
          {content.projectTypes.map((type) => {
            const Icon = iconMap[type.icon];
            return (
              <div
                key={type.title}
                className={`p-7 rounded-lg border transition-shadow hover:shadow-md ${
                  type.highlight
                    ? "border-primary-DEFAULT/40 bg-primary-50"
                    : "border-border-DEFAULT bg-surface-soft"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${
                      type.highlight
                        ? "bg-primary-DEFAULT text-white"
                        : "bg-primary-light text-primary-DEFAULT"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-2.5">
                    <h4 className="text-lg font-semibold">{type.title}</h4>
                    <p className="text-body text-[15px] leading-relaxed">
                      {type.description}
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      <span className="inline-flex items-center text-sm font-medium text-primary-DEFAULT bg-primary-light rounded-full px-3 py-1">
                        {type.funding}
                      </span>
                      <span className="inline-flex items-center text-sm text-body-light bg-white rounded-full px-3 py-1 border border-border-DEFAULT">
                        {type.maxAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://calendly.com/kovacs-termin"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark"
          >
            {content.cta}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
