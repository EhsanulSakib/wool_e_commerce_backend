# Module 43: End-to-end tests

| | |
|---|---|
| Milestone | 09 Hardening & launch |
| Repo | frontend |
| Depends on | all MVP modules |
| Unblocks | 44 |

## Goal

Automate the journeys that make or lose money, running the real frontend against the real backend, so every future change is checked the way a customer and an admin would use the store.

## Included

- Playwright setup in the frontend repo (`e2e/` folder) with desktop Chrome and a mobile device project
- **Test environment:** backend + Postgres + Mailpit started in CI as service containers; database reset and seeded before the run; frontend production build
- **Helpers:** login fixtures (customer, staff, admin), Mailpit API helper to read emails and extract links, data factories through the API, SSLCommerz stub mode (backend env flag) that simulates gateway responses
- **Journeys:**
  1. Guest COD checkout → admin confirms → tracking shows Confirmed
  2. Register → verify email (link from Mailpit) → log in → add address → log out
  3. Forgot password → reset via email link → log in with the new password
  4. Currency switch → prices and cart in USD → COD hidden at checkout
  5. Search and filters → product page → variant selection → add to cart
  6. Logged-in online payment (stub success) → order Paid + Confirmed
  7. Payment cancelled → retry → success
  8. Verified buyer writes a review → visible on the product page
  9. Admin creates and publishes a product → visible on the storefront
  10. Customer blocked from `/admin`
- **Accessibility scans** with `@axe-core/playwright` on home, shop, product, cart, checkout, login, user dashboard, admin orders
- Traces, screenshots and videos on failure; retries: 1 in CI
- GitHub Actions workflow (on PRs to `main` and nightly against staging)

## Not included

- Visual regression testing (optional extra)
- Load testing (module 40)

## Notes

- Prefer role- and label-based selectors (`getByRole`, `getByLabel`) — they double as an accessibility check. Add `data-testid` only where there's no accessible handle.
- Keep tests independent: each creates its own data.

## You'll learn

- End-to-end testing with Playwright
- Running multi-service test environments in CI
- Testing email flows
- Writing stable, non-flaky tests
