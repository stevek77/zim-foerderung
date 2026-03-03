import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema";
import Navigation from "@/components/Navigation";
import HochschulenContent from "@/components/HochschulenContent";
import TrackedCalendlyLink from "@/components/TrackedCalendlyLink";
import Footer from "@/components/Footer";

export const metadata: Metadata = generatePageMetadata(
  "ZIM Kooperationsprojekt Hochschule – Kostenfreie Partnersuche & Antragstellung",
  "ZIM-Kooperationsprojekte für Hochschulen in Baden-Württemberg: Kostenfreie Partnersuche mit KI-Matching, professionelle Antragstellung, Projektbegleitung. Für HAW, DHBW, FH & Universitäten.",
  "/hochschulen/"
);

const hochschulFaqData = [
  {
    question: "Für welche Förderprogramme bietet Förder-Kompass Beratung an?",
    answer:
      "Wir sind mit unseren Fachberatern langjährig erfahren im deutschen Fördermittelbereich. Im Bereich der Innovationsförderberatung sind wir spezialisiert auf ZIM und die steuerliche Forschungszulage (FZulG). Bei Bedarf unterstützen wir Hochschulen auch bei fachbezogenen Förderlinien von Bund, Land und EU.",
  },
  {
    question: "Muss die Hochschule bei der Antragstellung etwas bezahlen?",
    answer:
      "Nein, für die Hochschule entstehen keine Kosten. Die Vergütung erfolgt ausschließlich durch die am Projekt beteiligten Unternehmen (KMU) — rein erfolgsbasiert*.",
  },
  {
    question:
      "Unterstützt Förder-Kompass auch bei Verwendungsnachweisen oder Berichtspflichten?",
    answer:
      "Ja, insbesondere für die administrative und organisatorische Abwicklung sind wir Partner für die beteiligten Unternehmen. Wir fungieren als Brücke zu den Drittmittelstellen der Hochschulen und unterstützen z.\u202fB. bei Zwischen- und Abschlussberichten, Projekt-Kooperationsverträgen und der Verwertung von Erfindungen.",
  },
  {
    question: "Wie entsteht ein ZIM-Antrag?",
    answer:
      "Wir beginnen in der Regel mit einer ZIM-Projektskizze, die wir mit dem Projektträger besprechen, um eine abgestimmte Roadmap für die Antragstellung zu erreichen. Förder-Kompass koordiniert dann die Antragstellung mit allen Vorhabenbeschreibungen und Anlagen.",
  },
  {
    question:
      "Kann Förder-Kompass Unternehmenspartner für ein Projekt suchen?",
    answer:
      "Ja! Wenn für eine Projektidee noch kein Unternehmen zur Verfügung steht, unterstützen wir bei der Suche. Nach Identifikation des Forschungsbereichs, der Branchenfoki und weiterer Suchparameter nutzen wir unsere Unternehmensdatenbank sowie KI-gestützte Agenten, um passende Partnerunternehmen zu finden und Kooperationsanfragen vorzubereiten. Dieser Service ist für die Hochschule kostenlos.",
  },
  {
    question:
      "Für welche Themenbereiche kann Förder-Kompass unterstützen?",
    answer:
      "Wir sind nicht auf bestimmte Themenbereiche festgelegt. Der Schwerpunkt unserer bisherigen Mandate liegt im produzierenden Gewerbe mit Innovationsprojekten aus den Bereichen Digitalisierung und Produktion — grundsätzlich sind wir aber offen für alle Forschungsfelder.",
  },
];

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQSchema(hochschulFaqData)),
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
