import type { Metadata } from "next";
import Script from "next/script";
import { defaultMetadata } from "@/lib/metadata";
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getServiceSchema,
} from "@/lib/schema";
import "./globals.css";

export const metadata: Metadata = defaultMetadata;

const GA4_ID = "G-ST6Z4C9ZJW";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getLocalBusinessSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getServiceSchema()),
          }}
        />

        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-config" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_ID}');`}
        </Script>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
