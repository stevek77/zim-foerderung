import Link from "next/link";
import { Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-heading text-white/80">
      <div className="container-main py-14">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://forschungszulagenantrag.de/wp-content/uploads/2025/12/cropped-Logo_Forderkompass_m_Subline-320x107.png"
                alt="Förder-Kompass Logo"
                className="h-9 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-white/50 text-[15px] leading-relaxed mb-5 max-w-md">
              Professionelle ZIM-Fördermittelberatung für den Mittelstand. Wir
              begleiten Sie von der Projektidee bis zur Bewilligung – rein
              erfolgsbasiert.
            </p>
            <div className="space-y-2 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-DEFAULT" />
                Seestrasse 15c, 78333 Stockach
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-DEFAULT" />
                <a
                  href="tel:+4977718988861"
                  className="hover:text-primary-DEFAULT transition-colors"
                >
                  +49 7771 8988 861
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-DEFAULT" />
                <a
                  href="mailto:info@forschungszulagenantrag.de"
                  className="hover:text-primary-DEFAULT transition-colors"
                >
                  info@forschungszulagenantrag.de
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">
              ZIM Förderung
            </h4>
            <ul className="space-y-2 text-sm">
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

          {/* Legal & Social */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">
              Rechtliches
            </h4>
            <ul className="space-y-2 text-sm mb-6">
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

            <h4 className="text-white font-semibold text-sm mb-3">
              Folgen Sie uns
            </h4>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/stevekovacs/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-DEFAULT transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-DEFAULT transition-colors"
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
        <div className="container-main py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <p>
            &copy; {new Date().getFullYear()} Förder-Kompass. Alle Rechte
            vorbehalten.
          </p>
          <p>USt-ID: DE299573120</p>
        </div>
      </div>
    </footer>
  );
}
