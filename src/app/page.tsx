import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ZimOverview from "@/components/ZimOverview";
import FundingTable from "@/components/FundingTable";
import Schnellcheck from "@/components/Schnellcheck";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import GeoContent from "@/components/GeoContent";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { getHowToSchema } from "@/lib/schema";

// FAQ & AboutSection sind jetzt dedizierte Seiten (/faq/, /ueber-uns/)
// FAQPage-Schema wandert entsprechend mit, damit Google Rich Snippets nur
// der /faq/-URL zuordnet (saubere Attribution).

export default function Home() {
  return (
    <>
      {/* HowTo Schema (bleibt auf Homepage, da die Schritte hier beschrieben werden) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getHowToSchema()),
        }}
      />

      <Navigation />
      <main>
        <Hero />
        <ZimOverview />
        <FundingTable />
        <Schnellcheck />
        <Services />
        <Testimonials />
        <GeoContent />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
