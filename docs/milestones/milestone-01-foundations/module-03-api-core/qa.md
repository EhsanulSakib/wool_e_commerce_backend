# Module 03: API core · QA

## Automated

- [x] All tests from todo section 8 pass (51 tests in total, including modules 01–02)
- [x] Example module tests pass (list with pagination/sort/search, get, create with validation, duplicate → 409)
- [x] `/openapi.json` validates as OpenAPI 3.1 with `npx @redocly/cli lint` (valid; 3 cosmetic warnings: license URL, no 4xx on `/health` and `/ready`)

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | `POST /api/v1/_example` with invalid fields | `400`, `error.code = "VALIDATION_ERROR"`, `details` names each field with its location | ☑ |
| 2 | `GET /api/v1/_example?limit=500` | `400` (chosen behavior: rejected, not clamped; documented in `pagination.ts`) | ☑ |
| 3 | `GET /api/v1/_example?page=2&limit=5` | `meta` has correct `page`, `limit`, `total`, `pages` | ☑ (automated) |
| 4 | Create the same name twice | Second call `409 EXAMPLE_NAME_TAKEN` | ☑ (automated) |
| 5 | `curl -I` any endpoint | `X-Request-Id`, `X-Content-Type-Options`, `Strict-Transport-Security`, no `X-Powered-By` | ☑ |
| 6 | Send `X-Request-Id: test-123` | Same id echoed back and visible in the log line | ☑ |
| 7 | Request with `Origin: https://evil.example` | No `Access-Control-Allow-Origin` header | ☑ |
| 8 | Send a 200 kb JSON body | `413 PAYLOAD_TOO_LARGE` | ☑ (automated) |
| 9 | `RATE_LIMIT_MAX=3`, send 4 requests | `429` with `Retry-After` and `RateLimit` headers | ☑ |
| 10 | Send `Authorization` and `Cookie` headers, check the production (JSON) log | Both `[Redacted]`; secret values found 0 times in the log | ☑ |
| 11 | Open http://localhost:4000/docs in a browser | Health, ready and example endpoints documented with schemas; page renders with no CSP errors in the console | ☐ (open it yourself) |
| 12 | `NODE_ENV=production` (docs default off) | `/docs` and `/api/v1/_example` return 404 | ☑ |

## Non-functional

- [x] Every route in the example uses `validate()`; no manual `req.body` checks
- [x] Controllers contain no data access; services contain no `req`/`res`
- [x] Error codes listed in `src/core/errors/error-codes.ts` and `docs/adding-a-module.md`
- [ ] Known: 6 high `npm audit` findings come from `tsc-alias`'s dev-only file watching dependencies (`braces`); nothing ships to production. Revisit in module 42.

## Result

| Date | Result | Notes |
|---|---|---|
| 2026-10-19 | Pass (except #11) | Check `/docs` in a browser |
