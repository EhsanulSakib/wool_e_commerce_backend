# Module 40: Redis caching

| | |
|---|---|
| Milestone | 09 Hardening & launch |
| Repo | backend |
| Depends on | 17, 20, 28 |
| Unblocks | 41 |

## Goal

Take load off Postgres for the most-read data with a Redis cache that's invalidated by events, so it's never stale after an admin change. Move rate limiting to Redis so limits hold when the API runs on more than one instance.

## Included

- Redis locally (added to `docker-compose.yml` or installed natively) and Upstash (or similar) for staging/production; `REDIS_URL` in env
- `core/cache`: client, `cached(key, ttl, loader)` helper, JSON serialization, key builder
- **Versioned namespaces** for invalidation (e.g. `catalog:v{n}:…`): bumping the version invalidates a whole group without scanning keys
- **Stampede protection:** only one request rebuilds an expired key (lock) while others wait or get the stale value
- **Cached data:** category tree, product listing (key = normalized query + currency), facets, product detail, related, currencies, shipping zones, store settings
- **Invalidation listeners:** `product.*`, `category.changed`, `currency.rate_changed`, review changes, `shipping.changed`, `settings.changed`
- **Rate limiting** with a Redis store
- **Graceful degradation:** if Redis is down, skip the cache (log a warning) and keep serving from Postgres; rate limiter falls back to memory
- Hit/miss counters in logs (optional `/metrics` endpoint)
- Load test before and after with `autocannon` or k6 on the 5,000-product dataset

## Not included

- Caching personal data (carts, orders, profiles) — never cached in shared stores

## Notes

- Normalize listing queries before building keys (sorted arrays, defaults removed) so equivalent requests share one entry.
- TTLs are a safety net; correctness comes from event-based invalidation.

## You'll learn

- The cache-aside pattern
- Cache invalidation strategies and stampedes
- Distributed rate limiting
- Load testing and reading the results
