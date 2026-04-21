/**
 * Claude-Agent — für kreative Entscheidungen (neue Titles, Meta-Descriptions,
 * H2-Vorschläge, interne-Link-Texte).
 *
 * Der Agent bekommt die OptimizationOpportunities + den aktuellen File-Inhalt
 * und gibt konkrete String-Vorschläge zurück. Er lehnt ab, wenn er sich unsicher
 * ist ("rationale: unsure").
 *
 * Tool-Use: NICHT nötig für diese Aufgabe — der Agent gibt strukturiertes JSON
 * zurück, das deterministisch von Actors angewendet wird.
 */

import Anthropic from "@anthropic-ai/sdk";
import { config } from "./config";
import type { OptimizationOpportunity } from "./types";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "",
});

export interface AgentSuggestion {
  opportunityIndex: number;
  action: "apply" | "skip";
  newTitle?: string;
  newDescription?: string;
  newH2?: string;
  newFaqQA?: { question: string; answer: string };
  newInternalLink?: { anchorText: string; href: string };
  confidence: "high" | "medium" | "low";
  reasoning: string;
}

const SYSTEM_PROMPT = `Du bist der SEO/GEO-Optimierungs-Agent für eine deutsche Fachberatungs-Website im ZIM-Förderprogramm-Bereich.

OBERZIELE:
${JSON.stringify(config.goals, null, 2)}

DEIN AUFTRAG:
Du bekommst eine Liste von OptimizationOpportunities. Für jede entscheidest du:
- APPLY: konkreten String-Vorschlag liefern (Title/Desc/H2/FAQ/Link)
- SKIP: wenn Daten zu schwach sind oder Änderung ein Risiko wäre

REGELN:
1. Titles: max. 60 Zeichen. Primärkeyword am Anfang. Power-Wörter erlaubt (Bis zu 60%, Kostenlos, Erfolgsbasiert, 2026).
2. Descriptions: max. 155 Zeichen. Nutzen + Vertrauen + Handlungsaufforderung.
3. H2s: Frage-Format bevorzugt ("Was ist ein ZIM-Kooperationsprojekt?"), weil LLMs Q&A-Blöcke bevorzugt zitieren.
4. FAQ-Antworten: 2–4 Sätze, faktisch präzise, mit Zahlen (2026-Konditionen).
5. Keine Clickbait-Übertreibungen. Keine falschen Versprechen.
6. Immer auf Deutsch.
7. Bei Unsicherheit: action=skip, confidence=low, reasoning begründen.

AUSGABE:
JSON-Array von AgentSuggestion-Objekten. Genau ein Objekt pro Opportunity, in gleicher Reihenfolge.`;

/**
 * Ruft Claude für eine Batch von Opportunities und gibt strukturierte Vorschläge zurück.
 */
export async function proposeChanges(
  opportunities: OptimizationOpportunity[]
): Promise<AgentSuggestion[]> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log("[agent] ANTHROPIC_API_KEY fehlt — Agent skipped (dry-run)");
    return opportunities.map((_, i) => ({
      opportunityIndex: i,
      action: "skip" as const,
      confidence: "low" as const,
      reasoning: "No API key — dry-run mode.",
    }));
  }

  if (opportunities.length === 0) return [];

  const userMessage = `Hier sind ${opportunities.length} Optimization-Opportunities. Liefere für jede genau ein AgentSuggestion-JSON.

${opportunities
  .map(
    (o, i) => `## Opportunity ${i}
- kind: ${o.kind}
- severity: ${o.severity}
- description: ${o.description}
- rationale: ${o.rationale}
- targetFile: ${o.targetFile ?? "—"}
- evidence: ${JSON.stringify(o.evidence)}
`
  )
  .join("\n")}

Antworte NUR mit einem JSON-Array (keine Erklärung drum herum). Schema:
[
  {
    "opportunityIndex": <number>,
    "action": "apply"|"skip",
    "newTitle"?: string,
    "newDescription"?: string,
    "newH2"?: string,
    "newFaqQA"?: {"question": string, "answer": string},
    "newInternalLink"?: {"anchorText": string, "href": string},
    "confidence": "high"|"medium"|"low",
    "reasoning": string
  }
]`;

  const resp = await client.messages.create({
    model: config.anthropicModel,
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });

  const text = resp.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n");

  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    console.error("[agent] Keine JSON-Ausgabe erkannt:", text.slice(0, 500));
    return opportunities.map((_, i) => ({
      opportunityIndex: i,
      action: "skip" as const,
      confidence: "low" as const,
      reasoning: "Agent-Parse-Fehler",
    }));
  }

  try {
    const parsed = JSON.parse(jsonMatch[0]) as AgentSuggestion[];
    console.log(
      `[agent] ${parsed.filter((p) => p.action === "apply").length}/${
        parsed.length
      } als apply vorgeschlagen`
    );
    return parsed;
  } catch (err) {
    console.error("[agent] JSON-Parse-Error:", (err as Error).message);
    return opportunities.map((_, i) => ({
      opportunityIndex: i,
      action: "skip" as const,
      confidence: "low" as const,
      reasoning: "Agent-JSON-Parse-Fehler",
    }));
  }
}
