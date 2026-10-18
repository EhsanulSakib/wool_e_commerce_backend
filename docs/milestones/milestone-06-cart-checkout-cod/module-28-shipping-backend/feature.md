# Module 28: Shipping (backend)

| | |
|---|---|
| Milestone | 06 Cart, checkout & COD |
| Repo | backend |
| Depends on | 13, 17 |
| Unblocks | 29, 31, 39, 40 |

## Goal

Calculate delivery fees and estimates from the shipping address and currency, using zones and rates stored as data so the admin can change them without code.

## Included

- **ShippingZone:** `code` (`INSIDE_DHAKA`, `OUTSIDE_DHAKA`, `INTERNATIONAL`), name, matching rule (BD + district Dhaka / BD other districts / any non-BD country), estimated days min/max, `codAllowed`, active, sort order
- **ShippingRate:** zone + currency (composite key), `fee`, `freeOverAmount` (nullable)
- **Zone resolution:** `resolveZone(address)` → zone (pure function, tested)
- **`GET /shipping/zones`** (public, cached): zones with rates per currency and estimates (used on the product page and in the cart's free-delivery bar)
- **`POST /shipping/quote`** `{ address: { country, district? }, currency, subtotal }` → `{ zone, fee, freeDeliveryApplied, amountToFreeDelivery, estimatedDays, codAvailable }`
- **Admin:** CRUD for zones and rates (ADMIN); validation warns if an active zone has no rate for an active currency
- **Seed:** Inside Dhaka ৳70 (free over ৳3,000), Outside Dhaka ৳130 (free over ৳5,000), International ৳3,000 / $25 (free over $200); COD only for the two BD zones; estimates 1–2, 3–5 and 7–14 days
- Exported `quoteShipping()` for orders (module 29)

## Not included

- Courier integration and real tracking numbers (post-MVP)
- Weight-based pricing (post-MVP)

## Notes

- Depends on ROADMAP open question 4. If international shipping is out, seed only the BD zones and reject non-BD addresses at checkout.
- `COD available` = zone allows COD **and** currency is BDT.

## You'll learn

- Rule-based resolution as a pure, testable function
- Configuration as data
