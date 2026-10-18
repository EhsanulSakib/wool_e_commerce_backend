# Module 20: Catalog public API · QA

## Automated

- [ ] All integration tests from todo section 9 pass

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | `GET /products` | First page, newest first, BDT prices, pagination meta | ☐ |
| 2 | `?currency=USD&sort=price_asc` | USD prices ascending | ☐ |
| 3 | `?category=sweaters` with a child category | Includes products from child categories | ☐ |
| 4 | `?colors=charcoal&colors=cream&sizes=m` | Products with (charcoal OR cream) AND size M | ☐ |
| 5 | `?inStock=true` | No fully sold-out products | ☐ |
| 6 | `?limit=100` | `400` or clamped to 48 (as documented) | ☐ |
| 7 | `?q=merno` | Merino products returned | ☐ |
| 8 | `GET /products/facets?category=scarves` | Colors/sizes with counts; price range | ☐ |
| 9 | `GET /products/<draft-slug>` | `404` | ☐ |
| 10 | Product with a variant of stock 3 | Detail says low stock with "3 left"; a variant with 40 shows "in stock" only | ☐ |
| 11 | `curl -I` a listing request | `Cache-Control` with `s-maxage` and `stale-while-revalidate`; `ETag` | ☐ |
| 12 | Repeat with `If-None-Match` | `304` | ☐ |

## Performance (5,000 products, local)

| Endpoint | p50 | p95 | Target p95 | ✓ |
|---|---|---|---|---|
| `GET /products` (default) | | | < 150 ms | ☐ |
| `GET /products` (3 filters + price sort in USD) | | | < 150 ms | ☐ |
| `GET /products/:slug` | | | < 80 ms | ☐ |
| `GET /search/suggest?q=wool` | | | < 50 ms | ☐ |

## Query plans

Paste the `EXPLAIN ANALYZE` output for the default listing, the filtered listing and the search query. Confirm index scans are used on large tables.

```
(plans here)
```

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
