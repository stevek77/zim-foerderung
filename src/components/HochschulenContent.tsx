"use client";

import { useState } from "react";
import { trackCalendlyClick, trackFormSubmission } from "@/lib/analytics";
import {
  GraduationCap,
  Handshake,
  Search,
  FileCheck,
  Users,
  ClipboardList,
  BookOpen,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Send,
  Phone,
  ChevronDown,
  Building2,
  FlaskConical,
  Globe,
  Shield,
  TrendingUp,
  Calendar,
} from "lucide-react";

/* ──────────────────────────── FAQ Accordion ──────────────────────────── */

const hochschulFaq = [
  {
    question:
      "Für welche Förderprogramme bietet Förder-Kompass Beratung an?",
    answer:
      "Wir sind mit unseren Fachberatern langjährig erfahren im deutschen Fördermittelbereich. Im Bereich der Innovationsförderberatung sind wir spezialisiert auf ZIM und die steuerliche Forschungszulage (FZulG). Bei Bedarf unterstützen wir Hochschulen auch bei fachbezogenen Förderlinien von Bund, Land und EU.",
  },
  {
    question:
      "Muss die Hochschule bei der Antragstellung etwas bezahlen?",
    answer:
      "Nein, für die Hochschule entstehen keine Kosten. Die Vergütung erfolgt ausschließlich durch die am Projekt beteiligten Unternehmen (KMU) — rein erfolgsbasiert*.",
  },
  {
    question:
      "Unterstützt Förder-Kompass auch bei Verwendungsnachweisen oder Berichtspflichten?",
    answer:
      "Ja, insbesondere für die administrative und organisatorische Abwicklung sind wir Partner für die beteiligten Unternehmen. Wir fungieren als Brücke zu den Drittmittelstellen der Hochschulen und unterstützen z.\u202fB. bei Zwischen- und Abschlussberichten, Projekt-Kooperationsverträgen und der Verwertung von Erfindungen. Aus unserer Erfahrung ist dieses Bindeglied für die erfolgreiche Projektabwicklung sehr wichtig.",
  },
  {
    question: "Wie entsteht ein ZIM-Antrag?",
    answer:
      "Wir beginnen in der Regel mit einer ZIM-Projektskizze, die wir mit dem Projektträger besprechen, um eine abgestimmte Roadmap für die Antragstellung zu erreichen. Förder-Kompass koordiniert dann die Antragstellung mit allen Vorhabenbeschreibungen und Anlagen. Die Hochschulen liefern den fachlichen Input zu ihren Anteilen — alle Beiträge werden nach den Förderkriterien zusammengestellt und professionell verfasst.",
  },
  {
    question:
      "Kann Förder-Kompass Unternehmenspartner für ein Projekt suchen?",
    answer:
      "Ja! Wenn für eine Projektidee noch kein Unternehmen zur Verfügung steht, unterstützen wir bei der Suche. Nach Identifikation des Forschungsbereichs, der Branchenfoki und weiterer Suchparameter nutzen wir unsere Unternehmensdatenbank sowie KI-gestützte Agenten, um passende Partnerunternehmen zu finden und Kooperationsanfragen vorzubereiten. Dieser Service ist für die Hochschule kostenlos. Bei Bedarf organisieren wir ein Kickoff-Meeting mit vorselektierten Zielunternehmen.",
  },
  {
    question:
      "Für welche Themenbereiche kann Förder-Kompass unterstützen?",
    answer:
      "Wir sind nicht auf bestimmte Themenbereiche festgelegt. Der Schwerpunkt unserer bisherigen Mandate liegt im produzierenden Gewerbe mit Innovationsprojekten aus den Bereichen Digitalisierung und Produktion — grundsätzlich sind wir aber offen für alle Forschungsfelder.",
  },
];

/* ──────────────────────── Branchenoptionen ──────────────────────── */

const branchenOptionen = [
  "Maschinenbau / Anlagenbau",
  "Automobilindustrie / Zulieferer",
  "Elektrotechnik / Elektronik",
  "Informationstechnologie / Software",
  "Chemie / Pharma / Biotechnologie",
  "Medizintechnik / Gesundheitswirtschaft",
  "Energie / Umwelttechnik / Cleantech",
  "Bauwesen / Materialwissenschaften",
  "Lebensmitteltechnologie / Agrarwirtschaft",
  "Luft- und Raumfahrt",
  "Textil- und Werkstofftechnik",
  "Logistik / Mobilität",
];

