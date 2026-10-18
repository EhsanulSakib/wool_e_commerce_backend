# Module 23: Product details · Todo

Branch: `feat/23-product-details` (frontend repo)

## 1. Data and logic

- [ ] `getProduct(slug, currency)` and `getRelated(slug, currency)` server functions
- [ ] `resolveVariant(variants, color, size)` + availability helpers, with unit tests
- [ ] `generateStaticParams` for active products (or on-demand static generation)

## 2. Page skeleton

- [ ] `products/[slug]/page.tsx` layout (gallery + info), `notFound()` handling
- [ ] Breadcrumbs, name, rating placeholder, PriceTag, short description

## 3. Gallery

- [ ] Main image (priority) + thumbnails; mobile swipe with dots (Carousel)
- [ ] Hover zoom on desktop (pointer-fine only)
- [ ] Lightbox modal (arrows, Escape, swipe)
- [ ] Filter images by selected color

## 4. Selection and actions

- [ ] Color swatches synced with `?color=`
- [ ] Size buttons with sold-out state
- [ ] Stock message, SKU
- [ ] Size guide modal (data per category in `lib/size-guides.ts`)
- [ ] Quantity stepper bound to stock
- [ ] Add to cart / Buy now (disabled placeholder), wishlist heart, share button

## 5. Info blocks

- [ ] Delivery box (static estimates) + COD badge for Taka
- [ ] Accordions: description (Markdown → sanitized HTML), material & care, shipping & returns

## 6. Mobile sticky bar

- [ ] `StickyAddToCart` shown when the main button is out of view; respects floating buttons and safe area

## 7. Discovery

- [ ] Related products carousel
- [ ] Recently viewed (localStorage, max 10, client component)

## 8. Metadata

- [ ] `generateMetadata` with title, description, OG image

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
