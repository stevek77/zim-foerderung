import type { Metadata } from "next";
import { Phone, Mail, MapPin, CalendarDays } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import TrackedCalendlyLink from "@/components/TrackedCalendlyLink";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";

export const metadata: Metadata = {
  title: "Kontakt – ZIM-Projektanfrage stellen | Förder-Kompass",
  description:
    "Beschreiben Sie Ihr ZIM-Vorhaben in wenigen Sätzen. Wir melden uns innerhalb von ein bis zwei Werktagen mit einer ersten Einschätzung, auf Wunsch mit Terminvorschlag.",
  alternates: {
    canonical: "https://xn--zim-frderung-beantragen-clc.de/kontakt/",
  },
  openGraph: {
    title: "Kontakt – ZIM-Projektanfrage | Förder-Kompass",
    description:
      "ZIM-Vorhaben kurz beschreiben, erste Einschätzung innerhalb von ein bis zwei Werktagen erhalten.",
    url: "https://xn--zim-frderung-beantragen-clc.de/kontakt/",
    type: "website",
  },
};

export default function KontaktPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="pt-20 lg:pt-[116px] pb-12 bg-surface-soft">
          <div className="container-main">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary-DEFAULT font-medium text-sm uppercase tracking-wider mb-3">
                Kontakt
              </p>
              <h1 className="text-[2.25rem] md:text-[2.75rem] font-semibold text-heading mb-5">
                Ihre ZIM-Projektanfrage
              </h1>
              <p className="text-body text-[17px] leading-relaxed">
                Beschreiben Sie Ihr Vorhaben in zwei, drei Sätzen. Wir prüfen Förderfähigkeit und
                Zuschnitt und melden uns in der Regel innerhalb von ein bis zwei Werktagen mit einer
                ersten Einschätzung. Seit dem 7. Juli 2026 gilt im ZIM ein befristeter Antragsstopp;
                wir sagen Ihnen, was jetzt sinnvoll ist und welche Alternativen es gibt.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-main">
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7">
                <ContactForm />
              </div>
              <aside className="lg:col-span-5 space-y-6">
                <div className="bg-surface-soft rounded-2xl p-6">
                  <h2 className="text-lg font-semibold text-heading mb-3">So erreichen Sie uns</h2>
                  <ul className="space-y-3 text-[15px] text-body">
                    <li className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-primary-DEFAULT mt-1 shrink-0" />
                      <a href="mailto:info@foerder-kompass.de" className="hover:text-primary-DEFAULT">
                        info@foerder-kompass.de
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-primary-DEFAULT mt-1 shrink-0" />
                      <TrackedPhoneLink location="kontakt-seite" className="hover:text-primary-DEFAULT">
                        +49 7771 8988 861
                      </TrackedPhoneLink>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-primary-DEFAULT mt-1 shrink-0" />
                      <span>Förder-Kompass · Seestraße 15c · 78333 Stockach</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-border-DEFAULT p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarDays className="w-4 h-4 text-primary-DEFAULT" />
                    <h2 className="text-lg font-semibold text-heading">Lieber direkt ein Gespräch?</h2>
                  </div>
                  <p className="text-sm text-body mb-4">
                    Wenn Sie Ihr Vorhaben schon beschrieben haben, können Sie hier einen Termin für
                    ein kostenloses Erstgespräch wählen. Hilfreich ist, wenn Sie vorab Vorhaben,
                    Zeitplan und Größenordnung kurz notieren.
                  </p>
                  <TrackedCalendlyLink
                    location="kontakt-seite"
                    className="inline-flex items-center gap-2 text-primary-DEFAULT font-semibold hover:underline"
                  >
                    Termin wählen
                  </TrackedCalendlyLink>
                </div>

                <div className="rounded-2xl border border-border-DEFAULT p-6">
                  <h2 className="text-lg font-semibold text-heading mb-2">Erst rechnen, dann anfragen</h2>
                  <p className="text-sm text-body mb-3">
                    Mit dem ZIM-Rechner sehen Sie vorab, welcher Zuschuss für Ihr Projekt realistisch ist.
                  </p>
                  <a href="/zim-rechner/" className="text-primary-DEFAULT font-semibold hover:underline">
                    Zum ZIM-Rechner
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
