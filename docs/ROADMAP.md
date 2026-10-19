# Wool: Roadmap

A wool knitwear e-commerce store, built as a learning and portfolio project. The work is split into **milestones**. Each milestone contains **modules** that are built in dependency order, so a module never waits on something that doesn't exist yet. Every module has a feature spec, a todo list and a QA checklist, and every milestone ends with a QA gate before the next one starts.

These docs live in the backend repo but cover both repos (`wool_e_commerce_backend` and `wool_e_commerce_frontend`). Each module says which repo it touches.

## How the docs are organized

```
docs/
├─ ROADMAP.md                          # this file: decisions, architecture, master index
└─ milestones/
   ├─ milestone-01-foundations/
   │  ├─ feature.md                    # milestone goal, its modules, build order
   │  ├─ qa.md                         # milestone QA gate (end-to-end scenarios)
   │  ├─ module-01-backend-setup/
   │  │  ├─ feature.md                 # what the module delivers and why
   │  │  ├─ todo.md                    # step-by-step checklist
   │  │  └─ qa.md                      # tests and manual checks for this module
   │  └─ …
   └─ …
```

Folders are named `module-01-name` instead of `module-01: name` because Windows doesn't allow `:` in folder names. Module numbers are global (01–44), so a dependency like "needs 12" is unambiguous.

## Workflow

1. Take the next module from the master index (section 7). Check that everything in its "Depends on" column is ☑.
2. Read its `feature.md`. Create the branch `feat/<number>-<name>` in the repo(s) it touches.
3. Work through `todo.md`, ticking items. A todo group can be one or more commits.
4. Run the module's `qa.md` and fix until every check passes. Then open the PR and merge.
5. Mark the module ☑ in section 7.
6. When every module in a milestone is ☑, run the milestone's `qa.md`. Start the next milestone only after it passes.

Status: ☐ todo · ◐ in progress · ☑ done

---

## 1. Decisions

| Area | Decision |
|---|---|
| Brand | Wool knitwear: sweaters, cardigans, scarves, beanies. Variants = color × size |
| Market | Bangladesh-based brand that also sells internationally. BD phone and address format for local orders |
| Currencies | Multi-currency. Taka (BDT) is the base currency, USD at launch, and more (EUR, GBP…) can be added from the admin without code changes. Every product has its own price in each currency, like international brands. Details in section 2 |
| Payments | Cash on Delivery first (Taka only), then SSLCommerz (bKash, Nagad and cards in Taka; cards in USD). Direct bKash later |
| Colors | Black (primary) + white (secondary), inverted in dark mode. Status colors only for badges, pills, alerts and notification dots |
| Repos | Two repos: `wool_e_commerce_backend` (rebuilt from scratch) and `wool_e_commerce_frontend` (cleaned up and extended) |
| Frontend | Next.js (latest 16.x, App Router), Tailwind v4, Redux Toolkit, Motion, GSAP, Lenis. Data fetched with Next.js `fetch`. All UI components are custom, no UI library |
| Backend | Express 5 + TypeScript, modular monolith, Zod validation |
| Database | PostgreSQL + Prisma |
| Email | Nodemailer over SMTP |
| Routes | Admin area `/admin/dashboard` (+ `/admin/*`), customer area `/user/dashboard` (+ `/user/*`) |

### Defaults

