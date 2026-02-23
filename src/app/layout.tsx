import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/metadata";
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getServiceSchema,
} from "@/lib/schema";
import "./globals.css";

export const metadata: Metadata = defaultMetadata;

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
        {/* Google Tag Manager - will be configured later */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX" /> */}
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
