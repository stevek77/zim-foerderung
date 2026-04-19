import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Über uns – Ihr ZIM-Experte Steve Kovacs | Förder-Kompass",
  description:
    "Steve Kovacs & Team: Spezialisierte ZIM-Fördermittelberatung aus Stockach am Bodensee. Über 50 bewilligte ZIM-Projekte, >85 % Bewilligungsquote, erfolgsbasierte Vergütung.",
  alternates: {
    canonical: "https://xn--zim-frderung-beantragen-clc.de/ueber-uns/",
  },
  openGraph: {
    title: "Über Förder-Kompass – ZIM-Fördermittelberatung am Bodensee",
    description:
      "Spezialisierte ZIM-Beratung von Steve Kovacs. >50 bewilligte Projekte, >85 % Bewilligungsquote.",
    url: "https://xn--zim-frderung-beantragen-clc.de/ueber-uns/",
    type: "website",
  },
};

// Person-Schema für den Geschäftsführer (hilft LLMs und Google bei Entity-Recognition)
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://xn--zim-frderung-beantragen-clc.de/ueber-uns/#steve-kovacs",
  name: "Steve Kovacs",
  jobTitle: "Geschäftsführer, ZIM-Fördermittelberater",
  worksFor: {
    "@type": "Organization",
    name: "Förder-Kompass",
    url: "https://xn--zim-frderung-beantragen-clc.de",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Seestrasse 15c",
    addressLocality: "Stockach",
    postalCode: "78333",
    addressRegion: "Baden-Württemberg",
    addressCountry: "DE",
  },
  telephone: "+49-7771-8988-861",
  email: "info@foerder-kompass.de",
  sameAs: [
    "https://www.linkedin.com/in/steve-kovacs-4b949854/",
    "https://foerder-kompass.de/",
    "https://forschungszulagenantrag.de/",
  ],
  knowsAbout: [
    "ZIM-Förderung",
    "Zentrales Innovationsprogramm Mittelstand",
    "Forschungszulage",
    "Fördermittelberatung",
    "Innovationsförderung KMU",
    "BMWK-Förderprogramme",
    "Hochschul-Kooperationen ZIM",
  ],
};

export default function UeberUnsPage() {
  return (
    <>
      {/* Person-Schema (LLM/Google Entity Recognition) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />

      <Navigation />
      <main>
        {/* Page-Hero */}
        <section className="py-20 bg-surface-soft">
          <div className="container-main">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary-DEFAULT font-medium text-sm uppercase tracking-wider mb-3">
                Über Förder-Kompass
              </p>
              <h1 className="text-[2.25rem] md:text-[2.75rem] font-semibold text-heading mb-5">
                Spezialisierte ZIM-Beratung aus der Bodensee-Region
              </h1>
              <p className="text-body text-[17px] leading-relaxed">
                Seit 2020 begleiten wir KMU, Start-ups und Hochschulen bei der
                ZIM-Förderung – mit technischer Tiefe, erfolgsbasiertem Honorar
                und über 85 % Bewilligungsquote.
              </p>
            </div>
          </div>
        </section>

        <AboutSection />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
