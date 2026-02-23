import { Phone, CheckCircle } from "lucide-react";

const trustPoints = [
  "Bis zu 60% Zuschuss",
  "Rein erfolgsbasierte Vergütung",
  "Kostenlose Erstberatung",
  "Über 85% Bewilligungsquote",
];

export default function Hero() {
  return (
    <section
      className="relative min-h-[620px] flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #06140C 0%, #071B14 40%, #0F3D34 100%)" }}
    >
      {/* Background pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      <div className="container-main relative z-10 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-primary-DEFAULT rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">
                BMWK-Förderprogramm · Seit 2015 aktiv
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[2.6rem] leading-tight text-white">
              ZIM Förderung beantragen –{" "}
              <span className="text-primary-DEFAULT">
                Bis zu 60% Zuschuss
              </span>{" "}
              für Ihr Innovationsprojekt
            </h1>

            <p className="text-lg text-white/80 max-w-xl leading-relaxed">
              Das Zentrale Innovationsprogramm Mittelstand (ZIM) fördert
              Forschungs- und Entwicklungsprojekte mit nicht-rückzahlbaren
              Zuschüssen. Wir begleiten Sie von der Projektidee bis zur
              Bewilligung – mit einer Erfolgsquote von über 85%.
            </p>

            {/* Trust Points */}
            <div className="grid grid-cols-2 gap-3">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-DEFAULT shrink-0" />
                  <span className="text-white/90 text-sm">{point}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="https://calendly.com/kovacs-termin"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill bg-primary-DEFAULT text-white hover:bg-primary-dark inline-flex items-center justify-center gap-2 text-lg shadow-lg shadow-primary-DEFAULT/25"
              >
                <Phone className="w-5 h-5" />
                Kostenlose Erstberatung
              </a>
              <a
                href="/zim-rechner/"
                className="btn-pill bg-white/10 text-white hover:bg-white/20 border border-white/20 inline-flex items-center justify-center text-lg backdrop-blur-sm"
              >
                ZIM-Rechner starten
              </a>
            </div>
          </div>

          {/* Right: Video/Visual placeholder */}
          <div className="hidden lg:block">
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 aspect-video flex items-center justify-center">
              {/* Placeholder for Motion Video - will be replaced with Wistia/Replit embed */}
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary-DEFAULT/20 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-10 h-10 text-primary-DEFAULT"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-white/60 text-sm">
                  Motion Video wird hier eingebettet
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-8 text-white/50 text-sm">
            <span>Gefördert durch:</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/10 rounded" />
              <span>BMWK</span>
            </div>
            <span className="hidden sm:block">|</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/10 rounded" />
              <span>ZIM</span>
            </div>
            <span className="hidden sm:block">|</span>
            <span>Über 50 bewilligte Projekte</span>
          </div>
        </div>
      </div>
    </section>
  );
}
