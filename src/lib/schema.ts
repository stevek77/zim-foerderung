// JSON-LD Structured Data for SEO
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Förder-Kompass",
    url: "https://xn--zim-frderung-beantragen-clc.de",
    logo: "https://xn--zim-frderung-beantragen-clc.de/logo.png",
    description:
      "Professionelle ZIM-Fördermittelberatung für den Mittelstand. Bis zu 60% Zuschuss für Ihre Innovationsprojekte.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Seestrasse 15c",
      addressLocality: "Stockach",
      postalCode: "78333",
      addressRegion: "Baden-Württemberg",
      addressCountry: "DE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+49-7771-8988-861",
      contactType: "customer service",
      availableLanguage: ["German", "English"],
    },
    sameAs: [
      "https://www.linkedin.com/in/stevekovacs/",
      "https://foerder-kompass.de",
      "https://forschungszulagenantrag.de",
    ],
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Förder-Kompass – ZIM Fördermittelberatung",
    image: "https://xn--zim-frderung-beantragen-clc.de/logo.png",
    url: "https://xn--zim-frderung-beantragen-clc.de",
    telephone: "+49-7771-8988-861",
    email: "info@foerder-kompass.de",
    priceRange: "Erfolgsbasiert",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Seestrasse 15c",
      addressLocality: "Stockach",
      postalCode: "78333",
      addressRegion: "Baden-Württemberg",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.8497,
      longitude: 9.0093,
    },
    areaServed: {
      "@type": "Country",
      name: "Deutschland",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "12",
    },
  };
}

export function getServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "ZIM Fördermittelberatung",
    provider: {
      "@type": "Organization",
      name: "Förder-Kompass",
    },
    description:
      "Professionelle Beratung und Antragstellung für das Zentrale Innovationsprogramm Mittelstand (ZIM). Wir begleiten Sie von der Projektidee bis zur Bewilligung.",
    areaServed: {
      "@type": "Country",
      name: "Deutschland",
    },
    serviceType: "Fördermittelberatung",
    offers: {
      "@type": "Offer",
      description: "Erfolgsbasierte Vergütung – Sie zahlen nur bei Bewilligung",
      priceCurrency: "EUR",
    },
  };
}

export function getFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getHowToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "ZIM Förderung beantragen – Schritt für Schritt",
    description:
      "So beantragen Sie ZIM-Fördermittel für Ihr Innovationsprojekt. Von der Erstberatung bis zur Bewilligung in 6 Schritten.",
    totalTime: "P8W",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "EUR",
      value: "0",
    },
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Kostenlose Erstberatung",
        text: "Projektidee auf ZIM-Förderfähigkeit prüfen lassen. Förder-Kompass analysiert Innovationsgrad, Unternehmensgröße und optimale Projektform.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Förderfähigkeitsprüfung",
        text: "Detaillierte Analyse des Unternehmens, des Innovationsgrads und der technischen Risiken. Abgleich mit allen ZIM-Anforderungen der Richtlinie V5.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Antragserstellung",
        text: "Professionelle Erstellung der Projektbeschreibung (Anhänge 1-4), Kostenplanung und aller Antragsformulare nach ZIM-Richtlinie.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Kalkulation & Compliance",
        text: "Optimierung der Kostenplanung innerhalb der ZIM-Fördergrenzen. Personalkostenkalkulation und Drittkosten-Optimierung.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Qualitätssicherung",
        text: "Gutachter-Simulation und Konsistenzprüfung. Optimierung anhand der bekannten Bewertungskriterien der Projektträger.",
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Einreichung beim Projektträger",
        text: "Digitale Einreichung über die Förderzentrale Deutschland (FZD). Begleitung bei Rückfragen und Unterstützung bis zur Zuwendungsvereinbarung.",
      },
    ],
  };
}

export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
