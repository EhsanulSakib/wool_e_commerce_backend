# Milestone 04: Catalog & currency API

| | |
|---|---|
| Repos | backend |
| Depends on | [03 Identity](../milestone-03-identity/feature.md) (admin roles) |
| Next milestone | [05 Storefront catalog](../milestone-05-storefront-catalog/feature.md) |

## Goal

The backend can store, manage and serve a complete knitwear catalog: categories, colors and sizes, products with variants, images on Cloudinary, and prices in every active currency (Taka and USD at launch). Admins manage everything through the API docs page until the admin UI exists (milestone 08).

## When it's done

- A realistic seed catalog (~30 products) exists with Taka prices and auto-calculated USD prices.
- An admin can create a product with a color × size matrix, upload images, set prices and publish it, all through `/docs`.
- Changing the USD exchange rate updates every auto USD price; manual prices stay.
- The public API lists, filters, sorts and searches products in the requested currency, fast, with correct cache headers.

## Modules (build in this order)

| # | Module | Depends on | Summary |
|---|---|---|---|
| 17 | [Currency (backend)](module-17-currency-backend/feature.md) | 03, 12 | Currency table, exchange rates + history, rounding rules, conversion helpers |
| 18 | [Media (backend)](module-18-media-backend/feature.md) | 03, 12 | Cloudinary signed direct uploads, `MediaAsset` table |
| 19 | [Catalog admin (backend)](module-19-catalog-admin-backend/feature.md) | 17, 18 | Catalog models, admin CRUD, variant matrix, per-currency prices, auto-price engine, seed |
| 20 | [Catalog public API](module-20-catalog-public-api/feature.md) | 19 | Listing with filters/facets/sort/search, product detail, related, suggestions, indexes, cache headers |

17 and 18 are independent and can be built in either order.

## Not in this milestone

- Storefront pages (milestone 05)
- Admin UI (milestone 08)
- Redis caching (module 40)
- Reviews (module 35); rating fields exist on Product but stay at 0

## Open questions that affect this milestone

- None blocking. Price rounding rules for USD and Taka are chosen in module 17 (suggestion: USD → x.99, Taka → nearest 10).
