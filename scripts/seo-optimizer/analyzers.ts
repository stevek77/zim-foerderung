/**
 * Analyzers — Regel-Engine, die aus Rohdaten konkrete OptimizationOpportunities macht.
 *
 * Jeder Analyzer ist rein deterministisch. Claude kommt erst im nächsten Schritt
 * (Agent), wenn es um kreative Entscheidungen geht (Title-Text generieren, etc.).
 */

import { config } from "./config";
import type {
  GscQueryRow,
  GscPageSummary,
  LlmMentionRow,
  OptimizationOpportunity,
} from "./types";

/**
 * "Almost-Win"-Queries: Position 4–15, also schon in erweiterter Sichtweite,
 * aber noch nicht Top-3. Jeder Position-Sprung hier hat den größten Klicks-Impact.
 */
export function findAlmostWins(
  queries: GscQueryRow[]
): OptimizationOpportunity[] {
  const opps: OptimizationOpportunity[] = [];
  for (const row of queries) {
    if (
      row.position >= 4 &&
      row.position <= 15 &&
      row.impressions >= 10 &&
      row.clicks <= 5
    ) {
      opps.push({
        kind: "almost-win-query",
        severity: "content",
        targetFile: pagePathToFile(row.page),
        description: `"${row.query}" rankt Pos ${row.position.toFixed(
          1
        )} mit ${row.impressions} Impressions aber nur ${row.clicks} Klicks`,
        evidence: row as unknown as Record<string, unknown>,
        rationale:
          "Top-of-Fold-Einbau des Keywords + H2-Sektion + FAQ-Eintrag. Position 4→2 entspricht typisch 2–3x Klicks.",
      });
    }
  }
  return opps;
}

/**
 * CTR-Lücken: Hohe Impressions (Top-10 Position) aber CTR < 2% → Title/Description
 * ist unattraktiv für den Suchenden.
 */
export function findCtrGaps(
  queries: GscQueryRow[]
): OptimizationOpportunity[] {
  const pageMap = new Map<string, { imp: number; clk: number }>();
  for (const row of queries) {
    if (row.position > 10) continue;
    const agg = pageMap.get(row.page) ?? { imp: 0, clk: 0 };
    agg.imp += row.impressions;
    agg.clk += row.clicks;
    pageMap.set(row.page, agg);
  }

  const opps: OptimizationOpportunity[] = [];
  for (const [page, agg] of pageMap) {
    if (agg.imp < 50) continue;
    const ctr = agg.clk / agg.imp;
    if (ctr < 0.02) {
      opps.push({
        kind: "title-ctr-gap",
        severity: "trivial",
        targetFile: pagePathToFile(page),
        description: `Seite ${page} hat ${agg.imp} Impressions aber nur ${(
          ctr * 100
        ).toFixed(1)}% CTR`,
        evidence: { page, impressions: agg.imp, clicks: agg.clk, ctr },
        rationale:
          "Title/Meta-Description optimieren: Power-Wörter ergänzen (Bis zu 60%, Kostenlos, 2026), Nutzen vorziehen.",
      });
    }
  }
  return opps;
}

/**
 * LLM-Topic-Lücken: Welche Prompts kriegen in 0/5 LLMs eine Erwähnung?
 * Das sind Content-Gaps für Topical Authority.
 */
export function findLlmTopicGaps(
  llmRows: LlmMentionRow[]
): OptimizationOpportunity[] {
  // Letzte 4 Wochen
  const cutoff = Date.now() - 28 * 86_400_000;
  const recent = llmRows.filter(
    (r) => new Date(r.timestamp).getTime() >= cutoff
  );

  const byPrompt = new Map<
    string,
    { category: string; total: number; mentioned: number }
  >();
  for (const r of recent) {
    const key = r.prompt;
    const agg = byPrompt.get(key) ?? {
      category: r.category,
      total: 0,
      mentioned: 0,
    };
    agg.total++;
    if (r.mentioned) agg.mentioned++;
    byPrompt.set(key, agg);
  }

  const opps: OptimizationOpportunity[] = [];
  for (const [prompt, agg] of byPrompt) {
    if (agg.total < 3) continue;
    if (agg.mentioned === 0 && agg.category.toLowerCase().includes("zim")) {
      opps.push({
        kind: "llm-topic-gap",
        severity: "content",
        description: `Prompt "${prompt}" (${agg.category}): 0/${agg.total} LLM-Erwähnungen`,
        evidence: { prompt, category: agg.category, runs: agg.total },
        rationale:
          "LLMs kennen FK nicht für dieses Topic. Neuer Spoke-Artikel oder H2-Sektion auf Hub-Seite mit Answer-Box-Format empfohlen.",
      });
    }
  }
  return opps;
}

/**
 * Thin-Content: Pages mit <300 Wörter, die in GSC Impressions haben.
 * (Lazy impl: wir prüfen das File-Inhalt in einem späteren Pass.)
 */
export function findThinContentCandidates(
  pages: GscPageSummary[]
): OptimizationOpportunity[] {
  const opps: OptimizationOpportunity[] = [];
  for (const p of pages) {
    if (p.impressions < 20) continue;
    if (p.avgPosition > 20) {
      opps.push({
        kind: "thin-content",
        severity: "content",
        targetFile: pagePathToFile(p.page),
        description: `Seite ${p.page} rankt Pos ${p.avgPosition.toFixed(
          1
        )} für ${p.topQueries.length} Queries mit ${p.impressions} Impressions`,
        evidence: p as unknown as Record<string, unknown>,
        rationale:
          "Tief-im-SERP ranken = Google hält Content für schwach. Ausbauen auf 1500+ Wörter, 8 H2-Sektionen, FAQ, Tabellen.",
      });
    }
  }
  return opps;
}

/**
 * Verbindet alle Analyzer.
 */
export function analyzeAll(input: {
  queries: GscQueryRow[];
  pages: GscPageSummary[];
  llmRows: LlmMentionRow[];
}): OptimizationOpportunity[] {
  const all = [
    ...findAlmostWins(input.queries),
    ...findCtrGaps(input.queries),
    ...findLlmTopicGaps(input.llmRows),
    ...findThinContentCandidates(input.pages),
  ];

  // Priorisieren: erst Impact-Treiber (almost-win, ctr-gap), dann Content-Gaps.
  const prio: Record<OptimizationOpportunity["kind"], number> = {
    "title-ctr-gap": 1,
    "almost-win-query": 2,
    "thin-content": 3,
    "llm-topic-gap": 4,
    "missing-internal-link": 5,
    "missing-schema": 6,
    "image-alt-missing": 7,
    "llms-txt-stale": 8,
  };
  all.sort((a, b) => prio[a.kind] - prio[b.kind]);
  return all;
}

/**
 * Map GSC-URL auf lokalen File-Pfad (App-Router-Konvention).
 */
function pagePathToFile(url: string): string | undefined {
  if (!url) return undefined;
  try {
    const u = new URL(url);
    const path = u.pathname.replace(/\/$/, "") || "/";
    if (path === "/") return "src/app/page.tsx";
    return `src/app${path}/page.tsx`;
  } catch {
    return undefined;
  }
}

/**
 * Nur für späteren Goals-Check: gibt die Ober-Keywords aus der Config zurück.
 */
export const goalKeywords = () => [
  ...config.goals.primaryKeywords,
  ...config.goals.longTailTargets,
];
