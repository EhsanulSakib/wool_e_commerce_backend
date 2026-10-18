# Module 20: Catalog public API

| | |
|---|---|
| Milestone | 04 Catalog & currency API |
| Repo | backend |
| Depends on | 19 |
| Unblocks | 22, 27, 35, 40 |

## Goal

Serve the catalog to the storefront quickly and in the shopper's currency: product listing with filters, facets, sorting, search and pagination; product details; related products; instant search suggestions. Back it with the right indexes and HTTP cache headers.

## Included

- **`GET /categories`** (active tree) and **`GET /categories/:slug`**
- **`GET /products`** with query params:
  - `currency` (default BDT), `category` (slug, includes child categories), `colors[]`, `sizes[]`, `minPrice`/`maxPrice` (in the selected currency), `inStock`, `featured`, `q` (search)
  - `sort`: `newest`, `price_asc`, `price_desc`, `popular`, `name`
  - `page`, `limit` (max 48)
  - Card-shaped response: id, slug, name, category, primary + hover image (with width/height), min price and compare-at in the currency, discount %, flags (`isNew` = published in the last 30 days, `lowStock`, `soldOut`), color swatches, available sizes, rating avg/count
- **`GET /products/facets`**: available colors, sizes and price range with counts for the current filters
- **`GET /products/:slug`**: full detail — variants with attribute values, prices in the currency, stock status ("only N left" when ≤ 5, never the exact number above that), images grouped by color, breadcrumb, material, care, SEO fields
- **`GET /products/:slug/related`**: same category, excluding itself, up to 8
- **`GET /search/suggest?q=`**: top 6 products + matching categories, built for speed
- **Search:** Postgres `pg_trgm` extension with GIN indexes on product name (and description), ranking by similarity; handles typos
- **Visibility:** only `ACTIVE` products in active categories
- **Indexes:** product (status, publishedAt), product (categoryId), variant price (currency, amount), variant attribute value (attributeValueId), trigram GIN; verify with `EXPLAIN ANALYZE` on the 5,000-product dataset
- **Query efficiency:** select only card fields, no N+1 queries; use Prisma TypedSQL / raw SQL where Prisma's query builder gets awkward (price filter + sort across currencies)
- **HTTP caching:** `Cache-Control: public, s-maxage=60, stale-while-revalidate=600` + ETag on public GETs

## Not included

- Storefront pages (milestone 05)
- Redis cache (module 40)

## Notes

- Keep response shapes stable and documented; the frontend's generated types depend on them.
- Facet counts can be expensive; measure and simplify (for example counts only for colors and sizes) if needed.

## You'll learn

- Building filterable, sortable queries
- Faceted search
- Reading `EXPLAIN ANALYZE` and choosing indexes
- Trigram search in Postgres
- HTTP caching headers for APIs
