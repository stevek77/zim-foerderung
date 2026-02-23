"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

const navItems = [
  { label: "ZIM Förderung", href: "#zim-foerderung" },
  { label: "Leistungen", href: "#leistungen" },
  { label: "ZIM-Rechner", href: "/zim-rechner/" },
  { label: "FAQ", href: "#faq" },
  { label: "Über uns", href: "#ueber-uns" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50" aria-label="Hauptnavigation">
      <div className="container-main">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary-DEFAULT flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2L12 12L17 7" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-semibold text-lg leading-tight">
                Förder-Kompass
              </span>
              <span className="text-white/70 text-xs leading-tight">
                ZIM Fördermittelberatung
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/90 hover:text-primary-DEFAULT text-base font-normal transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://calendly.com/kovacs-termin"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Kostenlose Erstberatung
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menü öffnen"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden bg-forest-dark/95 backdrop-blur-sm rounded-2xl p-6 mt-2 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-white/90 hover:text-primary-DEFAULT text-lg py-2"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://calendly.com/kovacs-termin"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark w-full text-center block mt-4"
            >
              Kostenlose Erstberatung
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
