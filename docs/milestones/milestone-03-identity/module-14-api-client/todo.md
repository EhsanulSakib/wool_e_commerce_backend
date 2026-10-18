# Module 14: API client · Todo

Branch: `feat/14-api-client` (frontend repo)

## 1. Config

- [ ] `API_INTERNAL_URL` (server only) in `lib/env.ts` and `.env.example`
- [ ] Rewrites in `next.config.ts`: `/api/v1/:path*` → `${API_INTERNAL_URL}/api/v1/:path*`
- [ ] Backend: add the frontend origin to `CORS_ORIGINS` (still needed for direct server calls in dev tools)

## 2. Types

- [ ] Install `openapi-typescript` (dev)
- [ ] Script `api:types` that fetches `http://localhost:<port>/openapi.json` and writes `src/types/api.d.ts`
- [ ] Commit the generated file; add a note in the README about regenerating

## 3. Clients

- [ ] Install `openapi-fetch` (or write the wrapper)
- [ ] `lib/api/server.ts`: base URL = internal URL, optional cookie forwarding from `cookies()`, cache/tag options
- [ ] `lib/api/client.ts`: base URL = `/api/v1`, `credentials: "include"`
- [ ] `lib/api/errors.ts`: `ApiError`, `isApiError`, `applyFieldErrors(form, error)`

## 4. Silent refresh

- [ ] Middleware/interceptor on the browser client: on 401 (not from `/auth/*`), run refresh once, retry the original request
- [ ] Single-flight: share one in-flight refresh promise
- [ ] On refresh failure: clear the `me` query, redirect to `/login?next=` if on a protected route

## 5. TanStack Query

- [ ] Install `@tanstack/react-query` + devtools
- [ ] `providers/query-provider.tsx` with defaults (`staleTime`, `retry` skips 4xx)
- [ ] Query key conventions documented in `lib/api/keys.ts`

## 6. Verify

- [ ] Temporary dev page calling `/health` from a Server Component and a Client Component
- [ ] Test for the single-flight refresh logic (mocked fetch)

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
