"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { jsPDF } from "jspdf";
import { trackPDFRequest } from "@/lib/analytics";

export interface CalculationSnapshot {
  projectType: string;
  projectTypeLabel: string;
  companySize: string;
  companySizeLabel: string;
  personalkosten: number;
  auftraegeDritte: number;
  materialkosten: number;
  geraeteAbschreibung: number;
  laufzeitMonate: number;
  foerderquote: number;
  direkteKosten: number;
  gemeinkosten: number;
  zuwendungsfaehigeKosten: number;
  gedeckelteKosten: number;
  zuwendung: number;
  eigenanteil: number;
  cap: number;
  isCapped: boolean;
}

interface PDFRequestModalProps {
  open: boolean;
  onClose: () => void;
  snapshot: CalculationSnapshot;
}

const N8N_WEBHOOK_URL =
  "https://n8n.foerder-kompass.de/webhook/zim-rechner-pdf";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function PDFRequestModal({
  open,
  onClose,
  snapshot,
}: PDFRequestModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  // Reset on close
  useEffect(() => {
    if (!open) {
      setStatus("idle");
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const buildPDF = (): { blob: Blob; base64: string } => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const marginX = 50;
    let y = 60;

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(7, 27, 20); // #071B14
    doc.text("ZIM-Förderung – Ihre Schätzung", marginX, y);
    y += 10;
    doc.setDrawColor(127, 216, 182); // #7fd8b6
    doc.setLineWidth(2);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 30;

    // Intro
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    const intro = doc.splitTextToSize(
      "Die folgende Berechnung basiert auf der ZIM-Richtlinie V5 (November 2024). Es handelt sich um eine Schätzung – in der Beratung werden zusätzliche förderfähige FuE-Anteile oft präzisiert.",
      pageWidth - 2 * marginX,
    );
    doc.text(intro, marginX, y);
    y += intro.length * 14 + 10;

    // Result box
    doc.setFillColor(7, 27, 20);
    doc.roundedRect(marginX, y, pageWidth - 2 * marginX, 70, 8, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Ihre geschätzte ZIM-Förderung", marginX + 20, y + 24);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(127, 216, 182);
    doc.text(formatCurrency(snapshot.zuwendung), marginX + 20, y + 54);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(200, 200, 200);
    doc.text(
      `bei ${(snapshot.foerderquote * 100).toFixed(0)}% Förderquote`,
      pageWidth - marginX - 20,
      y + 54,
      { align: "right" },
    );
    y += 90;

    // Key-Value Tabelle
    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Ihre Angaben", marginX, y);
    y += 18;

    const kv: [string, string][] = [
      ["Projektform", snapshot.projectTypeLabel],
      ["Unternehmensgröße", snapshot.companySizeLabel],
      ["Personalkosten (FuE)", formatCurrency(snapshot.personalkosten)],
      ["Aufträge an Dritte", formatCurrency(snapshot.auftraegeDritte)],
      ["Materialkosten", formatCurrency(snapshot.materialkosten)],
      ["Geräteabschreibung", formatCurrency(snapshot.geraeteAbschreibung)],
      ["Projektlaufzeit", `${snapshot.laufzeitMonate} Monate`],
    ];
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    kv.forEach(([k, v]) => {
      doc.setTextColor(100, 100, 100);
      doc.text(k, marginX, y);
      doc.setTextColor(40, 40, 40);
      doc.text(v, pageWidth - marginX, y, { align: "right" });
      y += 16;
    });
    y += 10;

    // Kostenaufstellung
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Kostenaufstellung", marginX, y);
    y += 18;

    const costs: [string, string][] = [
      ["Direkte Projektkosten", formatCurrency(snapshot.direkteKosten)],
      [
        "Gemeinkostenpauschale (20% AGVO)",
        formatCurrency(snapshot.gemeinkosten),
      ],
      [
        "Zuwendungsfähige Kosten",
        formatCurrency(snapshot.zuwendungsfaehigeKosten),
      ],
    ];
    if (snapshot.isCapped) {
      costs.push([
        `Deckelung auf ${formatCurrency(snapshot.cap)}`,
        formatCurrency(snapshot.gedeckelteKosten),
      ]);
    }
    costs.push(
      ["ZIM-Zuschuss", formatCurrency(snapshot.zuwendung)],
      ["Ihr Eigenanteil", formatCurrency(snapshot.eigenanteil)],
    );
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    costs.forEach(([k, v], idx) => {
      const isLast = idx >= costs.length - 2;
      if (isLast) doc.setFont("helvetica", "bold");
      doc.setTextColor(100, 100, 100);
      doc.text(k, marginX, y);
      doc.setTextColor(40, 40, 40);
      doc.text(v, pageWidth - marginX, y, { align: "right" });
      if (isLast) doc.setFont("helvetica", "normal");
      y += 16;
    });
    y += 10;

    // Footer Hinweise
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    const hinweis = doc.splitTextToSize(
      "Diese Schätzung basiert auf ZIM-Richtlinie V5 (01.11.2024). Förderquoten gemäß BMWK. Gemeinkostenpauschale max. 20% der direkten Projektkosten (AGVO). Aufträge an Dritte bis 35% der Personalkosten direkt ansetzbar. Tatsächliche Förderhöhe kann je nach Projektdetails abweichen.",
      pageWidth - 2 * marginX,
    );
    doc.text(hinweis, marginX, y);
    y += hinweis.length * 10 + 20;

    // Kontakt
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(7, 27, 20);
    doc.text("Kostenlose Erstberatung", marginX, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text("Förder-Kompass | Steve Kovacs", marginX, y);
    y += 14;
    doc.text(
      "Seestrasse 15c, 78333 Stockach | Tel: +49 7771 8988 861",
      marginX,
      y,
    );
    y += 14;
    doc.text(
      "Termin: https://calendly.com/kovacs-termin | info@foerder-kompass.de",
      marginX,
      y,
    );
    y += 14;
    doc.text(
      "Website: https://xn--zim-frderung-beantragen-clc.de",
      marginX,
      y,
    );

    const blob = doc.output("blob");
    const base64 = doc.output("datauristring").split(",")[1]; // strip data:... prefix
    return { blob, base64 };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) return;
    setStatus("sending");

    try {
      const { blob, base64 } = buildPDF();

      // 1) Browser-Download sofort auslösen
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ZIM-Foerderung-Schaetzung-${snapshot.projectType}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);

      // 2) GA4-Event
      trackPDFRequest("zim-rechner", snapshot.zuwendung, snapshot.projectType);

      // 3) Webhook-Call an n8n (non-blocking fire-and-forget; Download hat bereits stattgefunden)
      fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          company,
          snapshot: {
            projectType: snapshot.projectType,
            projectTypeLabel: snapshot.projectTypeLabel,
            companySize: snapshot.companySize,
            companySizeLabel: snapshot.companySizeLabel,
            personalkosten: snapshot.personalkosten,
            zuwendung: snapshot.zuwendung,
            foerderquote: snapshot.foerderquote,
            zuwendungsfaehigeKosten: snapshot.zuwendungsfaehigeKosten,
            laufzeitMonate: snapshot.laufzeitMonate,
          },
          pdfBase64: base64,
          source: "zim-rechner",
          consent_timestamp: new Date().toISOString(),
        }),
      }).catch(() => {
        // n8n-Fehler still; Download hat User schon
      });

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-6 pb-0">
          <h2
            id="pdf-modal-title"
            className="text-xl font-semibold text-heading"
          >
            PDF anfordern &amp; per E-Mail erhalten
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
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="font-semibold text-green-800 mb-2">
                ✓ PDF wurde heruntergeladen
              </p>
              <p className="text-sm text-green-700">
                Zusätzlich erhalten Sie eine E-Mail mit dem PDF und Details zur
                Erstberatung an <strong>{email}</strong>. Wir melden uns in
                Kürze.
              </p>
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
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-sm text-body-light">
              <strong>Förder-Kompass:</strong> Die Schätzung ist ein Startpunkt
              – in der Zusammenarbeit werden häufig zusätzliche förderfähige
              FuE-Anteile sauber identifiziert.
            </p>

            <div>
              <label
                htmlFor="pdf-email"
                className="block text-sm font-medium text-heading mb-1"
              >
                E-Mail-Adresse *
              </label>
              <input
                id="pdf-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@ihrunternehmen.de"
                className="w-full px-3 py-2 border border-border-DEFAULT rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="pdf-name"
                  className="block text-sm font-medium text-heading mb-1"
                >
                  Name
                </label>
                <input
                  id="pdf-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Max Mustermann"
                  className="w-full px-3 py-2 border border-border-DEFAULT rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
                />
              </div>
              <div>
                <label
                  htmlFor="pdf-company"
                  className="block text-sm font-medium text-heading mb-1"
                >
                  Unternehmen
                </label>
                <input
                  id="pdf-company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Muster GmbH"
                  className="w-full px-3 py-2 border border-border-DEFAULT rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
                />
              </div>
            </div>

            {/* Honeypot */}
            <input
              type="text"
              name="_gotcha"
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

            <label className="flex items-start gap-2 text-xs text-body-light cursor-pointer">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 accent-primary-DEFAULT"
              />
              <span>
                Ich willige ein, dass Förder-Kompass meine freiwillig
                angegebenen personenbezogenen Kontaktdaten verarbeitet, um mich
                im Anschluss an die Nutzung des ZIM-Rechners zum Zweck der
                Beratung und Information rund um die ZIM-Förderung zu
                kontaktieren. Die Einwilligung ist freiwillig und kann jederzeit
                mit Wirkung für die Zukunft widerrufen werden. Die Nutzung des
                ZIM-Rechners zur unverbindlichen Berechnung ist auch ohne
                Einwilligung möglich. Details in der{" "}
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

            {status === "error" && (
              <p className="text-sm text-red-600">
                Beim Versand ist ein Fehler aufgetreten. Bitte erneut versuchen
                oder direkt{" "}
                <a
                  href="tel:+4977718988861"
                  className="underline"
                >
                  +49 7771 8988 861
                </a>{" "}
                anrufen.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending" || !consent}
              className="w-full bg-primary-DEFAULT text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {status === "sending"
                ? "Wird erstellt..."
                : "Absenden & PDF herunterladen"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
