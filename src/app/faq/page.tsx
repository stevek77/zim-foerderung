import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { getFAQSchema } from "@/lib/schema";
import { faqData } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "Häufige Fragen zur ZIM-Förderung | Förder-Kompass FAQ",
  description:
    "Alle Antworten zur ZIM-Förderung: Wer ist antragsberechtigt, wie hoch ist der Zuschuss, wie lange dauert ein Antrag? Über 15 häufig gestellte Fragen von unseren ZIM-Beratern beantwortet.",
  alternates: {
    canonical: "https://xn--zim-frderung-beantragen-clc.de/faq/",
  },
  openGraph: {
    title: "FAQ – ZIM-Förderung beantragen | Förder-Kompass",
    description:
      "Alle Antworten zur ZIM-Förderung aus der Praxis – von Antragsberechtigung bis Auszahlung.",
    url: "https://xn--zim-frderung-beantragen-clc.de/faq/",
    type: "website",
  },
};

export default function FAQPage() {
  return (
    <>
      {/* FAQPage Structured Data – für Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQSchema(faqData)),
        }}
      />

      <Navigation />
      <main>
        {/* Page-Hero */}
        <section className="pt-20 lg:pt-[116px] pb-20 bg-surface-soft">
          <div className="container-main">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary-DEFAULT font-medium text-sm uppercase tracking-wider mb-3">
                Häufig gestellte Fragen
              </p>
              <h1 className="text-[2.25rem] md:text-[2.75rem] font-semibold text-heading mb-5">
                Alles Wichtige zur ZIM-Förderung auf einen Blick
              </h1>
              <p className="text-body text-[17px] leading-relaxed">
                Gesammelte Antworten aus über 50 bewilligten ZIM-Projekten.
                Falls Ihre Frage nicht dabei ist, nutzen Sie unsere kostenlose
                Erstberatung – wir antworten persönlich.
              </p>
            </div>
          </div>
        </section>

        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
