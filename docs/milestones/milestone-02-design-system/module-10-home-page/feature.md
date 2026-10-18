# Module 10: Home page

| | |
|---|---|
| Milestone | 02 Design system & storefront shell |
| Repo | frontend |
| Depends on | 09 |
| Unblocks | 22 |

## Goal

Build the first version of the product card and an eye-catching, animated home page on mock data, while keeping mobile Lighthouse Performance at 90 or above. The product card built here is reused (with real data) in every product grid.

## Included

- **Mock data** (`src/lib/mock/`): products and categories typed with the same shape the catalog API will return (module 20)
- **ProductCard v1:**
  - 4:5 image with `next/image` and correct `sizes`; second image fades in on hover (hover-capable devices only)
  - Badges: New, −20%, Low stock, Sold out
  - Wishlist heart with animated fill (local state for now)
  - Color swatches (up to 4 + "+N")
  - Name (2-line clamp), `PriceTag`, rating stars + count
  - Quick add: sizes slide up on hover (desktop), a button on mobile (shows a toast until module 30)
  - Skeleton version
  - Accessible structure: one link for the card, separate buttons for heart/quick add (no nested interactive elements)
- **Home sections:**
  1. **Hero** — LCP-safe: heading and image visible on first paint, image loaded with priority; small enhancements after load (subheading reveal, magnetic CTA)
  2. **Category tiles** (Sweaters, Cardigans, Scarves, Beanies) with hover zoom
  3. **New arrivals** carousel of product cards
  4. **Brand story** ("From sheep to sweater") — GSAP pinned section with text reveal and parallax images
  5. **Lookbook** — horizontal scroll pinned on desktop, swipe carousel on mobile
  6. **Bestsellers** grid
  7. **Benefits strip** — free delivery threshold, Cash on Delivery, easy returns, 100% wool
  8. **Testimonials** marquee
  9. **Instagram-style gallery** (static images)
  10. **Newsletter** call to action
- Home page metadata (title, description, Open Graph image)
- Images: optimized royalty-free knitwear photos (license noted in `public/images/CREDITS.md`)
- Remove the old `Banner`, `Home` and related components

## Not included

- Real data (module 22 switches the card to the API)
- Working cart and wishlist (module 30)

## Notes

- Set a JS budget for the home page (for example first-load JS under ~170 KB gzipped) and check it with the bundle analyzer.
- Pinned GSAP sections must have a reduced-motion fallback where the content is simply stacked.
- Hover effects use `@media (hover: hover)` so touch devices don't get "sticky" hover states.

## You'll learn

- Card design for e-commerce: what information matters and in what order
- GSAP ScrollTrigger pinning and scrubbing
- Optimizing LCP and responsive images
- Working within a performance budget
