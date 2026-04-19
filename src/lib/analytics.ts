// GA4 Event Tracking Utilities
// Sends custom events to Google Analytics 4 for conversion tracking

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type GA4EventParams = Record<string, string | number | boolean>;

function sendEvent(eventName: string, params?: GA4EventParams) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

// Calendly / Termin-Klick
export function trackCalendlyClick(location: string) {
  sendEvent("calendly_click", {
    event_category: "conversion",
    event_label: location,
    link_url: "https://calendly.com/kovacs-termin",
  });
}

// Telefon-Klick
export function trackPhoneClick(location: string) {
  sendEvent("phone_click", {
    event_category: "conversion",
    event_label: location,
    link_url: "tel:+4977718988861",
  });
}

// Formspree / Projektskizze eingereicht
export function trackFormSubmission(formName: string) {
  sendEvent("form_submission", {
    event_category: "conversion",
    event_label: formName,
  });
}

// ZIM-Rechner Berechnung durchgeführt
export function trackCalculation(projectType: string, fundingAmount: number) {
  sendEvent("zim_calculation", {
    event_category: "engagement",
    event_label: projectType,
    value: fundingAmount,
  });
}

// CTA-Button-Klick (generisch)
export function trackCTAClick(buttonText: string, location: string) {
  sendEvent("cta_click", {
    event_category: "engagement",
    event_label: `${buttonText} – ${location}`,
  });
}

// PDF-Anforderung aus Rechner (z.B. ZIM-Rechner → "PDF per E-Mail erhalten")
// Feuert wenn der User das DSGVO-Einwilligungsformular abschickt.
// fundingAmount = kalkulierte Förderhöhe in EUR (für value-based conversion tracking)
export function trackPDFRequest(
  source: string,
  fundingAmount: number,
  projectType?: string,
) {
  sendEvent("pdf_request", {
    event_category: "conversion",
    event_label: source,
    value: fundingAmount,
    project_type: projectType || "",
  });
}
