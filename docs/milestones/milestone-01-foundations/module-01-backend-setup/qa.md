# Module 01: Backend setup · QA

## Automated

- [ ] `npm test` passes (`/health` 200, unknown route 404)
- [ ] `npm run lint` and `npm run typecheck` report no errors
- [ ] `npm run build` produces `dist/` and `npm start` runs it
- [ ] CI is green on the PR

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | `git tag -l legacy-nestjs`, then `git checkout legacy-nestjs` | Tag exists and contains the old NestJS code | ☐ |
| 2 | `npm run dev`, edit a file | Server restarts automatically | ☐ |
| 3 | `curl localhost:<PORT>/health` | `200` with `{ success: true, data: { status: "ok", ... } }` | ☐ |
| 4 | `curl localhost:<PORT>/nope` | `404` in the standard error shape | ☐ |
| 5 | Remove `PORT` from `.env` or set it to `abc`, start | Exits with a clear message naming `PORT` | ☐ |
| 6 | Press Ctrl+C while running | Log shows graceful shutdown, process exits with code 0 | ☐ |
| 7 | Throw an error inside a test route (temporarily) | `500` with a generic message; full error in the log only | ☐ |
| 8 | `NODE_ENV=production npm start` | Logs are JSON, not pretty-printed | ☐ |

## Non-functional

- [ ] No `any` types without a comment explaining why
- [ ] `process.env` is read only in `src/config/env.ts`
- [ ] `.env` is git-ignored; `.env.example` lists every variable

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
