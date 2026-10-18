# Module 09: Layout shell

| | |
|---|---|
| Milestone | 02 Design system & storefront shell |
| Repo | frontend |
| Depends on | 06, 07, 08 |
| Unblocks | 10, 21, 25 |

## Goal

Build the frame around every storefront page: announcement bar, navbar with mega menu, mobile menu, footer, floating action buttons, page transitions and the error/404/loading pages. Rebuild the existing Navbar on top of the new UI kit.

## Included

- `(shop)` route group with its layout (moved under `[currency]` in module 21)
- `src/lib/site-config.ts`: store name, navigation, categories (Sweaters, Cardigans, Scarves, Beanies, Accessories), collections (New In, Bestsellers, Winter), social links, WhatsApp/Messenger/phone, email (replaced by backend settings in module 39)
- **Announcement bar:** marquee text ("Free delivery inside Dhaka over ৳3,000 · Cash on Delivery available"), dismissible, remembered in a cookie
- **Navbar:** sticky; hides on scroll down and shows on scroll up (transform only); transparent over the hero, solid after scrolling; theme-aware logo without JS checks; desktop links with **mega menu** (category tiles with images); icons for search, wishlist, cart (count badge), account, theme toggle; **currency switcher** UI (wired in module 21)
- **Mobile menu:** full-height drawer, staggered links, category accordion, account and currency at the bottom
- **Search overlay** shell (wired in module 22) and **cart drawer** shell with mock items (wired in module 30)
- **Footer:** newsletter form (UI only, shows a toast; newsletter is a post-MVP module), link columns (Shop, Help, Company), social links, payment logos (COD, bKash, Nagad, Visa/Mastercard), contact info, copyright
- **Floating actions (bottom right):** scroll-to-top button that appears after scrolling and shows scroll progress as a ring; contact button that expands into WhatsApp (`wa.me`), Messenger (`m.me`) and Call (`tel:`); respects safe-area insets on phones
- **Page transitions:** simple enter transition via `template.tsx` (or View Transitions if stable in the installed Next version)
- **Pages:** `not-found.tsx` (animated, search + popular links), `error.tsx` (retry), `global-error.tsx`, `loading.tsx` skeletons
- "Skip to content" link

## Not included

- Working search, cart, currency, account menu (modules 22, 30, 21, 15)
- Footer content pages (module 25)

## Notes

- Scroll direction comes from Lenis's scroll event, not a React state update on every scroll; toggle a data attribute or use a Motion value.
- Mega menu opens on hover with a short intent delay on desktop and on click/Enter for keyboard users.
- Floating buttons must not cover the mobile sticky add-to-cart bar (module 23) or the cart drawer; reserve the space now.

## You'll learn

- Layouts and templates in the App Router
- Scroll-direction UI without re-rendering on every scroll
- Accessible navigation menus
