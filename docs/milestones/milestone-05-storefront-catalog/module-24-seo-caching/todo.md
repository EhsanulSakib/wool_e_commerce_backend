# Module 24: SEO & caching · Todo

Branch: `feat/24-seo-caching` (frontend and backend repos)

## 1. Metadata (frontend)

- [ ] Root metadata (base URL, title template, defaults, icons, theme color)
- [ ] `lib/seo/metadata.ts` helpers (canonical builder that strips currency and filter params)
- [ ] `generateMetadata` for collection, product, search pages; `noindex` rules

## 2. Structured data (frontend)

- [ ] `JsonLd` component (safe serialization)
- [ ] Organization + WebSite/SearchAction in the root layout
- [ ] BreadcrumbList on collection and product pages
- [ ] Product + Offer (+ AggregateRating when count > 0)

## 3. Crawl files (frontend)

- [ ] `sitemap.ts` from the API (active products and categories)
- [ ] `robots.ts` (environment-aware: block all on staging)
- [ ] `manifest.ts`

## 4. OG images (frontend)

- [ ] Default `opengraph-image.tsx`
- [ ] Product `opengraph-image.tsx` (image, name, price in BDT)

## 5. Caching (frontend)

- [ ] Enable Cache Components in `next.config.ts`
- [ ] Add `"use cache"`, `cacheTag`, `cacheLife` to catalog data functions
- [ ] `app/api/revalidate/route.ts`: verify signature, validate body, `revalidateTag` each tag, return revalidated list
- [ ] Cloudinary loader for `next/image`

## 6. Revalidation notifier (backend)

- [ ] `FRONTEND_URL`, `REVALIDATE_SECRET` in `env.ts`
- [ ] Listener mapping events to tags (product → `products` + `product:<slug>`; category → `categories` + `products`; rate change → `products`, `currencies`)
- [ ] Signed POST with retry (3 attempts, backoff) and logging
- [ ] Tests with a mocked HTTP endpoint

## 7. Verify

- [ ] schema.org validator on product JSON-LD (local)
- [ ] Change a price via `/docs` locally → page updates without restarting

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged in both repos, module marked ☑ in the ROADMAP master index
