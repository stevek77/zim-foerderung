/**
 * Geteilte Typen für den Self-Optimizer.
 */

export interface GscQueryRow {
  query: string;
  page: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
}

export interface GscPageSummary {
  page: string;
  impressions: number;
  clicks: number;
  avgPosition: number;
  topQueries: string[];
}

export interface LlmMentionRow {
  timestamp: string;
  llm: string;
  category: string;
  prompt: string;
  mentioned: boolean;
  url_cited?: string;
}

export interface VercelAnalyticsSummary {
  period: string;
  totalViews: number;
  topPages: Array<{ path: string; views: number }>;
  topReferrers: Array<{ source: string; views: number }>;
  topCountries: Array<{ country: string; views: number }>;
}

export interface OptimizationOpportunity {
  kind:
    | "title-ctr-gap"
    | "almost-win-query"
    | "llm-topic-gap"
    | "thin-content"
    | "missing-internal-link"
    | "missing-schema"
    | "image-alt-missing"
    | "llms-txt-stale";
  severity: "trivial" | "content" | "structural";
  targetFile?: string;
  description: string;
  currentValue?: string;
  suggestedValue?: string;
  evidence: Record<string, unknown>;
  rationale: string;
}

export interface OptimizerRun {
  runId: string;
  timestamp: string;
  mode: string;
  opportunities: OptimizationOpportunity[];
  applied: OptimizationOpportunity[];
  skipped: OptimizationOpportunity[];
  errors: string[];
  prUrl?: string;
}
