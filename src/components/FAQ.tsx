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
    <section id="faq" className="py-20 bg-white">
      <div className="container-main">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-primary-DEFAULT font-medium text-sm uppercase tracking-wider mb-3">
              Häufige Fragen
            </p>
            <h2 className="text-[2rem] md:text-[2.25rem] mb-5">
              ZIM Förderung – Häufig gestellte Fragen
            </h2>
            <p className="text-body text-[17px] leading-relaxed max-w-2xl mx-auto">
              Alles, was Sie über das ZIM-Förderprogramm wissen müssen. Finden
              Sie hier Antworten auf die häufigsten Fragen zur ZIM Förderung.
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-3">
            {faqData.map((faq, index) => (
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
              Ihre Frage nicht dabei?
            </h3>
            <p className="text-body text-[15px] mb-5">
              Vereinbaren Sie eine kostenlose Erstberatung und wir beantworten
              alle Ihre Fragen zur ZIM Förderung persönlich.
            </p>
            <a
              href="https://calendly.com/kovacs-termin"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark"
            >
              Kostenlose Erstberatung buchen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
