# Module 20: Catalog public API · Todo

Branch: `feat/20-catalog-public-api` (backend repo)

## 1. Schemas

- [ ] Zod query schema for `/products` (arrays, numbers, enums, defaults, max limit)
- [ ] Response schemas: `ProductCard`, `ProductDetail`, `Facets`, `CategoryTree`, `Suggestion`

## 2. Categories

- [ ] `GET /categories` (build the tree in memory from one query)
- [ ] `GET /categories/:slug` (with breadcrumb path)

## 3. Listing

- [ ] Repository function building the filtered query (category + descendants, colors, sizes, price range in currency, in stock, featured)
- [ ] Sorting per currency
- [ ] Pagination with total count
- [ ] Map rows to `ProductCard` (images, min price, discount %, flags, swatches, sizes)

## 4. Facets

- [ ] `GET /products/facets` with counts for colors and sizes, min/max price in currency

## 5. Detail and related

- [ ] `GET /products/:slug` with variants, prices, stock status, grouped images, breadcrumb
- [ ] `404` for missing, draft or archived products
- [ ] `GET /products/:slug/related`

## 6. Search

- [ ] Migration enabling `pg_trgm` + GIN index on `products.name` (and description if useful)
- [ ] Search in listing (`q`) with similarity ranking
- [ ] `GET /search/suggest` (limit 6, minimal fields)

## 7. Performance

- [ ] Load the 5,000-product bulk data
- [ ] `EXPLAIN ANALYZE` the main queries; add/adjust indexes; save plans in [qa.md](qa.md)
- [ ] Measure p95 latency with a simple load tool (`autocannon`)

## 8. Caching headers

- [ ] Middleware/helper to set public cache headers on catalog GETs
- [ ] ETag enabled

## 9. Docs and tests

- [ ] OpenAPI docs with examples
- [ ] Integration tests: each filter, combined filters, price filter in USD, sorting per currency, pagination meta, draft/archived hidden, typo search, facets counts, 404s

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
