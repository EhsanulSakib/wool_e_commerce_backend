# Module 01: Backend setup · Todo

Branch: `feat/01-backend-setup` (backend repo)

## 1. Preserve the old code

- [ ] Commit or stash anything uncommitted on `main`
- [ ] `git tag legacy-nestjs` on the current `main` and push the tag
- [ ] Create branch `feat/01-backend-setup`
- [ ] Delete NestJS files (`src/`, `test/`, `nest-cli.json`, `tsconfig*.json`, `.eslintrc.js`, `package-lock.json`); keep `docs/`, `.git`, `.gitignore`
- [ ] Commit `docs/` (this roadmap) as the first commit on the branch

## 2. Project basics

- [ ] New `package.json` (`"type": "module"`, name `wool-backend`, `engines.node`)
- [ ] `.nvmrc` with the Node major version
- [ ] Install `express@5`, `zod`, `pino`, `pino-http`, `dotenv`
- [ ] Install dev deps: `typescript`, `tsx`, `@types/node`, `@types/express`, `pino-pretty`
- [ ] `tsconfig.json`: strict, `NodeNext` modules, `@/*` → `src/*`, `outDir: dist`
- [ ] Update `.gitignore` (`dist`, `coverage`, `.env`)

## 3. Config and logging

- [ ] `src/config/env.ts`: Zod schema for `NODE_ENV`, `PORT`, `LOG_LEVEL`; parse `process.env`; print readable errors and `process.exit(1)` on failure
- [ ] Export a typed `env` object; nothing else reads `process.env` directly
- [ ] `src/core/logger/index.ts`: pino instance, pretty transport only in development
- [ ] `.env.example` with every variable and a comment for each

## 4. App and server

- [ ] `src/app.ts`: `createApp()` that registers `express.json()`, routes, 404 handler, error handler
- [ ] `src/routes.ts`: router mounted at `/api/v1`, plus `/health` at the root
- [ ] `GET /health` returning `{ success: true, data: { status: "ok", uptime } }`
- [ ] Basic 404 handler returning the standard error shape
- [ ] Basic error handler (logs the error, returns `500` with a generic message)
- [ ] `src/server.ts`: start the server, log the URL, handle SIGINT/SIGTERM (stop accepting connections, close, exit), handle `unhandledRejection`

## 5. Code quality

- [ ] ESLint flat config with `typescript-eslint` + Prettier compatibility
- [ ] Prettier config (keep the existing `.prettierrc` style)
- [ ] Scripts: `dev`, `build`, `start`, `lint`, `format`, `typecheck`, `test`, `test:watch`
- [ ] Optional: Husky + lint-staged to lint staged files before commit

## 6. Tests

- [ ] Install `vitest`, `supertest`, `@types/supertest`
- [ ] `vitest.config.ts` with the path alias
- [ ] `src/app.test.ts`: `/health` returns 200 and the right shape; unknown route returns 404

## 7. CI and docs

- [ ] `.github/workflows/ci.yml`: install, lint, typecheck, test, build on PRs and pushes to `main`
- [ ] `README.md`: requirements, setup, scripts, folder structure, link to `docs/ROADMAP.md`

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
