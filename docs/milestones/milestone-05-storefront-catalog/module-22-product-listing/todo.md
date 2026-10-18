# Module 22: Product listing · Todo

Branch: `feat/22-product-listing` (frontend repo)

## 1. Data

- [ ] Regenerate API types
- [ ] `features/catalog/api.ts`: `getProducts`, `getFacets`, `getCategory`, `getCategories`, `suggest` (server and client variants)
- [ ] `parseFilters(searchParams)` and `serializeFilters(filters)` helpers with tests

## 2. Pages

- [ ] `/shop` page (Server Component reading `searchParams`)
- [ ] `/collections/[slug]` with category hero, description, breadcrumbs; `notFound()` for unknown slugs
- [ ] `/search` results page
- [ ] `loading.tsx` with grid skeletons

## 3. Filters

- [ ] `useFilters()` hook (read/update URL, `useTransition` pending state)
- [ ] `FilterPanel` (desktop sidebar) and `FilterDrawer` (mobile) sharing the same filter components
- [ ] Color filter (swatches + counts), size chips, in-stock switch
- [ ] `PriceRange` dual-thumb slider (pointer + keyboard, `aria-valuemin/max/now`, inputs for exact values)
- [ ] Active filter pills + Clear all; result count; sort dropdown

## 4. Grid and card

- [ ] `ProductCard` v2: real data, swatch hover switches image, quick-add size picker (disabled action), heart → login prompt
- [ ] `ProductGrid` with Motion layout animations
- [ ] Empty state
- [ ] Load more (client fetch, append, update `page` in the URL) + page links for crawlers

## 5. Search overlay

- [ ] Debounced suggest query (TanStack Query, 250 ms)
- [ ] Results list with products (image, name, price) and categories
- [ ] Keyboard: ↑/↓ move, Enter opens, Escape closes; `aria-activedescendant`
- [ ] Recent searches (localStorage, max 5, clear button)
- [ ] "See all results" link

## 6. Replace mocks

- [ ] Home page sections use the API (featured, new arrivals, bestsellers, categories)
- [ ] Delete `lib/mock` once unused

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
