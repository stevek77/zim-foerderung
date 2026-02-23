"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import content from "@/data/content-nav.json";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
      aria-label="Hauptnavigation"
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-[80px]">
          {/* Logo - Förder-Kompass (geschnittene Version ohne Whitespace) */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/logo-foerder-kompass-cropped.jpeg"
              alt="Förder-Kompass – Ihr Navigator durch den deutschen Förderdschungel"
              className="h-[55px] md:h-[68px] w-auto"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {content.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-body hover:text-primary-DEFAULT text-[15px] font-normal transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://calendly.com/kovacs-termin"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark"
            >
              <Phone className="w-4 h-4" />
              {content.cta}
            </a>
          </div>

          <button
            className="lg:hidden text-heading p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menü öffnen"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-border-DEFAULT py-4 space-y-1">
            {content.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-body hover:text-primary-DEFAULT text-base py-3 px-2"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 px-2">
              <a
                href="https://calendly.com/kovacs-termin"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark w-full text-center"
              >
                {content.cta}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
