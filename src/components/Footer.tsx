import Link from "next/link";
import { Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-heading text-white/80">
      <div className="container-main py-16 lg:py-20">
        <div className="grid md:grid-cols-12 gap-10 lg:gap-14">
          {/* Company Info - wider column */}
          <div className="md:col-span-5">
            <div className="mb-5">
              <img
                src="https://forschungszulagenantrag.de/wp-content/uploads/2025/12/Logo_Header-1.png"
                alt="Förder-Kompass Logo"
                className="h-auto w-[200px] brightness-0 invert"
              />
            </div>
            <p className="text-white/60 text-[15px] leading-relaxed mb-6 max-w-sm">
              Professionelle ZIM-Fördermittelberatung für den Mittelstand. Wir
              begleiten Sie von der Projektidee bis zur Bewilligung – rein
              erfolgsbasiert.
            </p>
            <div className="space-y-3 text-[15px] text-white/60">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary-DEFAULT mt-0.5 shrink-0" />
                <span>
                  Seestrasse 15c
                  <br />
                  78333 Stockach
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-DEFAULT shrink-0" />
                <a
                  href="tel:+4977718988861"
                  className="hover:text-primary-DEFAULT transition-colors"
                >
                  +49 7771 8988 861
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-DEFAULT shrink-0" />
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
          <div className="md:col-span-3">
            <h4 className="text-white font-semibold text-base mb-5">
              ZIM Förderung
            </h4>
            <ul className="space-y-3 text-[15px]">
              {[
                { label: "ZIM Einzelprojekte", href: "#zim-foerderung" },
                {
                  label: "ZIM Kooperationsprojekte",
                  href: "#zim-foerderung",
                },
                { label: "ZIM International", href: "#zim-foerderung" },
                { label: "ZIM Fördersätze", href: "#zim-foerderung" },
                { label: "ZIM-Rechner", href: "/zim-rechner/" },
                { label: "FAQ", href: "#faq" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/55 hover:text-primary-DEFAULT transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="md:col-span-4 lg:col-span-4">
            <h4 className="text-white font-semibold text-base mb-5">
              Rechtliches
            </h4>
            <ul className="space-y-3 text-[15px] mb-8">
              {[
                { label: "Impressum", href: "/impressum/" },
                { label: "Datenschutz", href: "/datenschutz/" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/55 hover:text-primary-DEFAULT transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-white font-semibold text-base mb-4">
              Folgen Sie uns
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

            {/* Steve Kovacs Portrait */}
            <div className="mt-8 flex items-center gap-3">
              <img
                src="https://forschungszulagenantrag.de/wp-content/uploads/2025/12/cropped-stevecompass2.png"
                alt="Steve Kovacs – Geschäftsführer Förder-Kompass"
                className="w-12 h-12 rounded-full object-cover border-2 border-primary-DEFAULT/40"
              />
              <div>
                <p className="text-white text-sm font-semibold">Steve Kovacs</p>
                <p className="text-white/50 text-xs">
                  Geschäftsführer, Förder-Kompass
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-main py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/40">
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
