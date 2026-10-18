# Module 02: Database setup · Todo

Branch: `feat/02-database-setup` (backend repo)

## 1. Local services

- [ ] Confirm the choice for ROADMAP open question 1 (Docker Desktop / native / Neon)
- [ ] Docker route: install Docker Desktop, write `docker-compose.yml` with `postgres` (named volume, healthcheck) and `mailpit`
- [ ] Native route (if chosen): install PostgreSQL + Mailpit, document the steps in the README
- [ ] Create databases `wool_dev` and `wool_test`
- [ ] Open Mailpit at `http://localhost:8025`

## 2. Prisma

- [ ] Install `prisma` (dev) and `@prisma/client` (+ the Postgres driver adapter if the current version needs it)
- [ ] `npx prisma init`; set up `prisma.config.ts` and `schema.prisma`
- [ ] Add `DATABASE_URL` and `TEST_DATABASE_URL` to `env.ts` and `.env.example`
- [ ] Define enums `UserRole`, `UserStatus`
- [ ] Define `User` model with UUID v7 id, unique email, `@@map("users")`, timestamps
- [ ] `npm run db:migrate -- --name init` and commit the migration
- [ ] Open Prisma Studio and check the table

## 3. Database client

- [ ] `src/core/db/prisma.ts`: single client instance, query logging for slow queries in development
- [ ] Disconnect Prisma in the graceful shutdown in `server.ts`
- [ ] `GET /ready`: run `SELECT 1`; return `200` or `503 { error.code: "DB_UNAVAILABLE" }`

## 4. Seeding

- [ ] `prisma/seed/index.ts` with a small `upsert`-based seed (a couple of users without passwords)
- [ ] Register the seed command in the Prisma config / package.json
- [ ] Run it twice and confirm no duplicates

## 5. Test database

- [ ] Vitest global setup: point Prisma at `TEST_DATABASE_URL`, run `prisma migrate deploy` once
- [ ] `tests/helpers/db.ts`: truncate all tables (except `_prisma_migrations`) between test files
- [ ] Integration test for `/ready` (200 with DB up)

## 6. Scripts and docs

- [ ] Scripts: `db:migrate`, `db:deploy`, `db:reset`, `db:seed`, `db:studio`, `services:up`, `services:down`
- [ ] README: how to start services, run migrations, seed, open Studio and Mailpit
- [ ] CI: add a Postgres service container so integration tests run in GitHub Actions

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
