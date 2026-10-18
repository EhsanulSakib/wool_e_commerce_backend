# Milestone 04 QA: Catalog & currency API

Run this after modules 17–20 have each passed their own `qa.md`. Use `/docs` (logged in as admin) and an HTTP client.

## Entry criteria

- [ ] Modules 17–20 are ☑ in the ROADMAP master index
- [ ] Database reset and seeded
- [ ] Backend CI green

## Scenario 1: Admin creates and publishes a product

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Create category "Gloves" under the root | `201`; slug `gloves` | ☐ |
| 2 | Create product "Merino Ribbed Gloves" (draft) with colors Charcoal, Cream and sizes S, M, L | 6 variants with unique SKUs | ☐ |
| 3 | Set Taka prices (৳1,890) and stock per variant | USD prices filled automatically with the rounding rule | ☐ |
| 4 | Override one variant's USD price manually ($15.00) | Stored as manual | ☐ |
| 5 | Sign an upload, upload 3 images to Cloudinary, attach them (one per color + one general) | Images listed in order with alt text | ☐ |
| 6 | `GET /products?category=gloves` (public) | Product NOT listed (still draft) | ☐ |
| 7 | Publish the product, repeat step 6 | Product listed with BDT prices | ☐ |
| 8 | Same request with `currency=USD` | USD prices, including the manual one | ☐ |

## Scenario 2: Exchange rate change

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Change USD rate (e.g. 122 → 125) | Rate history row created | ☐ |
| 2 | Fetch the gloves product in USD | Auto prices recalculated; the manual $15.00 unchanged | ☐ |
| 3 | Try to change the BDT (base) rate | `400` | ☐ |

## Scenario 3: Shopper queries

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Filter `category=sweaters&color=charcoal&size=m&inStock=true` | Only matching, in-stock products | ☐ |
| 2 | `minPrice=2000&maxPrice=5000` in BDT, then equivalent in USD | Price filter uses the requested currency's prices | ☐ |
| 3 | `sort=price_asc` in both currencies | Correct order in each | ☐ |
| 4 | Search `merino`, then typo `merno` | Both find merino products | ☐ |
| 5 | `GET /products/facets?category=sweaters` | Colors, sizes, price range with counts | ☐ |
| 6 | Product detail for a sold-out variant | Variant shows sold out; product still visible | ☐ |

## Cross-cutting checks

- [ ] **Access control:** an automated test loops over every `/admin/*` route: `401` anonymous, `403` customer, allowed for ADMIN (and STAFF where intended)
- [ ] **Performance:** with the bulk seed (5,000 products), listing p95 < 150 ms and suggest p95 < 50 ms locally; `EXPLAIN ANALYZE` plans saved in module 20's `qa.md`
- [ ] **Caching:** public catalog responses have `Cache-Control` with `s-maxage` and `stale-while-revalidate`; admin responses are `no-store`
- [ ] **Money:** no floating-point artifacts (`19.989999`) anywhere in responses
- [ ] **Docs:** every endpoint documented with examples in `/docs`
- [ ] **Regression:** milestone 03 auth tests still pass

## Exit criteria

- [ ] All scenarios and checks pass

## Sign-off

| Date | Tester | Result | Notes |
|---|---|---|---|
| | | | |