| # | Default | Why |
|---|---|---|
| 1 | Client state: **Redux Toolkit** (one store per request via `makeStore`, typed hooks, one slice per feature). Data fetching: **Next.js `fetch`** — Server Components fetch on the server with Next caching; client components call the API through a thin typed `fetch` wrapper, usually inside Redux thunks. No TanStack Query, no Zustand | Uses Next.js built-in caching and request deduplication; Redux keeps shared client state (cart, current user, UI) predictable and debuggable in Redux DevTools |
| 2 | Theme with `next-themes` (already installed) + CSS variables | No `theme === "light" ? … : …` in components, no theme flash on load |
| 3 | Types shared via OpenAPI: backend Zod schemas → OpenAPI spec → generated TS types in the frontend | Type safety across two repos without a monorepo |
| 4 | Our own auth: access + refresh JWTs in httpOnly cookies, refresh-token rotation | You learn how auth really works |
| 5 | Next.js forwards `/api/v1/*` to Express (rewrites) | Cookies stay first-party; no cross-site cookie problems in the browser |
| 6 | Amounts stored as they are, in Tk or $ (e.g. `1250.00`), using Postgres's exact decimal type `numeric(12,2)`, never a JS float | Exact money math, no rounding errors |
| 7 | Images on Cloudinary (free tier), signed direct uploads | CDN, resizing and AVIF/WebP for free |
| 8 | Email: Nodemailer over SMTP. Locally it sends to Mailpit (a fake SMTP inbox you open in the browser); in production any SMTP provider (Gmail, Zoho, Brevo…) set through env vars | Same code everywhere; test emails without sending real ones |
| 9 | Cash on Delivery needs no login: the customer fills in a details form (name, phone, email, address) and the order starts as **Pending**. An admin confirms it from the admin dashboard. Guests track orders with order number + phone. The guest cart lives in localStorage and merges into the server cart if they log in | How COD works in Bangladesh; admin confirmation filters out fake orders |
| 10 | Two dashboards in the same Next app: admin at `/admin/dashboard` (+ `/admin/products`, `/admin/orders`…), customers at `/user/dashboard` (+ `/user/orders`, `/user/addresses`…). Both role-protected and noindex | One deploy. Until the admin pages exist, data is managed with seed scripts and the API docs page |
| 11 | Tests: Vitest + Supertest (backend), Vitest + Testing Library (frontend), Playwright (end-to-end) | |
| 12 | One branch + PR per module, Conventional Commits (`feat:`, `fix:`, `chore:`) | Clean history for the portfolio |

### Open questions

The plan uses the assumption in the middle column. Answer before the module in the last column starts, and the plan gets adjusted.

