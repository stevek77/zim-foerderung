"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

const WEBHOOK_URL = "https://n8n.foerder-kompass.de/webhook/kontaktformular";

const TOPICS = [
  "ZIM-Einzelprojekt",
  "ZIM-Kooperationsprojekt",
  "ZIM international (IraSME, bilaterale Ausschreibung)",
  "Durchführbarkeitsstudie",
  "Forschungszulage als Alternative",
  "Anderes Förderthema",
];

export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [gotcha, setGotcha] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent || gotcha) return;
    setStatus("sending");
    try {
      const params = new URLSearchParams(window.location.search);
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          company,
          email,
          phone,
          topic,
          message,
          consent: "ja",
          source: params.get("quelle") || "zim-site-kontakt",
          page: window.location.pathname,
          referrer: document.referrer || "",
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex gap-3">
        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-green-800 mb-1">Vielen Dank, Ihre Anfrage ist angekommen.</p>
          <p className="text-sm text-green-700 mb-3">
            Wir melden uns in der Regel innerhalb von ein bis zwei Werktagen mit einer ersten
            Einschätzung unter <strong>{email}</strong>. Eine Bestätigung ist unterwegs.
          </p>
          <p className="text-sm text-green-700">
            Sie möchten das Gespräch direkt terminieren?{" "}
            <a
              href="https://calendly.com/kovacs-termin"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium"
            >
              Termin für ein Erstgespräch wählen
            </a>
          </p>
        </div>
      </div>
    );
  }

  const input =
    "w-full px-3 py-3 border border-border-DEFAULT rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT bg-white";
  const label = "block text-sm font-medium text-heading mb-1";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-border-DEFAULT p-6 md:p-8">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="kf-firstname" className={label}>Vorname *</label>
          <input id="kf-firstname" type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className={input} autoComplete="given-name" />
        </div>
        <div>
          <label htmlFor="kf-lastname" className={label}>Nachname *</label>
          <input id="kf-lastname" type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} className={input} autoComplete="family-name" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="kf-company" className={label}>Unternehmen *</label>
          <input id="kf-company" type="text" required value={company} onChange={(e) => setCompany(e.target.value)} className={input} autoComplete="organization" />
        </div>
        <div>
          <label htmlFor="kf-topic" className={label}>Worum geht es? *</label>
          <select id="kf-topic" required value={topic} onChange={(e) => setTopic(e.target.value)} className={input}>
            <option value="">Bitte wählen…</option>
            {TOPICS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="kf-email" className={label}>E-Mail *</label>
          <input id="kf-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={input} autoComplete="email" placeholder="name@ihrunternehmen.de" />
        </div>
        <div>
          <label htmlFor="kf-phone" className={label}>Telefon (optional)</label>
          <input id="kf-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={input} autoComplete="tel" />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="kf-message" className={label}>Ihr Vorhaben in zwei, drei Sätzen *</label>
        <p className="text-xs text-body-light mb-2">
          Was planen Sie, wann soll es losgehen, und in welcher Größenordnung? So können wir Ihnen direkt eine erste Einschätzung geben.
        </p>
        <textarea id="kf-message" rows={5} required value={message} onChange={(e) => setMessage(e.target.value)} className={`${input} resize-y`} />
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="_gotcha"
        value={gotcha}
        onChange={(e) => setGotcha(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0, pointerEvents: "none" }}
      />

      <label className="flex items-start gap-2 text-xs text-body-light cursor-pointer mt-4">
        <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-primary-DEFAULT" />
        <span>
          Ich willige ein, dass Förder-Kompass meine Angaben zur Bearbeitung meiner Anfrage speichert und verarbeitet. Die Einwilligung kann jederzeit mit Wirkung für die Zukunft widerrufen werden. Details in der{" "}
          <a href="/datenschutz/" target="_blank" rel="noopener noreferrer" className="underline">Datenschutzerklärung</a>. *
        </span>
      </label>

      {status === "error" && (
        <p className="text-sm text-red-600 mt-4">
          Beim Versand ist ein Fehler aufgetreten. Bitte erneut versuchen oder schreiben Sie an{" "}
          <a href="mailto:info@foerder-kompass.de" className="underline">info@foerder-kompass.de</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending" || !consent}
        className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-DEFAULT text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
      >
        <Send className="w-4 h-4" />
        {status === "sending" ? "Wird gesendet…" : "Anfrage senden"}
      </button>
    </form>
  );
}
