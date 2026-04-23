import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { ExternalLink, Calculator, CheckCircle2, FileSearch, BookOpen, Building2, Target } from "lucide-react";

const siteUrl = "https://xn--zim-frderung-beantragen-clc.de";
const pageUrl = `${siteUrl}/tools/`;

export const metadata: Metadata = {
  title: "Tools & Ressourcen – ZIM- & FZulG-Rechner, Checklisten, Leitfäden",
  description:
    "Kostenlose interaktive Tools zur Förderung für KMU: ZIM-Antragsrechner, FZulG-Rechner, Förderprogramm-Vergleich, Branchen-Check, Antragscheckliste. Direkt im Browser nutzen.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Tools & Ressourcen – Förder-Kompass",
    description:
      "Kostenlose interaktive Förderrechner und Leitfäden: ZIM, FZulG, Vergleich, Branchen-Check.",
    url: pageUrl,
    type: "website",
  },
  keywords: [
    "ZIM Rechner",
    "ZIM Förderrechner",
    "Forschungszulage Rechner",
    "ZIM Antrag Checkliste",
    "FZulG Rechner",
    "Förderprogramm Vergleich",
    "ZIM Fördercheck",
    "BSFZ Antragsprozess",
    "Forschungszulage Steuerberater Guide",
  ],
};

interface ResourceItem {
  title: string;
  description: string;
  url: string;
  category: "ZIM" | "FZulG" | "Vergleich" | "Erfahrung";
  icon: React.ComponentType<{ className?: string }>;
}

const resources: ResourceItem[] = [
  // ZIM (eigene Marke — oberste Priorität)
  {
    title: "ZIM-Förderrechner 2025",
    description:
      "Interaktiver Rechner: Ermitteln Sie Ihre ZIM-Zuwendung auf Basis von FuE-Personalkosten, Auftragsforschung und Sachkosten. KMU-Bonus und Kooperations-Aufschlag werden automatisch berücksichtigt.",
    url: "https://claude.ai/public/artifacts/def0d28e-ee54-4169-92af-66fe935b6c06",
    category: "ZIM",
    icon: Calculator,
  },
  {
    title: "ZIM-Antrags-Checkliste 2025",
    description:
      "Schritt-für-Schritt-Checkliste für Einzelprojekte und Kooperationsprojekte: alle einzureichenden Unterlagen, Stolperfallen und Formulare auf einen Blick.",
    url: "https://claude.ai/public/artifacts/e95873df-343c-459e-a1a2-41af3fb0970f",
    category: "ZIM",
    icon: CheckCircle2,
  },
  {
    title: "ZIM-Fördercheck 2025",
    description:
      "Interaktiver Eligibility-Check: Prüfen Sie in wenigen Fragen, ob Ihr Projekt grundsätzlich ZIM-förderfähig ist, bevor Sie Zeit in die Antragsstellung investieren.",
    url: "https://claude.ai/public/artifacts/fd1f3225-6900-4255-8e46-6f24219bf5e6",
    category: "ZIM",
    icon: FileSearch,
  },
  // Forschungszulage (Nachbarprogramm — relevant für ZIM-Interessenten)
  {
    title: "Forschungszulage-Rechner 2026",
    description:
      "Aktueller FZulG-Rechner für 2026 mit KMU-Bonus (+10 %) und neuer Maximal-Zulage von 4,2 Mio. €. Für Unternehmen, die zusätzlich oder alternativ zur ZIM-Förderung FuE steuerlich fördern lassen.",
    url: "https://claude.ai/public/artifacts/f6d45a48-bbc4-4c6e-879b-2cbca6642738",
    category: "FZulG",
    icon: Calculator,
  },
  {
    title: "FZulG vs. ZIM — Vergleichs-Rechner 2026",
    description:
      "Entscheidungshilfe: Welches Förderprogramm passt zu Ihrem Projekt? Direkter Gegenüberstellungs-Rechner mit Konditionen, Deadlines und Kombinierbarkeit.",
    url: "https://claude.ai/public/artifacts/bb78ed04-d353-4747-98d7-5a67b9650388",
    category: "Vergleich",
    icon: Target,
  },
  {
    title: "Forschungszulage-BranchenCheck 2026",
    description:
      "Branchen-spezifischer Fördercheck: Softwareentwicklung, Maschinenbau, Medizintechnik, Automotive — was zählt in Ihrer Branche als FuE?",
    url: "https://claude.ai/public/artifacts/8c64406e-6e71-446b-8a7f-9e57ed94c66e",
    category: "FZulG",
    icon: Building2,
  },
  {
    title: "BSFZ-Antragsprozess-Checkliste 2026",
    description:
      "Detaillierte Checkliste für die Antragstellung bei der Bescheinigungsstelle Forschungszulage (BSFZ): Projekt-Beschreibung, Frascati-Kriterien, Dokumentation.",
    url: "https://claude.ai/public/artifacts/a40bd773-c698-42b6-a7fc-75b96a188bbb",
    category: "FZulG",
    icon: CheckCircle2,
  },
  {
    title: "Forschungszulage-FAQ 2026",
    description:
      "Über 30 Fragen und Antworten zur Forschungszulage — vom Grundprinzip über Sonderfälle bis zu rückwirkenden Anträgen.",
    url: "https://claude.ai/public/artifacts/f975b40c-444f-4534-aee3-df6090a98341",
    category: "FZulG",
    icon: BookOpen,
  },
  {
    title: "Forschungszulage-Leitfaden für Steuerberater 2026",
    description:
      "Kompakter Guide für Steuerberater: Welche Mandanten-Situationen eignen sich für die Forschungszulage? Prozess, Haftung, Kooperationsmodelle.",
    url: "https://claude.ai/public/artifacts/57e98ab4-1304-490a-bf13-4e42e1f42221",
    category: "FZulG",
    icon: BookOpen,
  },
  // Erfahrungsbericht
  {
    title: "Förder-Kompass Erfahrungen",
    description:
      "Transparente Darstellung: Was Mandanten über die Zusammenarbeit mit Förder-Kompass berichten, welche Projekte wir betreut haben und warum.",
    url: "https://claude.ai/public/artifacts/35ad3bb8-c4ad-417f-bfed-fbcc39b98cae",
    category: "Erfahrung",
    icon: BookOpen,
  },
];

