# Module 10: Home page · Todo

Branch: `feat/10-home-page` (frontend repo)

## 1. Assets and mock data

- [ ] Collect knitwear photos (products, lifestyle, lookbook); note licenses in `public/images/CREDITS.md`
- [ ] Resize/compress them (keep originals out of the repo if large)
- [ ] `src/lib/mock/products.ts` and `categories.ts` with types matching the planned API shape (`ProductCardData`)

## 2. ProductCard v1 (`src/components/product`)

- [ ] Image area with aspect ratio box, `sizes` attribute, hover image crossfade (hover devices only)
- [ ] Badges logic (new, discount %, low stock, sold out)
- [ ] Wishlist heart (animated, `aria-pressed`)
- [ ] Swatches (max 4 + "+N")
- [ ] Name, PriceTag, Rating
- [ ] Quick add: hover panel with sizes (desktop), button (mobile); toast placeholder
- [ ] `ProductCardSkeleton`
- [ ] Check DOM structure: no button inside the link

## 3. Hero

- [ ] Layout with heading, subheading, CTA, image
- [ ] Image with `priority` / preload and correct `sizes`
- [ ] Heading visible on first paint; only secondary elements animate
- [ ] Magnetic CTA (desktop)

## 4. Sections

- [ ] Category tiles with hover zoom
- [ ] New arrivals `Carousel`
- [ ] Brand story: pinned section, `TextReveal`, `Parallax` images; stacked fallback with reduced motion
- [ ] Lookbook: horizontal pinned scroll on desktop (`gsap.matchMedia`), swipe carousel on mobile
- [ ] Bestsellers grid with `Stagger`
- [ ] Benefits strip with icons
- [ ] Testimonials `Marquee`
- [ ] Instagram-style gallery
- [ ] Newsletter CTA

## 5. Page

- [ ] Compose sections in `app/(shop)/page.tsx` (Server Component; only interactive parts are client components)
- [ ] Metadata: title, description, OG image
- [ ] Delete old `Banner`, `Home`, unused images

## 6. Measure

- [ ] Lighthouse mobile + desktop; fix until targets are met
- [ ] Bundle analyzer: first-load JS within budget
- [ ] Performance trace at 4× throttle through the pinned sections

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
