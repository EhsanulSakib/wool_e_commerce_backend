# Milestone 01: Foundations

| | |
|---|---|
| Repos | backend + frontend |
| Depends on | nothing |
| Next milestone | [02 Design system & storefront shell](../milestone-02-design-system/feature.md) |

## Goal

Get both repos into a clean, professional starting state. The backend becomes a fresh Express 5 + TypeScript app connected to PostgreSQL through Prisma, with validation, error handling, security middleware, logging, tests and API docs ready for every future module. The frontend is upgraded to the latest Next.js (the current 15.3.1 has critical security advisories), the theme system is fixed, and leftover code is cleaned up.

## When it's done

- `npm run dev` starts each app, following its README, in under 15 minutes from a fresh clone.
- The backend answers `/health`, `/ready` and shows API docs at `/docs`.
- The frontend builds with zero high/critical `npm audit` findings and switches themes without a flash.
- CI (lint, typecheck, test, build) runs on every PR in both repos.

## Modules (build in this order)

| # | Module | Repo | Depends on | Summary |
|---|---|---|---|---|
| 01 | [Backend setup](module-01-backend-setup/feature.md) | backend | none | Tag the NestJS code, start a fresh Express 5 + TS app with env validation, logging, health route, tests, CI |
| 02 | [Database setup](module-02-database-setup/feature.md) | backend | 01 | Local Postgres + Mailpit, Prisma, first `User` model and migration, seed and test-database setup |
| 03 | [API core](module-03-api-core/feature.md) | backend | 01, 02 | Errors, response format, Zod validation, security middleware, rate limiting, event bus, OpenAPI docs |
| 04 | [Frontend setup](module-04-frontend-setup/feature.md) | frontend | none | Upgrade Next, replace the Redux theme with `next-themes`, fix layout and Lenis, folder structure, CI |

Module 04 doesn't depend on the backend, so it can be built in parallel with 01–03.

## Not in this milestone

- Any business feature (auth, products, orders) — those start in milestone 03.
- Design tokens and UI components — milestone 02.
- Deployment — first staging deploy is module 26.

## Open questions that affect this milestone

- **Local database setup** (ROADMAP open question 1) — needed by module 02.
- **State management** (open question 2) — decided: Redux Toolkit for client state, Next.js `fetch` for data.
