# Module 24: SEO & caching

| | |
|---|---|
| Milestone | 05 Storefront catalog |
| Repo | both |
| Depends on | 19, 22, 23 |
| Unblocks | 25, 26 |

## Goal

Make the catalog discoverable and fast: complete metadata and structured data for search engines, a sitemap and robots rules, social preview images, and a caching setup where pages are served from cache but refresh within seconds when an admin changes something.

## Included

**Frontend (SEO)**
- Root metadata: `metadataBase`, title template (`%s | Wool`), default description, Open Graph and Twitter defaults, icons, theme color
- `generateMetadata` for collection, product and search pages
- Canonical URLs: no currency in the URL; filtered listings canonicalize to the base collection URL; `/search` and heavy filter combinations get `noindex, follow`
- JSON-LD components: `Organization` + `WebSite` with `SearchAction` (root layout), `BreadcrumbList` (collection, product), `Product` with `Offer` (price, currency BDT, availability) and `AggregateRating` when reviews exist (module 36)
- `sitemap.ts` (home, shop, collections, active products with `lastModified`; split with `generateSitemaps` if large), `robots.ts` (disallow `/user`, `/admin`, `/cart`, `/checkout`, `/api`; sitemap link; block everything on staging), `manifest.ts`
- Dynamic OG images: `opengraph-image.tsx` for products (image, name, price) and a default one

**Frontend (caching)**
- Enable Cache Components; data functions use `"use cache"` with `cacheTag` (`products`, `product:<slug>`, `categories`, `currencies`) and `cacheLife` profiles; currency is a function argument so each currency has its own entry
- `POST /api/revalidate` route handler: verifies an HMAC signature/secret header, accepts `{ tags: [...] }`, calls `revalidateTag`
- Cloudinary image loader for `next/image` (Cloudinary resizes and converts, so Next's own image optimizer isn't needed)

**Backend**
- `revalidation` listener in `notifications` (or its own small module): on `product.*`, `category.changed`, `currency.rate_changed` → POST signed tags to the frontend's `/api/revalidate`, with retries and logging
- Env: `FRONTEND_URL`, `REVALIDATE_SECRET`

## Not included

- Redis (module 40)
- Content page SEO (module 25 adds FAQ schema)

## Notes

- Check the exact Cache Components API (`"use cache"`, `cacheTag`, `cacheLife`, `revalidateTag` arguments) in the installed Next version's docs.
- Validate structured data with the Rich Results Test after staging deploy (module 26); local validation with the schema.org validator before that.

## You'll learn

- Technical SEO for e-commerce (canonicals, faceted URLs, structured data)
- Next.js caching with tags and on-demand revalidation
- Signing webhook requests between services
