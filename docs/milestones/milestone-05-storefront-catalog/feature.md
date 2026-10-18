# Milestone 05: Storefront catalog

| | |
|---|---|
| Repos | frontend (+ small backend parts in 24, 25) |
| Depends on | [02 Design system](../milestone-02-design-system/feature.md), [03 Identity](../milestone-03-identity/feature.md), [04 Catalog & currency API](../milestone-04-catalog-api/feature.md) |
| Next milestone | [06 Cart, checkout & COD](../milestone-06-cart-checkout-cod/feature.md) |

## Goal

Turn the mock storefront into a real one: shoppers switch between Taka and USD, browse and filter the catalog, search, and view rich product pages. Pages are server-rendered, cached per currency and refreshed when an admin changes a product. Content and policy pages are added, and the whole thing goes to a staging environment for real-world Lighthouse and SEO testing.

## When it's done

- Shop, collection, search and product pages work with real data in both currencies.
- Pages are statically cached per currency and update within seconds of an admin change.
- Rich Results Test passes for product pages; sitemap and robots are correct.
- About, Contact (working form), FAQ and policy pages exist (policy pages are required for SSLCommerz approval).
- Everything runs on staging (Vercel + Render/Railway + Neon) with mobile Lighthouse ≥ 90.

## Modules (build in this order)

| # | Module | Repo | Depends on | Summary |
|---|---|---|---|---|
| 21 | [Currency storefront](module-21-currency-storefront/feature.md) | frontend | 09, 14, 17 | `[currency]` segment, cookie + `proxy.ts` rewrite, switcher, country prompt |
| 22 | [Product listing](module-22-product-listing/feature.md) | frontend | 10, 20, 21 | Shop and collection pages, filters in the URL, product card v2, search overlay |
| 23 | [Product details](module-23-product-details/feature.md) | frontend | 22 | Gallery, variant picker, size guide, sticky mobile bar, related, recently viewed |
| 24 | [SEO & caching](module-24-seo-caching/feature.md) | both | 19, 22, 23 | Metadata, JSON-LD, sitemap, robots, OG images, tagged cache + on-demand revalidation |
| 25 | [Content pages](module-25-content-pages/feature.md) | both | 09, 11, 14, 24 | About, Contact (backend + email), FAQ, shipping, privacy, terms, refund policy |
| 26 | [Staging deploy](module-26-staging-deploy/feature.md) | both | 24, 25 | Neon, Render/Railway, Vercel, env management, migrations on deploy |

## Not in this milestone

- Add to cart and wishlist actions (milestone 06); buttons show a "coming soon" toast or are disabled
- Reviews on product pages (module 36); a "No reviews yet" placeholder is shown
- Delivery estimates come from static text until shipping zones exist (module 28)
