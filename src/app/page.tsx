import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ZimOverview from "@/components/ZimOverview";
import FundingTable from "@/components/FundingTable";
import Schnellcheck from "@/components/Schnellcheck";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import AboutSection from "@/components/AboutSection";
import GeoContent from "@/components/GeoContent";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { getFAQSchema, getHowToSchema } from "@/lib/schema";
import { faqData } from "@/lib/faq-data";

export default function Home() {
  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQSchema(faqData)),
        }}
      />
      {/* HowTo Schema */}
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
        <FAQ />
        <GeoContent />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
