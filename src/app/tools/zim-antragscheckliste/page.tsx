import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { ExternalLink, CheckCircle2, AlertTriangle, FileText, Users } from "lucide-react";

const siteUrl = "https://xn--zim-frderung-beantragen-clc.de";
const pageUrl = `${siteUrl}/tools/zim-antragscheckliste/`;
const artifactUrl =
  "https://claude.ai/public/artifacts/e95873df-343c-459e-a1a2-41af3fb0970f";

export const metadata: Metadata = {
  title: "ZIM-Antragscheckliste 2025: Alle Unterlagen für Ihren ZIM-Antrag",
  description:
    "Komplette ZIM-Antragscheckliste 2025: Alle Unterlagen für Einzelprojekt und Kooperationsprojekt, Formulare, Stolperfallen, Einreichung. Interaktive Checkliste.",
  alternates: { canonical: pageUrl },
  keywords: [
    "ZIM Antrag Checkliste",
    "ZIM Antragsunterlagen",
    "ZIM Einzelprojekt Antrag",
    "ZIM Kooperationsprojekt Antrag",
    "ZIM Projektskizze Vorlage",
    "ZIM Antragstellung",
    "AiF Projektträger ZIM",
    "ZIM Richtlinie V5",
  ],
  openGraph: {
    title: "ZIM-Antragscheckliste 2025 – Alle Unterlagen im Überblick",
    description:
      "Vollständige Checkliste für Ihren ZIM-Antrag: Einzelprojekt, Kooperationsprojekt, Formulare, Stolperfallen.",
    url: pageUrl,
    type: "article",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Welche Unterlagen brauche ich für einen ZIM-Antrag?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Für einen ZIM-Antrag benötigen Sie: Antragsformular beim zuständigen Projektträger, Projektbeschreibung mit Arbeitsplan, Finanzierungsplan, Nachweis des KMU-Status, Kooperationsvertrag (bei Kooperationsprojekten), aktueller Handelsregisterauszug, Jahresabschluss der letzten 2 Jahre, und ggfs. Lebensläufe der Projektleiter.",
      },
    },
    {
      "@type": "Question",
      name: "Wer ist der richtige Projektträger für meinen ZIM-Antrag?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Das BMWK hat drei Projektträger für ZIM beauftragt: AiF Projekt GmbH (Branchen: allgemeiner Mittelstand), VDI/VDE-IT (Branchen: IKT, Elektrotechnik, Produktion), und EuroNorm (Kooperationsprojekte mit Forschungseinrichtungen). Die Zuordnung richtet sich nach Branche und Projekttyp.",
      },
    },
    {
      "@type": "Question",
      name: "Wann muss ich den ZIM-Antrag einreichen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Der ZIM-Antrag muss vor Projektstart eingereicht werden. Projektstart bedeutet: erste Bestellung, Auftragsvergabe oder Arbeitsaufnahme. Nach Antragseingang liegt eine Bewilligungsentscheidung typisch nach 3-4 Monaten vor. Frühester Projektbeginn danach mit der Bewilligung.",
      },
    },
    {
      "@type": "Question",
      name: "Was sind die häufigsten Fehler bei ZIM-Anträgen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die häufigsten Fehler sind: unklare Abgrenzung zum Stand der Technik, zu vage Arbeitspakete ohne messbare Meilensteine, fehlende Darstellung des technologischen Risikos, unvollständige Kostenkalkulation, Projekt wurde bereits begonnen, fehlender Nachweis der Finanzierbarkeit des Restanteils.",
      },
    },
  ],
};

