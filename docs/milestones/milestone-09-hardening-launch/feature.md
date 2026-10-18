# Milestone 09: Hardening & launch

| | |
|---|---|
| Repos | backend + frontend |
| Depends on | [08 Admin dashboard](../milestone-08-admin-dashboard/feature.md) (all MVP features done) |
| Next | Post-MVP advanced modules (ROADMAP section 8) |

## Goal

Make the finished MVP fast under load, secure, covered by end-to-end tests, and live in production with monitoring, backups and a runbook. This is also where the portfolio presentation (README, screenshots, scores) comes together.

## When it's done

- Catalog endpoints are served from Redis with correct invalidation; rate limits work across multiple instances.
- Lighthouse CI enforces performance budgets on every frontend PR.
- An OWASP-based security review is complete with all high findings fixed.
- Playwright tests cover the critical journeys and run in CI.
- Production runs on a custom domain with HTTPS, Sentry, uptime alerts and tested backups.

## Modules (build in this order)

| # | Module | Repo | Depends on | Summary |
|---|---|---|---|---|
| 40 | [Redis caching](module-40-redis-caching/feature.md) | backend | 17, 20, 28 | Cache-aside for catalog data, event-based invalidation, Redis rate-limit store, load tests |
| 41 | [Performance audit](module-41-performance-audit/feature.md) | both | 40 + storefront | Lighthouse CI budgets, bundle trimming, real-user Web Vitals, DB review |
| 42 | [Security audit](module-42-security-audit/feature.md) | both | all MVP modules | OWASP Top 10 review, CSP, IDOR tests, secret scanning, backups |
| 43 | [End-to-end tests](module-43-e2e-tests/feature.md) | frontend | all MVP modules | Playwright journeys, accessibility scans, CI with services |
| 44 | [Production deploy](module-44-production-deploy/feature.md) | both | 41, 42, 43 | Production environment, domain, email DNS, monitoring, launch checklist, portfolio README |

41, 42 and 43 are independent of each other and can be done in any order after 40.

## Not in this milestone

- New features. Anything found here that's a feature goes into the post-MVP backlog.
