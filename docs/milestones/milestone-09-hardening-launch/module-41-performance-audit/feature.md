# Module 41: Performance audit

| | |
|---|---|
| Milestone | 09 Hardening & launch |
| Repo | both |
| Depends on | 40 + all storefront modules |
| Unblocks | 44 |

## Goal

Measure the whole app, fix what's slow, and lock in the results with automated budgets so performance can't quietly regress after launch.

## Included

**Frontend**
- **Lighthouse CI** in GitHub Actions against the Vercel preview of each PR: home, shop, collection, product, cart, checkout; fail the PR if mobile Performance < 90, any other category < 100, or budgets are exceeded
- **Budgets:** first-load JS per route, LCP, CLS, total blocking time, image weight
- **Bundle review:** admin-only code never in storefront bundles; heavy pieces (lightbox, GSAP sections, Markdown editor) dynamically imported; remove unused dependencies; `optimizePackageImports`; evaluate the React Compiler
- **Images:** correct `sizes` everywhere, priority only on LCP images, modern formats from Cloudinary, no oversized downloads
- **Fonts:** only used weights/subsets, preloaded correctly
- **Real-user monitoring:** `useReportWebVitals` → send LCP/CLS/INP to a backend endpoint (stored and viewable in admin) or a hosted analytics tool
- **Animation pass:** every animated page re-checked at 4× CPU throttle

**Backend**
- Slow query review with `pg_stat_statements`; add or fix indexes
- N+1 check on every list endpoint
- Response size review (no over-fetching)
- Compression and keep-alive confirmed in production settings

**Report**
- `docs/performance-report.md`: before/after numbers per page and endpoint, what changed and why

## Not included

- CDN/edge changes beyond Vercel defaults

## Notes

- Lab data (Lighthouse) and field data (real users) can differ. Use both: Lighthouse to prevent regressions, real-user data to find real problems.

## You'll learn

- Performance budgets and enforcing them in CI
- Profiling bundles, rendering and database queries
- Lab vs field performance data
