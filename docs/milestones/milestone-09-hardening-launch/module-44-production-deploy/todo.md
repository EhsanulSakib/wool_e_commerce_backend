# Module 44: Production deploy · Todo

Branch: `feat/44-production-deploy` (backend and frontend repos)

## 1. Infrastructure

- [ ] Production database (backups/PITR enabled), `pg_trgm` extension
- [ ] Production backend service + env vars (all secrets newly generated, not copied from staging)
- [ ] Vercel production env vars
- [ ] Upstash Redis production instance
- [ ] Cloudinary production folder; upload seed or real product images

## 2. Domain and email

- [ ] Buy/configure the domain; connect to Vercel; HTTPS
- [ ] Production SMTP provider; add SPF, DKIM, DMARC DNS records; test with a mail-tester service
- [ ] Update `MAIL_FROM`, `STORE_INBOX`, site URL settings

## 3. Payments

- [ ] Decide live vs sandbox (business registration); configure accordingly; show a notice if sandbox

## 4. Monitoring

- [ ] Sentry projects for frontend and backend; source maps uploaded on build; release names
- [ ] Uptime checks for frontend and backend `/health` with alerts
- [ ] Log retention settings

## 5. Launch

- [ ] Run migrations; seed reference data (currencies, shipping zones, settings, categories, admin account)
- [ ] Launch checklist from feature.md, item by item
- [ ] Submit sitemap in Google Search Console
- [ ] Analytics enabled

## 6. Docs and portfolio

- [ ] `docs/runbook.md`
- [ ] README rewrite in both repos with screenshots/GIFs, architecture diagram, decisions, scores, live link
- [ ] Final Lighthouse run on production; record scores in the milestone QA

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PRs merged, module marked ☑ in the ROADMAP master index
