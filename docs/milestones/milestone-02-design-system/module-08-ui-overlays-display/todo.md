# Module 08: UI overlays & display · Todo

Branch: `feat/08-ui-overlays-display` (frontend repo)

## 1. Hooks

- [ ] `useDisclosure` (open, close, toggle)
- [ ] `useFocusTrap` (first/last focusable cycling, initial focus, restore on close)
- [ ] `useScrollLock` (body lock + `lenis.stop()`, compensates for scrollbar width)
- [ ] `useClickOutside`, `useEscapeKey`, `useMediaQuery`

## 2. Overlays

- [ ] `Portal`
- [ ] `Modal` (sizes, `aria-labelledby`, `aria-describedby`, close button, animated with `AnimatePresence`)
- [ ] `Drawer` (side prop, same focus/scroll behavior as Modal)
- [ ] `DropdownMenu` (trigger, items, separators, keyboard navigation)
- [ ] `Popover`
- [ ] `Tooltip` (hover + focus, delay, auto-flip, `aria-describedby`)
- [ ] `Toast` provider, `useToast` / `toast()` API, queue, pause on hover, `aria-live="polite"`, action button

## 3. Display

- [ ] `Tabs` (roving tabindex, arrow keys, Home/End, animated indicator with `layoutId`)
- [ ] `Accordion` (single/multiple, animated height, headings + buttons)
- [ ] `Carousel` (scroll-snap track, prev/next, dots, swipe, desktop drag, `aria-roledescription`)
- [ ] `Rating` display (half stars, accessible text "4.5 out of 5")
- [ ] `RatingInput` (radio group of 5 stars, arrow keys)
- [ ] `Breadcrumbs` (`nav` + `aria-label`, current page `aria-current`)
- [ ] `Pagination` (links, ellipsis, prev/next)
- [ ] `Swatch` (selected, disabled/sold out, tooltip)
- [ ] `Avatar` (image with initials fallback)
- [ ] `EmptyState` (icon, title, text, action)

## 4. Price formatting

- [ ] Confirm ROADMAP open question 3 (Taka format)
- [ ] `src/lib/money.ts`: `formatPrice(amount, currency)` using currency metadata (code, symbol, decimals)
- [ ] Local currency map for BDT and USD (same shape as the future API)
- [ ] `PriceTag` (current price, compare-at strike-through, discount % badge, sizes)
- [ ] Unit tests for `formatPrice` and discount calculation

## 5. Playground

- [ ] Add every component to `/dev/ui` with open/close triggers and all states

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
