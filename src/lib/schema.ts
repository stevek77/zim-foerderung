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
      "https://foerder-kompass.de/",
      "https://forschungszulagenantrag.de/",
      "https://www.facebook.com/foerderkompass/",
      "https://www.instagram.com/foerderkompassde/",
      "https://www.linkedin.com/company/foerderkompass/",
      "https://www.linkedin.com/in/steve-kovacs-4b949854/",
      "https://chat.openai.com/g/g-E0yh1EewP-fordermittelkompass",
      "https://www.google.com/maps/place/F%C3%B6rder-Kompass/",
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
    areaServed: [
      { "@type": "Country", name: "Deutschland" },
      { "@type": "State", name: "Baden-Württemberg" },
      { "@type": "City", name: "Stuttgart" },
      { "@type": "City", name: "Reutlingen" },
      { "@type": "City", name: "Esslingen am Neckar" },
      { "@type": "City", name: "Böblingen" },
      { "@type": "City", name: "Göppingen" },
      { "@type": "City", name: "Tübingen" },
      { "@type": "City", name: "Heilbronn" },
      { "@type": "City", name: "Konstanz" },
      { "@type": "City", name: "Ravensburg" },
      { "@type": "City", name: "Friedrichshafen" },
      { "@type": "City", name: "Singen" },
      { "@type": "City", name: "Freiburg im Breisgau" },
      { "@type": "City", name: "Villingen-Schwenningen" },
      { "@type": "City", name: "Ulm" },
    ],
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
    name: "ZIM-Antragsberatung — Spezialisierte Fördermittelberatung",
    serviceType: "Fördermittelberatung",
    category: "Innovation Funding Consulting",
    provider: {
      "@type": "ProfessionalService",
      name: "Förder-Kompass",
      url: "https://foerder-kompass.de/",
      sameAs: [
        "https://xn--zim-frderung-beantragen-clc.de/",
        "https://forschungszulagenantrag.de/",
        "https://www.linkedin.com/company/foerderkompass/",
      ],
    },
    description:
      "Spezialisierte Beratung und Antragstellung für das Zentrale Innovationsprogramm Mittelstand (ZIM) — von der Projektidee bis zur Bewilligung. Erfolgsbasiertes Honorar.",
    audience: {
      "@type": "BusinessAudience",
      audienceType:
        "Kleine und mittlere Unternehmen (KMU) mit Forschungs- und Entwicklungsvorhaben",
    },
    areaServed: {
      "@type": "Country",
      name: "Deutschland",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "ZIM-Beratungsleistungen",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ZIM-Einzelprojekt-Antragsberatung",
            description:
              "Komplette Antragstellung für ZIM-Einzelprojekte (Bemessungsgrundlage bis 690.000 €, Förderquote 25–45 %).",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ZIM-Kooperationsprojekt-Antragsberatung",
            description:
              "Antragsberatung für ZIM-Kooperationsprojekte (bis 3 Mio € Gesamtsumme, 30–60 % Förderquote).",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ZIM-Fördercheck (kostenlos)",
            description:
              "Schnellprüfung der ZIM-Förderfähigkeit in 2 Minuten.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ZIM-Antragscheckliste (kostenlos)",
            description:
              "Strukturierte Checkliste aller Unterlagen + Schritte für einen erfolgreichen ZIM-Antrag.",
          },
        },
      ],
    },
    offers: {
      "@type": "Offer",
      description: "Erfolgsbasierte Vergütung – Honorar nur bei Förderzusage",
      priceCurrency: "EUR",
    },
  };
}

/**
 * ProfessionalService-Schema: spezifischer als Service-Schema für die
 * Berater-Identität. Google AI Overview wertet ProfessionalService bei
 * Fragen wie "wer hilft beim ZIM-Antrag" oder "spezialisierter ZIM-Berater"
 * stärker — Brand-Konsolidierung über sameAs zu foerder-kompass.de +
 * forschungszulagenantrag.de.
 */
export function getProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id":
      "https://xn--zim-frderung-beantragen-clc.de/#professional-service",
    name: "Förder-Kompass — ZIM-Antragsberatung",
    alternateName: [
      "ZIM-Förderberatung Förder-Kompass",
      "Spezialisierte ZIM-Beratung",
    ],
    description:
      "Spezialisierte Beratungskanzlei für das Zentrale Innovationsprogramm Mittelstand (ZIM) und FuE-Förderprogramme (Forschungszulage, Eurostars). Erfolgsbasierte Vergütung, vollständige Antragsbegleitung von der Projektskizze bis zur Bewilligung.",
    url: "https://xn--zim-frderung-beantragen-clc.de/",
    image: "https://xn--zim-frderung-beantragen-clc.de/logo.png",
    priceRange: "Erfolgsbasiert",
    knowsAbout: [
      "ZIM-Förderung",
      "ZIM-Einzelprojekt",
      "ZIM-Kooperationsprojekt",
      "ZIM-Richtlinie V5",
      "Forschungszulage (FZulG)",
      "BSFZ-Bescheinigung",
      "Eurostars-3",
      "FuE-Förderung KMU",
      "Innovationsförderung Mittelstand",
    ],
    knowsLanguage: ["de", "en"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Seestrasse 15c",
      addressLocality: "Stockach",
      postalCode: "78333",
      addressRegion: "Baden-Württemberg",
      addressCountry: "DE",
    },
    areaServed: { "@type": "Country", name: "Deutschland" },
    parentOrganization: {
      "@type": "Organization",
      name: "Förder-Kompass",
      url: "https://foerder-kompass.de/",
      sameAs: [
        "https://forschungszulagenantrag.de/",
        "https://www.linkedin.com/company/foerderkompass/",
      ],
    },
    founder: {
      "@type": "Person",
      name: "Steve Kovacs",
      jobTitle: "Geschäftsführer & Förderberater",
      sameAs: ["https://www.linkedin.com/in/steve-kovacs-4b949854/"],
    },
    serviceArea: { "@type": "Country", name: "Deutschland" },
    makesOffer: {
      "@type": "Offer",
      description:
        "Erfolgsbasierte ZIM-Antragsberatung — Honorar nur bei Förderzusage. Kostenloser Fördercheck + ZIM-Rechner verfügbar.",
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

export function getWebApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ZIM Fördercheck 2025",
    description:
      "Kostenloser Schnellcheck: Prüfen Sie in 2 Minuten, ob Ihr Unternehmen Anspruch auf ZIM-Fördermittel hat. 6 Kriterien, sofortige Auswertung.",
    url: "https://claude.ai/public/artifacts/fd1f3225-6900-4255-8e46-6f24219bf5e6",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    provider: {
      "@type": "Organization",
      name: "Förder-Kompass",
      url: "https://xn--zim-frderung-beantragen-clc.de",
    },
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
