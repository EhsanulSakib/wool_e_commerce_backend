# Module 02: Database setup · QA

## Automated

- [ ] `/ready` integration test passes against the test database
- [ ] Tests run in CI with the Postgres service container
- [ ] Running the test suite leaves the dev database untouched (row counts the same before and after)

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Start services (`npm run services:up` or native) | Postgres and Mailpit running; Mailpit UI opens on port 8025 | ☐ |
| 2 | `npm run db:migrate` on an empty database | `users` table and enums created | ☐ |
| 3 | `npm run db:studio` | `User` table visible with the seeded rows | ☐ |
| 4 | `npm run db:seed` twice | Same number of rows after the second run | ☐ |
| 5 | `GET /ready` with Postgres running | `200` | ☐ |
| 6 | Stop Postgres, `GET /ready` | `503` with `DB_UNAVAILABLE`; the app keeps running | ☐ |
| 7 | Start Postgres again, `GET /ready` | `200` again without restarting the app | ☐ |
| 8 | `npm run db:reset` | Database dropped, migrated and seeded again | ☐ |
| 9 | Start the app with a wrong `DATABASE_URL` format | Exits with a clear env validation message | ☐ |

## Non-functional

- [ ] Table and column names are snake_case in the database, camelCase in TypeScript
- [ ] Migration files are committed; no manual changes to the database outside migrations
- [ ] Passwords for local services exist only in `.env` / compose env, not in code

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
