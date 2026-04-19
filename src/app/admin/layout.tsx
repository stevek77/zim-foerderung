import type { Metadata } from "next";

// Admin-Bereich: niemals indexieren. Überschreibt die Root-Metadata.
// Wird als Server-Component-Layout gerendert und setzt <meta name="robots" content="noindex, nofollow"/>
// vor dem Client-Component der eigentlichen admin/page.tsx.
export const metadata: Metadata = {
  title: "Admin – Förder-Kompass",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
