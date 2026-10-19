# Module 02: Database setup

| | |
|---|---|
| Milestone | 01 Foundations |
| Repo | backend |
| Depends on | 01 |
| Unblocks | 03, 11, 12 |

## Goal

Connect the app to PostgreSQL on Neon through Prisma and to Redis on Upstash, create the first model and migration, and set up seeding. One database is used for everything (development, tests and scripts), so tests are written to clean up after themselves instead of relying on a throwaway database.

## Included

- **Services (decided):** Neon Postgres + Upstash Redis, both in the cloud; no Docker
  - `DATABASE_URL`: Neon pooled endpoint, used by the app
  - `DIRECT_URL`: Neon direct endpoint, used only by the Prisma CLI (migrations)
  - `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`
- Prisma 7: `prisma.config.ts`, `schema.prisma`, `prisma-client` generator into `src/generated/prisma`, `pg` driver adapter
- Schema conventions: UUID v7 ids, `createdAt`/`updatedAt`, snake_case table/column names via `@@map`/`@map`
- First model: `User` (id, email, name, phone, role, status, timestamps). Auth fields are added in module 12, which teaches how a second migration alters a table
- Enums: `UserRole` (CUSTOMER, STAFF, ADMIN), `UserStatus` (INACTIVE, ACTIVE, BANNED)
- `src/core/db/prisma.ts`: one shared Prisma client with a connection pool, slow-query logging, disconnect on shutdown
- `src/core/cache/redis.ts`: Upstash client
- `GET /ready`: database + Redis checks (`503` if the database is down, `degraded` if only Redis is down)
- Seed infrastructure: `prisma/seed/index.ts`, idempotent (safe to run twice, uses upserts)
- Test data helpers that create uniquely named rows and delete only those
- npm scripts: `db:generate`, `db:migrate`, `db:deploy`, `db:status`, `db:seed`, `db:studio`

## Not included

- Auth fields, sessions, tokens (module 12)
- Catalog and order models (modules 17–29)
- Caching logic with Redis (module 40; only the client and health check here)
- Mailpit (set up with the email service in module 11)

## Deliverables

| Item | Description |
|---|---|
| First migration | Creates `users` table and enums on Neon |
| `GET /ready` | `200 ready` / `200 degraded` / `503 DB_UNAVAILABLE` |
| Seed | Idempotent seed command |
| Test helpers | Factories that create unique data and clean it up |

## Notes

- **Shared database rule:** because tests and development use the same database, no test, script or helper may truncate tables or run `db:reset`. Tests create data with unique values and delete exactly what they created.
- `npm run db:reset` wipes the whole database. With a single database that means all your data; only use it deliberately.
- Prisma 7's `migrate dev` doesn't regenerate the client; run `npm run db:generate` after schema changes (or `npm install`, which runs it via `postinstall`).

## You'll learn

- How migrations work and why they're committed to git
- Schema-first database design with Prisma
- Pooled vs direct database connections
- Writing tests that are safe to run against a shared database
