/**
 * Actors — wenden Agent-Suggestions als echte Code-Änderungen an.
 *
 * Jeder Actor ist idempotent und fail-safe: Er ändert nur Dateien, die er sicher
 * parsen kann. Bei Ambiguität überspringt er (→ manueller Review).
 *
 * Anwendungs-Strategie:
 *   - "trivial": Direkte Datei-Mutation (Title/Desc/Alt) — nur wenn mode=auto-low/auto-high
 *   - "content": Immer PR-only (erfordert Review)
 *   - "structural": Immer PR-only
 */

import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import type { OptimizationOpportunity } from "./types";
import type { AgentSuggestion } from "./agent";

export interface ApplyResult {
  applied: boolean;
  filePath?: string;
  changeDescription: string;
  rollbackHint?: string;
}

const REPO_ROOT = path.resolve(__dirname, "..", "..");

/**
 * Haupt-Dispatcher: entscheidet pro Opportunity, welcher Actor zuständig ist.
 */
export async function applySuggestion(
  opp: OptimizationOpportunity,
  suggestion: AgentSuggestion
): Promise<ApplyResult> {
  if (suggestion.action !== "apply") {
    return { applied: false, changeDescription: "Agent: skip" };
  }

  switch (opp.kind) {
    case "title-ctr-gap":
      if (suggestion.newTitle || suggestion.newDescription) {
        return applyMetadataUpdate(opp, suggestion);
      }
      break;
    case "almost-win-query":
      // Content-Changes passieren als PR-Vorschlag im Report, nicht als Direct-Edit.
      return {
        applied: false,
        changeDescription:
          "Content-Change: bleibt als Opportunity im PR-Body, nicht direkt angewendet",
      };
    case "llm-topic-gap":
      return {
        applied: false,
        changeDescription:
          "Topic-Gap: Content-Draft erfordert menschlichen Review, nur als Ticket im PR",
      };
    case "llms-txt-stale":
      return updateLlmsTxt(opp);
  }
  return {
    applied: false,
    changeDescription: `Kein Actor für kind=${opp.kind}`,
  };
}

/**
 * Actor: Metadata-Update in src/lib/metadata.ts ODER in page-spezifischer metadata-Variable.
 * Sucht den exakt passenden String und ersetzt ihn.
 */
async function applyMetadataUpdate(
  opp: OptimizationOpportunity,
  suggestion: AgentSuggestion
): Promise<ApplyResult> {
  const filePath = opp.targetFile ?? "src/lib/metadata.ts";
  const absPath = path.join(REPO_ROOT, filePath);

  if (!existsSync(absPath)) {
    return {
      applied: false,
      changeDescription: `File ${filePath} existiert nicht`,
    };
  }

  let content = await readFile(absPath, "utf-8");
  let modified = false;
  const changes: string[] = [];

  // Title
  if (suggestion.newTitle) {
    // Strategie: Suche Zeile mit 'title:' oder 'default:' in Metadata-Object.
    const titleMatch = content.match(
      /(title:\s*|default:\s*)"([^"]{10,120})"/
    );
    if (titleMatch) {
      content = content.replace(
        titleMatch[0],
        `${titleMatch[1]}"${suggestion.newTitle.replace(/"/g, '\\"')}"`
      );
      modified = true;
      changes.push(
        `Title: "${titleMatch[2]}" → "${suggestion.newTitle}"`
      );
    }
  }

  // Description
  if (suggestion.newDescription) {
    const descMatch = content.match(
      /(description:\s*\n?\s*)"([^"]{20,250})"/
    );
    if (descMatch) {
      content = content.replace(
        descMatch[0],
        `${descMatch[1]}"${suggestion.newDescription.replace(/"/g, '\\"')}"`
      );
      modified = true;
      changes.push(
        `Description: "${descMatch[2].slice(0, 50)}..." → "${suggestion.newDescription.slice(
          0,
          50
        )}..."`
      );
    }
  }

  if (!modified) {
    return {
      applied: false,
      changeDescription: "Kein passendes title/description-Pattern gefunden",
    };
  }

  await writeFile(absPath, content, "utf-8");
  return {
    applied: true,
    filePath,
    changeDescription: changes.join(" | "),
    rollbackHint: `git checkout HEAD -- ${filePath}`,
  };
}

/**
 * Actor: llms.txt aktualisieren.
 * Sucht das public/llms.txt und ersetzt die "Last-Updated"-Zeile.
 */
async function updateLlmsTxt(
  _opp: OptimizationOpportunity
): Promise<ApplyResult> {
  const filePath = "public/llms.txt";
  const absPath = path.join(REPO_ROOT, filePath);
  if (!existsSync(absPath)) {
    return { applied: false, changeDescription: "public/llms.txt fehlt" };
  }
  const content = await readFile(absPath, "utf-8");
  const today = new Date().toISOString().split("T")[0];
  const updated = content.replace(
    /Last-Updated:\s*\d{4}-\d{2}-\d{2}/,
    `Last-Updated: ${today}`
  );
  if (updated === content) {
    return { applied: false, changeDescription: "llms.txt aktuell" };
  }
  await writeFile(absPath, updated, "utf-8");
  return {
    applied: true,
    filePath,
    changeDescription: `llms.txt Last-Updated → ${today}`,
    rollbackHint: `git checkout HEAD -- ${filePath}`,
  };
}
