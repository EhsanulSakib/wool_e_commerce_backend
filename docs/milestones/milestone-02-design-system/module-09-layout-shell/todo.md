# Module 09: Layout shell · Todo

Branch: `feat/09-layout-shell` (frontend repo)

## 1. Structure

- [ ] `app/(shop)/layout.tsx` with announcement bar, navbar, `<main id="content">`, footer, floating actions
- [ ] `src/lib/site-config.ts` with navigation, categories, collections, contact and social data
- [ ] Skip-to-content link as the first focusable element

## 2. Announcement bar

- [ ] `AnnouncementBar` using `Marquee`; dismiss button; cookie to remember dismissal (read on the server to avoid a flash)

## 3. Navbar

- [ ] Rebuild `Navbar` with the new UI kit (delete the old Navbar, `navLinks.ts` and `useNavbar.ts`)
- [ ] Sticky with hide-on-scroll-down / show-on-scroll-up (Lenis scroll direction, transform only)
- [ ] Transparent variant over the hero, solid after scrolling past it
- [ ] Theme-aware logo via CSS (two images or an SVG using `currentColor`)
- [ ] Desktop links + `MegaMenu` (hover intent delay, click/Enter, Escape closes, category images)
- [ ] Icon buttons: search, wishlist, cart with `NotificationDot`, account, theme toggle
- [ ] `CurrencySwitcher` UI (dropdown ৳ BDT / $ USD; no logic yet)

## 4. Mobile menu, search, cart shells

- [ ] `MobileMenu` drawer: staggered links, category accordion, account + currency at the bottom
- [ ] `SearchOverlay` shell: full-width input, recent searches placeholder, Escape closes
- [ ] `CartDrawer` shell: mock line items, subtotal, free-delivery progress bar, checkout button

## 5. Footer

- [ ] Newsletter form (UI + toast)
- [ ] Link columns, social links, payment method logos, contact info, copyright
- [ ] Responsive: columns collapse into accordions on mobile

## 6. Floating actions

- [ ] `ScrollToTop`: appears after ~600 px, progress ring from scroll progress, uses `lenis.scrollTo`, instant with reduced motion
- [ ] `ContactFab`: expands into WhatsApp, Messenger, Call; closes on outside click/Escape; `aria-expanded`
- [ ] Safe-area insets (`env(safe-area-inset-bottom)`); reserved space for a future sticky bar

## 7. Pages and transitions

- [ ] `template.tsx` enter transition (or View Transitions)
- [ ] `not-found.tsx` (animated, search, links), `error.tsx` (retry), `global-error.tsx`
- [ ] `loading.tsx` with skeletons

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
