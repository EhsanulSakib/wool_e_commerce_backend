# Module 26: Staging deploy

| | |
|---|---|
| Milestone | 05 Storefront catalog |
| Repo | both |
| Depends on | 24, 25 |
| Unblocks | Milestone 05 QA, 44 |

## Goal

Put the whole stack on real hosting as a staging environment, so performance, SEO and cookies are tested in real conditions from now on, and every merge to `main` deploys automatically.

## Included

- **Database:** Neon Postgres (staging branch), `pg_trgm` enabled
- **Backend:** Render or Railway web service built from a multi-stage `Dockerfile` (non-root user, healthcheck on `/health`); `prisma migrate deploy` as the pre-deploy/release command; seed run once
- **Frontend:** Vercel project; preview deployments for PRs; production branch = `main` for staging
- **Email:** an SMTP sandbox inbox for staging (e.g. Mailtrap or a provider's test mode) so no real customer gets emails
- **Images:** Cloudinary, separate staging folder
- **Config:** env vars per environment documented in both `.env.example` files; secrets only in the hosting dashboards
- **Wiring:** frontend rewrites → backend URL; backend `CORS_ORIGINS`, `FRONTEND_URL`, `REVALIDATE_SECRET`; cookies work first-party through the rewrites
- **Keep staging out of search engines:** `robots.txt` disallow all + `X-Robots-Tag: noindex` header on staging
- **Monitoring:** free uptime check on `/health`
- **Runbook:** `docs/deploy.md` with how to deploy, run migrations, roll back, and rotate secrets

## Not included

- Production environment, custom domain, Sentry (module 44)
- Redis on staging (module 40)

## Notes

- Docker isn't required locally for this; Render/Railway build the Dockerfile. If Docker Desktop is installed (open question 1), test the image locally first.
- Free tiers sleep when idle; the first request after a while is slow. Note this when reading Lighthouse results (warm up first).

## You'll learn

- Environments and 12-factor configuration
- Multi-stage Docker builds
- Running migrations safely during deploys
- Rollbacks
