# Module 41: Performance audit · Todo

Branch: `feat/41-performance-audit` (frontend and backend repos)

## 1. Measure

- [ ] Lighthouse (mobile + desktop) on all key pages on staging; record in [qa.md](qa.md)
- [ ] Bundle analyzer report saved
- [ ] `pg_stat_statements` enabled; top 10 slowest queries listed

## 2. Frontend fixes

- [ ] Move admin-only and heavy code behind dynamic imports
- [ ] Remove unused dependencies (check `package.json` against imports)
- [ ] `optimizePackageImports` for icon/utility packages
- [ ] Try the React Compiler; keep only if numbers improve
- [ ] Audit `sizes`/`priority` on every image
- [ ] Font weights and subsets trimmed
- [ ] Re-check animations at 4× CPU throttle; fix any jank

## 3. Backend fixes

- [ ] Index/query fixes for the slowest queries
- [ ] N+1 review of list endpoints
- [ ] Trim response payloads where over-fetching

## 4. Guardrails

- [ ] `lighthouserc` config with URLs, assertions and budgets
- [ ] GitHub Action running Lighthouse CI against the PR preview URL
- [ ] `useReportWebVitals` → `POST /api/v1/vitals` (sampled) → stored; simple admin view or log dashboard

## 5. Report

- [ ] `docs/performance-report.md` with before/after tables and explanations

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PRs merged, module marked ☑ in the ROADMAP master index
