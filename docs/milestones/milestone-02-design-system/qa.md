# Milestone 02 QA: Design system & storefront shell

Run this after modules 05–10 have each passed their own `qa.md`.

## Entry criteria

- [ ] Modules 05–10 are ☑ in the ROADMAP master index
- [ ] Frontend CI is green on `main`

## Scenario 1: Mobile walkthrough (390 × 844, touch emulation)

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Open the home page | Hero visible immediately, no layout jump while fonts and images load | ☐ |
| 2 | Scroll the whole page | Native touch scrolling; sections animate in once; no jank | ☐ |
| 3 | Open the mobile menu, expand a category, close it | Animated open/close, background doesn't scroll, focus returns to the menu button | ☐ |
| 4 | Scroll down, then up | Navbar hides on the way down, shows on the way up | ☐ |
| 5 | Tap the scroll-to-top button | Smooth scroll to top; button hides at the top | ☐ |
| 6 | Tap the contact button | Expands to WhatsApp / Messenger / Call with correct links | ☐ |
| 7 | Open the cart drawer shell and search overlay shell | Both open, trap focus, close with the close button | ☐ |
| 8 | Check every screen width from 360 px up | No horizontal scrolling anywhere | ☐ |

## Scenario 2: Desktop walkthrough (1440 px, mouse)

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Hover the Shop link | Mega menu opens with categories; closes when the mouse leaves | ☐ |
| 2 | Hover a product card | Second image fades in; quick-add sizes appear | ☐ |
| 3 | Scroll through the brand story and lookbook | Pinned sections and horizontal scroll run smoothly with Lenis | ☐ |
| 4 | Switch to dark mode | Every section, card and overlay looks right; no unreadable text | ☐ |

## Scenario 3: Keyboard only

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Press Tab from the top of the home page | "Skip to content" link appears first and works | ☐ |
| 2 | Tab through the navbar, open the mega menu with Enter, close with Escape | Works without a mouse; focus ring always visible | ☐ |
| 3 | Tab to a product card | Quick-add and wishlist buttons reachable; card link reachable | ☐ |
| 4 | Open and close every overlay on `/dev/ui` with the keyboard | Focus trapped inside; Escape closes; focus returns to the trigger | ☐ |

## Cross-cutting checks

- [ ] **Lighthouse (mobile, incognito)** on the home page: Performance ≥ 90, Accessibility 100, Best Practices 100, SEO 100. Record scores below
- [ ] **Core Web Vitals (lab):** LCP < 2.5 s, CLS < 0.1, TBT < 200 ms
- [ ] **Performance trace** at 4× CPU throttle while scrolling the home page: no long tasks over 100 ms, frame rate stays smooth
- [ ] **Reduced motion** (DevTools rendering emulation): nothing moves, everything is visible, pinned sections become normal stacked sections
- [ ] **axe DevTools** on home and `/dev/ui`: 0 violations
- [ ] **Screen reader smoke test** (NVDA on Windows): navbar, menu, a modal and a toast are announced sensibly
- [ ] **Tokens only:** searching `src/components` for hex colors (`#[0-9a-fA-F]{3,6}`) finds nothing outside `styles/`
- [ ] **Regression:** milestone 01 QA scenario 2 still passes

## Scores

| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Home (mobile) | | | | | | | |
| Home (desktop) | | | | | | | |

## Exit criteria

- [ ] All scenarios and checks pass
- [ ] Scores recorded above

## Sign-off

| Date | Tester | Result | Notes |
|---|---|---|---|
| | | | |
