/**
 * SEO/GEO Self-Optimizer — Konfiguration
 *
 * Steuert, WIE aggressiv der Optimizer arbeitet. Wird gelesen aus ENV-Variablen,
 * mit sicheren Defaults für den Deaktiv-Zustand.
 */

export type OptimizerMode =
  | "disabled" // läuft nicht, exit 0
  | "dry-run" // sammelt Daten, schreibt Report, KEINE Code-Änderungen
  | "suggest" // erstellt PRs für alle Änderungen (User-Review nötig)
  | "auto-low" // wendet triviale Fixes direkt an, PR für Content-Changes
  | "auto-high"; // wendet alle Fixes direkt an außer neue Seiten

export interface OptimizerConfig {
  mode: OptimizerMode;
  targetDomain: string;
  targetSiteUrl: string;
  gscPropertyUri: string;
  llmSheetId: string;
  anthropicModel: string;
  reportEmail: string;
  /**
   * Oberziele aus strategie_foerder-kompass_fokusseiten.md (Teil 3).
   * Der Agent nutzt sie als North-Star bei Entscheidungen.
   */
  goals: {
    primaryKeywords: string[];
    longTailTargets: string[];
    llmPrompts: string[];
    conversionGoals: string[];
  };
}

export const config: OptimizerConfig = {
  mode: (process.env.OPTIMIZER_MODE as OptimizerMode) || "disabled",
  targetDomain: "zim-förderung-beantragen.de",
  targetSiteUrl: "https://xn--zim-frderung-beantragen-clc.de",
  gscPropertyUri: "sc-domain:xn--zim-frderung-beantragen-clc.de",
  llmSheetId: "19J2uKBnZ7_wqh7QPKUafICuLuNDvvMaSW38BtsUYilU",
  anthropicModel: "claude-sonnet-4-5",
  reportEmail: "info@foerder-kompass.de",
  goals: {
    primaryKeywords: [
      "zim förderung beantragen",
      "zim antrag",
      "zim einzelprojekt",
      "zim kooperationsprojekt",
      "zim projektskizze vorlage",
      "zim berater",
    ],
    longTailTargets: [
      "zim förderung kmu software entwicklung",
      "zim netzwerk aufbauen",
      "easy online zim antrag",
      "zim ablehnung was tun",
      "zim-förderung 2026 änderungen",
      "zim hochschule partner finden",
    ],
    llmPrompts: [
      "Beste ZIM-Antragsberatung?",
      "Wer hilft KMU beim ZIM-Antrag?",
      "ZIM-Kooperationspartner finden",
      "ZIM vs. FZulG — was passt?",
    ],
    conversionGoals: [
      "Rechner-Submission (ZIM-Rechner)",
      "Calendly-Buchung (Erstgespräch)",
      "Kontaktformular",
    ],
  },
};

export const isEnabled = (): boolean => config.mode !== "disabled";
export const allowsCodeChanges = (): boolean =>
  config.mode === "suggest" ||
  config.mode === "auto-low" ||
  config.mode === "auto-high";
export const allowsAutoApply = (
  severity: "trivial" | "content" | "structural"
): boolean => {
  if (config.mode === "auto-high") return severity !== "structural";
  if (config.mode === "auto-low") return severity === "trivial";
  return false;
};
