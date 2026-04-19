"use client";

import { trackPhoneClick } from "@/lib/analytics";

interface TrackedPhoneLinkProps {
  location: string;
  phone?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Phone-Link mit GA4-Event-Tracking.
 * Feuert trackPhoneClick(location) beim Klick und öffnet den tel:-Handler.
 * Standard-Nummer ist +49 7771 8988 861 (Förder-Kompass), kann via prop überschrieben werden.
 */
export default function TrackedPhoneLink({
  location,
  phone = "+4977718988861",
  className,
  children,
}: TrackedPhoneLinkProps) {
  return (
    <a
      href={`tel:${phone}`}
      className={className}
      onClick={() => trackPhoneClick(location)}
    >
      {children}
    </a>
  );
}
