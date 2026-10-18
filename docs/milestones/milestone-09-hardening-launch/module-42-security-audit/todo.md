# Module 42: Security audit · Todo

Branch: `feat/42-security-audit` (backend and frontend repos)

## 1. Prepare

- [ ] `docs/security-review.md` template (area, check, how tested, result, severity, fix, link to PR)

## 2. Backend review

- [ ] IDOR test suite (two users + guest) for orders, addresses, reviews, sessions, cart, wishlist, tracking
- [ ] Auth review (Argon2 params, JWT secret length, cookie flags in prod, revocation, rate limits)
- [ ] Raw SQL review; sort/filter allowlists
- [ ] Business logic abuse tests (quantities, tampering, currency/method mismatch, replays)
- [ ] Production config review (`/docs`, errors, headers, CORS, trust proxy)
- [ ] Security event logging added where missing

## 3. Frontend review

- [ ] CSP with nonces via `proxy.ts`; test every page (no console CSP violations)
- [ ] HSTS, Referrer-Policy, Permissions-Policy, X-Content-Type-Options in `next.config.ts` headers
- [ ] Search for `dangerouslySetInnerHTML`; confirm each use is safe
- [ ] Check no secrets in client bundles (search build output for env names/values)

## 4. Supply chain and secrets

- [ ] `npm audit --audit-level=high` step in both CI pipelines
- [ ] Dependabot/Renovate config in both repos
- [ ] gitleaks (or similar) in CI

## 5. Data

- [ ] Confirm backups/PITR on the production database plan
- [ ] Restore drill into a temporary branch; record time taken
- [ ] Data retention note; privacy policy review

## 6. Fix and report

- [ ] Fix all high/critical findings; plan medium/low ones
- [ ] Complete `docs/security-review.md`

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PRs merged, module marked ☑ in the ROADMAP master index
