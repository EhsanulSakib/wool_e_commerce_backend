# Module 08: UI overlays & display · QA

## Automated

- [x] `formatPrice(1250, BDT)` → `৳1,250`; `formatPrice(49.99, USD)` → `$49.99`; `formatPrice(1250.5, BDT)` → `৳1,251` (BDT shows 0 decimals)
- [x] Discount: price 1,800, compare-at 2,400 → 25%
- [x] Modal test: opens, focus inside, Escape closes, focus returns to the trigger (+ Tab cycles, page inert while open)

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Open a Modal with the keyboard | Focus moves inside; Tab cycles only inside; Escape closes; focus back on the trigger | ☑ (8 Tabs stayed inside; focus back on “Open size guide”) |
| 2 | Open a Modal and try to scroll the page | Background doesn't scroll (also with Lenis on desktop) | ☑ (wheel while open: scrollY unchanged, `lenis-stopped`, released on close) |
| 3 | Open a Drawer from each side | Animates in from that side; same focus behavior as Modal | ☑ (mid-animation translate from the right/left/bottom; focus on Close) |
| 4 | DropdownMenu: Enter to open, arrows, Enter to select | Works; menu closes; focus returns | ☑ (+ Home/End, typeahead, Escape) |
| 5 | Tooltip near the screen edge | Flips to stay visible; appears on keyboard focus too | ☑ (flip covered by `computePosition` unit tests; opens on keyboard focus, described via aria-describedby) |
| 6 | Fire 4 toasts quickly | Stack and dismiss in order; hover pauses the timer; screen reader announces each | ☑ (3 shown, 4th queued; 5.6 s hover kept all 3; polite live region) |
| 7 | Toast with Undo action | Button works and is keyboard reachable | ☑ |
| 8 | Tabs: arrow keys, Home, End | Selection moves; indicator animates | ☑ |
| 9 | Accordion open/close | Smooth height animation; `aria-expanded` toggles | ☑ |
| 10 | Carousel on touch, mouse and keyboard | Swipe, drag and buttons all work; snaps to items | ☑ (buttons, ←/→, mouse drag → snaps; touch swipe is native scroll-snap, not tested on a device) |
| 11 | RatingInput with arrow keys | Value changes; screen reader reads "3 of 5 stars" | ☑ (native radios: “3 stars”, position 3 of 5) |
| 12 | Swatch sold out | Visibly crossed out and announced as unavailable | ☑ (“Forest, sold out”) |
| 13 | Everything above at 360 px and in dark mode | Usable and readable | ☑ (screenshots; no horizontal overflow after the Carousel min-width fix) |

## Non-functional

- [x] axe: 0 violations, light and dark, closed and with modal / drawer / menu / popover / toasts open
- [ ] Overlay animations smooth at 4× CPU throttle (transform/opacity only; check in a real browser with GPU, see module 07)
- [x] Reduced motion: overlays appear without movement (one frame at the start state, then final; no in-between frames)

## Result

## Notes

**Bugs found in the real browser (jsdom missed them), all fixed:**
- Focus didn't return to the trigger after closing a modal: it was restored while the page was still `inert`. The hooks now run inert → focus trap, so cleanups undo them in that order.
- The dropdown didn't focus its first item: the panel was `visibility: hidden` for one render before measuring, and hidden elements can't take focus.
- At 360 px the page overflowed by 339 px: the Carousel section kept `min-width: auto` in a grid. Now `min-w-0 w-full`.
- axe: accordion panels as `role="region"` (duplicate landmarks), menus portalled outside any landmark (`region`), duplicate nav names in the demo.

**Home page Lighthouse (mobile):** 92 / 100 / 100 / 100 in all three runs, LCP 3.3–3.4 s, TBT 50–60 ms, CLS 0. Initial JS 231 KB gz (+9 KB: Toaster always mounted, AnimatePresence).

The `৳` sign renders in a fallback font (Inter's Latin subset has no Bengali characters); it looks fine.

## Result

| Date | Result | Notes |
|---|---|---|
| 2026-10-20 | Pass (one check left) | Automated, headless browser and axe checks pass. Remaining: overlay smoothness at 4× CPU in a real browser with GPU, and a touch-device swipe check of the Carousel |