| # | Question | Assumption used in the plan | Needed by |
|---|---|---|---|
| 1 | Local database setup: Docker Desktop, native PostgreSQL install, or Neon cloud? | **Answered:** Neon (Postgres) + Upstash (Redis), both cloud; no Docker needed. Mailpit still runs locally for email (module 11) | Module 02 |
| 2 | Redux Toolkit, or TanStack Query + Zustand? | **Decided:** Redux Toolkit for client state + Next.js `fetch` for data (no TanStack Query, no Zustand) | Module 04 |
| 3 | Taka shown as `৳1,250` or `Tk 1,250`? | `৳1,250` (the symbol is stored per currency, so it's easy to change) | Module 08 |
| 4 | Do USD customers get international shipping in the MVP? | Yes: addresses have a country, and there is an International shipping zone | Modules 13, 28 |
| 5 | Can online payment (SSLCommerz) also be used without login? | Yes, with the same details form as COD | Module 33 |
| 6 | Do paid online orders skip admin confirmation? | Yes, they move to Confirmed automatically; only COD orders wait for an admin | Module 33 |
| 7 | Is email required for guest orders? | No: phone is required, email is optional (needed only for email updates) | Module 29 |
| 8 | Who can write reviews? | Only verified buyers (with a delivered order). Reviews publish immediately; an admin can hide them | Module 35 |

---

## 2. Backend architecture

### Folder structure

```
wool_e_commerce_backend/
├─ docs/                       # this roadmap
├─ prisma/
│  ├─ schema.prisma
│  ├─ migrations/
│  └─ seed/                    # realistic knitwear seed data
├─ src/
│  ├─ server.ts                # starts the HTTP server, graceful shutdown
│  ├─ app.ts                   # builds the Express app (testable without listening)
│  ├─ routes.ts                # mounts every module router under /api/v1
│  ├─ config/
│  │  └─ env.ts                # env vars validated with Zod; app refuses to start on bad config
│  ├─ core/                    # cross-cutting code, no business rules
│  │  ├─ db/prisma.ts
│  │  ├─ cache/redis.ts
│  │  ├─ logger/               # pino + request ids
│  │  ├─ errors/               # AppError, NotFoundError, ... + global error handler
│  │  ├─ http/                 # response helpers, pagination, cache headers
│  │  ├─ middleware/           # validate, authenticate, authorize, rateLimit, requestId
│  │  ├─ events/               # in-process event bus (order.placed → send email)
│  │  └─ openapi/              # spec registry + /docs page
│  ├─ modules/
│  │  ├─ auth/
│  │  │  ├─ auth.routes.ts         # paths + middleware chain
│  │  │  ├─ auth.controller.ts     # HTTP in/out only
│  │  │  ├─ auth.service.ts        # business logic
│  │  │  ├─ auth.repository.ts     # Prisma queries
│  │  │  ├─ auth.schema.ts         # Zod schemas: validation + types + OpenAPI
│  │  │  ├─ auth.test.ts
│  │  │  └─ index.ts               # the module's public API
│  │  ├─ users/  currency/  media/  catalog/  cart/  wishlist/  shipping/
│  │  └─ orders/  payments/  reviews/  notifications/  contact/  settings/  stats/
│  └─ shared/                  # pure helpers: slug, money, dates
└─ tests/                      # integration test setup, data factories
```

### Module rules

1. A request flows `routes → validate → controller → service → repository → Prisma`. Controllers never touch Prisma; services never touch `req`/`res`.
2. Modules talk to each other only through their `index.ts` (for example `orders` calls `catalog.reserveStock()`). No importing another module's internal files, no querying another module's tables.
3. Side effects that aren't the module's job (emails, cache busting, page revalidation) go through the event bus. Modules stay decoupled, and these can move to a job queue (BullMQ) later.
4. Every input (body, query, params) and every env var is validated with Zod.
5. One response shape everywhere: `{ success: true, data, meta? }` or `{ success: false, error: { code, message, details? } }`.

### Data model (MVP)

- **User**, **Session** (hashed refresh tokens + device info), **VerificationToken** (email verification, password reset), **Address** (country + phone; Bangladeshi addresses also have division, district, area)
- **Currency** (code, symbol, decimals shown, Taka per unit, rounding rule), **ExchangeRateHistory**, **VariantPrice** (one price per variant per currency)
- **MediaAsset** (Cloudinary images, reused by products and categories)
- **Category** (tree through `parentId`), **Attribute** (Color, Size) + **AttributeValue** (Charcoal `#36454F`, Cream, S, M, L…), **Product**, **ProductVariant** (SKU, stock, its attribute values; prices live in VariantPrice), **ProductImage** (optionally linked to a color)
- **Cart** + **CartItem**, **WishlistItem**
- **ShippingZone** (Inside Dhaka / Outside Dhaka / International) + **ShippingRate** (fee and free-delivery threshold per currency)
- **Order** (readable number like `WL-260001`, optional user so guests can order, customer name/phone/email, currency, exchange-rate snapshot, snapshot of address and prices), **OrderItem** (product snapshot), **OrderStatusHistory** (timeline), **Payment** (provider, currency, transaction id, status, raw gateway payload)
- **Review** (verified-purchase flag, visibility). Product stores the rating average and count
- **ContactMessage** (contact form), **StoreSetting** (announcement text, contact numbers, social links)
- IDs are UUID v7 (time-ordered). Columns used for filtering and sorting get indexes.

This keeps the Attribute/Variant idea from the old NestJS code, but moves price and stock onto the variant, where they belong: Charcoal / M and Cream / L can have different stock.

### Multi-currency design

- **Currencies are data, not code.** The `Currency` table holds `BDT` (৳, 0 decimals shown) and `USD` ($, 2 decimals shown), each with an exchange rate ("1 USD = 122 BDT") and a rounding rule for converted prices (for example USD → x.99, Taka → nearest 10). Adding EUR later is an admin action.
- **Each variant has a price per currency** (`VariantPrice`: amount, compare-at amount, `isManual`). Like international brands, you can set the USD price yourself (manual) or let it be calculated from the Taka price with the exchange rate and rounding rule (auto).
- **Auto prices are stored, not calculated on every request**, so filtering and sorting by price works in every currency. When an exchange rate changes, all auto prices for that currency are recalculated; manual prices stay as they are.
- **Shipping fees and the free-delivery threshold** are set per currency too.
- **Orders lock their currency.** An order stores its currency, every amount in that currency, and the exchange rate to Taka at that moment, so sales reports can show everything in Taka.
- **Payment methods depend on the currency.** COD, bKash and Nagad are Taka-only. USD orders pay by card through SSLCommerz.
- **The cart stores only variants and quantities, never prices.** Switching currency re-prices it instantly, and the server calculates the final total in the order's currency.
- **Storefront:** the navbar's currency switcher saves the choice in a cookie. Next's `proxy.ts` rewrites each request internally to a per-currency version of the page (`/shop` → `/usd/shop`, URL unchanged), so each currency is cached separately: pages stay static and fast, with no price flash. Visitors without a cookie see Taka, so search engines always see the same prices. Visitors from outside Bangladesh get a small "Switch to USD?" prompt based on their country.

---

## 3. Frontend architecture

```
wool_e_commerce_frontend/src/
├─ app/
│  ├─ [currency]/              # hidden segment: proxy.ts rewrites /shop → /usd/shop from the currency cookie
│  │  └─ (shop)/               # storefront layout: navbar, footer, floating buttons
│  │     ├─ page.tsx           # home
│  │     ├─ shop/              # all products + filters
│  │     ├─ collections/[slug]/
│  │     ├─ products/[slug]/
│  │     ├─ cart/  checkout/  track-order/  search/
│  │     └─ about/  contact/  faq/  shipping-returns/  privacy-policy/  terms/  refund-policy/
│  ├─ (auth)/                  # login, register, verify-email, forgot/reset password
│  ├─ user/                    # customer area (noindex): dashboard, orders, addresses, wishlist, profile
│  ├─ admin/                   # admin area (noindex, own layout): dashboard, products, orders, customers, reviews, settings
│  ├─ api/revalidate/          # the backend calls this to refresh cached pages
│  ├─ sitemap.ts  robots.ts  manifest.ts  opengraph-image.tsx
│  └─ not-found.tsx  error.tsx  loading.tsx
├─ components/
│  ├─ ui/          # design system: Button, Input, Select, Modal, Drawer, Toast, Tabs, ...
│  ├─ motion/      # Reveal, Stagger, TextReveal, Parallax, Magnetic, Marquee, CountUp
│  ├─ layout/      # Navbar, MegaMenu, MobileMenu, Footer, FloatingActions, Container
│  ├─ product/     # ProductCard, Gallery, VariantPicker, AddToCart, Filters
│  ├─ cart/        # CartDrawer, CartLine, CartSummary
│  └─ admin/       # DataTable, StatCard, charts
├─ features/       # per-feature logic: hooks, API calls (cart, auth, catalog, checkout)
├─ store/          # Redux: makeStore, typed hooks, slices (ui, auth, cart, wishlist…)
├─ lib/            # API client, formatPrice (any currency), cn(), SEO + JSON-LD helpers
├─ styles/         # design tokens
└─ types/          # generated API types
```

Server Components by default. `"use client"` only for interactive pieces, kept small. Pages that need SEO (home, listing, product) fetch their data on the server.

**Data and state:** Server Components call the API with Next.js `fetch` (cached with tags, refreshed on demand). Client components call it through `lib/api` (a thin typed `fetch` wrapper), usually from Redux thunks. Redux Toolkit holds state that several client components share: UI (drawers, menus), the current user, cart and wishlist. State used by a single component stays in `useState`.

### Design system

- **Colors:** `ink` (black) and `paper` (white) as primary and secondary, a neutral gray scale for borders and muted text, and status colors: success (green), warning (amber), danger/sale (red), info (blue). Components only use semantic tokens (`--bg`, `--fg`, `--muted`, `--border`, `--sale`…), so dark mode is just a token swap.
- **Type:** picked in module 05. Suggestion: a serif display font for headings (editorial, premium) + a clean sans for body. Fluid sizes with `clamp()`; body text never below 16px on mobile.
- **Tokens** for spacing, radius, shadows, z-index and motion (durations, easings) in Tailwind v4 `@theme`.

### UX pieces we'll build

- **Product card:** 4:5 image that swaps to a second image on hover, badges (New, −20%, Low stock, Sold out), animated wishlist heart, color swatches, price with strike-through, rating, quick add (sizes on hover on desktop, a button on mobile), skeleton state.
- **Product details page:** gallery with zoom, swipe and lightbox; color picker that switches images; size buttons with sold-out state; size guide modal; quantity stepper; add to cart with a fly-to-cart animation; sticky add-to-cart bar on mobile; delivery estimate (Inside Dhaka / Outside Dhaka / International) + COD badge for Taka orders; accordions (details, material & care, shipping & returns); reviews; related and recently viewed products.
- **Global:** announcement marquee, sticky navbar that hides on scroll down, mega menu, currency switcher (৳ / $), animated mobile menu, search overlay with instant results, cart drawer with a free-delivery progress bar, toasts, page transitions, animated 404.
- **Floating buttons (bottom right):** scroll-to-top with a scroll-progress ring; contact button that expands into WhatsApp / Messenger / Call.

### Animation rules (smooth, not laggy)

| Tool | Used for |
|---|---|
| Motion (`motion/react`) | Component animations: hover/tap, drawers, modals, toasts, grid reflow when filtering, fly-to-cart, page transitions |
| GSAP + ScrollTrigger + SplitText | Scroll storytelling on home/brand pages: pinned sections, horizontal lookbook, text reveals, parallax |
| Lenis | Smooth wheel scrolling, driven by GSAP's ticker so the two never fight |

1. Animate only `transform` and `opacity`.
2. The LCP element (hero heading/image) is visible on first paint and never starts at `opacity: 0`.
3. Lenis: smooth on desktop wheel, native scrolling on touch devices (`syncTouch` off), disabled in `/admin`.
4. Motion loads through `LazyMotion` (small bundle); GSAP loads only on pages that use it.
5. `prefers-reduced-motion` is respected everywhere.
6. Scroll reveals run once (IntersectionObserver). No React state updates on scroll.
7. An animation isn't done until it's smooth with DevTools CPU throttling at 4×.

---

## 4. Performance, SEO and caching (from the first module, not a final milestone)

**Targets (mobile Lighthouse):** Performance ≥ 90; Accessibility, Best Practices and SEO = 100. Core Web Vitals: LCP < 2.5 s, CLS < 0.1, INP < 200 ms.

**Caching layers**

| Layer | What's cached | Refreshed by |
|---|---|---|
| Browser / CDN | Hashed JS/CSS (immutable), optimized images | A new deploy |
| Next.js cache | Catalog pages and data, tagged (`products`, `product:<slug>`), one cached version per currency | The backend calls `/api/revalidate` when an admin edits a product |
| API HTTP headers | Public GETs: `s-maxage` + `stale-while-revalidate`. User data: `private, no-store` | Expiry |
| Redis (module 40) | Expensive catalog queries, rate-limit counters | Event bus on product/stock changes |
| PostgreSQL | Indexes, selecting only needed columns, no N+1 queries | n/a |
| Redux store | Cart, wishlist, current user and UI state in the browser | Thunks update it after each API call |

Personal data (cart, orders, profile) never goes into a shared cache.

**SEO:** metadata and canonical URL per page, Open Graph tags and dynamic OG images for products, `sitemap.ts`, `robots.ts`, JSON-LD (Organization, WebSite search, Product + Offer + rating, BreadcrumbList, FAQ), semantic HTML, `noindex` on `/user`, `/admin`, cart and checkout, and filter URLs canonicalized so they don't create duplicate pages.

---

## 5. Security baseline

- Helmet headers on the API; Content Security Policy on the Next app
- CORS allowlist; credentials only for our own origin
- Rate limiting, stricter on login, register, password reset, contact form and guest order placement
- Guest COD orders: BD phone validation, limits per phone and IP, and nothing ships before an admin confirms
- Zod validation on every input; request body size limits
- Argon2 password hashing; refresh-token rotation with reuse detection; only hashed tokens stored
- httpOnly + Secure + SameSite cookies; Origin check on state-changing requests
- Roles: CUSTOMER / STAFF / ADMIN
- The server recalculates every price and total; nothing from the client is trusted
- Stock updated atomically inside transactions, so no overselling
- Payment callbacks verified through SSLCommerz's validation API and processed idempotently (safe if received twice)
- Logs redact passwords, tokens and cookies; no stack traces in production error responses
- `npm audit` / Dependabot in CI

---

## 6. Milestones

Milestones run in order, 01 → 09. Inside a milestone, follow the module order in section 7. Modules in different repos with no dependency between them can be built in parallel.

| # | Milestone | Repos | When it's done |
|---|---|---|---|
| 01 | [Foundations](milestones/milestone-01-foundations/feature.md) | both | Both repos run with professional tooling. Backend skeleton is tested; frontend is upgraded and cleaned up |
| 02 | [Design system & storefront shell](milestones/milestone-02-design-system/feature.md) | frontend | Custom UI kit, motion system, layout and an animated home page on mock data, Lighthouse ≥ 90 |
| 03 | [Identity](milestones/milestone-03-identity/feature.md) | both | Register, verify email, log in, user dashboard with profile and addresses |
| 04 | [Catalog & currency API](milestones/milestone-04-catalog-api/feature.md) | backend | Full knitwear catalog with Taka and USD prices, managed through the API |
| 05 | [Storefront catalog](milestones/milestone-05-storefront-catalog/feature.md) | both | Real shop, product pages, search, currency switch, SEO, content pages, staging deploy |
| 06 | [Cart, checkout & COD](milestones/milestone-06-cart-checkout-cod/feature.md) | both | Guest or logged-in COD orders, order tracking, admin confirms orders |
| 07 | [Online payments & reviews](milestones/milestone-07-payments-reviews/feature.md) | both | SSLCommerz in Taka and USD; reviews from verified buyers |
| 08 | [Admin dashboard](milestones/milestone-08-admin-dashboard/feature.md) | both | The store can be run entirely from `/admin` |
| 09 | [Hardening & launch](milestones/milestone-09-hardening-launch/feature.md) | both | Redis caching, performance and security audits, end-to-end tests, production |

The MVP is complete after milestone 09.

---

## 7. Master index

| ✓ | # | Module | Milestone | Repo | Depends on |
|---|---|---|---|---|---|
| ◐ | 01 | Backend setup | 01 | backend | none |
| ◐ | 02 | Database setup | 01 | backend | 01 |
| ◐ | 03 | API core | 01 | backend | 01, 02 |
| ◐ | 04 | Frontend setup | 01 | frontend | none |
| ☐ | 05 | Design tokens | 02 | frontend | 04 |
| ☐ | 06 | UI primitives | 02 | frontend | 05 |
| ☐ | 07 | Motion system | 02 | frontend | 04, 05 |
| ☐ | 08 | UI overlays & display | 02 | frontend | 06, 07 |
| ☐ | 09 | Layout shell | 02 | frontend | 06, 07, 08 |
| ☐ | 10 | Home page | 02 | frontend | 09 |
| ☐ | 11 | Email service | 03 | backend | 02, 03 |
| ☐ | 12 | Auth (backend) | 03 | backend | 02, 03, 11 |
| ☐ | 13 | Users & addresses (backend) | 03 | backend | 12 |
| ☐ | 14 | API client | 03 | frontend | 03, 04 |
| ☐ | 15 | Auth (frontend) | 03 | frontend | 08, 12, 14 |
| ☐ | 16 | User dashboard | 03 | frontend | 13, 15 |
| ☐ | 17 | Currency (backend) | 04 | backend | 03, 12 |
| ☐ | 18 | Media (backend) | 04 | backend | 03, 12 |
| ☐ | 19 | Catalog admin (backend) | 04 | backend | 17, 18 |
| ☐ | 20 | Catalog public API | 04 | backend | 19 |
| ☐ | 21 | Currency storefront | 05 | frontend | 09, 14, 17 |
| ☐ | 22 | Product listing | 05 | frontend | 10, 20, 21 |
| ☐ | 23 | Product details | 05 | frontend | 22 |
| ☐ | 24 | SEO & caching | 05 | both | 19, 22, 23 |
| ☐ | 25 | Content pages | 05 | both | 09, 11, 14, 24 |
| ☐ | 26 | Staging deploy | 05 | both | 24, 25 |
| ☐ | 27 | Cart & wishlist (backend) | 06 | backend | 12, 17, 20 |
| ☐ | 28 | Shipping (backend) | 06 | backend | 13, 17 |
| ☐ | 29 | Orders (backend) | 06 | backend | 11, 13, 27, 28 |
| ☐ | 30 | Cart & wishlist (frontend) | 06 | frontend | 15, 21, 23, 27 |
| ☐ | 31 | Checkout (frontend) | 06 | frontend | 16, 28, 29, 30 |
| ☐ | 32 | Admin orders (minimal) | 06 | frontend | 15, 29 |
| ☐ | 33 | Payments (backend) | 07 | backend | 29 |
| ☐ | 34 | Payments (frontend) | 07 | frontend | 31, 33 |
| ☐ | 35 | Reviews (backend) | 07 | backend | 20, 29 |
| ☐ | 36 | Reviews (frontend) | 07 | frontend | 16, 23, 35 |
| ☐ | 37 | Admin dashboard home | 08 | both | 29, 32 |
| ☐ | 38 | Admin catalog UI | 08 | frontend | 18, 19, 37 |
| ☐ | 39 | Admin operations UI | 08 | both | 25, 28, 35, 37 |
| ☐ | 40 | Redis caching | 09 | backend | 17, 20, 28 |
| ☐ | 41 | Performance audit | 09 | both | 40 + all storefront modules |
| ☐ | 42 | Security audit | 09 | both | all MVP modules |
| ☐ | 43 | End-to-end tests | 09 | frontend | all MVP modules |
| ☐ | 44 | Production deploy | 09 | both | 41, 42, 43 |

---

## 8. After the MVP: advanced modules

Each of these becomes its own milestone (10, 11, …) with the same folder structure when we start it.

- Coupons & discounts (percent/fixed, minimum order, usage limits, per-currency amounts)
- Inventory ledger, low-stock alerts, stock reservation during payment
- Direct bKash Tokenized Checkout, Nagad
- Stripe or PayPal for international payments
- Automatic daily exchange rates from a rates API
- Country-specific pricing and market URLs (`/bd`, `/us`) with hreflang
- Courier APIs: Steadfast / Pathao / RedX (create parcel, tracking updates)
- Phone OTP login and OTP-verified COD orders (BD SMS gateway), Google login
- Link a guest's past orders to their account when they register with the same phone or email
- Background jobs with BullMQ (emails, image processing, abandoned-cart reminders)
- Real-time notification bell (SSE or WebSocket) for customers and admins
- Newsletter with double opt-in
- Bangla language (i18n) + hreflang
- Dedicated search engine (Meilisearch or Typesense) with typo tolerance and facets
- Returns & refunds, PDF invoices
- CMS for homepage banners and sections; blog for SEO
- Sales reports, fine-grained staff permissions, audit log
- Back-in-stock alerts, flash sales with countdown, gift cards, loyalty points
- Recommendations ("frequently bought together")
- PWA (installable, offline browsing)
- Observability: OpenTelemetry tracing, dashboards
