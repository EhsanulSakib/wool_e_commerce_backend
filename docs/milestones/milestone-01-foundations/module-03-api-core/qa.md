# Module 03: API core · QA

## Automated

- [ ] All tests from todo section 8 pass
- [ ] Example module tests pass (list with pagination, create with validation)
- [ ] `/openapi.json` validates as OpenAPI 3.1 (for example with `npx @redocly/cli lint`)

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | `POST /api/v1/_example` with a missing required field | `400`, `error.code = "VALIDATION_ERROR"`, `details` names the field | ☐ |
| 2 | `GET /api/v1/_example?limit=500` | `400` (or clamped to 100, whichever you chose and documented) | ☐ |
| 3 | `GET /api/v1/_example?page=2&limit=5` | `meta` has correct `page`, `limit`, `total`, `pages` | ☐ |
| 4 | Create the same unique record twice | Second call `409 CONFLICT` | ☐ |
| 5 | `curl -I` any endpoint | `X-Request-Id`, `X-Content-Type-Options`, `Strict-Transport-Security` (prod), no `X-Powered-By` | ☐ |
| 6 | Send `X-Request-Id: test-123` | Same id echoed back and visible in the log line | ☐ |
| 7 | Request from an origin not in `CORS_ORIGINS` (browser or `curl -H "Origin: ..."`) | No `Access-Control-Allow-Origin` header | ☐ |
| 8 | Send a 200 kb JSON body | `413` in the standard error shape | ☐ |
| 9 | Hit an endpoint above the limit (lower it temporarily) | `429` with `Retry-After` | ☐ |
| 10 | Send a request with `Authorization` and `Cookie` headers, check logs | Both shown as `[Redacted]` | ☐ |
| 11 | Open `/docs` | Health, ready and example endpoints documented with schemas | ☐ |
| 12 | Start with `NODE_ENV=production`, `DOCS_ENABLED=false` | `/docs` and `/openapi.json` return 404 | ☐ |

## Non-functional

- [ ] Every route in the example uses `validate()`; no manual `req.body` checks
- [ ] Controllers contain no Prisma calls; services contain no `req`/`res`
- [ ] Error codes are listed in `docs/adding-a-module.md` (or a codes file)

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
