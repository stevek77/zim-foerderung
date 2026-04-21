/**
 * Data Collectors — liest die Signale, die der Optimizer für seine Entscheidungen braucht.
 *
 * Wichtig: Jeder Collector ist fault-tolerant. Wenn eine Quelle ausfällt
 * (z.B. GSC-API-Limit), liefert er [] statt den ganzen Run zu killen.
 */

import { google } from "googleapis";
import { config } from "./config";
import type {
  GscQueryRow,
  GscPageSummary,
  LlmMentionRow,
  VercelAnalyticsSummary,
} from "./types";

const log = (msg: string, data?: unknown) =>
  console.log(`[collector] ${msg}`, data ?? "");

/**
 * Google Search Console — Search Analytics API.
 * Auth via Service Account JSON in ENV `GOOGLE_SERVICE_ACCOUNT_JSON`.
 * Das Service-Account muss in GSC als "User" auf der Property angelegt sein.
 */
export async function collectGscData(
  daysBack = 28
): Promise<{ queries: GscQueryRow[]; pages: GscPageSummary[] }> {
  const sa = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!sa) {
    log("GOOGLE_SERVICE_ACCOUNT_JSON fehlt — GSC-Collector skipped");
    return { queries: [], pages: [] };
  }

  try {
    const credentials = JSON.parse(sa);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
    });
    const client = google.searchconsole({ version: "v1", auth });

    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date(Date.now() - daysBack * 86_400_000)
      .toISOString()
      .split("T")[0];

    // Query + Page Dimension
    const res = await client.searchanalytics.query({
      siteUrl: config.gscPropertyUri,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["query", "page"],
        rowLimit: 500,
      },
    });

    const rows = res.data.rows ?? [];
    const queries: GscQueryRow[] = rows.map((r) => ({
      query: r.keys?.[0] ?? "",
      page: r.keys?.[1] ?? "",
      impressions: r.impressions ?? 0,
      clicks: r.clicks ?? 0,
      ctr: r.ctr ?? 0,
      position: r.position ?? 0,
    }));

    // Pro-Seite-Aggregat
    const pageMap = new Map<
      string,
      { imp: number; clk: number; posSum: number; count: number; queries: Set<string> }
    >();
    for (const row of queries) {
      const existing = pageMap.get(row.page) ?? {
        imp: 0,
        clk: 0,
        posSum: 0,
        count: 0,
        queries: new Set<string>(),
      };
      existing.imp += row.impressions;
      existing.clk += row.clicks;
      existing.posSum += row.position * row.impressions;
      existing.count += row.impressions;
      existing.queries.add(row.query);
      pageMap.set(row.page, existing);
    }

    const pages: GscPageSummary[] = Array.from(pageMap.entries()).map(
      ([page, agg]) => ({
        page,
        impressions: agg.imp,
        clicks: agg.clk,
        avgPosition: agg.count > 0 ? agg.posSum / agg.count : 0,
        topQueries: Array.from(agg.queries).slice(0, 5),
      })
    );

    log(`GSC: ${queries.length} query-rows, ${pages.length} pages`);
    return { queries, pages };
  } catch (err) {
    log("GSC-Collector error:", (err as Error).message);
    return { queries: [], pages: [] };
  }
}

/**
 * LLM-Visibility — liest das Google Sheet aus dem n8n-Workflow.
 * Sheet-Struktur: Jede Zeile = 1 Prompt × 1 LLM × 1 Run.
 */
export async function collectLlmData(): Promise<LlmMentionRow[]> {
  const sa = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!sa) {
    log("GOOGLE_SERVICE_ACCOUNT_JSON fehlt — LLM-Collector skipped");
    return [];
  }

  try {
    const credentials = JSON.parse(sa);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    const sheets = google.sheets({ version: "v4", auth });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: config.llmSheetId,
      range: "A2:Z", // erste Zeile ist Header
    });

    const rows = (res.data.values ?? []) as string[][];
    const mapped: LlmMentionRow[] = rows
      .filter((r) => r.length > 3)
      .map((r) => ({
        timestamp: r[0] ?? "",
        llm: r[1] ?? "",
        category: r[2] ?? "",
        prompt: r[3] ?? "",
        mentioned: r[4]?.toLowerCase() === "true",
        url_cited: r[5],
      }));

    log(`LLM-Sheet: ${mapped.length} rows`);
    return mapped;
  } catch (err) {
    log("LLM-Collector error:", (err as Error).message);
    return [];
  }
}

/**
 * Vercel Web Analytics — cookieloses Tracking.
 * Auth via `VERCEL_TOKEN` ENV. Achtung: Analytics-API ist auf Pro-Plan beschränkt —
 * auf Hobby erwarten wir 403 und fallen zurück auf "leer".
 */
export async function collectVercelAnalytics(
  daysBack = 28
): Promise<VercelAnalyticsSummary | null> {
  const token = process.env.VERCEL_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  if (!token || !projectId) {
    log("VERCEL_TOKEN/VERCEL_PROJECT_ID fehlt — Analytics-Collector skipped");
    return null;
  }

  try {
    const since = Date.now() - daysBack * 86_400_000;
    const url = `https://vercel.com/api/web-analytics/timeseries?projectId=${projectId}&from=${since}&to=${Date.now()}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      log(`Vercel Analytics HTTP ${res.status} — oft Plan-Limit`);
      return null;
    }
    const data = (await res.json()) as {
      total?: number;
      topPaths?: Array<{ path: string; views: number }>;
      topSources?: Array<{ source: string; views: number }>;
      topCountries?: Array<{ country: string; views: number }>;
    };

    return {
      period: `${daysBack}d`,
      totalViews: data.total ?? 0,
      topPages: data.topPaths?.slice(0, 10) ?? [],
      topReferrers: data.topSources?.slice(0, 10) ?? [],
      topCountries: data.topCountries?.slice(0, 10) ?? [],
    };
  } catch (err) {
    log("Vercel-Analytics error:", (err as Error).message);
    return null;
  }
}
