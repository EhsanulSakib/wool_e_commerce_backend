# Module 02: Database setup · QA

## Automated

- [x] `/ready` unit tests (mocked checks) pass: ready, degraded, unavailable
- [x] `/ready` integration test passes against the real Neon database
- [x] Running the whole test suite leaves existing data untouched (`npm run test:cleanup` finds 0 leftover rows; factory test checks counts before/after)
- [x] Without credentials (CI without secrets) integration tests are skipped and the rest pass

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | `npm run dev` | Logs show "Database connected" and "Redis connected" | ☑ |
| 2 | `npm run db:status` | "Database schema is up to date" | ☑ |
| 3 | `npm run db:studio` | `User` table visible | ☐ |
| 4 | `npm run db:seed` twice | Same number of rows after the second run | ☑ |
| 5 | `GET /ready` | `200` with `status: "ready"` and latencies | ☑ |
| 6 | Set a wrong password in `DATABASE_URL`, restart, `GET /ready` | `503` with `DB_UNAVAILABLE`; the app keeps running | ☐ |
| 7 | Set a wrong `UPSTASH_REDIS_REST_TOKEN`, restart, `GET /ready` | `200` with `status: "degraded"` | ☐ |
| 8 | Start the app with `DATABASE_URL=abc` | Exits with a clear env validation message | ☐ |

## Non-functional

- [x] Table and column names are snake_case in the database, camelCase in TypeScript
- [ ] Migration files are committed; no manual changes to the database outside migrations
- [x] Connection strings and tokens exist only in `.env`, not in code
- [ ] No test or helper truncates tables or resets the database (search for `TRUNCATE`, `deleteMany({})`, `migrate reset`)

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
