"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, Linkedin, Instagram, Facebook } from "lucide-react";
import content from "@/data/content-nav.json";
import footerContent from "@/data/content-footer.json";
import { trackCalendlyClick } from "@/lib/analytics";

const socialLinks = [
  { href: footerContent.social.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: footerContent.social.instagram, label: "Instagram", Icon: Instagram },
  { href: footerContent.social.facebook, label: "Facebook", Icon: Facebook },
];

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
            <div className="flex items-center gap-2 pl-1 border-l border-border-DEFAULT/60 ml-1">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-body-light hover:text-primary-DEFAULT hover:bg-primary-light transition-colors"
                >
                  <Icon className="w-[16px] h-[16px]" />
                </a>
              ))}
            </div>
            <a
              href="https://calendly.com/kovacs-termin"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark"
              onClick={() => trackCalendlyClick("navigation")}
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
                onClick={() => trackCalendlyClick("navigation-mobile")}
              >
                {content.cta}
              </a>
            </div>
            <div className="flex items-center justify-center gap-3 pt-5 pb-1">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-surface-soft flex items-center justify-center text-body-light hover:text-primary-DEFAULT hover:bg-primary-light transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
