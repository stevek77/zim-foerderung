"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";

interface SchnellcheckModalProps {
  open: boolean;
  onClose: () => void;
}

const N8N_WEBHOOK_URL =
  "https://n8n.foerder-kompass.de/webhook/zim-foerdermittelcheck";

const BUNDESLAENDER = [
  "Baden-Württemberg",
  "Bayern",
  "Berlin",
  "Brandenburg",
  "Bremen",
  "Hamburg",
  "Hessen",
  "Mecklenburg-Vorpommern",
  "Niedersachsen",
  "Nordrhein-Westfalen",
  "Rheinland-Pfalz",
  "Saarland",
  "Sachsen",
  "Sachsen-Anhalt",
  "Schleswig-Holstein",
  "Thüringen",
  "Schweiz / Ausland",
];

const EMPLOYEE_OPTIONS = [
  { value: "1-9", label: "1–9 Mitarbeitende" },
  { value: "10-49", label: "10–49 Mitarbeitende" },
  { value: "50-249", label: "50–249 Mitarbeitende" },
  { value: "250+", label: "250+ Mitarbeitende" },
];

const PROJECT_OPTIONS = [
  { value: "Einzelprojekt", label: "Einzelprojekt", hint: "Ihr Unternehmen allein" },
  { value: "Kooperationsprojekt", label: "Kooperationsprojekt", hint: "Mit mind. 1 weiterem KMU/Forschungseinrichtung" },
  { value: "International", label: "Internationale Kooperation", hint: "Mit Partnern im Ausland (IraSME)" },
  { value: "Durchführbarkeitsstudie", label: "Durchführbarkeitsstudie", hint: "Machbarkeit vor dem eigentlichen Projekt" },
];

const VOLUME_OPTIONS = [
  "unter 100.000 €",
  "100.000 – 300.000 €",
  "300.000 – 690.000 €",
  "über 690.000 €",
];

const TOTAL_STEPS = 6;