export default function ZimAntragschecklisteSeite() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 pt-24">
        <section className="mx-auto max-w-4xl px-6 py-12 md:py-16">
          <header className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Interaktive Checkliste
            </p>
            <h1 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">
              ZIM-Antragscheckliste 2025: Alle Unterlagen im Überblick
            </h1>
            <p className="text-lg text-slate-600">
              Die vollständige Liste aller Dokumente, die für einen
              ZIM-Antrag nach aktueller Richtlinie V5 benötigt werden — sowohl
              für <strong>Einzelprojekte</strong> als auch für{" "}
              <strong>Kooperationsprojekte mit Hochschulen</strong>.
            </p>
          </header>

          <div className="mb-10">
            <a
              href={artifactUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-emerald-800"
            >
              Zur interaktiven Checkliste
              <ExternalLink className="h-4 w-4" />
            </a>
            <p className="mt-2 text-sm text-slate-500">
              Öffnet in neuem Tab · ohne Anmeldung · direkt im Browser
            </p>
          </div>

          <h2 className="mb-4 mt-8 text-2xl font-bold text-slate-900">
            Kernunterlagen für jeden ZIM-Antrag
          </h2>

          <div className="mb-8 grid gap-4 md:grid-cols-2">
            {[
              {
                icon: FileText,
                title: "Projektbeschreibung & Arbeitsplan",
                text: "Ausgangssituation, Stand der Technik, Zielsetzung, Arbeitspakete mit Meilensteinen, erwartete Ergebnisse, Verwertungskonzept",
              },
              {
                icon: CheckCircle2,
                title: "Finanzierungsplan",
                text: "Personalkosten, Sachkosten, Fremdleistungen, Gemeinkostenpauschalen, Darstellung Eigenanteil + Förderquote",
              },
              {
                icon: Users,
                title: "KMU-Status & Unternehmens­daten",
                text: "KMU-Erklärung, Handelsregisterauszug, Jahresabschluss (2 Jahre), Unternehmensprofil, Mitarbeiter-CVs für Projektleiter",
              },
              {
                icon: Users,
                title: "Kooperationsvertrag (bei Kooperationsprojekten)",
                text: "Vertragliche Regelung der Zusammenarbeit mit Hochschule/Forschungseinrichtung: Arbeitsaufteilung, Rechte, Verwertung",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-semibold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-600">{text}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-4 mt-10 text-2xl font-bold text-slate-900">
            Welcher Projektträger ist zuständig?
          </h2>
          <div className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 p-3 text-left font-semibold">
                    Projektträger
                  </th>
                  <th className="border border-slate-200 p-3 text-left font-semibold">
                    Zuständig für
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-200 p-3">
                    AiF Projekt GmbH
                  </td>
                  <td className="border border-slate-200 p-3">
                    Allgemeiner Mittelstand (Chemie, Maschinenbau, Lebensmittel,
                    etc.)
                  </td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 p-3">VDI/VDE-IT</td>
                  <td className="border border-slate-200 p-3">
                    IKT, Elektrotechnik, Optische Technologien, Produktion
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 p-3">EuroNorm GmbH</td>
                  <td className="border border-slate-200 p-3">
                    Kooperationsprojekte mit Forschungseinrichtungen,
                    ZIM-Innovations­netzwerke
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="mb-4 mt-10 text-2xl font-bold text-slate-900">
            Die 7 häufigsten Stolperfallen
          </h2>
          <ol className="mb-8 list-decimal space-y-2 pl-5 text-slate-700">
            <li>
              <strong>Projekt wurde bereits begonnen</strong> — auch
              Vor-Recherche oder erste Bestellungen zählen als Projektbeginn
            </li>
            <li>
              <strong>Unklare Abgrenzung zum Stand der Technik</strong> — kein
              nachweisbares technologisches Risiko
            </li>
            <li>
              <strong>Zu vage Arbeitspakete</strong> — Meilensteine und
              Messbarkeit fehlen
            </li>
            <li>
              <strong>Unrealistische Kostenkalkulation</strong> — Personalkosten
              stimmen nicht mit Gehaltsabrechnungen überein
            </li>
            <li>
              <strong>Fehlende Finanzierung des Restanteils</strong> —
              Eigenmittel oder gesicherte Finanzierung nicht belegt
            </li>
            <li>
              <strong>KMU-Status nicht korrekt nachgewiesen</strong> —
              Verflechtungen mit Muttergesellschaften übersehen
            </li>
            <li>
              <strong>Kooperationsvertrag zu spät</strong> — muss zum
              Antragszeitpunkt vorliegen, nicht erst bei Bewilligung
            </li>
          </ol>

          <aside className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-6">
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-700" />
              <h3 className="text-lg font-semibold text-amber-900">
                Wichtiger Hinweis zur Bewilligungsquote
              </h3>
            </div>
            <p className="text-slate-700">
              Die Bewilligungsquote bei ZIM liegt durchschnittlich bei{" "}
              <strong>60–70 %</strong>. Mit sauberer Antrags­vorbereitung und
              professioneller Begleitung steigt sie auf &gt;85 %. Der häufigste
              Ablehnungsgrund ist <em>nicht</em> fehlende Innovation, sondern
              eine mangelhaft dokumentierte Abgrenzung zum Stand der Technik.
            </p>
          </aside>

          <div className="mt-10 rounded-xl border border-emerald-200 bg-emerald-50/60 p-6 md:p-8">
            <h3 className="mb-2 text-xl font-semibold text-emerald-900">
              Antrag gemeinsam vorbereiten?
            </h3>
            <p className="mb-4 text-slate-700">
              In einer kostenlosen <strong>15-Minuten-Erstberatung</strong>{" "}
              prüfen wir Ihre Konstellation, klären den zuständigen
              Projektträger und zeigen die kritischen Punkte für Ihren
              konkreten Antrag auf.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#kontakt"
                className="inline-flex items-center rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
              >
                Termin vereinbaren
              </Link>
              <Link
                href="/tools/"
                className="inline-flex items-center rounded-lg border border-emerald-700 px-5 py-2.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-100"
              >
                Weitere ZIM-Tools →
              </Link>
            </div>
          </div>
        </section>
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
