"use client";

import { ArrowRight, ClipboardCheck, Clock, Zap } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";

const ARTIFACT_URL =
  "https://claude.ai/public/artifacts/42798373-04d4-497a-9060-64c569717f2e";

export default function Schnellcheck() {
  return (
    <section id="schnellcheck" className="py-20">
      <div className="container-main">
        <div className="max-w-4xl mx-auto bg-primary-light/40 border border-primary-DEFAULT/15 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <p className="text-primary-DEFAULT font-medium text-sm uppercase tracking-wider mb-3">
              Kostenloser Schnellcheck
            </p>
            <h2 className="text-[2rem] md:text-[2.25rem] mb-4">
              Sind Sie ZIM-förderfähig?
            </h2>
            <p className="text-body text-[17px] leading-relaxed max-w-2xl mx-auto">
              Prüfen Sie in 2&nbsp;Minuten kostenlos, ob Ihr Unternehmen die
              ZIM-Fördervoraussetzungen erfüllt. Unser interaktiver
              Fördercheck analysiert 6&nbsp;Kriterien und zeigt Ihnen sofort
              Ihre Förderperspektiven.
            </p>
          </div>

          {/* Feature-Punkte */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
            {[
              { icon: ClipboardCheck, label: "6 Fragen" },
              { icon: Clock, label: "2 Minuten" },
              { icon: Zap, label: "Sofort-Ergebnis" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-primary-DEFAULT/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary-DEFAULT" />
                </div>
                <span className="text-sm font-medium text-heading">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href={ARTIFACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTAClick("ZIM Fördercheck starten", "schnellcheck-section")}
              className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark shadow-lg shadow-primary-DEFAULT/30 text-[16px]"
            >
              ZIM Fördercheck starten
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-body-light text-sm mt-4">
              Kostenlos &amp; unverbindlich — keine Anmeldung erforderlich
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
