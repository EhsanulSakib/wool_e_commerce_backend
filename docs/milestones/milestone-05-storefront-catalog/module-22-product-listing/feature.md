# Module 22: Product listing

| | |
|---|---|
| Milestone | 05 Storefront catalog |
| Repo | frontend |
| Depends on | 10, 20, 21 |
| Unblocks | 23, 24 |

## Goal

Real shop, collection and search pages: server-rendered results driven by URL parameters, a responsive filter experience, the product card connected to real data, and instant search from the navbar.

## Included

- **Pages:** `/shop` (all products), `/collections/[slug]` (category with hero banner and description), `/search?q=` (results page reusing the listing)
- **URL as state:** `?color=charcoal&size=m&min=1000&max=5000&inStock=1&sort=price_asc&page=2`; `useFilters()` hook updates the URL with `router.replace(…, { scroll: false })` inside `useTransition`
- **Filters:** sidebar on desktop, drawer on mobile with Apply/Clear; facet counts from `/products/facets`; color swatches, size chips, custom dual-thumb **price range slider** (keyboard accessible), in-stock toggle
- **Active filter pills** with remove buttons and "Clear all"; result count; sort dropdown
- **Grid:** `ProductCard` v2 on real data (swatch hover switches the image, quick add opens a size picker — action disabled with "coming soon" until module 30; wishlist heart prompts login until module 30)
- **Pagination:** "Load more" button that appends results and updates `page` in the URL, with real page links in the HTML for crawlers
- **Loading:** `loading.tsx` + Suspense skeletons; pending state while filters change
- **Animation:** grid items animate position when filters change (Motion layout), limited to the visible page
- **Empty state:** no results → suggest removing filters
- **Breadcrumbs** on collection pages
- **Search overlay** (navbar): debounced (250 ms) calls to `/search/suggest`, keyboard navigation (arrows, Enter, Escape), recent searches in localStorage, "See all results" → `/search?q=`

## Not included

- Working add to cart / wishlist (module 30)
- SEO tags and caching strategy (module 24) — basic titles only here

## Notes

- Results must render on the server from `searchParams` so filtered pages have real HTML.
- Keep filter state only in the URL (no duplicate client state), so back/forward and shared links just work.

## You'll learn

- Using the URL as state
- Streaming and Suspense in the App Router
- Debouncing and accessible combobox-style search
- Building a custom accessible range slider
- Layout animations at scale without jank
