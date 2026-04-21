#!/usr/bin/env tsx
/**
 * Main-Entry für den Self-Optimizer — wird von GitHub Actions ausgeführt.
 *
 * Flow:
 *   1. Config-Check: Mode == "disabled"? → exit 0
 *   2. Collectors: GSC + LLM-Sheet + Vercel Analytics
 *   3. Analyzers: Opportunities priorisieren
 *   4. Agent: Claude-Vorschläge einholen
 *   5. Actors: je nach Mode anwenden oder überspringen
 *   6. Report: Markdown in GitHub Action Summary + als Datei
 *   7. PR: falls Code geändert → erzeugen (über GH CLI)
 *
 * ENV:
 *   OPTIMIZER_MODE             disabled|dry-run|suggest|auto-low|auto-high
 *   GOOGLE_SERVICE_ACCOUNT_JSON (GSC + Sheets)
 *   ANTHROPIC_API_KEY
 *   VERCEL_TOKEN               (optional)
 *   VERCEL_PROJECT_ID          (optional)
 *   GITHUB_TOKEN               (Action-Runtime)
 */

import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { config, isEnabled, allowsAutoApply } from "./config";
import {
  collectGscData,
  collectLlmData,
  collectVercelAnalytics,
} from "./collectors";
import { analyzeAll } from "./analyzers";
import { proposeChanges, type AgentSuggestion } from "./agent";
import { applySuggestion, type ApplyResult } from "./actors";
import type { OptimizerRun, OptimizationOpportunity } from "./types";

const REPO_ROOT = path.resolve(__dirname, "..", "..");

async function main() {
  const runId = new Date().toISOString().replace(/[:.]/g, "-");
  const timestamp = new Date().toISOString();

  console.log(`\n━━━ SEO/GEO Self-Optimizer — Run ${runId} ━━━`);
  console.log(`Mode: ${config.mode}`);

  if (!isEnabled()) {
    console.log("Mode = disabled. Exit 0.");
    await writeReport({
      runId,
      timestamp,
      mode: config.mode,
      opportunities: [],
      applied: [],
      skipped: [],
      errors: [],
    });
    process.exit(0);
  }

  // ═══ 1. COLLECT ═══
  console.log("\n[1/4] Collecting signals...");
  const [gsc, llmRows, vercel] = await Promise.all([
    collectGscData(28),
    collectLlmData(),
    collectVercelAnalytics(28),
  ]);

  console.log(
    `  → GSC: ${gsc.queries.length} query-rows, ${gsc.pages.length} pages`
  );
  console.log(`  → LLM-Sheet: ${llmRows.length} rows`);
  console.log(
    `  → Vercel Analytics: ${vercel ? `${vercel.totalViews} views` : "n/a"}`
  );

  // ═══ 2. ANALYZE ═══
  console.log("\n[2/4] Analyzing...");
  const opportunities = analyzeAll({
    queries: gsc.queries,
    pages: gsc.pages,
    llmRows,
  });
  console.log(`  → ${opportunities.length} opportunities gefunden`);

  // Mode=dry-run: nur Report, kein Agent, keine Actors
  if (config.mode === "dry-run") {
    await writeReport({
      runId,
      timestamp,
      mode: config.mode,
      opportunities,
      applied: [],
      skipped: opportunities,
      errors: [],
    });
    console.log("\nDry-Run beendet. Report geschrieben.");
    return;
  }

  // ═══ 3. AGENT ═══
  console.log("\n[3/4] Agent-Entscheidungen...");
  // Batch auf 15 Opportunities pro Call (Token-Limit-Schutz)
  const suggestions: AgentSuggestion[] = [];
  for (let i = 0; i < opportunities.length; i += 15) {
    const batch = opportunities.slice(i, i + 15);
    const batchSuggestions = await proposeChanges(batch);
    // Index-Offset korrigieren (Agent zählt intern 0..n)
    suggestions.push(
      ...batchSuggestions.map((s) => ({
        ...s,
        opportunityIndex: s.opportunityIndex + i,
      }))
    );
  }

  // ═══ 4. APPLY (je nach Mode) ═══
  console.log("\n[4/4] Applying changes...");
  const applied: OptimizationOpportunity[] = [];
  const skipped: OptimizationOpportunity[] = [];
  const errors: string[] = [];
  const appliedResults: ApplyResult[] = [];

  for (const s of suggestions) {
    const opp = opportunities[s.opportunityIndex];
    if (!opp) continue;

    // Mode-Gate: erlauben wir Auto-Apply für diese Severity?
    const canAutoApply = allowsAutoApply(opp.severity);
    const isSuggestMode = config.mode === "suggest";

    if (s.action === "skip" || (!canAutoApply && !isSuggestMode)) {
      skipped.push(opp);
      continue;
    }

    try {
      if (isSuggestMode) {
        // Nur PR: wir wenden in einem Branch an — GH Action macht den PR
        const result = await applySuggestion(opp, s);
        if (result.applied) {
          applied.push(opp);
          appliedResults.push(result);
        } else {
          skipped.push(opp);
        }
      } else if (canAutoApply) {
        const result = await applySuggestion(opp, s);
        if (result.applied) {
          applied.push(opp);
          appliedResults.push(result);
        } else {
          skipped.push(opp);
        }
      }
    } catch (err) {
      errors.push(`${opp.description}: ${(err as Error).message}`);
      skipped.push(opp);
    }
  }

  console.log(
    `  → Applied: ${applied.length} / Skipped: ${skipped.length} / Errors: ${errors.length}`
  );

  // ═══ REPORT ═══
  await writeReport({
    runId,
    timestamp,
    mode: config.mode,
    opportunities,
    applied,
    skipped,
    errors,
  });

  // GitHub Action Output: signalisiert dem Workflow, ob ein PR nötig ist
  const hasChanges = applied.length > 0;
  if (process.env.GITHUB_OUTPUT) {
    const { appendFile } = await import("node:fs/promises");
    await appendFile(
      process.env.GITHUB_OUTPUT,
      `has_changes=${hasChanges}\nrun_id=${runId}\n`
    );
  }

  console.log(`\nRun ${runId} fertig.`);
}

