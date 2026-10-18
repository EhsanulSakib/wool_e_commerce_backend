# Module 08: UI overlays & display

| | |
|---|---|
| Milestone | 02 Design system & storefront shell |
| Repo | frontend |
| Depends on | 06, 07 |
| Unblocks | 09, 15 |

## Goal

Finish the custom UI kit with the harder components: overlays that manage focus and scrolling, interactive display components, and the e-commerce specific pieces (price tag, rating, swatch, carousel). All follow the WAI-ARIA patterns.

## Included

- **Hooks:** `useDisclosure`, `useFocusTrap`, `useScrollLock` (stops Lenis too), `useClickOutside`, `useEscapeKey`, `useMediaQuery`
- **Portal**
- **Modal / Dialog:** sizes, title + description wired to ARIA, close button, focus trap and restore, Escape and backdrop close, animated open/close
- **Drawer / Sheet:** left, right, bottom; used for cart, mobile menu, mobile filters
- **Dropdown menu:** button + menu, arrow keys, Home/End, Escape, closes on select
- **Popover** and **Tooltip** (hover + focus, delay, flips when there's no space)
- **Toast system:** provider + `toast.success / error / info()` API, queue, auto-dismiss with pause on hover, `aria-live`, stacked animation, optional action button (e.g. Undo)
- **Tabs:** ARIA tabs pattern with arrow keys and an animated indicator
- **Accordion:** single or multiple open, animated height, `aria-expanded`
- **Carousel:** scroll-snap based, previous/next buttons, dots, swipe on touch, drag on desktop, keyboard accessible
- **Rating:** display (with half stars) and input mode (radio group, used for reviews in module 36)
- **PriceTag + `formatPrice()`:** any currency (symbol, decimals from currency data), sale price with compare-at strike-through and discount %, sizes
- **Breadcrumbs**, **Pagination** (real links, ellipsis), **Swatch** (color circle, selected ring, sold-out slash, name tooltip), **Avatar**, **EmptyState**
- All added to `/dev/ui`

## Not included

- Real data (later milestones)

## Notes

- `formatPrice` uses `Intl.NumberFormat` with currency metadata; until the currency API exists (module 17), use a local map for BDT and USD with the same shape the API will return.
- Taka format depends on ROADMAP open question 3 (assumption `৳1,250`).
- Overlays render in a portal and must not break when Lenis is running; always pair scroll lock with `lenis.stop()`.

## You'll learn

- WAI-ARIA patterns: dialog, menu, tabs, accordion, carousel
- Focus management and why restoring focus matters
- Compound component APIs
- `Intl.NumberFormat` and currency formatting
