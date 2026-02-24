"use client";

import { trackCalendlyClick } from "@/lib/analytics";

interface TrackedCalendlyLinkProps {
  location: string;
  className?: string;
  children: React.ReactNode;
}

export default function TrackedCalendlyLink({
  location,
  className,
  children,
}: TrackedCalendlyLinkProps) {
  return (
    <a
      href="https://calendly.com/kovacs-termin"
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackCalendlyClick(location)}
    >
      {children}
    </a>
  );
}
