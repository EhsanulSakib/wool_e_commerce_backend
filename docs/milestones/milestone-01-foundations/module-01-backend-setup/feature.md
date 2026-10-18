# Module 01: Backend setup

| | |
|---|---|
| Milestone | 01 Foundations |
| Repo | backend |
| Depends on | none |
| Unblocks | 02, 03 |

## Goal

Replace the NestJS + MongoDB code with a fresh Express 5 + TypeScript application skeleton: one that starts, logs, validates its config, shuts down cleanly and is covered by a first test and CI. The old code stays reachable through a git tag.

## Included

- Git: tag current `main` as `legacy-nestjs`, work on a new branch, remove all Nest files (keep `docs/`)
- `package.json` with scripts: `dev` (tsx watch), `build` (tsc), `start`, `lint`, `format`, `typecheck`, `test`
- `tsconfig.json` in strict mode with the `@/` path alias; Node version pinned (`.nvmrc` + `engines`)
- ESLint (flat config) + Prettier, `.editorconfig`
- `src/config/env.ts`: env vars loaded and validated with Zod; the app exits with a readable error if any are missing or wrong
- `src/core/logger`: pino (pretty output in development, JSON in production)
- `src/app.ts` builds the Express app; `src/server.ts` starts it and handles graceful shutdown (SIGINT/SIGTERM)
- `GET /health` route, a basic 404 handler and a basic error handler (refined in module 03)
- Vitest + Supertest setup with a test for `/health`
- `.env.example`, backend `README.md`
- GitHub Actions: lint, typecheck, test, build on every PR

## Not included

- Database and Prisma (module 02)
- Validation middleware, security headers, rate limiting, API docs (module 03)

## Deliverables

| Item | Description |
|---|---|
| `GET /health` | `200 { success: true, data: { status: "ok", uptime } }` |
| `npm run dev` | Restarts on file changes |
| CI workflow | `.github/workflows/ci.yml` |

## Notes

- Express 5 forwards errors from `async` handlers to the error middleware automatically, so no `asyncHandler` wrapper is needed.
- Keeping `app.ts` separate from `server.ts` lets tests import the app without opening a port.
- Start with only the env vars this module needs (`NODE_ENV`, `PORT`, `LOG_LEVEL`); each later module adds its own to `env.ts` and `.env.example`.

## You'll learn

- How an Express app is assembled and why the app/server split matters
- Fail-fast configuration with Zod
- Structured logging
- Graceful shutdown and why it matters in production
- Setting up CI from scratch
