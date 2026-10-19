# Module 03: API core · Todo

Branch: `feat/03-api-core` (backend repo)

## 1. Errors and responses

- [x] `core/errors/app-error.ts`: `AppError` + `BadRequest`, `Validation`, `Unauthorized`, `Forbidden`, `NotFound`, `Conflict`, `TooManyRequests` (each takes an optional specific `code` and `details`)
- [x] `core/errors/error-codes.ts`: stable error code list
- [x] `core/errors/error-handler.ts`: maps `AppError`, `ZodError`, Prisma P2002 (409 + fields) / P2025 (404) / P2003 (409), body-parser errors (`INVALID_JSON`, `PAYLOAD_TOO_LARGE`), unknown errors (500)
- [x] Stack traces and internal messages only outside production (`mapError(err, { exposeInternalDetails })`)
- [x] `core/http/response.ts`: `ok`, `created`, `noContent`
- [x] Replaced the basic 404/error handlers from module 01

## 2. Validation and pagination

- [x] `core/middleware/validate.ts`: validates `params`, `query`, `body`; replaces them with parsed values (Express 5's read-only `req.query` handled); all issues reported at once with `location`; `ValidatedRequest<S>` type for controllers
- [x] `core/http/pagination.ts`: `paginationQuery` (page ≥ 1, limit 1–100, default 20), `toSkipTake()`, `buildPaginationMeta()`
- [x] `sortQuery(allowlist, default)`: `?sort=price_asc` → the matching `orderBy`; anything else rejected

## 3. Request id and logging

- [x] Request id via pino-http's `genReqId`: valid incoming `X-Request-Id` reused, otherwise a UUID; echoed in the response
- [x] `pino-http` one line per request (`GET /api/v1/... 200 12ms`, full path via `originalUrl`), level by status, `/health` and `/ready` not logged
- [x] Redaction of `authorization`, `cookie`, `set-cookie`, passwords and tokens in every log line
- [x] Child logger on `req.log` (used by the error handler)

## 4. Security

- [x] `helmet`, `cors`, `cookie-parser`, `compression` installed and configured (`core/http/security.ts`)
- [x] `CORS_ORIGINS`, `TRUST_PROXY`, `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX`, `DOCS_ENABLED` in `env.ts` and `.env.example`
- [x] `express.json` and `express.urlencoded` limited to 100 kb
- [x] `core/middleware/rate-limit.ts`: global limiter (health checks skipped) + `createRateLimiter({ windowMs, limit, keyGenerator, skip })`
- [x] Rate-limit responses: standard error shape, `TOO_MANY_REQUESTS`, `Retry-After`, `RateLimit` headers
- [x] Middleware order documented in `app.ts` (logger → helmet → CORS → rate limit → parsers → routes → 404 → errors)

## 5. Event bus

- [x] `core/events/event-bus.ts`: typed `on` / `emit` / `emitAndWait`; modules add events with declaration merging on `AppEvents`
- [x] Handlers deferred with `setImmediate` (never delay the response); sync and async errors caught and logged
- [x] Unit tests: delivery, background execution, failing handlers, unsubscribe

## 6. OpenAPI docs

- [x] `@asteasolutions/zod-to-openapi` with Zod 4's `.meta()` (no prototype patching)
- [x] `core/openapi/registry.ts`, `schemas.ts` (error/success/paginated shapes, response helpers), `document.ts` (OpenAPI 3.1)
- [x] `GET /openapi.json` and Scalar docs at `/docs` with a docs-only CSP
- [x] `DOCS_ENABLED` flag (default on in development, off in production)
- [x] `/health` and `/ready` documented; every operation has an `operationId`
- [x] Spec validated with Redocly: valid (3 cosmetic warnings)

## 7. Module template

- [x] `modules/_example`: schema, repository (in memory), service (NotFound/Conflict, emits `example.created`), controller, routes, openapi, index, tests
- [x] `docs/adding-a-module.md`: structure, layer rules, step by step, helpers, response shapes, error codes
- [x] Example mounted at `/api/v1/_example` only outside production (dynamic import, so it's not in production docs either)

## 8. Tests

- [x] Validation errors return every field with location
- [x] Prisma unique violation → 409 with fields; P2025 → 404
- [x] Unknown error → generic 500 with no details in production mode
- [x] Security headers present; allowed origin gets CORS headers, disallowed gets none; preflight works
- [x] Body over 100 kb → 413; invalid JSON → 400 `INVALID_JSON`
- [x] Rate limiter → 429 with `Retry-After`
- [x] Request id generated, echoed, invalid ids replaced
- [x] `/openapi.json`, `/docs`, docs disabled → 404

## Done when

- [x] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
