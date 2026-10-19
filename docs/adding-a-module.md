# Adding a module

Every feature (auth, catalog, orders…) is a module in `src/modules/<name>/`. The reference implementation is [`src/modules/_example`](../src/modules/_example) (mounted at `/api/v1/_example` outside production). Copy its structure.

## Files

```
src/modules/products/
├─ products.schema.ts      # Zod schemas: request validation, types, API docs shapes
├─ products.repository.ts  # database access (Prisma) — the only file that queries tables
├─ products.service.ts     # business rules; throws AppErrors; emits events
├─ products.controller.ts  # HTTP in/out only: read validated input, call service, send response
├─ products.routes.ts      # paths + middleware chain (validate, auth, rate limits)
├─ products.openapi.ts     # registers the routes in the API docs
├─ products.test.ts        # tests (unit + HTTP with Supertest)
└─ index.ts                # public API: the only file other code may import
```

## The request flow

```
routes  →  validate(schemas)  →  controller  →  service  →  repository  →  Prisma
```

| Layer | May | May not |
|---|---|---|
| routes | wire middleware and controllers | contain logic |
| controller | read `req`, call services, use `ok()` / `created()` / `noContent()` | touch Prisma, contain business rules |
| service | enforce rules, throw `AppError`s, call repositories and other modules' `index.ts`, emit events | touch `req` / `res` |
| repository | run Prisma queries | contain business rules |

## Step by step

1. **Schemas** (`*.schema.ts`): define request schemas and group them per route:
   ```ts
   export const createProductSchemas = { body: CreateProductBodySchema } satisfies RequestSchemas;
   ```
   Give response shapes an id for the docs: `.meta({ id: 'Product' })`. Use `.strict()` on bodies so unknown fields are rejected.
2. **Repository**: Prisma calls only, using `select` to return just the needed columns.
3. **Service**: plain inputs in, plain data out. Throw `NotFoundError`, `ConflictError`… with a specific `code` when the frontend needs to react differently:
   ```ts
   throw new ConflictError('SKU already exists', { code: 'SKU_TAKEN', details: { field: 'sku' } });
   ```
4. **Controller**: type the request with the schemas:
   ```ts
   async create(req: ValidatedRequest<typeof createProductSchemas>, res: Response) {
     created(res, await productService.create(req.body));
   }
   ```
   No try/catch needed: Express 5 sends rejected promises to the error handler.
5. **Routes**: `router.post('/', validate(createProductSchemas), productController.create)`, and `import './products.openapi.js'` so the docs are registered.
6. **OpenAPI**: `registry.registerPath({ method, path, operationId, tags, request, responses })` using the helpers from `@/core/openapi/schemas.js`. Every operation gets an `operationId` (the frontend's generated client uses it).
7. **Mount** the router in `src/routes.ts`: `apiRouter.use('/products', productsRouter)`.
8. **Events**: declare emitted events next to the service and emit after the database work succeeded:
   ```ts
   declare module '@/core/events/event-bus.js' {
     interface AppEvents { 'product.updated': { productId: string; slug: string } }
   }
   eventBus.emit('product.updated', { productId, slug });
   ```
9. **Tests**: HTTP tests with Supertest against `createApp()`. Tests that touch the database follow the shared-database rules in the README (unique test data, clean up only what you created).

## Helpers available

| Import | What it gives you |
|---|---|
| `@/core/middleware/validate.js` | `validate(schemas)`, `ValidatedRequest<S>`, `RequestSchemas` |
| `@/core/http/response.js` | `ok(res, data, meta?)`, `created(res, data)`, `noContent(res)` |
| `@/core/http/pagination.js` | `paginationQuery`, `sortQuery(options, default)`, `toSkipTake()`, `buildPaginationMeta()` |
| `@/core/errors/app-error.js` | `BadRequestError`, `UnauthorizedError`, `ForbiddenError`, `NotFoundError`, `ConflictError`, `TooManyRequestsError` |
| `@/core/middleware/rate-limit.js` | `createRateLimiter({ windowMs, limit, keyGenerator? })` for stricter per-route limits |
| `@/core/events/event-bus.js` | `eventBus.emit()`, `eventBus.on()`, `eventBus.emitAndWait()` |
| `@/core/openapi/registry.js` + `schemas.js` | `registry`, `jsonResponse()`, `errorResponse()`, `successResponseSchema()`, `paginatedResponseSchema()`, `commonErrorResponses` |
| `@/core/db/prisma.js` | `prisma` (repositories only) |
| `req.log` | logger with the request id attached |

## Response shapes

```jsonc
// success
{ "success": true, "data": { … } }
// list
{ "success": true, "data": [ … ], "meta": { "page": 1, "limit": 20, "total": 57, "pages": 3 } }
// error
{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "Invalid request data", "details": [ … ] } }
```

## Error codes

Defined in [`src/core/errors/error-codes.ts`](../src/core/errors/error-codes.ts). Add module-specific codes there.

| Code | Status | When |
|---|---|---|
| `BAD_REQUEST` | 400 | Generic invalid request |
| `VALIDATION_ERROR` | 400 | Zod validation failed; `details` lists `{ location, path, message }` |
| `INVALID_JSON` | 400 | Body isn't valid JSON |
| `UNAUTHORIZED` | 401 | Not logged in / invalid token |
| `FORBIDDEN` | 403 | Logged in but not allowed |
| `NOT_FOUND` | 404 | Route or resource doesn't exist (also Prisma P2025) |
| `CONFLICT` | 409 | Unique constraint (Prisma P2002, `details.fields`) or related-record conflict (P2003) |
| `PAYLOAD_TOO_LARGE` | 413 | Body over 100 kb |
| `TOO_MANY_REQUESTS` | 429 | Rate limit hit; `Retry-After` header + `details.retryAfterSeconds` |
| `INTERNAL_ERROR` | 500 | Unexpected error (details only outside production) |
| `DB_UNAVAILABLE` | 503 | `/ready` when the database is down |
