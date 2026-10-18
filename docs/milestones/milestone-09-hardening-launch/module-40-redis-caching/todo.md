# Module 40: Redis caching · Todo

Branch: `feat/40-redis-caching` (backend repo)

## 1. Baseline

- [ ] Load test current endpoints (listing default, listing filtered, detail, suggest); record numbers in [qa.md](qa.md)

## 2. Setup

- [ ] Redis in local services; Upstash for staging; `REDIS_URL` in `env.ts`
- [ ] Install a Redis client (`ioredis` or `redis`)
- [ ] `core/cache/redis.ts` with connection handling and health status (`/ready` reports Redis state without failing)

## 3. Cache helper

- [ ] `cached(key, ttl, loader)` with JSON, stampede lock, stale fallback
- [ ] Namespace versions (`getVersion(ns)`, `bumpVersion(ns)`)
- [ ] Query normalizer for listing keys (tested)

## 4. Apply

- [ ] Categories, listing, facets, product detail, related, currencies, shipping zones, settings
- [ ] Invalidation listeners for every relevant event

## 5. Rate limiting

- [ ] Redis store for `express-rate-limit`; memory fallback when Redis is down

## 6. Resilience and metrics

- [ ] Redis down → cache bypass with warning logs
- [ ] Hit/miss counters

## 7. Verify

- [ ] Load test after; compare
- [ ] Run two API instances on different ports behind the same Redis; check rate limits are shared
- [ ] Tests: cached value returned; invalidated after event; Redis unavailable path

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
