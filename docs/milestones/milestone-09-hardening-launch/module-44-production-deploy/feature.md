# Module 44: Production deploy

| | |
|---|---|
| Milestone | 09 Hardening & launch |
| Repo | both |
| Depends on | 41, 42, 43 |
| Unblocks | MVP launch |

## Goal

Launch: a production environment on a custom domain with real email delivery, monitoring, alerts, backups and a runbook, plus a portfolio-ready presentation of the project.

## Included

- **Environments:** production database (Neon main branch with backups/PITR), production backend service, Vercel production, Redis (Upstash), Cloudinary production folder
- **Domain:** custom domain on Vercel with HTTPS; API reached through the frontend rewrites (single public domain)
- **Email:** production SMTP provider, sending from the store domain with SPF, DKIM and DMARC records
- **Payments:** SSLCommerz live credentials if a registered business is available; otherwise production stays on sandbox and the site says so (portfolio mode)
- **Monitoring:** Sentry for frontend and backend (source maps, release tracking, environment tags); uptime checks with alerts (email/Telegram); log retention on the host
- **Deploy pipeline:** migrations with `prisma migrate deploy` before release; expand-and-contract approach for breaking schema changes; documented rollback
- **Launch checklist:** robots allows production; sitemap submitted to Google Search Console; analytics (privacy-friendly, e.g. Vercel Analytics, Plausible or Umami); favicon, manifest and OG images verified; 404/500 pages; legal pages; real contact details; staging still `noindex`
- **Runbook** (`docs/runbook.md`): deploy, rollback, restore database, rotate secrets, handle an incident, who to contact
- **Portfolio README** in both repos: what it is, live link, screenshots/GIFs (storefront, animations, admin), architecture diagram, tech stack, key engineering decisions (modular monolith, multi-currency, caching, auth), Lighthouse scores, how to run locally

## Not included

- Scaling beyond a single region/instance (post-MVP)

## Notes

- Do the launch on a quiet day, with the rollback steps open in another tab.
- Keep a short "launch log" in the PR: what was done, when, and any issues.

## You'll learn

- Running production: monitoring, alerting, backups
- Email deliverability (SPF, DKIM, DMARC)
- Presenting a project as a portfolio piece
