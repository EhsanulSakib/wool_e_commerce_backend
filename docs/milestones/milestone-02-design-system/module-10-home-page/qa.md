# Module 10: Home page · QA

## Scores (mobile, incognito, throttled)

| Run | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT | First-load JS |
|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | | |
| 2 | | | | | | | | |
| 3 | | | | | | | | |

Targets: Performance ≥ 90, others 100, LCP < 2.5 s, CLS < 0.1, TBT < 200 ms, JS within the budget set in feature.md.

## Product card

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Hover a card with a mouse | Second image fades in; sizes slide up | ☐ |
| 2 | Tap a card on touch emulation | Opens the product link; no stuck hover state | ☐ |
| 3 | Tab to a card | Link, heart and quick-add reachable separately; focus visible | ☐ |
| 4 | Click the heart | Animates; `aria-pressed` toggles | ☐ |
| 5 | Product with 6 colors | Shows 4 swatches + "+2" | ☐ |
| 6 | Sold-out mock product | Sold-out badge; quick add disabled | ☐ |
| 7 | Discounted mock product | Strike-through price and correct % | ☐ |

## Home page

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Load on Slow 4G without scrolling | Hero heading and image appear without waiting for animations | ☐ |
| 2 | Scroll through the brand story on desktop | Section pins, text reveals, images move, then releases | ☐ |
| 3 | Lookbook on desktop vs mobile | Horizontal pinned scroll on desktop; swipe carousel on mobile | ☐ |
| 4 | Reduced motion on | No pinning or movement; all content readable in order | ☐ |
| 5 | 360 px width | No horizontal scroll; text readable; tap targets ≥ 44 px | ☐ |
| 6 | Dark mode | Every section looks intentional | ☐ |
| 7 | View source | All section text is in the HTML (server-rendered) | ☐ |

## Non-functional

- [ ] Every image has meaningful `alt` text (decorative ones `alt=""`)
- [ ] Performance trace at 4× throttle: smooth through pinned sections
- [ ] Image licenses recorded

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
