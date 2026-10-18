# Module 03: API core

| | |
|---|---|
| Milestone | 01 Foundations |
| Repo | backend |
| Depends on | 01, 02 |
| Unblocks | 11, 12, 14, 17, 18 and every later backend module |

## Goal

Build the shared building blocks that every feature module uses: error classes, one response format, request validation, security middleware, rate limiting, request ids, an event bus and auto-generated API docs. After this module, adding a new feature module is mostly business logic.

## Included

- **Errors** (`core/errors`): `AppError` (status, code, message, details) and subclasses `BadRequest`, `Unauthorized`, `Forbidden`, `NotFound`, `Conflict`, `TooManyRequests`
- **Global error handler**: maps Zod errors → `400 VALIDATION_ERROR` with field details; Prisma unique violation → `409 CONFLICT`; Prisma record not found → `404`; anything else → `500` with a generic message (stack only in logs, never in production responses)
- **Response helpers** (`core/http`): `ok(res, data, meta?)`, `created(res, data)`, `noContent(res)`
- **Validation middleware**: `validate({ body, query, params })` with Zod; replaces the raw values with parsed, typed ones
- **Pagination helper**: `page`/`limit` parsing with a maximum, `meta: { page, limit, total, pages }`; sort parser with an allowlist
- **Request id + HTTP logging**: `X-Request-Id` (generated or passed through), `pino-http` with redaction of `authorization`, `cookie`, `set-cookie`, passwords
- **Security middleware**: `helmet`, CORS allowlist from `CORS_ORIGINS` with credentials, `cookie-parser`, JSON body limit (100 kb), `compression`, `trust proxy` setting from env
- **Rate limiting**: `express-rate-limit` global limiter + a factory for stricter per-route limits (in-memory store now; Redis in module 40)
- **Event bus** (`core/events`): typed wrapper around Node's `EventEmitter`; handlers are async and their errors are logged, never crash the request
- **OpenAPI docs**: registry that turns Zod schemas into an OpenAPI 3.1 spec; `GET /openapi.json` and an interactive docs page at `/docs` (Scalar or Swagger UI); disabled or protected in production via env
- **Module template**: a small example module (`modules/_example`) showing the routes → controller → service → repository pattern, plus `docs/adding-a-module.md`

## Not included

- Authentication middleware (module 12)
- Redis-backed rate limiting and caching (module 40)

## Deliverables

| Item | Description |
|---|---|
| Standard error shape | `{ success: false, error: { code, message, details? } }` |
| `validate()` | Used by every route from now on |
| `/openapi.json` | Consumed by the frontend type generator in module 14 |
| `/docs` | Interactive API docs; used to manage data until the admin UI exists |

## Notes

- Middleware order matters: request id → logger → helmet → cors → body parsers → rate limit → routes → 404 → error handler.
- Pick one OpenAPI approach for Zod (for example `@asteasolutions/zod-to-openapi`, or Zod's built-in JSON Schema output) and use it everywhere.
- Error codes are stable strings (`EMAIL_TAKEN`, `OUT_OF_STOCK`…) so the frontend can react to them without parsing messages.

## You'll learn

- Middleware order and the request lifecycle in Express
- Centralized error handling and why errors need codes
- Validation at the edge of the system
- Defense in depth: headers, CORS, limits
- Documenting an API from its own validation schemas
