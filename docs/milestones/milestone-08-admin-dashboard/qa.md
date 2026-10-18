# Milestone 08 QA: Admin dashboard

Run this on staging after modules 37–39 have each passed their own `qa.md`. Do the whole scenario using only the admin UI (no `/docs`).

## Entry criteria

- [ ] Modules 37–39 are ☑ in the ROADMAP master index
- [ ] Staging deployed; one ADMIN and one STAFF account available

## Scenario: "Run the store for a day" (as ADMIN)

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Open `/admin/dashboard` | KPIs and charts load; numbers plausible | ☐ |
| 2 | Create a category "Socks" with an image | Appears in the storefront mega menu after revalidation | ☐ |
| 3 | Create "Merino Crew Socks": 3 colors × 3 sizes, Taka price, USD auto, 4 images, assign images to colors, publish | Live on the storefront in both currencies with correct images per color | ☐ |
| 4 | Override one USD price manually | Storefront shows the manual price | ☐ |
| 5 | Change the USD exchange rate | Auto USD prices update storefront-wide; manual stays | ☐ |
| 6 | Place a COD order and an online order on the storefront | Both appear in `/admin/orders` | ☐ |
| 7 | Confirm the COD order, print its invoice, ship, deliver | Status flow works; invoice prints cleanly | ☐ |
| 8 | Export this week's orders as CSV | Opens in Excel with correct ৳/$ characters | ☐ |
| 9 | Hide an inappropriate review; reply to another | Reflected on the product page | ☐ |
| 10 | Mark a contact message as replied | Status updated | ☐ |
| 11 | Change the Outside Dhaka fee | Checkout quote uses the new fee | ☐ |
| 12 | Change the announcement bar text | Storefront shows the new text | ☐ |
| 13 | Ban a test customer | They can't log in | ☐ |

## Scenario: STAFF limits

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Log in as STAFF | Settings, currencies and shipping hidden from the sidebar | ☐ |
| 2 | Open `/admin/settings` directly | "No access" | ☐ |
| 3 | Call the settings API with the STAFF session | `403` | ☐ |
| 4 | Manage orders and products | Allowed | ☐ |

## Cross-cutting checks

- [ ] **Dashboard numbers** match direct SQL queries for the same period (revenue in Taka, order counts)
- [ ] **Accessibility:** keyboard-only walkthrough of product create/edit; axe 0 violations on admin pages
- [ ] **Performance:** admin pages load in < 2 s on staging with 10,000 orders of test data
- [ ] **Admin code** is not included in storefront bundles (bundle analyzer)
- [ ] **Regression:** milestones 06 and 07 scenarios still pass

## Exit criteria

- [ ] Both scenarios and all checks pass

## Sign-off

| Date | Tester | Result | Notes |
|---|---|---|---|
| | | | |
