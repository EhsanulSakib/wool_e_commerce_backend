# Module 40: Redis caching · QA

## Load test results (5,000 products, same machine, same settings)

| Endpoint | Before p50 | Before p95 | Before req/s | After p50 | After p95 | After req/s |
|---|---|---|---|---|---|---|
| `GET /products` | | | | | | |
| `GET /products?…filters…&currency=USD` | | | | | | |
| `GET /products/:slug` | | | | | | |
| `GET /search/suggest?q=wool` | | | | | | |

## Automated

- [ ] Cache, invalidation and Redis-down tests pass

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Request a listing twice, check logs | First miss, second hit | ☐ |
| 2 | Change a product's price in the admin | Next API request returns the new price immediately | ☐ |
| 3 | Change the USD rate | USD listings fresh immediately | ☐ |
| 4 | Stop Redis, browse the storefront | Everything works (slower); warnings logged; `/ready` shows Redis down | ☐ |
| 5 | Start Redis again | Caching resumes without restarting the API | ☐ |
| 6 | Two API instances, hammer login on both | Combined attempts hit one shared limit | ☐ |
| 7 | Inspect Redis keys (`redis-cli --scan`) | No carts, orders, user data or tokens cached | ☐ |

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
