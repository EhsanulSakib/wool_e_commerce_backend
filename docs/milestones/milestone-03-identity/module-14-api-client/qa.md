# Module 14: API client · QA

## Automated

- [ ] Fetch wrapper tests pass (query building, success and error parsing)
- [ ] Single-flight refresh test: 3 parallel 401s → 1 refresh call → 3 retries
- [ ] Thunk test: rejected thunk carries a typed `ApiError` payload
- [ ] `npm run typecheck` passes with the generated types

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | `npm run api:types` with the backend running | `src/types/api.d.ts` updated | ☐ |
| 2 | Rename a field in a backend response schema, regenerate types | Frontend code using it fails typecheck | ☐ |
| 3 | Dev page: Client Component dispatches the health thunk | Network tab shows a same-origin `/api/v1/...` request; Redux DevTools shows pending → fulfilled | ☐ |
| 4 | Dev page: Server Component calls health via the server helper | Renders the result; no browser request for it | ☐ |
| 5 | Server fetch with `next: { tags: ['health'] }`, reload twice in production mode | Second render served from Next's cache (no new backend log line) | ☐ |
| 6 | Stop the backend, reload the dev page | Friendly error state, typed `ApiError`, no crash | ☐ |
| 7 | Trigger a validation error from a thunk | Rejected action payload has `code: "VALIDATION_ERROR"` and field errors | ☐ |
| 8 | Check backend logs for a server-side call | Client IP is the browser's, not the Next.js server's | ☐ |

## Non-functional

- [ ] `API_INTERNAL_URL` never appears in the browser bundle (search the build output)
- [ ] No data-fetching library added (only `fetch`, `openapi-typescript` types and Redux)

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
