# Module 05: Design tokens · QA

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Open `/dev/tokens` in light mode | All swatches, type sizes, spacing, radius, shadows displayed | ☐ |
| 2 | Switch to dark mode | Semantic colors swap; primitives stay the same | ☐ |
| 3 | Resize from 360 px to 1920 px | Type scales smoothly (no sudden jumps at breakpoints) | ☐ |
| 4 | At 360 px, inspect body text | Computed font size ≥ 16 px | ☐ |
| 5 | Hard-reload with cache disabled, Slow 4G | No visible layout shift when fonts swap | ☐ |
| 6 | Tab through a few links | Focus ring visible in both themes | ☐ |
| 7 | Enable reduced motion, hover elements with CSS transitions | Transitions are instant or near-instant | ☐ |

## Contrast (fill in)

| Pair | Light ratio | Dark ratio | AA pass |
|---|---|---|---|
| fg / bg | | | ☐ |
| muted-fg / bg | | | ☐ |
| primary-fg / primary | | | ☐ |
| success-fg / success-soft | | | ☐ |
| warning-fg / warning-soft | | | ☐ |
| danger-fg / danger-soft | | | ☐ |
| info-fg / info-soft | | | ☐ |

## Non-functional

- [ ] Lighthouse CLS on `/dev/tokens` < 0.05
- [ ] Only the font weights actually used are loaded (check the Network tab)
- [ ] `docs/design-tokens.md` is complete

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
