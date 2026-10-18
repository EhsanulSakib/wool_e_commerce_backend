# Module 14: API client

| | |
|---|---|
| Milestone | 03 Identity |
| Repo | frontend |
| Depends on | 03, 04 |
| Unblocks | 15, 21, 25 |

## Goal

Connect the frontend to the backend in a type-safe way. The browser talks only to the Next.js origin (`/api/v1/*` is forwarded to Express), so auth cookies stay first-party. API types are generated from the backend's OpenAPI spec, so a backend change that breaks the frontend shows up as a TypeScript error.

## Included

- **Rewrites:** `next.config.ts` forwards `/api/v1/:path*` to `API_INTERNAL_URL`
- **Type generation:** `openapi-typescript` turns `/openapi.json` into `src/types/api.d.ts`; script `npm run api:types`
- **Typed client:** `openapi-fetch` (tiny, built on the generated types) or a hand-written wrapper if you want to learn the generics
- **Server client** (`lib/api/server.ts`): calls `API_INTERNAL_URL` directly, forwards the request's cookies when needed, supports Next caching options
- **Browser client** (`lib/api/client.ts`): same-origin requests with credentials
- **Errors:** one `ApiError` class (status, code, message, field errors) + helper to map field errors onto forms
- **Silent refresh:** on `401` in the browser, call `/auth/refresh` once and retry; parallel `401`s share one refresh call ("single-flight"); if refresh fails, clear user state and redirect to login when on a protected page
- **TanStack Query:** provider with defaults (sensible `staleTime`, no retry on 4xx), devtools in development
- **State management:** install TanStack Query here (ROADMAP open question 2); Zustand comes in module 30

## Not included

- Auth pages and route protection (module 15)

## Notes

- Commit the generated types file so CI doesn't need a running backend; regenerate whenever the API changes.
- Server Components never call `/api/v1` through the public URL; they use the internal URL to avoid an extra hop.

## You'll learn

- The proxy / backend-for-frontend pattern
- Generating types from an API contract
- Single-flight token refresh
- Server-side vs client-side data fetching in the App Router
