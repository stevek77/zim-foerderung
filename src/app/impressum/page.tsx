import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = generatePageMetadata(
  "Impressum",
  "Impressum von Förder-Kompass – ZIM Fördermittelberatung. Angaben gemäß § 5 TMG.",
  "/impressum/"
);

export default function ImpressumPage() {
  return (
    <>
      <Navigation />
      <main>
        <section
          className="pt-32 pb-12"
          style={{
            background:
              "linear-gradient(135deg, #06140C 0%, #071B14 40%, #0F3D34 100%)",
          }}
        >
          <div className="container-main">
            <h1 className="text-3xl text-white">Impressum</h1>
          </div>
        </section>

        <section className="py-16 bg-surface-DEFAULT">
          <div className="container-narrow prose prose-lg max-w-none">
            <h2>Angaben gemäß § 5 TMG</h2>
            <p>
              Förder-Kompass
              <br />
              Steve Kovacs
              <br />
              Seestrasse 15c
              <br />
              78333 Stockach
            </p>

            <h2>Kontakt</h2>
            <p>
              Telefon: +49 7771 8988 861
              <br />
              E-Mail: info@foerder-kompass.de
            </p>

            <h2>Umsatzsteuer-Identifikationsnummer</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27a
              Umsatzsteuergesetz:
              <br />
              DE299573120
            </p>

            <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
            <p>
              Berufsbezeichnung: Fördermittelberater
              <br />
              Zuständige Kammer: IHK Hochrhein-Bodensee
            </p>

            <h2>Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p>
              Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            <h2>Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
              gespeicherte fremde Informationen zu überwachen oder nach
              Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
              hinweisen.
            </p>

            <h2>Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
              diese fremden Inhalte auch keine Gewähr übernehmen. Für die
              Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich.
            </p>

            <h2>Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
