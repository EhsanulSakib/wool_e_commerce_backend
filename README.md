# Wool — Backend API

REST API for **Wool**, a wool knitwear e-commerce store (Bangladesh-based, multi-currency). Built as a learning and portfolio project.

**Stack:** Node.js · Express 5 · TypeScript · Zod · Pino · Vitest — PostgreSQL + Prisma from module 02.

The full plan (decisions, architecture, milestones and modules) lives in [`docs/ROADMAP.md`](docs/ROADMAP.md).

## Requirements

- Node.js 24 or newer (the version used for development is in `.nvmrc`)
- npm 10+

## Getting started

```bash
npm install
cp .env.example .env     # adjust values if needed
npm run dev              # http://localhost:4000/health
```

If a variable in `.env` is missing or invalid, the app refuses to start and prints which one.

## Scripts

| Script                            | What it does                                   |
| --------------------------------- | ---------------------------------------------- |
| `npm run dev`                     | Start in watch mode (restarts on file changes) |
| `npm run build`                   | Compile TypeScript to `dist/`                  |
| `npm start`                       | Run the compiled app (`dist/server.js`)        |
| `npm run typecheck`               | Type-check without emitting files              |
| `npm run lint`                    | ESLint                                         |
| `npm run format` / `format:check` | Prettier write / check                         |
| `npm test` / `test:watch`         | Vitest (unit + integration tests)              |

## Folder structure

```
src/
├─ server.ts          # starts the HTTP server, graceful shutdown
├─ app.ts             # builds the Express app (imported by tests)
├─ routes.ts          # mounts module routers under /api/v1
├─ config/env.ts      # environment variables, validated with Zod
├─ core/              # cross-cutting code: logger, errors, middleware
└─ modules/           # feature modules (health now; auth, catalog, orders… later)
```

Imports use the `@/` alias for `src/` (for example `@/config/env.js`). The `.js` extension is required by Node's ES module resolution; TypeScript maps it to the `.ts` file.

## API conventions

- Base path: `/api/v1`
- Success: `{ "success": true, "data": … }`
- Error: `{ "success": false, "error": { "code": "NOT_FOUND", "message": "…" } }`

## Endpoints

| Method | Path      | Description    |
| ------ | --------- | -------------- |
| GET    | `/health` | Liveness check |
