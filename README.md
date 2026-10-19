# Wool — Backend API

REST API for **Wool**, a wool knitwear e-commerce store (Bangladesh-based, multi-currency). Built as a learning and portfolio project.

**Stack:** Node.js · Express 5 · TypeScript · Zod · Pino · Vitest · PostgreSQL (Neon) + Prisma 7 · Redis (Upstash)

The full plan (decisions, architecture, milestones and modules) lives in [`docs/ROADMAP.md`](docs/ROADMAP.md).

## Requirements

- Node.js 24 or newer (the version used for development is in `.nvmrc`)
- npm 10+
- A [Neon](https://neon.tech) Postgres database and an [Upstash](https://upstash.com) Redis database (both have free tiers)

## Getting started

```bash
npm install              # also generates the Prisma Client
cp .env.example .env     # fill in the Neon and Upstash values
npm run dev              # http://localhost:4000/health
```

If a variable in `.env` is missing or invalid, the app refuses to start and prints which one. At startup the logs show whether the database and Redis are reachable; `GET /ready` shows the live status.

## Environment variables

| Variable                   | Required | Description                                                                        |
| -------------------------- | -------- | ---------------------------------------------------------------------------------- |
| `NODE_ENV`                 | no       | `development` (default), `test` or `production`                                    |
| `PORT`                     | no       | HTTP port, default `4000`                                                          |
| `LOG_LEVEL`                | no       | Pino log level, default `info`                                                     |
| `DATABASE_URL`             | yes      | Neon **pooled** connection string (host contains `-pooler`), `sslmode=verify-full` |
| `DIRECT_URL`               | for CLI  | Neon **direct** connection string (no `-pooler`), used only by Prisma CLI commands |
| `DATABASE_POOL_MAX`        | no       | Max connections in the app's pool, default `10`                                    |
| `UPSTASH_REDIS_REST_URL`   | yes      | Upstash REST URL (`https://…upstash.io`)                                           |
| `UPSTASH_REDIS_REST_TOKEN` | yes      | Upstash REST token                                                                 |

**Why two database URLs?** Neon offers a pooled endpoint (PgBouncer) and a direct one. The app uses the pooled one because it handles many short connections well. Migrations need session features (advisory locks) that a transaction pooler doesn't support, so the Prisma CLI uses the direct one.

## Scripts

| Script                            | What it does                                       |
| --------------------------------- | -------------------------------------------------- |
| `npm run dev`                     | Start in watch mode (restarts on file changes)     |
| `npm run build`                   | Compile TypeScript to `dist/`                      |
| `npm start`                       | Run the compiled app (`dist/server.js`)            |
| `npm run typecheck`               | Type-check without emitting files                  |
| `npm run lint`                    | ESLint                                             |
| `npm run format` / `format:check` | Prettier write / check                             |
| `npm test` / `test:watch`         | Vitest (never touches the real database or Redis)  |
| `npm run db:generate`             | Regenerate the Prisma Client after a schema change |
| `npm run db:migrate`              | Create and apply a migration in development        |
| `npm run db:deploy`               | Apply pending migrations (CI / production)         |
| `npm run db:status`               | Show which migrations are applied                  |
| `npm run db:reset`                | Drop and recreate the database (development only!) |
| `npm run db:studio`               | Open Prisma Studio to browse data                  |

## Folder structure

```
prisma/
├─ schema.prisma      # database models (source of truth)
└─ migrations/        # SQL migrations, committed to git
prisma.config.ts      # Prisma CLI config (reads DIRECT_URL)
src/
├─ server.ts          # starts the HTTP server, checks dependencies, graceful shutdown
├─ app.ts             # builds the Express app (imported by tests)
├─ routes.ts          # mounts module routers under /api/v1
├─ config/env.ts      # environment variables, validated with Zod
├─ core/
│  ├─ db/prisma.ts    # the single Prisma Client (pg driver adapter + pool)
│  ├─ cache/redis.ts  # Upstash Redis client
│  ├─ health/         # database and Redis health checks
│  ├─ logger/         # pino
│  ├─ errors/         # global error handler
│  └─ middleware/     # 404 handler, later validation/auth/rate limits
├─ modules/           # feature modules (health now; auth, catalog, orders… later)
└─ generated/prisma/  # generated Prisma Client (git-ignored)
```

Imports use the `@/` alias for `src/` (for example `@/config/env.js`). The `.js` extension is required by Node's ES module resolution; TypeScript maps it to the `.ts` file.

## API conventions

- Base path: `/api/v1`
- Success: `{ "success": true, "data": … }`
- Error: `{ "success": false, "error": { "code": "NOT_FOUND", "message": "…" } }`

## Endpoints

| Method | Path      | Description                                                                                  |
| ------ | --------- | -------------------------------------------------------------------------------------------- |
| GET    | `/health` | Liveness: the process is running                                                             |
| GET    | `/ready`  | Readiness: `200 ready` / `200 degraded` (Redis down) / `503` (database down), with latencies |