async function writeReport(run: OptimizerRun): Promise<void> {
  const reportDir = path.join(REPO_ROOT, "scripts", "seo-optimizer", "reports");
  await mkdir(reportDir, { recursive: true });

  const markdown = renderMarkdown(run);
  const jsonPath = path.join(reportDir, `run-${run.runId}.json`);
  const mdPath = path.join(reportDir, `run-${run.runId}.md`);

  await writeFile(jsonPath, JSON.stringify(run, null, 2), "utf-8");
  await writeFile(mdPath, markdown, "utf-8");

  // GitHub Action Summary
  if (process.env.GITHUB_STEP_SUMMARY) {
    await writeFile(process.env.GITHUB_STEP_SUMMARY, markdown, "utf-8");
  }
}

function renderMarkdown(run: OptimizerRun): string {
  const lines = [
    `# SEO/GEO Self-Optimizer Run ${run.runId}`,
    ``,
    `- **Zeitpunkt:** ${run.timestamp}`,
    `- **Mode:** \`${run.mode}\``,
    `- **Opportunities:** ${run.opportunities.length}`,
    `- **Applied:** ${run.applied.length}`,
    `- **Skipped:** ${run.skipped.length}`,
    `- **Errors:** ${run.errors.length}`,
    ``,
  ];

  if (run.applied.length > 0) {
    lines.push(`## ✅ Angewandte Änderungen`, ``);
    for (const o of run.applied) {
      lines.push(
        `- **${o.kind}** (${o.severity}): ${o.description}`,
        `  - Rationale: ${o.rationale}`
      );
    }
    lines.push(``);
  }

  if (run.skipped.length > 0) {
    lines.push(`## ⏭️ Skipped (Review empfohlen)`, ``);
    for (const o of run.skipped.slice(0, 20)) {
      lines.push(`- **${o.kind}** (${o.severity}): ${o.description}`);
    }
    if (run.skipped.length > 20) {
      lines.push(`- ... +${run.skipped.length - 20} weitere`);
    }
    lines.push(``);
  }

  if (run.errors.length > 0) {
    lines.push(`## ⚠️ Errors`, ``);
    for (const e of run.errors) lines.push(`- ${e}`);
    lines.push(``);
  }

  return lines.join("\n");
}

main().catch((err) => {
  console.error("[fatal]", err);
  process.exit(1);
});
