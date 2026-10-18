# Module 03: API core · Todo

Branch: `feat/03-api-core` (backend repo)

## 1. Errors and responses

- [ ] `core/errors/app-error.ts`: `AppError` + subclasses with default codes
- [ ] `core/errors/error-handler.ts`: handle `AppError`, `ZodError`, Prisma known errors (P2002, P2025), unknown errors
- [ ] Hide stack traces and internal messages when `NODE_ENV=production`
- [ ] `core/http/response.ts`: `ok`, `created`, `noContent`
- [ ] Replace the basic 404/error handlers from module 01

## 2. Validation and pagination

- [ ] `core/middleware/validate.ts`: validate `body`, `query`, `params`; store parsed values; typed with generics
- [ ] `core/http/pagination.ts`: `paginationQuery` Zod schema (page ≥ 1, limit 1–100, default 20) and `buildMeta(total, page, limit)`
- [ ] Sort parser: `?sort=price_asc` mapped through an allowlist to Prisma `orderBy`

## 3. Request id and logging

- [ ] `core/middleware/request-id.ts`: read `X-Request-Id` or generate one; set it on the response
- [ ] `pino-http` with the request id, response time and redaction paths
- [ ] Child logger available on `req.log`

## 4. Security

- [ ] Install and configure `helmet`, `cors`, `cookie-parser`, `compression`
- [ ] `CORS_ORIGINS` (comma-separated) and `TRUST_PROXY` in `env.ts`
- [ ] `express.json({ limit: "100kb" })` and `express.urlencoded` with a limit
- [ ] `core/middleware/rate-limit.ts`: global limiter + `createLimiter({ windowMs, max, keyGenerator })`
- [ ] Rate-limit responses use the standard error shape with `TOO_MANY_REQUESTS`

## 5. Event bus

- [ ] `core/events/event-bus.ts`: typed `emit` / `on` with an event map type
- [ ] Wrap handlers so async errors are caught and logged
- [ ] Unit test: handler runs, handler error doesn't throw to the emitter

## 6. OpenAPI docs

- [ ] Choose the Zod → OpenAPI approach and install it
- [ ] `core/openapi/registry.ts`: register schemas and routes
- [ ] `GET /openapi.json` and `/docs` page
- [ ] `DOCS_ENABLED` env flag (default on in development, off in production)
- [ ] Document `/health` and `/ready`

## 7. Module template

- [ ] `modules/_example`: routes, controller, service, repository, schema, test (GET list with pagination, POST with validation)
- [ ] `docs/adding-a-module.md`: step-by-step guide using the example
- [ ] Mount the example under `/api/v1/_example` in development only

## 8. Tests

- [ ] Validation error returns field details
- [ ] Prisma unique violation maps to 409
- [ ] Unknown error returns generic 500 in production mode
- [ ] Security headers present; disallowed CORS origin gets no CORS headers
- [ ] Body over the limit returns 413
- [ ] Rate limiter returns 429

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
