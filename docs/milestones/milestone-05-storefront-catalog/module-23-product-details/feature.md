# Module 23: Product details

| | |
|---|---|
| Milestone | 05 Storefront catalog |
| Repo | frontend |
| Depends on | 22 |
| Unblocks | 24, 30, 36 |

## Goal

A product page that sells: a rich gallery, clear variant selection with stock feedback, the information shoppers need (material, care, delivery, returns), and good mobile ergonomics — all server-rendered and fast.

## Included

- **Page** `/products/[slug]`, server-rendered, static per currency; `notFound()` for unknown/archived products
- **Layout:** gallery on the left (sticky on desktop), info on the right; stacked on mobile
- **Gallery:** main image + thumbnails (vertical on desktop, dots on mobile); swipe on touch; hover zoom on desktop (zoom follows the cursor); fullscreen lightbox with arrows and Escape; images filtered by the selected color
- **Info:** breadcrumbs, name, rating summary (placeholder "No reviews yet" until module 36), `PriceTag` with sale, short description
- **Variant selection:** color swatches (updates images and `?color=` in the URL), size buttons (sold-out sizes crossed out and disabled), selected variant drives price, stock message ("Only 3 left") and SKU
- **Size guide** modal (cm/inch table per category)
- **Quantity stepper** (max = available stock)
- **Actions:** Add to cart and Buy now (disabled with a note until module 30), wishlist heart, share (Web Share API, fallback copy link)
- **Delivery box:** Inside Dhaka / Outside Dhaka / International estimates (static text until module 28), COD badge when currency is Taka
- **Sticky add-to-cart bar on mobile:** appears when the main button scrolls out of view (IntersectionObserver)
- **Accordions:** Description (Markdown rendered and sanitized), Material & care (wool care icons), Shipping & returns
- **Related products** carousel and **recently viewed** (localStorage, client component, excludes the current product)
- Basic `generateMetadata` (title, description, product image as OG image); full SEO in module 24

## Not included

- Cart actions (module 30), reviews (module 36), real delivery estimates (module 28)
- "Notify me when back in stock" (post-MVP)

## Notes

- The first gallery image is the LCP element: load it with priority and correct `sizes`; lazy-load the rest.
- Keep selection logic in a small pure function (`resolveVariant(variants, color, size)`) with tests; the UI just calls it.

## You'll learn

- Deriving client state from server data
- Image performance (priority, `sizes`, lazy loading)
- IntersectionObserver patterns
- Rendering user content (Markdown) safely
