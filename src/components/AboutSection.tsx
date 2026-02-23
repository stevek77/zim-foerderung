import { Award, Brain, Target, Clock } from "lucide-react";
import content from "@/data/content-about.json";

const iconMap: Record<string, any> = { Award, Brain, Target, Clock };

export default function AboutSection() {
  return (
    <section id="ueber-uns" className="py-20 section-warm">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: About Content */}
          <div>
            <p className="text-primary-DEFAULT font-medium text-sm uppercase tracking-wider mb-3">
              {content.label}
            </p>
            <h2 className="text-[2rem] md:text-[2.25rem] mb-5">
              {content.heading}
            </h2>
            <div className="space-y-4 text-body text-[17px] leading-relaxed">
              {content.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Right: Highlights Grid */}
          <div className="grid grid-cols-2 gap-5">
            {content.highlights.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-lg p-6 border border-border-DEFAULT"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-light text-primary-DEFAULT flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-[15px] font-semibold mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-body text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Partner Links */}
        <div className="mt-14 text-center">
          <p className="text-body-light text-sm mb-5 uppercase tracking-wider">
            {content.partnerLabel}
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {content.partnerLinks.map((link, index) => (
              <span key={link.label} className="contents">
                {index > 0 && <span className="text-border-DEFAULT">|</span>}
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body hover:text-primary-DEFAULT transition-colors font-medium text-[15px]"
                >
                  {link.label}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
