# Module 14: API client · QA

## Automated

- [ ] Single-flight refresh test: 3 parallel 401s → 1 refresh call → 3 retries
- [ ] `npm run typecheck` passes with the generated types

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | `npm run api:types` with the backend running | `src/types/api.d.ts` updated | ☐ |
| 2 | Rename a field in a backend response schema, regenerate types | Frontend code using it fails typecheck | ☐ |
| 3 | Dev page: Client Component calls `/api/v1/health` | Network tab shows a same-origin request that returns the backend response | ☐ |
| 4 | Dev page: Server Component calls health via the internal URL | Renders the result; no browser request for it | ☐ |
| 5 | Stop the backend, reload the dev page | Friendly error state, typed `ApiError` in the console, no crash | ☐ |
| 6 | Trigger a validation error from the browser client | `ApiError` has `code: "VALIDATION_ERROR"` and field errors | ☐ |
| 7 | Open React Query devtools in development | Queries visible | ☐ |

## Non-functional

- [ ] `API_INTERNAL_URL` is never exposed to the browser bundle (search the build output)
- [ ] The client library adds only a few KB to the bundle (check analyzer)

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
