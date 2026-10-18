# Module 01: Backend setup · Todo

Branch: `feat/01-backend-setup` (backend repo)

## 1. Preserve the old code

- [x] Commit or stash anything uncommitted on `main` (NestJS removal + docs committed in `15cd07a`)
- [ ] Tag the last NestJS commit: `git tag legacy-nestjs 46153a1` (the parent of `15cd07a`), then `git push origin legacy-nestjs`
- [ ] Create branch `feat/01-backend-setup` (the code is currently uncommitted on `main`; `git checkout -b feat/01-backend-setup` carries it over)
- [x] Delete NestJS files (done in `15cd07a`); keep `docs/`, `.git`
- [x] Commit `docs/` (done in `15cd07a`)

## 2. Project basics

- [x] New `package.json` (`"type": "module"`, name `wool-backend`, `engines.node`)
- [x] `.nvmrc` with the Node major version
- [x] Install `express@5`, `zod`, `pino` (`pino-http` moves to module 03 where request logging is built; `dotenv` not needed — Node's built-in `process.loadEnvFile()` loads `.env`)
- [x] Install dev deps: `typescript` (pinned to 6.0 — typescript-eslint doesn't support 7 yet), `tsx`, `tsc-alias`, `@types/node`, `@types/express`, `pino-pretty`
- [x] `tsconfig.json`: strict, `NodeNext` modules, `@/*` → `src/*`; `tsconfig.build.json` emits to `dist`
- [x] New `.gitignore` (`dist`, `coverage`, `.env`)

## 3. Config and logging

- [x] `src/config/env.ts`: Zod schema for `NODE_ENV`, `PORT`, `LOG_LEVEL`; readable errors and `process.exit(1)` on failure
- [x] Export a typed `env` object; nothing else reads `process.env` directly
- [x] `src/core/logger/index.ts`: pino instance, pretty transport only in development, silent in tests
- [x] `.env.example` with every variable and a comment for each

## 4. App and server

- [x] `src/app.ts`: `createApp()` that registers `express.json()`, routes, 404 handler, error handler
- [x] `src/routes.ts`: router mounted at `/api/v1`, plus `/health` at the root (`modules/health`)
- [x] `GET /health` returning `{ success: true, data: { status: "ok", uptime } }`
- [x] Basic 404 handler returning the standard error shape
- [x] Basic error handler (invalid JSON → 400, everything else logged + generic 500)
- [x] `src/server.ts`: start the server, log the URL, port-in-use message, SIGINT/SIGTERM graceful shutdown with a 10 s force-exit timer, `unhandledRejection` / `uncaughtException` handling

## 5. Code quality

- [x] ESLint flat config with `typescript-eslint` + Prettier compatibility (`eslint.config.js`)
- [x] Prettier config (kept the old style: single quotes, trailing commas) + `.prettierignore`, `.editorconfig`
- [x] Scripts: `dev`, `build`, `start`, `lint`, `format`, `format:check`, `typecheck`, `test`, `test:watch`
- [ ] Optional: Husky + lint-staged (skipped for now; CI runs the same checks)

## 6. Tests

- [x] Install `vitest`, `supertest`, `@types/supertest`
- [x] `vitest.config.ts` with the path alias
- [x] `src/app.test.ts`: `/health` 200 + shape, no `X-Powered-By`, unknown route 404, invalid JSON 400

## 7. CI and docs

- [x] `.github/workflows/ci.yml`: install, format check, lint, typecheck, test, build on PRs and pushes to `main`
- [x] `README.md`: requirements, setup, scripts, folder structure, link to `docs/ROADMAP.md`

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
