import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ZimOverview from "@/components/ZimOverview";
import FundingTable from "@/components/FundingTable";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { getFAQSchema } from "@/lib/schema";
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

      <Navigation />
      <main>
        <Hero />
        <ZimOverview />
        <FundingTable />
        <Services />
        <Testimonials />
        <FAQ />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
