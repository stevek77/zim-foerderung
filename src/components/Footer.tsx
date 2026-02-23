import Link from "next/link";
import { Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-heading text-white/80">
      <div className="container-main py-16 lg:py-20">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-16">
          {/* Company Info */}
          <div className="md:col-span-4">
            {/* Logo - invertiert für dunklen Hintergrund */}
            <div className="mb-6">
              <img
                src="/logo-foerder-kompass.jpeg"
                alt="Förder-Kompass – Ihr Navigator durch den deutschen Förderdschungel"
                className="h-[48px] w-auto brightness-0 invert opacity-90"
              />
            </div>

            <p className="text-white/55 text-[15px] leading-relaxed mb-8">
              Professionelle ZIM-Fördermittelberatung für den Mittelstand.
              Von der Projektidee bis zur Bewilligung – rein erfolgsbasiert.
            </p>

            {/* Steve Kovacs */}
            <div className="flex items-center gap-3">
              <img
                src="https://forschungszulagenantrag.de/wp-content/uploads/2025/12/cropped-stevecompass2.png"
                alt="Steve Kovacs – Geschäftsführer Förder-Kompass"
                className="w-12 h-12 rounded-full object-cover border-2 border-primary-DEFAULT/40"
              />
              <div>
                <p className="text-white text-sm font-semibold">Steve Kovacs</p>
                <p className="text-white/45 text-xs">
                  Geschäftsführer, Förder-Kompass
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-white font-semibold text-base mb-5">
              ZIM Förderung
            </h4>
            <ul className="space-y-3.5 text-[15px]">
              {[
                { label: "ZIM Einzelprojekte", href: "#zim-foerderung" },
                { label: "ZIM Kooperationsprojekte", href: "#zim-foerderung" },
                { label: "ZIM International", href: "#zim-foerderung" },
                { label: "ZIM Fördersätze", href: "#zim-foerderung" },
                { label: "ZIM-Rechner", href: "/zim-rechner/" },
                { label: "FAQ", href: "#faq" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-primary-DEFAULT transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-white font-semibold text-base mb-5">
              Kontakt
            </h4>
            <div className="space-y-4 text-[15px]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary-DEFAULT mt-1 shrink-0" />
                <span className="text-white/50">
                  Seestrasse 15c<br />
                  78333 Stockach
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-DEFAULT shrink-0" />
                <a
                  href="tel:+4977718988861"
                  className="text-white/50 hover:text-primary-DEFAULT transition-colors"
                >
                  +49 7771 8988 861
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-DEFAULT shrink-0" />
                <a
                  href="mailto:info@forschungszulagenantrag.de"
                  className="text-white/50 hover:text-primary-DEFAULT transition-colors"
                >
                  info@forschungszulagenantrag.de
                </a>
              </div>
            </div>
          </div>

          {/* Legal & Social */}
          <div className="md:col-span-2">
            <h4 className="text-white font-semibold text-base mb-5">
              Rechtliches
            </h4>
            <ul className="space-y-3.5 text-[15px] mb-8">
              {[
                { label: "Impressum", href: "/impressum/" },
                { label: "Datenschutz", href: "/datenschutz/" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-primary-DEFAULT transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-white font-semibold text-base mb-4">
              Social Media
            </h4>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/stevekovacs/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-DEFAULT transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-DEFAULT transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-main py-5 text-center text-sm text-white/35">
          <p>
            &copy; {new Date().getFullYear()} Förder-Kompass. Alle Rechte
            vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
