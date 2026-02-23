import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = generatePageMetadata(
  "Datenschutzerklärung",
  "Datenschutzerklärung von Förder-Kompass – ZIM Fördermittelberatung. Informationen zur Verarbeitung personenbezogener Daten.",
  "/datenschutz/"
);

export default function DatenschutzPage() {
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
            <h1 className="text-3xl text-white">Datenschutzerklärung</h1>
          </div>
        </section>

        <section className="py-16 bg-surface-DEFAULT">
          <div className="container-narrow prose prose-lg max-w-none">
            <h2>1. Datenschutz auf einen Blick</h2>
            <h3>Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber,
              was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
              Website besuchen. Personenbezogene Daten sind alle Daten, mit
              denen Sie persönlich identifiziert werden können.
            </p>

            <h3>Datenerfassung auf dieser Website</h3>
            <p>
              <strong>
                Wer ist verantwortlich für die Datenerfassung auf dieser
                Website?
              </strong>
            </p>
            <p>
              Die Datenverarbeitung auf dieser Website erfolgt durch den
              Websitebetreiber: Förder-Kompass, Steve Kovacs, Seestrasse 15c,
              78333 Stockach. E-Mail: info@forschungszulagenantrag.de
            </p>

            <h2>2. Hosting</h2>
            <p>
              Diese Website wird bei Vercel Inc. gehostet. Details zum
              Datenschutz bei Vercel finden Sie unter:{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://vercel.com/legal/privacy-policy
              </a>
            </p>

            <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
            <h3>Datenschutz</h3>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
              Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
              vertraulich und entsprechend der gesetzlichen
              Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>

            <h3>Hinweis zur verantwortlichen Stelle</h3>
            <p>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser
              Website ist:
            </p>
            <p>
              Förder-Kompass
              <br />
              Steve Kovacs
              <br />
              Seestrasse 15c
              <br />
              78333 Stockach
              <br />
              Telefon: +49 7771 8988 861
              <br />
              E-Mail: info@forschungszulagenantrag.de
            </p>

            <h2>4. Datenerfassung auf dieser Website</h2>
            <h3>Server-Log-Dateien</h3>
            <p>
              Der Provider der Seiten erhebt und speichert automatisch
              Informationen in so genannten Server-Log-Dateien, die Ihr Browser
              automatisch an uns übermittelt. Dies sind: Browsertyp und
              Browserversion, verwendetes Betriebssystem, Referrer URL,
              Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage,
              IP-Adresse.
            </p>

            <h3>Anfrage per E-Mail oder Telefon</h3>
            <p>
              Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre
              Anfrage inklusive aller daraus hervorgehenden personenbezogenen
              Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens
              bei uns gespeichert und verarbeitet.
            </p>

            <h2>5. Analyse-Tools und Werbung</h2>
            <h3>Google Analytics</h3>
            <p>
              Diese Website nutzt Funktionen des Webanalysedienstes Google
              Analytics. Anbieter ist die Google Ireland Limited. Google
              Analytics ermöglicht es dem Websitebetreiber, das Verhalten der
              Websitebesucher zu analysieren.
            </p>

            <h2>6. Plugins und Tools</h2>
            <h3>Calendly</h3>
            <p>
              Für die Terminbuchung nutzen wir den Dienst Calendly. Anbieter
              ist die Calendly LLC. Bei der Nutzung von Calendly werden Daten
              an Server von Calendly in den USA übertragen. Details finden Sie
              in der Datenschutzerklärung von Calendly.
            </p>

            <h3>Google Fonts</h3>
            <p>
              Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten
              so genannte Google Fonts, die lokal eingebunden sind. Beim Aufruf
              einer Seite werden keine Daten an Google-Server übertragen.
            </p>

            <h2>7. Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über
              Ihre gespeicherten personenbezogenen Daten, deren Herkunft und
              Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf
              Berichtigung oder Löschung dieser Daten.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
