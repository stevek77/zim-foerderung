"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import content from "@/data/content-faq.json";
import { trackCalendlyClick } from "@/lib/analytics";

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container-main">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-primary-DEFAULT font-medium text-sm uppercase tracking-wider mb-3">
              {content.label}
            </p>
            <h2 className="text-[2rem] md:text-[2.25rem] mb-5">
              {content.heading}
            </h2>
            <p className="text-body text-[17px] leading-relaxed max-w-2xl mx-auto">
              {content.description}
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-3">
            {content.items.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-surface-soft rounded-lg border border-border-DEFAULT px-6 data-[state=open]:border-primary-DEFAULT/30"
              >
                <AccordionTrigger className="text-left text-heading font-medium text-[15px] hover:text-primary-DEFAULT py-4 [&[data-state=open]]:text-primary-DEFAULT">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-body text-[15px] leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Bottom CTA */}
          <div className="text-center mt-10 p-7 bg-primary-light rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              {content.ctaHeading}
            </h3>
            <p className="text-body text-[15px] mb-5">
              {content.ctaText}
            </p>
            <a
              href="https://calendly.com/kovacs-termin"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark"
              onClick={() => trackCalendlyClick("faq")}
            >
              {content.ctaButton}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
