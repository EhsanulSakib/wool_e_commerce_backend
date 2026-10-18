# Module 24: SEO & caching · QA

## Automated

- [ ] Backend notifier tests pass (correct tags, signature, retries)
- [ ] Frontend: revalidate route rejects missing/invalid signatures (test)

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | View source of a product page | Title, description, canonical, OG tags, Product + Breadcrumb JSON-LD | ☐ |
| 2 | Canonical on `/shop?color=charcoal&sort=price_asc` | Points to `/shop` | ☐ |
| 3 | `/search?q=wool` meta robots | `noindex, follow` | ☐ |
| 4 | Open `/sitemap.xml` | Lists home, shop, collections, active products; no drafts | ☐ |
| 5 | Open `/robots.txt` locally | Disallows private paths; links the sitemap | ☐ |
| 6 | Open `/products/<slug>/opengraph-image` | Generated image with product image, name, price | ☐ |
| 7 | Load a product page twice (production build) | Second load served from cache (fast, no API call in backend logs) | ☐ |
| 8 | Change the product price via `/docs` | Backend logs a revalidation call; page shows the new price on next load | ☐ |
| 9 | Call `/api/revalidate` without the secret | `401` | ☐ |
| 10 | Stop the frontend, change a product | Backend retries, logs failure, doesn't crash | ☐ |
| 11 | schema.org validator on product JSON-LD | No errors | ☐ |

## Non-functional

- [ ] Lighthouse SEO 100 on home, shop, collection, product
- [ ] Images served by Cloudinary in AVIF/WebP at the requested width

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
