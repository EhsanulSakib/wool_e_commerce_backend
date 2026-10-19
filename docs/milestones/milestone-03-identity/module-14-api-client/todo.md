# Module 14: API client · Todo

Branch: `feat/14-api-client` (frontend repo)

## 1. Config

- [ ] `API_INTERNAL_URL` (server only) in a server env file (`lib/env.server.ts`, imports `server-only`) and `.env.example`
- [ ] Rewrites in `next.config.ts`: `/api/v1/:path*` → `${API_INTERNAL_URL}/api/v1/:path*`
- [ ] Backend: frontend origin in `CORS_ORIGINS`; `TRUST_PROXY` set so forwarded client IPs are trusted from the Next.js server

## 2. Types

- [ ] Install `openapi-typescript` (dev)
- [ ] Script `api:types` that fetches `http://localhost:4000/openapi.json` and writes `src/types/api.d.ts`
- [ ] Commit the generated file; README note about regenerating

## 3. Fetch wrapper

- [ ] `lib/api/errors.ts`: `ApiError`, `isApiError`, `toApiErrorPayload()`, `applyFieldErrors(form, error)`
- [ ] `lib/api/request.ts`: `apiRequest()` on top of `fetch` — URL + query building, JSON body, standard response parsing, typed by path/method from `api.d.ts`
- [ ] `lib/api/server.ts` (`server-only`): base URL = internal URL, optional cookie forwarding from `cookies()`, `X-Forwarded-For`, passes `next` / `cache` options to `fetch`
- [ ] `lib/api/client.ts`: base URL = `/api/v1`, `credentials: 'include'`
- [ ] Unit tests: query building, success parsing, error parsing to `ApiError`, field errors

## 4. Silent refresh (browser)

- [ ] On 401 (not from `/auth/*`): one refresh call, then retry the original request
- [ ] Single-flight: share one in-flight refresh promise
- [ ] On refresh failure: dispatch `sessionExpired`, redirect to `/login?next=` on protected routes
- [ ] Test with mocked `fetch`: 3 parallel 401s → 1 refresh → 3 retries

## 5. Redux thunk conventions

- [ ] `store/createAppAsyncThunk.ts` (typed `state`, `dispatch`, `rejectValue`)
- [ ] Example thunk + slice test using a mocked `fetch` (pending → fulfilled / rejected with `ApiError` payload)
- [ ] Document the pattern in the README (server fetch vs thunk)

## 6. Verify

- [ ] Temporary dev page: `/health` from a Server Component (server helper) and from a Client Component (thunk)

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
