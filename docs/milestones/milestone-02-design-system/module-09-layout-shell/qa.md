# Module 09: Layout shell · QA

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Check the layout at 360, 390, 768, 1024, 1280, 1536 px | No overflow; navbar and footer adapt; no horizontal scroll | ☑ (0 px overflow at all six widths; menu button < 1024, desktop nav ≥ 1024) |
| 2 | Scroll down 300 px, then up | Navbar hides, then shows; no content jump | ☑ (`translate: 0 -100%` → back; sticky, so no jump) |
| 3 | Dismiss the announcement bar, reload | Stays dismissed with no flash | ☑ (bar already `display: none` at DOMContentLoaded) |
| 4 | Hover "Shop" on desktop; move away | Mega menu opens after a short delay, closes when leaving | ☑ (closed at 60 ms, open at 360 ms, closed after leaving) |
| 5 | Tab to "Shop", press Enter, then Escape | Opens and closes; focus returns to the link | ☑ (Tab moves into the panel; Escape returns focus to “Shop”) |
| 6 | Open the mobile menu | Drawer animates in, focus trapped, background locked | ☑ |
| 7 | Scroll past 600 px | Scroll-to-top appears with the progress ring filling as you scroll | ☑ (hidden at 300 px; visible from 600 px; ring 98 → 61 → 15 → 0) |
| 8 | Click scroll-to-top with reduced motion on | Jumps instantly to the top | ☑ (0 within 30 ms; with Lenis it glides) |
| 9 | Open the contact button, click WhatsApp | Opens `wa.me/<number>` in a new tab | ☑ (placeholder number in `site-config.ts`) |
| 10 | iPhone emulation with a home indicator | Floating buttons sit above the safe area | ☐ (uses `env(safe-area-inset-bottom)` with `viewportFit: cover`; headless reports 0, check on an iPhone) |
| 11 | Visit `/does-not-exist` | Custom 404 page; Network tab shows status 404 | ☑ (404, fully server-rendered inside the shop shell) |
| 12 | Throw an error in a test page | `error.tsx` shows with a working Retry button | ☑ (`/dev/error`) |
| 13 | Press Tab once on a fresh page | "Skip to content" appears; Enter jumps to main content | ☑ (focus lands on `<main id="content">`) |
| 14 | Switch themes on every element above | All readable in both themes | ☑ (screenshots) |

## Non-functional

- [x] Lighthouse Accessibility 100 on a page with only the shell (home: 100 / Best Practices 100 / SEO 100)
- [x] axe: 0 violations with the mega menu, mobile menu, cart and search drawers open, on the 404, and on home in both themes
- [x] No React re-render on each scroll frame: navbar, scroll-to-top ring and visibility are written to the DOM from rAF-batched scroll listeners (by design; confirm with the React DevTools Profiler if you like)

## Result

## Notes

**Home Lighthouse (mobile):** Performance 85–88, Accessibility / Best Practices / SEO 100, TBT 70–100 ms, CLS 0. LCP 3.9–4.3 s is still the old hero PNG, now lower on the page under the announcement bar and navbar; module 10 rebuilds the hero.

**Known trade-off: shell code shipped twice (~17 KB gz).** The root `app/not-found.tsx` renders `ShopShell`, and Next preloads the root not-found boundary on every page, so the shell's client code ends up in two chunks. Tried instead: a `(shop)/[...slug]` catch-all calling `notFound()` with `(shop)/not-found.tsx`. That removed the duplicate but the 404 response had no server-rendered markup, and under `loading.tsx` it even became a 200 "soft 404" (also for `/robots.txt`). A correct, fully rendered 404 was preferred. Revisit in module 21 (routes move under `[currency]`) or 41 (performance audit): options are `global-not-found.js` or multiple root layouts.

**Also found and fixed:** React warned about the announcement bar's inline `<script>` when rendered on the client (moved to the root layout's `<head>`); browser extensions (Grammarly, ColorZilla) caused a `<body>` hydration warning in dev (`suppressHydrationWarning` on `<body>`).

## Result

| Date | Result | Notes |
|---|---|---|
| 2026-10-20 | Pass (one device check left) | All manual items verified in headless Chrome except the iPhone safe-area check; axe and Lighthouse targets met |
