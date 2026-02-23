"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/lib/faq-data";

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-surface-DEFAULT">
      <div className="container-main">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary-DEFAULT font-medium text-sm uppercase tracking-wider">
              Häufige Fragen
            </span>
            <h2 className="text-3xl md:text-[2.5rem] mt-3 mb-6">
              ZIM Förderung – Häufig gestellte Fragen
            </h2>
            <p className="text-body text-lg leading-relaxed max-w-2xl mx-auto">
              Alles, was Sie über das ZIM-Förderprogramm wissen müssen. Finden
              Sie hier Antworten auf die häufigsten Fragen zur ZIM Förderung.
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-surface-soft rounded-xl border border-border-DEFAULT px-6 data-[state=open]:border-primary-DEFAULT/30"
              >
                <AccordionTrigger className="text-left text-heading font-medium text-base hover:text-primary-DEFAULT py-5 [&[data-state=open]]:text-primary-DEFAULT">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-body leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Bottom CTA */}
          <div className="text-center mt-12 p-8 bg-primary-light/50 rounded-2xl">
            <h3 className="text-xl font-semibold mb-3">
              Ihre Frage nicht dabei?
            </h3>
            <p className="text-body mb-6">
              Vereinbaren Sie eine kostenlose Erstberatung und wir beantworten
              alle Ihre Fragen zur ZIM Förderung persönlich.
            </p>
            <a
              href="https://calendly.com/kovacs-termin"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark inline-flex items-center gap-2"
            >
              Kostenlose Erstberatung buchen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
