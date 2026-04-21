# SEO/GEO Self-Optimizer

Wöchentlicher Agent, der die Site auf Basis der Oberziele aus `strategie_foerder-kompass_fokusseiten.md` analysiert und Änderungen vorschlägt oder direkt anwendet.

## Architektur

```
┌─ COLLECT ────────────────────────────────────────┐
│  GSC-API       → Queries × Pages × Position/CTR │
│  LLM-Sheet     → Mention-Rate pro Kategorie     │
│  Vercel Analyt → Pageviews + Sources + Bounce   │
└──────────────────┬───────────────────────────────┘
                   ▼
┌─ ANALYZE (Rule-Engine, deterministisch) ─────────┐
│  • Almost-Win-Queries (Pos 4–15)                 │
│  • CTR-Gaps (hohe Impressions, niedrige CTR)     │
│  • LLM-Topic-Gaps (0-Treffer-Prompts)            │
│  • Thin-Content-Candidates                       │
└──────────────────┬───────────────────────────────┘
                   ▼
┌─ AGENT (Claude Sonnet 4.5) ──────────────────────┐
│  Pro Opportunity: apply oder skip?               │
│  Generiert konkrete Title/Desc/H2/FAQ/Link       │
└──────────────────┬───────────────────────────────┘
                   ▼
┌─ ACT ────────────────────────────────────────────┐
│  Severity + Mode → direkt anwenden oder PR-only  │
└──────────────────┬───────────────────────────────┘
                   ▼
┌─ REPORT ─────────────────────────────────────────┐
│  Markdown-Bericht + JSON-Log                    │
│  Bei Code-Änderung: PR automatisch erzeugt      │
└──────────────────────────────────────────────────┘
```

## Modi

`OPTIMIZER_MODE` steuert das Verhalten:

| Mode | Verhalten |
|---|---|
| `disabled` | läuft nicht, exit 0 (Default) |
| `dry-run` | Collectors + Analyzer + Report, KEIN Agent-Call, KEINE Code-Änderung |
| `suggest` | Alle Vorschläge landen im PR, User reviewed |
| `auto-low` | Trivial-Fixes (Title/Desc/Alt/Schema) direkt angewendet, Content-PRs |
| `auto-high` | Alles außer neue Seiten wird direkt angewendet |

## Aktivierung

### Phase 1 — Setup (einmalig, ~20 Min)

1. **Google Cloud Service Account erstellen** (für GSC + Sheets)
   - https://console.cloud.google.com → Project → IAM & Admin → Service Accounts → Create
   - Keys → JSON → Download
   - In GSC (Property `sc-domain:xn--zim-frderung-beantragen-clc.de`) als **Nutzer "Vollständig"** hinzufügen
   - Im Google Sheet `19J2uKBnZ7_wqh7QPKUafICuLuNDvvMaSW38BtsUYilU` als **Viewer** hinzufügen

2. **GitHub Secrets setzen** (`Repo Settings → Secrets → Actions`)
   - `GOOGLE_SERVICE_ACCOUNT_JSON` = Inhalt der JSON-Datei (als String)
   - `ANTHROPIC_API_KEY` = existierender Key aus Anthropic Console
   - `VERCEL_TOKEN` = optional (erst wenn Pro-Plan)
   - `VERCEL_PROJECT_ID` = `prj_yBVrEbLCFV3OmjENYOty3Lj4Nn3Q`

3. **GitHub Variable setzen** (`Repo Settings → Variables → Actions`)
   - `OPTIMIZER_MODE` = `dry-run` für ersten Testlauf

### Phase 2 — Ersten Run manuell triggern

```
GitHub → Actions → SEO/GEO Self-Optimizer → Run workflow → mode: dry-run
```

Download Artifact `optimizer-run-<id>` → Report prüfen.

### Phase 3 — Hochschalten (schrittweise)

- **Woche 1–2:** `OPTIMIZER_MODE=suggest` — alle Änderungen als PR, manuell reviewen
- **Woche 3–4:** `OPTIMIZER_MODE=auto-low` — Triviales läuft auto, Content bleibt PR
- **Woche 5+:** `OPTIMIZER_MODE=auto-high` — außer neue Seiten (= `structural`)

Wechsel erfolgt über GitHub → Repo Settings → Variables → `OPTIMIZER_MODE`.

## Local Testing

```bash
# Disabled (Default)
npm run optimizer:dry

# Mit echten Credentials (env-Datei)
OPTIMIZER_MODE=dry-run \
GOOGLE_SERVICE_ACCOUNT_JSON="$(cat gsc-key.json)" \
ANTHROPIC_API_KEY=sk-... \
npx tsx scripts/seo-optimizer/run.ts
```

## Oberziele (aus `strategie_foerder-kompass_fokusseiten.md`)

Die Oberziele stehen in `config.ts` und werden dem Agent in jedem Run als System-Prompt mitgegeben:

1. Organische Google/Bing-Sichtbarkeit für Conversion-Keywords (`zim förderung beantragen`, …)
2. LLM-Erwähnung in Top-3 bei `Beste ZIM-Antragsberatung?`, `ZIM vs. FZulG — was passt?`
3. Topical Authority füllen (aktuell: 0/5 LLMs bei ZIM-Topic-Queries)
4. Lead-Generierung via Rechner + Calendly + Kontaktformular

## Schutz-Mechanismen

- **Deterministische Analyzer:** Keine Halluzinationen bei der Datenauswertung
- **Fault-tolerante Collectors:** Ein Ausfall killt nicht den ganzen Run
- **Idempotente Actors:** Wiederholte Runs produzieren keine Doppel-Changes
- **Rollback:** Jede Action loggt einen `rollbackHint` (git-Befehl)
- **PR-only für Content-Changes:** Content wird nie direkt gepusht, immer Review
- **Run-Artifacts:** 30 Tage aufbewahrt in GitHub Actions für Audit

## Impact-Messung (später)

Geplant für Phase 4+: Supabase-Tabelle `optimizer_runs` mit:
- `run_id`, `applied_changes[]`
- Nach +7 Tagen: `gsc_delta` (Klicks/Impressions-Änderung pro Target-Keyword)
- "Winning patterns" werden zu Rules → werden in `auto-high` aufgenommen

## Troubleshooting

- **"403 on GSC"** → Service Account ist nicht in GSC-Property als Nutzer angelegt
- **"Rate limit on Anthropic"** → Batch-Größe (aktuell 15 Opportunities pro Call) in `run.ts` senken
- **"Vercel Analytics 403"** → Hobby-Plan hat nur Dashboard-Zugang. Workaround: Collector liefert `null`, Optimizer arbeitet ohne Analytics-Signal weiter
- **"Workflow läuft nicht"** → `OPTIMIZER_MODE` Variable gesetzt? `github.com/<repo>/settings/variables/actions`
