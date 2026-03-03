import type { Metadata } from "next";

const siteUrl = "https://xn--zim-frderung-beantragen-clc.de";
const siteName = "ZIM Förderung beantragen | Förder-Kompass";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  title: {
    default: "ZIM Förderung beantragen – Bis zu 60% Zuschuss für Ihr Innovationsprojekt | Förder-Kompass",
    template: "%s | ZIM Förderung beantragen – Förder-Kompass",
  },
  description:
    "ZIM Förderung beantragen mit Förder-Kompass. Bis zu 60% Zuschuss für FuE-Projekte. Kostenlose Erstberatung, hohe Bewilligungsquote, rein erfolgsbasierte Vergütung. Jetzt ZIM-Antrag starten.",
  keywords: [
    "ZIM Förderung",
    "ZIM Förderung beantragen",
    "ZIM Antrag",
    "ZIM Förderprogramm",
    "Zentrales Innovationsprogramm Mittelstand",
    "ZIM Zuschuss",
    "ZIM Beratung",
    "ZIM Einzelprojekt",
    "ZIM Kooperationsprojekt",
    "Innovationsförderung Mittelstand",
    "FuE Förderung",
    "Forschungsförderung KMU",
    "ZIM Fördermittel",
    "ZIM Fördermittelberatung",
    "BMWK Förderung",
    "ZIM Förderung Baden-Württemberg",
    "Fördermittelberatung Bodensee",
    "Innovationsförderung Baden-Württemberg",
    "Forschungsförderung Baden-Württemberg",
    "ZIM Berater Bodensee",
    "Forschung Förderung Baden-Württemberg",
  ],
  authors: [{ name: "Förder-Kompass – Steve Kovacs" }],
  creator: "Förder-Kompass",
  publisher: "Förder-Kompass",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName,
    title: "ZIM Förderung beantragen – Bis zu 60% Zuschuss | Förder-Kompass",
    description:
      "ZIM Förderung beantragen mit Förder-Kompass. Bis zu 60% Zuschuss für FuE-Projekte. Kostenlose Erstberatung & rein erfolgsbasierte Vergütung.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ZIM Förderung beantragen – Förder-Kompass",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZIM Förderung beantragen – Bis zu 60% Zuschuss | Förder-Kompass",
    description:
      "ZIM Förderung beantragen mit Förder-Kompass. Bis zu 60% Zuschuss für FuE-Projekte.",
    images: [`${siteUrl}/og-image.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "ESz1o0fi62MotxJ4g8_lCSqiTkUUDldl_aN5osO3isY",
  },
};

export function generatePageMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${path}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${path}`,
    },
  };
}
