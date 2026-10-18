# Module 01: Backend setup · QA

## Automated

- [x] `npm test` passes (4 tests: `/health` 200 + shape, no `X-Powered-By`, unknown route 404, invalid JSON 400)
- [x] `npm run lint` and `npm run typecheck` report no errors
- [x] `npm run build` produces `dist/` (aliases rewritten to relative paths) and `npm start` runs it
- [ ] CI is green on the PR

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | `git tag -l legacy-nestjs`, then `git checkout legacy-nestjs` | Tag exists and contains the old NestJS code | ☐ |
| 2 | `npm run dev`, edit a file | Server restarts automatically | ☐ (dev server verified running; try an edit yourself) |
| 3 | `curl localhost:<PORT>/health` | `200` with `{ success: true, data: { status: "ok", ... } }` | ☑ |
| 4 | `curl localhost:<PORT>/nope` | `404` in the standard error shape | ☑ |
| 5 | Remove `PORT` from `.env` or set it to `abc`, start | Exits with a clear message naming `PORT` | ☑ |
| 6 | Press Ctrl+C while running | Log shows graceful shutdown, process exits with code 0 | ☐ (shutdown verified by emitting SIGTERM in-process → exit 0; try Ctrl+C yourself) |
| 7 | Throw an error inside a test route (temporarily) | `500` with a generic message; full error in the log only | ☐ |
| 8 | `NODE_ENV=production npm start` | Logs are JSON, not pretty-printed | ☑ |
| 9 | Start a second instance on the same port | Clear "port already in use" message, exit 1 | ☑ |

## Non-functional

- [x] No `any` types without a comment explaining why
- [x] `process.env` is read only in `src/config/env.ts`
- [x] `.env` is git-ignored; `.env.example` lists every variable

## Result

| Date | Result | Notes |
|---|---|---|
| 2026-10-18 | Partial pass | Automated checks green locally. Remaining: CI on the PR, manual items 2, 6, 7 |
