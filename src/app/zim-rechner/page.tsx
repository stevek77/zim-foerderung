import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import Navigation from "@/components/Navigation";
import ZimRechner from "@/components/ZimRechner";
import Footer from "@/components/Footer";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = generatePageMetadata(
  "ZIM-Rechner – Berechnen Sie Ihre ZIM Förderung kostenlos",
  "Kostenloser ZIM-Rechner: Berechnen Sie in 2 Minuten Ihre individuelle ZIM-Förderhöhe. Fördersätze, maximale Zuschüsse und Kostenplanung auf einen Blick.",
  "/zim-rechner/"
);

export default function ZimRechnerPage() {
  const breadcrumbs = [
    { name: "Startseite", url: "https://xn--zim-frderung-beantragen-clc.de/" },
    {
      name: "ZIM-Rechner",
      url: "https://xn--zim-frderung-beantragen-clc.de/zim-rechner/",
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
        {/* Hero Header */}
        <section
          className="pt-32 pb-16"
          style={{
            background:
              "linear-gradient(135deg, #06140C 0%, #071B14 40%, #0F3D34 100%)",
          }}
        >
          <div className="container-main text-center">
            <span className="text-primary-DEFAULT font-medium text-sm uppercase tracking-wider">
              Kostenloser ZIM-Rechner
            </span>
            <h1 className="text-3xl md:text-[2.6rem] text-white mt-3 mb-4">
              Berechnen Sie Ihre ZIM Förderung
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Ermitteln Sie in wenigen Schritten, wie viel Zuschuss Ihr
              Unternehmen für ein ZIM-Forschungsprojekt erhalten kann. Basierend
              auf der aktuellen{" "}
              <a
                href="https://www.zim.de/ZIM/Navigation/DE/Programminfos/WasistdasZIM/was-ist-das-zim.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 underline hover:text-white"
              >
                ZIM-Richtlinie V5
              </a>{" "}
              (November 2024).
            </p>
          </div>
        </section>

        <ZimRechner />
      </main>
      <Footer />
    </>
  );
}