/* ══════════════════════════════════════════════════════════════════ */

export default function HochschulenContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [selectedBranchen, setSelectedBranchen] = useState<string[]>([]);

  const toggleBranche = (b: string) => {
    setSelectedBranchen((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Append selected branches as combined field for scraper
    data.set("Branchen", selectedBranchen.join(", "));

    // Build scraper-friendly summary
    const summary = [
      `Forschungsbereich: ${data.get("forschungsbereich")}`,
      `Gesuchte Branchen: ${selectedBranchen.join(", ") || "Nicht angegeben"}`,
      `Unternehmensgröße: ${data.get("unternehmensgroesse")}`,
      `Region: ${data.get("region")}`,
      `Gewünschte Kompetenzen: ${data.get("kompetenzen")}`,
      `Arbeitstitel: ${data.get("arbeitstitel")}`,
      `Motivation: ${data.get("motivation")}`,
      `Stand der Vorarbeiten: ${data.get("vorarbeiten")}`,
      `Zeithorizont: ${data.get("zeithorizont")}`,
    ]
      .filter(Boolean)
      .join("\n");
    data.set("_scraper_zusammenfassung", summary);

    try {
      const res = await fetch("https://formspree.io/f/xykdlyjw", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        trackFormSubmission("hochschulen-projektskizze");
        setFormStatus("success");
        form.reset();
        setSelectedBranchen([]);
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <>
      {/* ─────────── SECTION: Vorteile ─────────── */}
      <section className="py-16 lg:py-20 section-warm">
        <div className="container-main">
          <div className="text-center mb-14">
            <p className="text-primary-DEFAULT font-semibold text-sm tracking-wide uppercase mb-3">
              Warum Förder-Kompass?
            </p>
            <h2 className="text-[1.85rem] md:text-[2.1rem] text-heading mb-4">
              Kostenfreie Unterstützung für Ihre Forschungsprojekte
            </h2>
            <p className="text-body-light text-[17px] max-w-2xl mx-auto leading-relaxed">
              Förder-Kompass verbindet Ihre Forschungsideen mit passenden
              Unternehmenspartnern — von der Projektskizze bis zur bewilligten
              ZIM-Förderung. Für Hochschulen vollständig kostenfrei.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: GraduationCap,
                title: "Kostenfrei für Hochschulen",
                text: "Für Ihre Hochschule entstehen keine Rechnungen und keine Vertragskosten. Vertragspartner für das Beratungshonorar ist ausschließlich das beteiligte Unternehmen — rein erfolgsbasiert*.",
              },
              {
                icon: Search,
                title: "KI-gestützte Partnersuche",
                text: "Wir nutzen unsere Unternehmensdatenbank und KI-Agenten, um gezielt passende Industriepartner für Ihre Projektidee zu identifizieren.",
              },
              {
                icon: Handshake,
                title: "Komplette Projektbegleitung",
                text: "Von der Skizze über die Antragstellung bis zur Projektabwicklung — ein Ansprechpartner für den gesamten Förderprozess.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="bg-white rounded-xl border border-border-DEFAULT p-7 hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-lg bg-primary-DEFAULT/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary-DEFAULT" />
                </div>
                <h3 className="text-heading font-semibold text-lg mb-2">
                  {title}
                </h3>
                <p className="text-body-light text-[15px] leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── SECTION: Ablauf ─────────── */}
      <section className="py-16 lg:py-20">
        <div className="container-main">
          <div className="text-center mb-14">
            <p className="text-primary-DEFAULT font-semibold text-sm tracking-wide uppercase mb-3">
              So funktioniert es
            </p>
            <h2 className="text-[1.85rem] md:text-[2.1rem] text-heading">
              In 5 Schritten zum ZIM-Kooperationsprojekt
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-0">
            {[
              {
                icon: ClipboardList,
                step: "01",
                title: "Projektidee mitteilen",
                text: "Teilen Sie uns Ihr Forschungsprofil und Ihre Projektidee über unser Formular mit — inkl. gewünschtem Branchenfokus für die Partnersuche.",
              },
              {
                icon: FileCheck,
                step: "02",
                title: "Förderfähigkeit prüfen",
                text: "Wir prüfen die Förderfähigkeit Ihrer Idee und erstellen gemeinsam eine erste Projektskizze. Auf Wunsch binden wir Ihre Drittmittelstelle bereits in dieser Phase ein.",
              },
              {
                icon: Search,
                step: "03",
                title: "Unternehmenspartner finden",
                text: "Mit unserer Unternehmensdatenbank und KI-gestützten Suchagenten identifizieren wir gezielt passende KMU als Projektpartner.",
              },
              {
                icon: Users,
                step: "04",
                title: "Kickoff-Meeting organisieren",
                text: "Wir organisieren ein erstes Treffen zwischen Ihnen und den vorselektierten Unternehmen, um die Projektidee gemeinsam zu schärfen.",
              },
              {
                icon: BookOpen,
                step: "05",
                title: "Gemeinsame Antragstellung",
                text: "Förder-Kompass koordiniert die vollständige Antragstellung — Vorhabenbeschreibungen, Anlagen, Upload. Sie liefern den fachlichen Input.",
              },
            ].map(({ icon: Icon, step, title, text }, idx, arr) => (
              <div key={step} className="flex gap-6">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary-DEFAULT flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="w-px flex-1 bg-primary-DEFAULT/20 my-2" />
                  )}
                </div>
                {/* Content */}
                <div className="pb-10">
                  <div className="text-xs text-primary-DEFAULT font-semibold mb-1">
                    Schritt {step}
                  </div>
                  <h3 className="text-heading font-semibold text-lg mb-1.5">
                    {title}
                  </h3>
                  <p className="text-body-light text-[15px] leading-relaxed">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── SECTION: Praxisbeispiele ─────────── */}
      <section className="py-16 lg:py-20 section-warm">
        <div className="container-main">
          <div className="text-center mb-14">
            <p className="text-primary-DEFAULT font-semibold text-sm tracking-wide uppercase mb-3">
              Aus der Praxis
            </p>
            <h2 className="text-[1.85rem] md:text-[2.1rem] text-heading mb-4">
              So sieht ein typischer Projektablauf aus
            </h2>
            <p className="text-body-light text-[17px] max-w-2xl mx-auto leading-relaxed">
              Anonymisierte Beispiele aus unserer bisherigen Zusammenarbeit mit
              Hochschulen und KMU in Baden-Württemberg.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                branche: "Maschinenbau / Digitalisierung",
                hochschule: "HAW in Süddeutschland",
                foerdervolumen: "ca. 380.000 €",
                zeitraum: "6 Wochen bis Skizze, 4 Monate bis Bewilligung",
                beschreibung:
                  "Forschungsinstitut hatte Projektidee im Bereich intelligente Produktionssysteme — KMU-Partner fehlte. Förder-Kompass identifizierte innerhalb von 3 Wochen zwei passende Unternehmen aus dem Maschinenbau.",
              },
              {
                branche: "Medizintechnik / Sensorik",
                hochschule: "Fachhochschule in BW",
                foerdervolumen: "ca. 290.000 €",
                zeitraum: "4 Wochen bis Skizze, 3 Monate bis Bewilligung",
                beschreibung:
                  "Professorin mit Forschungsschwerpunkt Sensorik suchte Unternehmenspartner für ein ZIM-Kooperationsprojekt. Kick-off mit vorselektiertem KMU nach 2 Wochen. Drittmittelstelle wurde ab Tag 1 eingebunden.",
              },
              {
                branche: "Software / KI",
                hochschule: "DHBW-Standort in BW",
                foerdervolumen: "ca. 250.000 €",
                zeitraum: "8 Wochen bis Skizze, 5 Monate bis Bewilligung",
                beschreibung:
                  "Forschungsgruppe mit KI-Expertise suchte Anwendungspartner aus der Industrie. Partnersuche über KI-gestützte Agenten, Kooperationsvertrag und IP-Regelung gemeinsam mit Transferstelle erarbeitet.",
              },
            ].map((beispiel) => (
              <div
                key={beispiel.branche}
                className="bg-white rounded-xl border border-border-DEFAULT p-6 hover:shadow-md transition-shadow"
              >
                <TrendingUp className="w-6 h-6 text-primary-DEFAULT mb-3" />
                <div className="text-xs text-primary-DEFAULT font-semibold uppercase tracking-wide mb-2">
                  {beispiel.branche}
                </div>
                <p className="text-body-light text-[14px] leading-relaxed mb-4">
                  {beispiel.beschreibung}
                </p>
                <div className="space-y-1.5 text-[13px] border-t border-border-DEFAULT pt-3">
                  <div className="flex justify-between">
                    <span className="text-body-light">Hochschultyp:</span>
                    <span className="text-heading font-medium">
                      {beispiel.hochschule}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-body-light">Gesamtfördervolumen:</span>
                    <span className="text-heading font-medium">
                      {beispiel.foerdervolumen}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-body-light">Zeitraum:</span>
                    <span className="text-heading font-medium text-right max-w-[55%]">
                      {beispiel.zeitraum}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-body-light text-[13px] text-center mt-5 max-w-3xl mx-auto">
            * Gesamtfördervolumen = Summe aller Projektpartner (Hochschule + KMU).
            Der Förderanteil pro Forschungseinrichtung ist auf max. 280.000&nbsp;€
            (bei max. 36 Monaten Laufzeit, inkl. Projektpauschale) begrenzt.
          </p>
        </div>
      </section>

      {/* ─────────── SECTION: Leistungen ─────────── */}
      <section className="py-16 lg:py-20">
        <div className="container-main">
          <div className="text-center mb-14">
            <p className="text-primary-DEFAULT font-semibold text-sm tracking-wide uppercase mb-3">
              Unsere Leistungen
            </p>
            <h2 className="text-[1.85rem] md:text-[2.1rem] text-heading">
              Umfassende Unterstützung für Forschungskooperationen
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Lightbulb,
                title: "Förderprogramm-Beratung",
                text: "ZIM, FZulG, EU-Rahmenprogramme, Landes- und Bundesprogramme — wir finden das passende Förderprogramm.",
              },
              {
                icon: Search,
                title: "KI-gestützte Partnersuche",
                text: "Identifikation passender KMU aus unserer Datenbank und per KI-Agenten — inkl. Kooperationsanfragen und Vorselektion. Projektideen behandeln wir streng vertraulich; Details geben wir erst nach Abstimmung mit Ihnen weiter.",
              },
              {
                icon: FileCheck,
                title: "Professionelle Antragstellung",
                text: "Koordination aller Vorhabenbeschreibungen, Anlagen und des vollständigen Uploads beim Projektträger.",
              },
              {
                icon: Handshake,
                title: "Brücke zu Drittmittelstellen",
                text: "Wir stimmen uns auf Wunsch frühzeitig mit Ihrer Drittmittel- und Transferstelle ab — für reibungslose interne Prüfpfade, Unterschriften und Kooperationsverträge.",
              },
              {
                icon: BookOpen,
                title: "Projektabwicklung",
                text: "Unterstützung bei Zwischen- und Abschlussberichten, Kooperationsverträgen und Verwertungsfragen.",
              },
              {
                icon: Globe,
                title: "Internationale Projekte",
                text: "Auch für ZIM International (IraSME) und grenzüberschreitende Kooperationen stehen wir zur Verfügung.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="bg-white rounded-xl border border-border-DEFAULT p-6 hover:shadow-md transition-shadow"
              >
                <Icon className="w-6 h-6 text-primary-DEFAULT mb-3" />
                <h3 className="text-heading font-semibold mb-2">{title}</h3>
                <p className="text-body-light text-[15px] leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── SECTION: Formular ─────────── */}
      <section id="projektskizze" className="py-16 lg:py-20">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-primary-DEFAULT font-semibold text-sm tracking-wide uppercase mb-3">
                Projektidee einreichen
              </p>
              <h2 className="text-[1.85rem] md:text-[2.1rem] text-heading mb-4">
                Projektskizze & Partnersuche
              </h2>
              <p className="text-body-light text-[17px] leading-relaxed">
                Beschreiben Sie Ihre Forschungsidee und den gewünschten
                Unternehmenspartner. Wir prüfen die Förderfähigkeit und
                starten die Partnersuche — kostenfrei und unverbindlich.
              </p>
            </div>

            {formStatus === "success" ? (
              <div className="bg-primary-DEFAULT/10 border border-primary-DEFAULT/30 rounded-xl p-8 text-center">
                <CheckCircle className="w-12 h-12 text-primary-DEFAULT mx-auto mb-4" />
                <h3 className="text-heading font-semibold text-xl mb-2">
                  Vielen Dank für Ihre Projektskizze!
                </h3>
                <p className="text-body-light text-[15px]">
                  Wir prüfen Ihre Angaben und melden uns innerhalb von 2
                  Werktagen bei Ihnen. Bei Rückfragen erreichen Sie uns unter{" "}
                  <a
                    href="tel:+4977718988861"
                    className="text-primary-DEFAULT hover:underline"
                  >
                    +49 7771 8988 861
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl border border-border-DEFAULT p-8 space-y-8"
              >
                {/* ── Kontaktdaten ── */}
                <div>
                  <h3 className="text-heading font-semibold text-lg mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary-DEFAULT" />
                    Kontaktdaten
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-heading mb-1.5">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Prof. Dr. / Dr. / Name"
                        className="w-full border border-border-DEFAULT rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 focus:border-primary-DEFAULT"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-heading mb-1.5">
                        Hochschule / Forschungseinrichtung *
                      </label>
                      <input
                        type="text"
                        name="hochschule"
                        required
                        placeholder="z.\u202fB. TU München"
                        className="w-full border border-border-DEFAULT rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 focus:border-primary-DEFAULT"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-heading mb-1.5">
                        Fachbereich / Institut
                      </label>
                      <input
                        type="text"
                        name="fachbereich"
                        placeholder="z.\u202fB. Fakultät für Maschinenwesen"
                        className="w-full border border-border-DEFAULT rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 focus:border-primary-DEFAULT"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-heading mb-1.5">
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="vorname.nachname@hochschule.de"
                        className="w-full border border-border-DEFAULT rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 focus:border-primary-DEFAULT"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-heading mb-1.5">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        name="telefon"
                        placeholder="+49 ..."
                        className="w-full border border-border-DEFAULT rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 focus:border-primary-DEFAULT"
                      />
                    </div>
                  </div>
                </div>

                {/* ── Projektskizze ── */}
                <div>
                  <h3 className="text-heading font-semibold text-lg mb-4 flex items-center gap-2">
                    <FlaskConical className="w-5 h-5 text-primary-DEFAULT" />
                    Projektskizze
                  </h3>
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-heading mb-1.5">
                          Projekt-Akronym{" "}
                          <span className="text-body-light font-normal">
                            (optional)
                          </span>
                        </label>
                        <input
                          type="text"
                          name="akronym"
                          placeholder="z.\u202fB. DigiProd"
                          className="w-full border border-border-DEFAULT rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 focus:border-primary-DEFAULT"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-heading mb-1.5">
                          Arbeitstitel *
                        </label>
                        <input
                          type="text"
                          name="arbeitstitel"
                          required
                          placeholder="Kurzer Titel Ihres Forschungsvorhabens"
                          className="w-full border border-border-DEFAULT rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 focus:border-primary-DEFAULT"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-heading mb-1.5">
                        Forschungsbereich / Fachgebiet *
                      </label>
                      <input
                        type="text"
                        name="forschungsbereich"
                        required
                        placeholder="z.\u202fB. Additive Fertigung, Künstliche Intelligenz, Sensorik"
                        className="w-full border border-border-DEFAULT rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 focus:border-primary-DEFAULT"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-heading mb-1.5">
                        Motivation: Welches Problem wird gelöst? *
                      </label>
                      <textarea
                        name="motivation"
                        required
                        rows={3}
                        placeholder="Beschreiben Sie das Problem oder die Herausforderung, die Ihr Forschungsvorhaben adressiert."
                        className="w-full border border-border-DEFAULT rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 focus:border-primary-DEFAULT resize-y"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-heading mb-1.5">
                        Lösungsansatz: Wie wird das Problem gelöst?
                      </label>
                      <textarea
                        name="loesungsansatz"
                        rows={3}
                        placeholder="Beschreiben Sie den geplanten Forschungsansatz bzw. die angestrebte Lösung."
                        className="w-full border border-border-DEFAULT rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 focus:border-primary-DEFAULT resize-y"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-heading mb-1.5">
                        Abgrenzung zum Stand der Technik
                      </label>
                      <textarea
                        name="stand_der_technik"
                        rows={2}
                        placeholder="Was unterscheidet Ihren Ansatz von bestehenden Lösungen?"
                        className="w-full border border-border-DEFAULT rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 focus:border-primary-DEFAULT resize-y"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-heading mb-1.5">
                          Stand der Vorarbeiten
                        </label>
                        <select
                          name="vorarbeiten"
                          className="w-full border border-border-DEFAULT rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 focus:border-primary-DEFAULT bg-white"
                        >
                          <option value="idee">Erste Idee / Konzeptphase</option>
                          <option value="vorarbeiten">
                            Vorarbeiten vorhanden (Daten, Paper, Vorversuche)
                          </option>
                          <option value="partner_vorhanden">
                            Bereits Unternehmensgespräche geführt
                          </option>
                          <option value="patent">
                            Patent / Schutzrecht vorhanden
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-heading mb-1.5">
                          Gewünschter Zeithorizont
                        </label>
                        <select
                          name="zeithorizont"
                          className="w-full border border-border-DEFAULT rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 focus:border-primary-DEFAULT bg-white"
                        >
                          <option value="schnell">
                            Schnell (Skizze in 4–8 Wochen)
                          </option>
                          <option value="normal">
                            Normal (Skizze in 2–3 Monaten)
                          </option>
                          <option value="offen">
                            Offen / keine Eile
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Gesuchter Unternehmenspartner ── */}
                <div>
                  <h3 className="text-heading font-semibold text-lg mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary-DEFAULT" />
                    Gesuchter Unternehmenspartner
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-heading mb-2">
                        Branche(n) / Industriezweig *
                      </label>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {branchenOptionen.map((b) => (
                          <label
                            key={b}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border cursor-pointer text-sm transition-colors ${
                              selectedBranchen.includes(b)
                                ? "border-primary-DEFAULT bg-primary-DEFAULT/5 text-heading"
                                : "border-border-DEFAULT text-body-light hover:border-primary-DEFAULT/40"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedBranchen.includes(b)}
                              onChange={() => toggleBranche(b)}
                              className="sr-only"
                            />
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                selectedBranchen.includes(b)
                                  ? "bg-primary-DEFAULT border-primary-DEFAULT"
                                  : "border-border-DEFAULT"
                              }`}
                            >
                              {selectedBranchen.includes(b) && (
                                <CheckCircle className="w-3 h-3 text-white" />
                              )}
                            </div>
                            {b}
                          </label>
                        ))}
                      </div>
                      <input
                        type="text"
                        name="branchen_sonstige"
                        placeholder="Sonstige Branche(n)..."
                        className="mt-2 w-full border border-border-DEFAULT rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 focus:border-primary-DEFAULT"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-heading mb-1.5">
                          Unternehmensgröße
                        </label>
                        <select
                          name="unternehmensgroesse"
                          className="w-full border border-border-DEFAULT rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 focus:border-primary-DEFAULT bg-white"
                        >
                          <option value="offen">Offen / keine Präferenz</option>
                          <option value="kmu_249">
                            KMU (bis 249 Mitarbeiter)
                          </option>
                          <option value="kmu_499">
                            Mittleres Unternehmen (bis 499 Mitarbeiter)
                          </option>
                          <option value="kmu_1000">
                            Größeres Unternehmen (bis 1.000 Mitarbeiter)
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-heading mb-1.5">
                          Region / Standort
                        </label>
                        <select
                          name="region"
                          className="w-full border border-border-DEFAULT rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 focus:border-primary-DEFAULT bg-white"
                        >
                          <option value="egal">
                            Egal / keine Einschränkung
                          </option>
                          <option value="deutschland">Deutschland</option>
                          <option value="dach">DACH (DE, AT, CH)</option>
                          <option value="eu">EU</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-heading mb-1.5">
                        Gewünschte Kompetenzen / Rolle des Unternehmens
                      </label>
                      <textarea
                        name="kompetenzen"
                        rows={2}
                        placeholder="z.\u202fB. Unternehmen soll Prototypen fertigen können, Erfahrung in der Serienfertigung, Zugang zu Endkunden..."
                        className="w-full border border-border-DEFAULT rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 focus:border-primary-DEFAULT resize-y"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-heading mb-1.5">
                        Weitere Anforderungen{" "}
                        <span className="text-body-light font-normal">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        name="weitere_anforderungen"
                        rows={2}
                        placeholder="Gibt es weitere Aspekte, die bei der Partnersuche berücksichtigt werden sollen?"
                        className="w-full border border-border-DEFAULT rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/30 focus:border-primary-DEFAULT resize-y"
                      />
                    </div>
                  </div>
                </div>

                {/* ── Vertraulichkeit & Datenschutz & Submit ── */}
                <div className="border-t border-border-DEFAULT pt-6">
                  <div className="flex items-start gap-3 bg-primary-DEFAULT/5 border border-primary-DEFAULT/15 rounded-lg p-4 mb-6">
                    <Shield className="w-5 h-5 text-primary-DEFAULT shrink-0 mt-0.5" />
                    <p className="text-sm text-body-light leading-relaxed">
                      <strong className="text-heading">Vertraulichkeit:</strong>{" "}
                      Ihre Projektideen behandeln wir streng vertraulich.
                      Details zu Ihrem Forschungsvorhaben geben wir erst nach
                      ausdrücklicher Abstimmung mit Ihnen an potenzielle
                      Unternehmenspartner weiter.
                    </p>
                  </div>

                  <label className="flex items-start gap-3 mb-6 cursor-pointer">
                    <input
                      type="checkbox"
                      name="datenschutz"
                      required
                      className="mt-1 w-4 h-4 rounded border-border-DEFAULT text-primary-DEFAULT focus:ring-primary-DEFAULT/30"
                    />
                    <span className="text-sm text-body-light leading-relaxed">
                      Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
                      <a
                        href="/datenschutz/"
                        className="text-primary-DEFAULT hover:underline"
                        target="_blank"
                      >
                        Datenschutzerklärung
                      </a>{" "}
                      zu. Meine Angaben werden ausschließlich zur
                      Kontaktaufnahme und Partnersuche verwendet.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark shadow-lg shadow-primary-DEFAULT/30 w-full sm:w-auto justify-center"
                  >
                    {formStatus === "sending" ? (
                      <>Wird gesendet...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Projektskizze absenden
                      </>
                    )}
                  </button>

                  {formStatus === "error" && (
                    <p className="text-red-500 text-sm mt-3">
                      Beim Senden ist ein Fehler aufgetreten. Bitte versuchen
                      Sie es erneut oder kontaktieren Sie uns direkt unter{" "}
                      <a href="tel:+4977718988861" className="underline">
                        +49 7771 8988 861
                      </a>
                      .
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─────────── SECTION: FAQ ─────────── */}
      <section className="py-16 lg:py-20 section-warm">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-primary-DEFAULT font-semibold text-sm tracking-wide uppercase mb-3">
                Häufige Fragen
              </p>
              <h2 className="text-[1.85rem] md:text-[2.1rem] text-heading">
                FAQ — Zusammenarbeit mit Hochschulen
              </h2>
            </div>

            <div className="space-y-3">
              {hochschulFaq.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-border-DEFAULT overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenFaq(openFaq === idx ? null : idx)
                    }
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="text-heading font-medium text-[15px] pr-4">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-body-light shrink-0 transition-transform ${
                        openFaq === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-5">
                      <p className="text-body-light text-[15px] leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── SECTION: GEO-Content ─────────── */}
      <section className="py-16 lg:py-20">
        <div className="container-main">
          <article className="max-w-4xl mx-auto prose prose-lg prose-headings:text-heading prose-p:text-body prose-p:text-[15.5px] prose-p:leading-relaxed">
            <h2 className="text-[1.75rem] md:text-[2rem] text-center mb-8">
              ZIM-Kooperationsprojekte: Leitfaden für Hochschulen und
              Forschungseinrichtungen
            </h2>

            <p>
              Das{" "}
              <a
                href="https://www.zim.de/ZIM/Navigation/DE/Programminfos/WasistdasZIM/was-ist-das-zim.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-DEFAULT hover:underline"
              >
                Zentrale Innovationsprogramm Mittelstand (ZIM)
              </a>{" "}
              fördert Kooperationsprojekte zwischen Unternehmen und
              Forschungseinrichtungen mit besonders attraktiven Konditionen.
              Forschungseinrichtungen — darunter staatliche und private
              Hochschulen, Hochschulen für Angewandte Wissenschaften (HAW),
              Duale Hochschulen (DHBW), Fachhochschulen sowie
              außeruniversitäre Forschungseinrichtungen — erhalten bis zu{" "}
              <strong>100&nbsp;% der zuwendungsfähigen Kosten</strong> als
              nicht-rückzahlbaren Zuschuss. Die maximalen zuwendungsfähigen
              Kosten betragen 220.000&nbsp;€ pro Forschungseinrichtung in
              einem Kooperationsprojekt (gemäß{" "}
              <a
                href="https://www.zim.de/ZIM/Navigation/DE/Programminfos/WasistdasZIM/was-ist-das-zim.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-DEFAULT hover:underline"
              >
                ZIM-Richtlinie V5
              </a>, Abschnitt
              5.2).
            </p>

            <h3 className="text-[1.25rem] font-semibold mt-8 mb-3">
              Die Herausforderung: Passende Unternehmenspartner finden
            </h3>
            <p>
              In der Praxis gehen die meisten ZIM-Kooperationsprojekte von
              Hochschulen aus. Forschungsreferate, Transferstellen, Institute
              und Institutes for Applied Research (IAF) entwickeln
              Projektideen, die anwendungsnahe Forschung mit industrieller
              Umsetzung verbinden. Die zentrale Hürde: Für die Antragstellung
              wird mindestens ein Unternehmenspartner (KMU) benötigt. Viele
              Hochschulen — insbesondere HAWs, DHBWs und Fachhochschulen —
              verfügen zwar über Kontakte zur Wirtschaft, diese sind jedoch
              häufig nicht systematisch gepflegt. Die ad-hoc-Suche nach einem
              passenden Unternehmenspartner für eine konkrete
              Forschungsprojektidee gelingt daher oft nicht in der
              erforderlichen Geschwindigkeit.
            </p>

            <h3 className="text-[1.25rem] font-semibold mt-8 mb-3">
              Wie Förder-Kompass Hochschulen unterstützt
            </h3>
            <p>
              Förder-Kompass übernimmt die vollständige Projektanbahnung und
              Antragstellung — für Hochschulen <strong>kostenfrei</strong>. Die
              Vergütung erfolgt ausschließlich durch die beteiligten
              Unternehmen, rein erfolgsbasiert*. Unser Leistungsumfang umfasst:
              KI-gestützte Suche nach passenden Unternehmenspartnern anhand von
              Branchenfokus, Technologieprofil und Projektanforderungen;
              Organisation von Kickoff-Meetings zwischen Forschenden und
              vorselektierten Zielunternehmen; Koordination der vollständigen
              Antragstellung inklusive aller Vorhabenbeschreibungen und Anlagen;
              sowie Begleitung der Projektabwicklung bis zum Abschlussbericht.
            </p>

            <h3 className="text-[1.25rem] font-semibold mt-8 mb-3">
              ZIM-Kooperationen in Baden-Württemberg
            </h3>
            <p>
              Baden-Württemberg bietet mit seiner dichten Hochschullandschaft
              und dem innovationsstarken Mittelstand ideale Voraussetzungen für
              ZIM-Kooperationsprojekte. Förder-Kompass arbeitet mit Hochschulen
              in der gesamten Region zusammen, darunter die HTWG Konstanz, die
              Hochschule Ravensburg-Weingarten (RWU), die DHBW Ravensburg, die
              Hochschule Albstadt-Sigmaringen, die Hochschule Furtwangen (HFU),
              die Hochschule Offenburg, die Universität Konstanz, die
              Universität Freiburg, die Hochschule Reutlingen und die Zeppelin
              Universität Friedrichshafen. Ob Bodensee-Region, Schwarzwald oder
              Schwäbische Alb — wir kennen die regionale Wirtschaftsstruktur
              und finden gezielt Unternehmenspartner für Ihre
              Forschungsprojektideen.
            </p>
          </article>
        </div>
      </section>

      {/* ─────────── SECTION: CTA ─────────── */}
      <section className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/hintergrund-foerder-kompass.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/55 to-black/65" />

        <div className="container-main relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[2rem] md:text-[2.25rem] text-white mb-5">
              Haben Sie eine Projektidee?
            </h2>
            <p className="text-white/80 text-[17px] mb-8 leading-relaxed">
              Wir finden den passenden Unternehmenspartner für Ihr
              Forschungsvorhaben — kostenfrei, professionell und mit
              KI-gestützter Partnersuche.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#projektskizze"
                className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark font-semibold shadow-lg shadow-primary-DEFAULT/30"
              >
                <Send className="w-4 h-4" />
                Projektidee einreichen
              </a>
              <a
                href="https://calendly.com/kovacs-termin"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill bg-white/15 text-white hover:bg-white/25 border border-white/25 backdrop-blur-sm"
                onClick={() => trackCalendlyClick("hochschulen-cta")}
              >
                <Phone className="w-4 h-4" />
                Erstberatung buchen
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
