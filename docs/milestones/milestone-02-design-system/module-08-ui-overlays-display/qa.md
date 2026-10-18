# Module 08: UI overlays & display · QA

## Automated

- [ ] `formatPrice(1250, BDT)` → `৳1,250` (or the chosen format); `formatPrice(49.99, USD)` → `$49.99`; `formatPrice(1250.5, BDT)` follows the BDT decimals rule
- [ ] Discount: price 1,800, compare-at 2,400 → 25%
- [ ] Modal test: opens, focus inside, Escape closes, focus returns to the trigger

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Open a Modal with the keyboard | Focus moves inside; Tab cycles only inside; Escape closes; focus back on the trigger | ☐ |
| 2 | Open a Modal and try to scroll the page | Background doesn't scroll (also with Lenis on desktop) | ☐ |
| 3 | Open a Drawer from each side | Animates in from that side; same focus behavior as Modal | ☐ |
| 4 | DropdownMenu: Enter to open, arrows, Enter to select | Works; menu closes; focus returns | ☐ |
| 5 | Tooltip near the screen edge | Flips to stay visible; appears on keyboard focus too | ☐ |
| 6 | Fire 4 toasts quickly | Stack and dismiss in order; hover pauses the timer; screen reader announces each | ☐ |
| 7 | Toast with Undo action | Button works and is keyboard reachable | ☐ |
| 8 | Tabs: arrow keys, Home, End | Selection moves; indicator animates | ☐ |
| 9 | Accordion open/close | Smooth height animation; `aria-expanded` toggles | ☐ |
| 10 | Carousel on touch, mouse and keyboard | Swipe, drag and buttons all work; snaps to items | ☐ |
| 11 | RatingInput with arrow keys | Value changes; screen reader reads "3 of 5 stars" | ☐ |
| 12 | Swatch sold out | Visibly crossed out and announced as unavailable | ☐ |
| 13 | Everything above at 360 px and in dark mode | Usable and readable | ☐ |

## Non-functional

- [ ] axe DevTools: 0 violations with overlays open and closed
- [ ] Overlay animations smooth at 4× CPU throttle
- [ ] Reduced motion: overlays appear without movement

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
