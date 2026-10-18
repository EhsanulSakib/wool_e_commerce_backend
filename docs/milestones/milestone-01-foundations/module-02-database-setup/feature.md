# Module 02: Database setup

| | |
|---|---|
| Milestone | 01 Foundations |
| Repo | backend |
| Depends on | 01 |
| Unblocks | 03, 11, 12 |

## Goal

Run PostgreSQL and Mailpit locally, connect the app through Prisma, and create the first model and migration. Set up seeding and an isolated test database so every later module can write integration tests safely.

## Included

- Local services (based on ROADMAP open question 1, assumption: Docker Desktop):
  - `docker-compose.yml` with PostgreSQL and Mailpit (Redis added later in module 40)
  - Alternative documented in the README: native PostgreSQL installer + Mailpit binary, or Neon cloud
- Prisma: install, `prisma.config.ts`, `schema.prisma`, generated client
- Schema conventions: UUID v7 ids, `createdAt`/`updatedAt`, snake_case table/column names via `@@map`/`@map`
- First model: `User` (id, email, name, phone, role, status, timestamps). Auth fields are added in module 12, which teaches how a second migration alters a table
- Enums: `UserRole` (CUSTOMER, STAFF, ADMIN), `UserStatus` (ACTIVE, INACTIVE, BANNED)
- `src/core/db/prisma.ts`: one shared Prisma client, slow-query logging in development, disconnect on shutdown
- `GET /ready`: checks the database with a simple query, `503` if it fails
- Seed infrastructure: `prisma/seed/index.ts`, idempotent (safe to run twice)
- Test database: separate `wool_test` database, reset before the test run, helper to truncate tables between test files
- npm scripts: `db:migrate`, `db:deploy`, `db:reset`, `db:seed`, `db:studio`

## Not included

- Auth fields, sessions, tokens (module 12)
- Catalog and order models (modules 17–29)
- Redis (module 40)

## Deliverables

| Item | Description |
|---|---|
| `docker-compose.yml` | Postgres on 5432, Mailpit SMTP on 1025 and web UI on 8025 |
| First migration | Creates `users` table and enums |
| `GET /ready` | `200` when the DB answers, `503` otherwise |
| Test DB setup | Integration tests never touch the dev database |

## Notes

- Use the current Prisma major version and follow its setup guide (newer versions use `prisma.config.ts` and a driver adapter for Postgres); check the docs at setup time.
- `DATABASE_URL` and `TEST_DATABASE_URL` are validated in `env.ts`.
- Mailpit is set up here because it's a local service like Postgres; the email code comes in module 11.

## You'll learn

- How migrations work and why they're committed to git
- Schema-first database design with Prisma
- Connection strings and connection pooling basics
- Keeping test data isolated from development data
