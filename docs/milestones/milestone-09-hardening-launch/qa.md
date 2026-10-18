# Milestone 09 QA: Hardening & launch (launch gate)

Run this on **production** after modules 40–44 have each passed their own `qa.md`. This is the MVP launch gate.

## Entry criteria

- [ ] Modules 40–44 are ☑ in the ROADMAP master index
- [ ] All previous milestone QA files signed off

## Scenario 1: Production smoke test

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Open the production domain on a phone | HTTPS, correct site, fast first load | ☐ |
| 2 | Browse, filter, open a product, switch currency | Works in both currencies | ☐ |
| 3 | Register with a real email | Verification email arrives in the inbox (not spam) from the store domain | ☐ |
| 4 | Place a COD order | Order email received; order in `/admin/orders` | ☐ |
| 5 | Admin confirms, then cancels it (test order) | Emails received; stock restored | ☐ |
| 6 | Online payment (sandbox or live, depending on merchant status) | Works end to end | ☐ |

## Scenario 2: Operations

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Trigger a test error in frontend and backend | Both appear in Sentry with readable stack traces | ☐ |
| 2 | Stop the backend briefly (or point the uptime check at a broken URL) | Uptime alert received | ☐ |
| 3 | Restore the database from a backup into a temporary branch | Restore works; data intact | ☐ |
| 4 | Roll back a deploy | Previous version live within minutes | ☐ |

## Cross-cutting checks

- [ ] **Lighthouse CI** green on production URLs (home, shop, collection, product, cart, checkout); scores recorded below
- [ ] **E2E suite** green against staging in CI
- [ ] **Security review** report complete; no open high/critical findings
- [ ] **Search Console:** domain verified, sitemap submitted and accepted
- [ ] **robots.txt** on production allows crawling (and staging still blocks it)
- [ ] **Email DNS:** SPF, DKIM, DMARC pass (check with a mail-tester service)
- [ ] **Legal pages** live and linked in the footer
- [ ] **Portfolio README** in both repos with screenshots, architecture, stack, scores and live link

## Scores (production, mobile)

| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS | INP |
|---|---|---|---|---|---|---|---|
| Home | | | | | | | |
| Shop | | | | | | | |
| Product | | | | | | | |
| Checkout | | | | | | | |

## Exit criteria

- [ ] All scenarios and checks pass → **MVP launched** 🎉
- [ ] Post-MVP backlog prioritized for the next milestone

## Sign-off

| Date | Tester | Result | Notes |
|---|---|---|---|
| | | | |
