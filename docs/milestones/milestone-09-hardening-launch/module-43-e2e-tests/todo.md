# Module 43: End-to-end tests · Todo

Branch: `feat/43-e2e-tests` (frontend repo; small backend change for the payment stub)

## 1. Setup

- [ ] Install `@playwright/test`, `@axe-core/playwright`; `npx playwright install`
- [ ] `playwright.config.ts`: base URL, desktop + mobile projects, trace/screenshot/video on failure, retries in CI
- [ ] Backend: `SSLC_MODE=stub` env flag that simulates init/validation responses (never enabled in production)

## 2. Helpers

- [ ] Auth fixtures (customer, staff, admin) using API login + storage state
- [ ] Mailpit helper (list messages for an address, extract the first link)
- [ ] API data factories (products, orders, delivered order for reviews)
- [ ] Global setup: run the idempotent seed (no reset — there is only one database); each test creates uniquely named data and removes it afterwards

## 3. Journeys

- [ ] 1 Guest COD + admin confirm + tracking
- [ ] 2 Register + verify + address + logout
- [ ] 3 Forgot/reset password
- [ ] 4 Currency switch + COD hidden for USD
- [ ] 5 Search, filters, variant selection, add to cart
- [ ] 6 Online payment success (stub)
- [ ] 7 Payment cancel + retry
- [ ] 8 Verified review
- [ ] 9 Admin creates and publishes a product
- [ ] 10 Customer blocked from admin

## 4. Accessibility

- [ ] axe scan helper; scans on the listed pages; fail on serious/critical violations

## 5. CI

- [ ] Workflow with a Mailpit service and the Neon/Upstash URLs from GitHub secrets, backend started from its repo (checkout both repos), frontend production build
- [ ] Upload the Playwright report as an artifact
- [ ] Nightly run against staging

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
