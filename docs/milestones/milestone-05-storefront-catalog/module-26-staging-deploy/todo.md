# Module 26: Staging deploy · Todo

Branch: `feat/26-staging-deploy` (backend and frontend repos)

## 1. Accounts

- [ ] Neon project + staging branch
- [ ] Render or Railway account
- [ ] Vercel account linked to the frontend GitHub repo
- [ ] Staging SMTP sandbox
- [ ] Cloudinary staging folder

## 2. Backend

- [ ] Multi-stage `Dockerfile` (deps → build → slim runtime, non-root, `HEALTHCHECK`)
- [ ] `.dockerignore`
- [ ] Service on Render/Railway from the repo, auto-deploy on `main`
- [ ] Pre-deploy command `npm run db:deploy`
- [ ] Env vars set (DB, JWT, SMTP, Cloudinary, CORS, FRONTEND_URL, REVALIDATE_SECRET, DOCS_ENABLED)
- [ ] `X-Robots-Tag: noindex` when `APP_ENV=staging`
- [ ] Run seed + image seed once against staging

## 3. Frontend

- [ ] Vercel project, env vars (`API_INTERNAL_URL`, `REVALIDATE_SECRET`, `NEXT_PUBLIC_SITE_URL`, `APP_ENV=staging`)
- [ ] Confirm rewrites reach the backend
- [ ] Preview deployments enabled for PRs

## 4. Checks

- [ ] Login works on staging (cookies via rewrites)
- [ ] Revalidation works staging → staging
- [ ] Uptime monitor on backend `/health`

## 5. Docs

- [ ] `docs/deploy.md`: environments table, deploy flow, migrations, rollback steps, secret rotation
- [ ] Try a rollback once (redeploy previous version) and note how long it took

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PRs merged, module marked ☑ in the ROADMAP master index
