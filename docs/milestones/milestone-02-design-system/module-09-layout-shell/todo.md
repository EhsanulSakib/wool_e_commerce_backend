# Module 09: Layout shell · Todo

Repo: frontend, committed on `main` (see ROADMAP "Current practice")

## 1. Structure

- [x] `app/(shop)/layout.tsx` with announcement bar, navbar, `<main id="content">`, footer, floating actions (all in `ShopShell`, also used by the root `not-found.tsx`). Pages live in `(shop)/(pages)/` with `loading.tsx`
- [x] `src/lib/site-config.ts` with navigation, categories, collections, contact and social data
- [x] Skip-to-content link as the first focusable element

## 2. Announcement bar

- [x] `AnnouncementBar` using `Marquee`; dismiss button; cookie to remember dismissal. **Changed:** not read on the server (`cookies()` would make every page dynamic); a pre-paint inline script in the root `<head>` marks `<html>` and CSS hides the bar: no flash, pages stay static

## 3. Navbar

- [x] Rebuild `Navbar` with the new UI kit (deleted the old Navbar, `navLinks.ts`, `useNavbar.ts` and `components/shared/`; ThemeSwitcher → `layout/ThemeToggle`)
- [x] Sticky with hide-on-scroll-down / show-on-scroll-up (window scroll events, which Lenis also fires; `data-hidden` / `data-at-top` written to the DOM, no React state; stays visible with focus inside or a menu open)
- [x] Transparent variant over the hero, solid after scrolling past it
- [x] Theme-aware logo via CSS (two images or an SVG using `currentColor`)
- [x] Desktop links + `MegaMenu` (hover intent delay, click/Enter, Escape closes, category images)
- [x] Icon buttons: search, wishlist, cart with `NotificationDot`, account, theme toggle
- [x] `CurrencySwitcher` UI (dropdown ৳ BDT / $ USD; no logic yet; choice in `uiSlice.currency` so navbar and mobile menu agree)

## 4. Mobile menu, search, cart shells

- [x] `MobileMenu` drawer: staggered links, category accordion, account + currency at the bottom
- [x] `SearchOverlay` shell: full-width input, recent searches placeholder, Escape closes
- [x] `CartDrawer` shell: mock line items, subtotal, free-delivery progress bar, checkout button (+ quantity stepper, remove with Undo toast)

## 5. Footer

- [x] Newsletter form (UI + toast, email validation)
- [x] Link columns, social links, payment method logos, contact info, copyright (lucide 1.x has no brand icons: small hand-made SVGs for social, text badges for payments; swap in official assets before launch)
- [x] Responsive: columns collapse into accordions on mobile

## 6. Floating actions

- [x] `ScrollToTop`: appears after ~600 px, progress ring from scroll progress, uses `lenis.scrollTo`, instant with reduced motion
- [x] `ContactFab`: expands into WhatsApp, Messenger, Call; closes on outside click/Escape; `aria-expanded`
- [x] Safe-area insets (`env(safe-area-inset-bottom)`); reserved space for a future sticky bar

## 7. Pages and transitions

- [x] `template.tsx` with React `<ViewTransition>` (stable in React 19.3; client navigations only, so first paint/LCP is never delayed; off with reduced motion)
- [x] `not-found.tsx` (animated, search, links), `error.tsx` (retry; Next 16 `retry()`), `global-error.tsx`. Root and `(shop)` error boundaries; `/dev/error` throws on demand
- [x] `loading.tsx` with skeletons

## Done when

- [x] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] Committed on `main`, module marked ☑ in the ROADMAP master index

## Also done

- [x] Drawers (mobile menu, search, cart) load on first open via `next/dynamic`, preloaded on hover/focus of their button (off the critical path)
- [x] Root layout: `viewport` export (`viewportFit: 'cover'` for safe areas, theme colors); `<body suppressHydrationWarning>` for browser-extension attributes
- [x] `useScrollLock` sets `data-scroll-locked` on `<html>` (floating buttons hide behind drawers); Drawer gained `side="top"`
- [x] Dev pages: own small toolbar (links + theme toggle) instead of the storefront shell
- [x] `uiSlice`: `openMobileMenu`, `openSearch`, `currency` + `setCurrency`