const categoryLabel: Record<ResourceItem["category"], string> = {
  ZIM: "ZIM-Förderung",
  FZulG: "Forschungszulage",
  Vergleich: "Programm-Vergleich",
  Erfahrung: "Erfahrungsbericht",
};

const categoryColors: Record<ResourceItem["category"], string> = {
  ZIM: "bg-emerald-100 text-emerald-900 border-emerald-300",
  FZulG: "bg-sky-100 text-sky-900 border-sky-300",
  Vergleich: "bg-amber-100 text-amber-900 border-amber-300",
  Erfahrung: "bg-slate-100 text-slate-800 border-slate-300",
};

// CollectionPage + ItemList Schema für Google + LLMs
const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${pageUrl}#page`,
  url: pageUrl,
  name: "Tools & Ressourcen zur ZIM- und Forschungszulage-Förderung",
  description:
    "Kostenlose interaktive Tools von Förder-Kompass: ZIM-Rechner, FZulG-Rechner, Vergleiche, Checklisten und Leitfäden.",
  isPartOf: {
    "@type": "WebSite",
    url: siteUrl,
    name: "ZIM Förderung beantragen – Förder-Kompass",
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: resources.length,
    itemListElement: resources.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: r.url,
      name: r.title,
      description: r.description,
    })),
  },
};

export default function ToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 pt-24">
        <section className="mx-auto max-w-5xl px-6 py-12 md:py-16">
          <header className="mb-10 text-center md:text-left">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Interaktive Tools & Ressourcen
            </p>
            <h1 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">
              Rechner, Checklisten & Leitfäden zur Förderung
            </h1>
            <p className="max-w-3xl text-lg text-slate-600">
              Alle Tools auf dieser Seite sind{" "}
              <strong>kostenlos, ohne Anmeldung</strong> und laufen direkt im
              Browser. Sie helfen Ihnen, Ihr Förderpotenzial bei{" "}
              <Link
                href="/"
                className="underline decoration-emerald-600 underline-offset-4"
              >
                ZIM
              </Link>{" "}
              und der{" "}
              <a
                href="https://forschungszulagenantrag.de/"
                className="underline decoration-sky-600 underline-offset-4"
              >
                Forschungszulage
              </a>{" "}
              in Minuten einzuschätzen, bevor Sie in eine Beratung einsteigen.
            </p>
          </header>

          <div className="grid gap-5 md:grid-cols-2">
            {resources.map((r) => {
              const Icon = r.icon;
              return (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noopener"
                  className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-emerald-400 hover:shadow-md"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-medium ${categoryColors[r.category]}`}
                    >
                      {categoryLabel[r.category]}
                    </span>
                  </div>
                  <h2 className="mb-2 text-lg font-semibold text-slate-900 group-hover:text-emerald-900">
                    {r.title}
                  </h2>
                  <p className="flex-1 text-sm leading-relaxed text-slate-600">
                    {r.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-emerald-700 group-hover:text-emerald-800">
                    Tool öffnen
                    <ExternalLink className="h-3.5 w-3.5" />
                  </div>
                </a>
              );
            })}
          </div>

          <aside className="mt-12 rounded-xl border border-emerald-200 bg-emerald-50/60 p-6 md:p-8">
            <h2 className="mb-2 text-xl font-semibold text-emerald-900">
              Sie wollen nicht selbst rechnen?
            </h2>
            <p className="mb-4 text-slate-700">
              In einer kostenlosen <strong>15-Minuten-Erstberatung</strong>{" "}
              klären wir gemeinsam, welche Förderung für Ihr Projekt am besten
              passt — ZIM, Forschungszulage oder die Kombination aus beiden.
            </p>
            <Link
              href="/#kontakt"
              className="inline-flex items-center rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
            >
              Termin vereinbaren
            </Link>
          </aside>
        </section>
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
