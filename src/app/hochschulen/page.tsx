import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema } from "@/lib/schema";
import Navigation from "@/components/Navigation";
import HochschulenContent from "@/components/HochschulenContent";
import TrackedCalendlyLink from "@/components/TrackedCalendlyLink";
import Footer from "@/components/Footer";

export const metadata: Metadata = generatePageMetadata(
  "ZIM-Kooperationsprojekte für Hochschulen – Kostenfreie Partnersuche",
  "Förder-Kompass unterstützt Hochschulen und Forschungseinrichtungen bei ZIM-Kooperationsprojekten: Kostenfreie Partnersuche, KI-gestütztes Matching mit KMU, professionelle Antragstellung.",
  "/hochschulen/"
);

export default function HochschulenPage() {
  const breadcrumbs = [
    {
      name: "Startseite",
      url: "https://xn--zim-frderung-beantragen-clc.de/",
    },
    {
      name: "Hochschulen",
      url: "https://xn--zim-frderung-beantragen-clc.de/hochschulen/",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)),
        }}
      />

      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-[80px] relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/hintergrund-foerder-kompass.jpeg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/40" />

          <div
            className="container-main relative z-10"
            style={{ paddingTop: "80px", paddingBottom: "80px" }}
          >
            <div className="max-w-3xl">
              <p className="text-primary-DEFAULT font-semibold text-sm tracking-wide uppercase mb-4">
                Für Hochschulen & Forschungseinrichtungen
              </p>
              <h1 className="text-[2.25rem] md:text-[2.6rem] lg:text-[2.85rem] leading-[1.12] tracking-tight text-white mb-6">
                ZIM-Kooperationsprojekte{" "}
                <span className="text-primary-DEFAULT">
                  mit Industriepartnern
                </span>{" "}
                realisieren
              </h1>
              <p className="text-white/80 text-[17px] leading-relaxed max-w-2xl mb-8">
                Sie haben eine Forschungsidee und suchen ein Unternehmen als
                Projektpartner? Förder-Kompass übernimmt die Partnersuche,
                koordiniert die Antragstellung und begleitet Sie durch den
                gesamten Förderprozess —{" "}
                <strong className="text-white">
                  kostenfrei für Ihre Hochschule
                </strong>
                .
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#projektskizze"
                  className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark shadow-lg shadow-primary-DEFAULT/30"
                >
                  Projektidee einreichen
                </a>
                <TrackedCalendlyLink
                  location="hochschulen-hero"
                  className="btn-pill border-2 border-white/30 text-white hover:bg-white/10"
                >
                  Erstberatung buchen
                </TrackedCalendlyLink>
              </div>
            </div>
          </div>
        </section>

        <HochschulenContent />
      </main>
      <Footer />
    </>
  );
}
