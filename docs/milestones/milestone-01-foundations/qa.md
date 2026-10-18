# Milestone 01 QA: Foundations

Run this after every module in the milestone has passed its own `qa.md`. The milestone is done only when everything here passes.

## Entry criteria

- [ ] Modules 01, 02, 03 and 04 are ☑ in the ROADMAP master index
- [ ] CI is green on `main` in both repos

## Scenario 1: Fresh clone, backend

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Clone the backend repo into a new folder, follow only the README | App running in under 15 minutes, no undocumented steps | ☐ |
| 2 | Start without `.env` | Process exits with a clear list of missing variables | ☐ |
| 3 | `GET /health` | `200 { success: true, data: { status: "ok" } }` | ☐ |
| 4 | `GET /ready` with the database running, then stopped | `200` when up, `503` when down; app keeps running | ☐ |
| 5 | Open `/docs` | API docs page lists health, ready and the example endpoints | ☐ |
| 6 | `npm run lint && npm run typecheck && npm test && npm run build` | All pass | ☐ |

## Scenario 2: Fresh clone, frontend

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Clone the frontend repo into a new folder, follow only the README | Dev server running in under 10 minutes | ☐ |
| 2 | `npm audit --omit=dev` | No high or critical vulnerabilities | ☐ |
| 3 | Toggle theme, hard-reload in dark mode | No light flash, preference kept, no hydration warnings in the console | ☐ |
| 4 | `npm run build && npm start`, open the home page | Works in production mode | ☐ |

## Scenario 3: Request lifecycle (backend)

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Send an invalid body to the example validated endpoint | `400` with `error.code = "VALIDATION_ERROR"` and per-field details | ☐ |
| 2 | Call an unknown route | `404` JSON in the standard error shape | ☐ |
| 3 | Check response headers with `curl -I` | Security headers present (helmet), `X-Request-Id` present | ☐ |
| 4 | Find that request id in the server logs | One log line with method, path, status, duration; no cookies or auth headers in plain text | ☐ |
| 5 | Exceed the global rate limit (temporarily lower it) | `429` with `Retry-After` | ☐ |

## Cross-cutting checks

- [ ] Old NestJS code is reachable through the `legacy-nestjs` tag
- [ ] No secrets committed (`.env` ignored, `.env.example` complete in both repos)
- [ ] Both READMEs explain setup, scripts and folder structure
- [ ] Lighthouse baseline for the current home page recorded in module 04's `qa.md`

## Exit criteria

- [ ] All scenarios and checks above pass
- [ ] Open questions 1 and 2 in the ROADMAP are answered (or the assumption is accepted)

## Sign-off

| Date | Tester | Result | Notes |
|---|---|---|---|
| | | | |
