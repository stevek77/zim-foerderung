import {
  Search,
  FileCheck,
  PenTool,
  BarChart3,
  Shield,
  Handshake,
  ArrowRight,
} from "lucide-react";
import content from "@/data/content-services.json";
import TrackedCalendlyLink from "@/components/TrackedCalendlyLink";

const iconMap: Record<string, any> = { Search, FileCheck, PenTool, BarChart3, Shield, Handshake };

export default function Services() {
  return (
    <section id="leistungen" className="py-20 bg-surface-soft">
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

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {content.steps.map((step) => {
            const Icon = iconMap[step.icon];
            return (
              <div
                key={step.number}
                className="bg-white rounded-lg p-7 border border-border-DEFAULT hover:border-primary-DEFAULT/30 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-primary-DEFAULT/15 text-3xl font-bold leading-none">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-primary-light text-primary-DEFAULT flex items-center justify-center group-hover:bg-primary-DEFAULT group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-body text-[15px] leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* USPs - clean light design instead of dark box */}
        <div className="mt-14 bg-white rounded-lg border border-border-DEFAULT p-8 lg:p-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-[1.5rem] md:text-[1.75rem] mb-4">
                {content.uspHeading}
              </h3>
              <p className="text-body text-[17px] leading-relaxed">
                {content.uspDescription}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {content.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 bg-surface-soft rounded-lg"
                >
                  <div className="text-2xl font-bold text-primary-DEFAULT">
                    {stat.value}
                  </div>
                  <div className="text-body-light text-sm mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <TrackedCalendlyLink
            location="services"
            className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark"
          >
            {content.cta}
            <ArrowRight className="w-4 h-4" />
          </TrackedCalendlyLink>
        </div>
      </div>
    </section>
  );
}
