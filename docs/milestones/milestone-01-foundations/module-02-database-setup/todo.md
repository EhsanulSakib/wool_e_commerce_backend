# Module 02: Database setup · Todo

Branch: `feat/02-database-setup` (backend repo)

## 1. Services (Neon + Upstash, decided 2026-10-19)

- [x] Confirm the choice for ROADMAP open question 1 → Neon Postgres + Upstash Redis (cloud, no Docker)
- [x] `DATABASE_URL` (Neon pooled, `sslmode=verify-full`) and `DIRECT_URL` (Neon direct, for the Prisma CLI) in `.env`
- [x] `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` in `.env`
- [ ] Test database: create a Neon **branch** (e.g. `test`) and put its URLs in `TEST_DATABASE_URL` / `TEST_DIRECT_URL`
- [ ] Mailpit for local email (needed from module 11; install the binary or run it with Docker)

## 2. Prisma

- [x] Install `prisma` (dev), `@prisma/client`, `@prisma/adapter-pg`, `pg` (pinned to 7.10.1 — npm's `latest` tag points to an 8.0 release candidate)
- [x] `prisma.config.ts` (reads `DIRECT_URL`) and `schema.prisma` (`prisma-client` generator → `src/generated/prisma`, ESM, `.js` imports)
- [x] `DATABASE_URL` validated in `env.ts`; documented in `.env.example`
- [ ] Define enums `UserRole`, `UserStatus`
- [ ] Define `User` model with UUID v7 id, unique email, `@@map("users")`, timestamps
- [ ] `npm run db:migrate -- --name init` (creates the first migration and applies it to Neon)
- [ ] Open Prisma Studio and check the table

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

## 5. Test database

- [ ] Vitest global setup for integration tests: point Prisma at `TEST_DATABASE_URL`, run `prisma migrate deploy` once
- [ ] `tests/helpers/db.ts`: truncate all tables (except `_prisma_migrations`) between test files
- [ ] Integration test for `/ready` against the test branch

## 6. Scripts and docs

- [x] Scripts: `postinstall` (prisma generate), `db:generate`, `db:migrate`, `db:deploy`, `db:status`, `db:reset`, `db:studio`
- [ ] Script: `db:seed`
- [x] README: environment variables, why two database URLs, db scripts, `/ready`
- [ ] CI: integration tests against the Neon test branch (URLs as GitHub secrets)

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
