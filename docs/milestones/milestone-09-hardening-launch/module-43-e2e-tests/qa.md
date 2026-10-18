# Module 43: End-to-end tests · QA

## Checks

| # | Check | Expected | ✓ |
|---|---|---|---|
| 1 | `npx playwright test` locally (full stack running) | All 10 journeys pass on desktop and mobile projects | ☐ |
| 2 | Run the suite 3 times in a row | No flaky failures | ☐ |
| 3 | CI run on a PR | Green; finishes in under ~10 minutes; report artifact uploaded | ☐ |
| 4 | Break something on purpose (e.g. hide the Place order button) | The related journey fails with a useful trace | ☐ |
| 5 | axe scans | 0 serious/critical violations | ☐ |
| 6 | Nightly run against staging | Runs and reports | ☐ |
| 7 | Production config with `SSLC_MODE=stub` | Refused at startup (stub mode not allowed in production) | ☐ |

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
