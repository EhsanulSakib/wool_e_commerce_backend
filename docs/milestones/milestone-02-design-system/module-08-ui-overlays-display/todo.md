# Module 08: UI overlays & display · Todo

Repo: frontend, committed on `main` (see ROADMAP "Current practice")

## 1. Hooks

- [x] `useDisclosure` (open, close, toggle)
- [x] `useFocusTrap` (first/last focusable cycling, initial focus, restore on close)
- [x] `useScrollLock` (body lock + `lenis.stop()`, compensates for scrollbar width; ref-counted; exposes `--scrollbar-compensation` for fixed elements)
- [x] `useClickOutside`, `useEscapeKey` (only the topmost layer reacts), `useMediaQuery` (from module 07). Also: `useInertOthers` (rest of the page `inert` while a modal is open), `useAnchoredPosition` (flip + clamp, no positioning library)

## 2. Overlays

- [x] `Portal`
- [x] `Modal` (sizes, `aria-labelledby`, `aria-describedby`, close button, animated with `AnimatePresence`). Shares `Overlay.tsx` with Drawer; `useIsPresent` releases focus/scroll/inert as soon as the exit animation starts
- [x] `Drawer` (side prop, same focus/scroll behavior as Modal)
- [x] `DropdownMenu` (trigger, items, separators, keyboard navigation)
- [x] `Popover`
- [x] `Tooltip` (hover + focus, delay, auto-flip, `aria-describedby`)
- [x] `Toast` provider, `useToast` / `toast()` API, queue, pause on hover, `aria-live="polite"`, action button. `toast()` works without a hook (small store outside React); `<Toaster />` is in the root layout and stays usable while a modal is open

## 3. Display

- [x] `Tabs` (roving tabindex, arrow keys, Home/End, animated indicator with `layoutId`). Motion features switched from `domAnimation` to `domMax` for layout animations (lazy chunk 13 → 27 KB gz, not in the initial bundle)
- [x] `Accordion` (single/multiple, animated height, headings + buttons). Height via CSS `grid-template-rows: 0fr → 1fr`; closed panels `inert`; no `role="region"` (landmark noise)
- [x] `Carousel` (scroll-snap track, prev/next, dots, swipe, desktop drag, `aria-roledescription`)
- [x] `Rating` display (half stars, accessible text "4.5 out of 5")
- [x] `RatingInput` (radio group of 5 stars, arrow keys)
- [x] `Breadcrumbs` (`nav` + `aria-label`, current page `aria-current`)
- [x] `Pagination` (links, ellipsis, prev/next)
- [x] `Swatch` (selected, disabled/sold out, tooltip)
- [x] `Avatar` (image with initials fallback)
- [x] `EmptyState` (icon, title, text, action)

## 4. Price formatting

- [x] Confirm ROADMAP open question 3 (Taka format): `৳1,250`
- [x] `src/lib/money.ts`: `formatPrice(amount, currency)` using currency metadata (code, symbol, decimals, locale). Accepts API decimal strings; cached `Intl.NumberFormat`
- [x] Local currency map for BDT and USD (same shape as the future API)
- [x] `PriceTag` (current price, compare-at strike-through, discount % badge, sizes)
- [x] Unit tests for `formatPrice` and discount calculation

## 5. Playground

- [x] Add every component to `/dev/ui` with open/close triggers and all states

## Done when

- [x] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] Committed on `main`, module marked ☑ in the ROADMAP master index

## Also done

- [x] Tests: `money.test.ts`, `overlays.test.tsx` (Modal focus contract, Tabs and DropdownMenu keyboard, toast queue/action/auto-dismiss), `display.test.tsx` (pageRange, PriceTag text, Rating, Swatch, initials), `useAnchoredPosition.test.ts` (flip/clamp)
- [x] Vitest: `pool: 'vmThreads'` (jsdom created once per worker: suite 95 s → 7 s, fixes the recurring worker start-up timeouts); `css.postcss` disabled for tests; ResizeObserver stub
- [x] Floating panels (menu, popover, tooltip) portal into the trigger's landmark (`main`, `header`…), so they stay inside a region (axe `region`)
- [x] `Breadcrumbs` / `Pagination` take a `label` (unique landmark names when a page has two)
