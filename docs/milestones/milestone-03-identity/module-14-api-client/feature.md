# Module 14: API client

| | |
|---|---|
| Milestone | 03 Identity |
| Repo | frontend |
| Depends on | 03, 04 |
| Unblocks | 15, 21, 25 |

## Goal

Connect the frontend to the backend with Next.js's built-in `fetch`, type-safely. The browser talks only to the Next.js origin (`/api/v1/*` is forwarded to Express), so auth cookies stay first-party. API types are generated from the backend's OpenAPI spec, so a backend change that breaks the frontend shows up as a TypeScript error. Client-side calls are made from Redux thunks.

## Included

- **Rewrites:** `next.config.ts` forwards `/api/v1/:path*` to `API_INTERNAL_URL`
- **Type generation:** `openapi-typescript` turns `/openapi.json` into `src/types/api.d.ts` (types only, no runtime code); script `npm run api:types`
- **Typed `fetch` wrapper** (`lib/api/request.ts`), hand-written: `apiRequest(path, { method, body, query, ...nextOptions })` built on the global `fetch`; it builds the URL, sends JSON, parses the standard response shape and returns `data` (and `meta`), or throws `ApiError`. Path, body and response types come from the generated OpenAPI types
- **Server helper** (`lib/api/server.ts`, `server-only`): calls `API_INTERNAL_URL` directly; forwards the request's cookies when needed; passes Next caching options straight to `fetch` (`next: { tags, revalidate }`, `cache: 'no-store'`); used by Server Components and Server Actions
- **Browser helper** (`lib/api/client.ts`): same-origin `/api/v1` with `credentials: 'include'`; used inside Redux thunks
- **Errors:** one `ApiError` class (status, code, message, field errors) + helper to map field errors onto forms; thunks use `rejectWithValue` so components get typed errors
- **Silent refresh (browser):** on `401`, call `/auth/refresh` once and retry; parallel `401`s share one refresh call ("single-flight"); if refresh fails, dispatch a "session expired" action and redirect to login on protected pages
- **Thunk conventions** (`store/createAppAsyncThunk.ts`): `createAsyncThunk.withTypes<{ state: RootState; dispatch: AppDispatch; rejectValue: ApiErrorPayload }>()`, so every thunk is typed the same way
- **Real client IP:** the server helper forwards `X-Forwarded-For` so the backend's rate limiter sees users, not the Next.js server (note from module 03)

## Not included

- Auth pages and route protection (module 15)
- Data libraries like TanStack Query or SWR (decided: Next.js `fetch` + Redux)

## Notes

- **Where data is fetched:** pages that need SEO fetch in Server Components (`lib/api/server.ts`) and benefit from Next's cache and request deduplication. Interactive changes (forms, cart, toggles) run in the browser through thunks (`lib/api/client.ts`), then call `router.refresh()` if server-rendered data on the page must update.
- Commit the generated types file so CI doesn't need a running backend; regenerate whenever the API changes.
- Server code never calls `/api/v1` through the public URL; it uses the internal URL to avoid an extra hop.

## You'll learn

- The proxy / backend-for-frontend pattern
- Generating types from an API contract and writing typed generics around `fetch`
- Next.js `fetch` caching options on the server
- Async thunks and error handling in Redux Toolkit
- Single-flight token refresh
