# Milestone 05 QA: Storefront catalog

Run this on **staging** after modules 21–26 have each passed their own `qa.md`.

## Entry criteria

- [ ] Modules 21–26 are ☑ in the ROADMAP master index
- [ ] Staging is deployed from `main` in both repos and seeded

## Scenario 1: Bangladeshi shopper on a phone

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Open staging on a real phone (or 390 px emulation) with no cookies | Prices in Taka (৳) | ☐ |
| 2 | Shop → filter Sweaters, color Charcoal, size M, sort by price | URL updates; correct results; back button restores the previous state | ☐ |
| 3 | Open a product, pick a color and size | Gallery switches to that color; stock message updates; sticky bar appears on scroll | ☐ |
| 4 | Open the size guide | Modal with the size table | ☐ |
| 5 | Search "cardi" from the navbar | Cardigans suggested; Enter opens the product | ☐ |
| 6 | Open Contact, send a message | Success message; store inbox receives it | ☐ |

## Scenario 2: International shopper on desktop

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Visit with a non-BD country (VPN or the dev override) | "Switch to USD?" prompt | ☐ |
| 2 | Switch to USD | All prices change to $ without a flash; URL unchanged | ☐ |
| 3 | Reload and navigate | USD kept everywhere | ☐ |
| 4 | Filter by price in USD | Range and results in USD | ☐ |

## Scenario 3: Admin change reaches the storefront

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Admin changes a product's price via `/docs` on staging | Within a few seconds, the product page and listing show the new price in both currencies | ☐ |
| 2 | Admin archives a product | Disappears from listing and sitemap; its page returns 404 | ☐ |
| 3 | Admin changes the USD rate | USD prices update storefront-wide | ☐ |

## Cross-cutting checks

- [ ] **Lighthouse (mobile, staging)** — record below: Performance ≥ 90, Accessibility/Best Practices/SEO 100 on home, shop, a collection and a product page
- [ ] **Google Rich Results Test** on a product page: Product and Breadcrumb valid, no errors
- [ ] **Sitemap** lists home, shop, collections, active products, content pages; excludes drafts, `/user`, `/admin`
- [ ] **robots.txt** on staging blocks indexing (staging must stay out of Google)
- [ ] **View source** of shop and product pages: main content and prices are in the HTML
- [ ] **Accessibility:** keyboard-only walkthrough of filter, product selection and search; axe 0 violations
- [ ] **Regression:** milestone 03 login/logout works on staging (cookies through the rewrites)

## Scores (staging, mobile)

| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS | INP/TBT |
|---|---|---|---|---|---|---|---|
| Home | | | | | | | |
| Shop | | | | | | | |
| Collection | | | | | | | |
| Product | | | | | | | |

## Exit criteria

- [ ] All scenarios and checks pass
- [ ] Scores recorded

## Sign-off

| Date | Tester | Result | Notes |
|---|---|---|---|
| | | | |