export default function SchnellcheckModal({ open, onClose }: SchnellcheckModalProps) {
  const [step, setStep] = useState(1);
  const [employees, setEmployees] = useState("");
  const [stateName, setStateName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [volumeText, setVolumeText] = useState("");
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [gotcha, setGotcha] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    if (!open) {
      setStep(1);
      setStatus("idle");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const canProceed =
    (step === 1 && !!employees) ||
    (step === 2 && !!stateName) ||
    (step === 3 && !!projectType) ||
    (step === 4 && !!volumeText) ||
    step === 5;

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
  };
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) return;
    if (gotcha) return; // Honeypot ausgelöst
    setStatus("sending");

    try {
      trackCTAClick("ZIM Schnellcheck abgeschlossen", "schnellcheck-modal");

      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company,
          employees,
          firstName,
          lastName,
          phone,
          email,
          projectType,
          stateName,
          zip: "",
          city: "",
          volumeText,
          message,
          source: "zim-schnellcheck",
        }),
      });

      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="schnellcheck-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-6 pb-0">
          <h2 id="schnellcheck-modal-title" className="text-xl font-semibold text-heading">
            ZIM-Fördercheck
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Schließen"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {status === "success" ? (
          <div className="p-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-800 mb-1">
                  Danke, Ihre Angaben sind angekommen!
                </p>
                <p className="text-sm text-green-700">
                  Wir prüfen Ihre Förderperspektiven und melden uns kurzfristig
                  bei Ihnen unter <strong>{email}</strong>. Sie können auch
                  direkt einen{" "}
                  <a
                    href="https://calendly.com/kovacs-termin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    kostenlosen Beratungstermin
                  </a>{" "}
                  buchen.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-primary-DEFAULT text-white py-3 rounded-lg font-semibold hover:opacity-90"
            >
              Schließen
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            {/* Fortschritt */}
            <div className="flex items-center gap-1.5 mb-6" aria-hidden="true">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i < step ? "bg-primary-DEFAULT" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-body-light mb-4">
              Frage {Math.min(step, TOTAL_STEPS)} von {TOTAL_STEPS}
            </p>

            <div className="min-h-[220px]">
              {step === 1 && (
                <fieldset>
                  <legend className="block text-base font-medium text-heading mb-3">
                    Wie viele Mitarbeitende hat Ihr Unternehmen?
                  </legend>
                  <div className="space-y-2">
                    {EMPLOYEE_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-3 px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
                          employees === opt.value
                            ? "border-primary-DEFAULT bg-primary-light/30"
                            : "border-border-DEFAULT hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="employees"
                          value={opt.value}
                          checked={employees === opt.value}
                          onChange={(e) => setEmployees(e.target.value)}
                          className="accent-primary-DEFAULT"
                        />
                        <span className="text-sm">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {step === 2 && (
                <div>
                  <label htmlFor="sc-state" className="block text-base font-medium text-heading mb-3">
                    In welchem Bundesland ist Ihr Unternehmen ansässig?
                  </label>
                  <select
                    id="sc-state"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="w-full px-3 py-3 border border-border-DEFAULT rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
                  >
                    <option value="">Bitte wählen…</option>
                    {BUNDESLAENDER.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {step === 3 && (
                <fieldset>
                  <legend className="block text-base font-medium text-heading mb-3">
                    Welche Projektform planen Sie?
                  </legend>
                  <div className="space-y-2">
                    {PROJECT_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex flex-col gap-0.5 px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
                          projectType === opt.value
                            ? "border-primary-DEFAULT bg-primary-light/30"
                            : "border-border-DEFAULT hover:bg-gray-50"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="projectType"
                            value={opt.value}
                            checked={projectType === opt.value}
                            onChange={(e) => setProjectType(e.target.value)}
                            className="accent-primary-DEFAULT"
                          />
                          <span className="text-sm font-medium">{opt.label}</span>
                        </span>
                        <span className="text-xs text-body-light pl-7">{opt.hint}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {step === 4 && (
                <fieldset>
                  <legend className="block text-base font-medium text-heading mb-3">
                    Wie hoch schätzen Sie das geplante Projektvolumen?
                  </legend>
                  <div className="space-y-2">
                    {VOLUME_OPTIONS.map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center gap-3 px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
                          volumeText === opt
                            ? "border-primary-DEFAULT bg-primary-light/30"
                            : "border-border-DEFAULT hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="volumeText"
                          value={opt}
                          checked={volumeText === opt}
                          onChange={(e) => setVolumeText(e.target.value)}
                          className="accent-primary-DEFAULT"
                        />
                        <span className="text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {step === 5 && (
                <div>
                  <label htmlFor="sc-message" className="block text-base font-medium text-heading mb-3">
                    Kurz beschrieben: worum geht es in Ihrem Vorhaben?{" "}
                    <span className="text-body-light font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="sc-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="z. B. Entwicklung eines neuen Sensorsystems für…"
                    className="w-full px-3 py-2 border border-border-DEFAULT rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT resize-none"
                  />
                </div>
              )}

              {step === 6 && (
                <div className="space-y-3">
                  <p className="text-base font-medium text-heading mb-1">
                    Fast geschafft — wohin dürfen wir Ihre Einschätzung senden?
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="sc-firstname" className="block text-sm font-medium text-heading mb-1">
                        Vorname *
                      </label>
                      <input
                        id="sc-firstname"
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-3 py-2 border border-border-DEFAULT rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
                      />
                    </div>
                    <div>
                      <label htmlFor="sc-lastname" className="block text-sm font-medium text-heading mb-1">
                        Nachname *
                      </label>
                      <input
                        id="sc-lastname"
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-3 py-2 border border-border-DEFAULT rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="sc-company" className="block text-sm font-medium text-heading mb-1">
                      Unternehmen *
                    </label>
                    <input
                      id="sc-company"
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-3 py-2 border border-border-DEFAULT rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="sc-email" className="block text-sm font-medium text-heading mb-1">
                        E-Mail *
                      </label>
                      <input
                        id="sc-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@ihrunternehmen.de"
                        className="w-full px-3 py-2 border border-border-DEFAULT rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
                      />
                    </div>
                    <div>
                      <label htmlFor="sc-phone" className="block text-sm font-medium text-heading mb-1">
                        Telefon
                      </label>
                      <input
                        id="sc-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-border-DEFAULT rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
                      />
                    </div>
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
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      opacity: 0,
                      height: 0,
                      width: 0,
                      pointerEvents: "none",
                    }}
                  />

                  <label className="flex items-start gap-2 text-xs text-body-light cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 accent-primary-DEFAULT"
                    />
                    <span>
                      Ich willige ein, dass Förder-Kompass meine freiwillig
                      angegebenen personenbezogenen Kontaktdaten verarbeitet, um
                      mich zum Zweck der Beratung und Information rund um die
                      ZIM-Förderung zu kontaktieren. Die Einwilligung ist
                      freiwillig und kann jederzeit mit Wirkung für die Zukunft
                      widerrufen werden. Details in der{" "}
                      <a
                        href="/datenschutz/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        Datenschutzerklärung
                      </a>
                      .
                    </span>
                  </label>
                </div>
              )}
            </div>

            {status === "error" && (
              <p className="text-sm text-red-600 mt-4">
                Beim Versand ist ein Fehler aufgetreten. Bitte erneut versuchen
                oder direkt{" "}
                <a href="tel:+4977718988861" className="underline">
                  +49 7771 8988 861
                </a>{" "}
                anrufen.
              </p>
            )}

            <div className="flex items-center gap-3 mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-lg font-medium text-heading border border-border-DEFAULT hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Zurück
                </button>
              )}
              {step < TOTAL_STEPS ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-primary-DEFAULT text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  Weiter
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={status === "sending" || !consent}
                  className="flex-1 bg-primary-DEFAULT text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  {status === "sending" ? "Wird gesendet…" : "Fördercheck abschicken"}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
