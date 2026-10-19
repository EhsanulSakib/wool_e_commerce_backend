# Module 02: Database setup · Todo

Branch: `feat/02-database-setup` (backend repo)

## 1. Services (Neon + Upstash, decided 2026-10-19)

- [x] Confirm the choice for ROADMAP open question 1 → Neon Postgres + Upstash Redis (cloud, no Docker)
- [x] `DATABASE_URL` (Neon pooled, `sslmode=verify-full`) and `DIRECT_URL` (Neon direct, for the Prisma CLI) in `.env`
- [x] `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` in `.env`
- [x] One database for everything (development, tests, scripts) — no separate test database (decided 2026-10-19)
- [ ] Mailpit for local email (needed from module 11; install the binary or run it with Docker)

## 2. Prisma

- [x] Install `prisma` (dev), `@prisma/client`, `@prisma/adapter-pg`, `pg` (pinned to 7.10.1 — npm's `latest` tag points to an 8.0 release candidate)
- [x] `prisma.config.ts` (reads `DIRECT_URL`) and `schema.prisma` (`prisma-client` generator → `src/generated/prisma`, ESM, `.js` imports)
- [x] `DATABASE_URL` validated in `env.ts`; documented in `.env.example`
- [x] Define enums `UserRole`, `UserStatus` (mapped to `user_role`, `user_status`)
- [x] Define `User` model with UUID v7 id, unique email, `@@map("users")`, `timestamptz` timestamps
- [x] `npm run db:migrate -- --name init` → `prisma/migrations/20261019060631_init` applied to Neon
- [ ] Open Prisma Studio (`npm run db:studio`) and check the table

## 3. Database and Redis clients

- [x] `src/core/db/prisma.ts`: single client with the pg driver adapter + pool, slow-query and warn/error logging through pino
- [x] `src/core/cache/redis.ts`: Upstash client with retries
- [x] Disconnect Prisma in the graceful shutdown in `server.ts`
- [x] Startup log showing whether the database and Redis are reachable
- [x] `GET /ready`: `SELECT 1` + Redis `PING`; `200 ready`, `200 degraded` (Redis down) or `503 DB_UNAVAILABLE`
- [x] Unit tests for `/ready` with mocked checks (tests never touch the real services)

## 4. Seeding

- [ ] `prisma/seed/index.ts` with a small `upsert`-based seed (a couple of users without passwords)
- [ ] Register the seed command in the Prisma config / package.json
- [ ] Run it twice and confirm no duplicates

## 5. Integration tests on the shared database

- [x] Vitest reads `.env`, so tests use the same Neon database and Upstash Redis (placeholders only when no `.env` exists, e.g. CI)
- [ ] `tests/helpers/factories.ts`: create test data with unique values (e.g. `test-<uuid>@example.com`) and return a `cleanup()` that deletes only those rows
- [ ] Rule for every test from now on: never truncate or reset tables, never `db:reset` from tests; clean up only what the test created (`afterEach`/`afterAll`)
- [ ] Integration test for `/ready` against the real database (skipped automatically when `.env` is missing)

## 6. Scripts and docs

- [x] Scripts: `postinstall` (prisma generate), `db:generate`, `db:migrate`, `db:deploy`, `db:status`, `db:reset`, `db:studio`
- [ ] Script: `db:seed`
- [x] README: environment variables, why two database URLs, db scripts, `/ready`
- [ ] CI: add `DATABASE_URL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` as GitHub secrets so integration tests can run there (they use the same database)

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
