# Module 05: Design tokens · QA

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Open `/dev/tokens` in light mode | All swatches, type sizes, spacing, radius, shadows displayed | ☑ (screenshot reviewed) |
| 2 | Switch to dark mode | Semantic colors swap; primitives stay the same | ☑ (headless: body bg `#ffffff` → `#0a0a0a`; nested light/dark panels render both) |
| 3 | Resize from 360 px to 1920 px | Type scales smoothly (no sudden jumps at breakpoints) | ☑ (h1: 38 → 50.8 → 58.9 → 72 px at 360/768/1024/1440; stays 72 px at 1920) |
| 4 | At 360 px, inspect body text | Computed font size ≥ 16 px | ☑ (16 px; 18 px at 1440 px+) |
| 5 | Hard-reload with cache disabled, Slow 4G | No visible layout shift when fonts swap | ☐ (Lighthouse CLS 0 on both pages; eyeball it once in a real browser) |
| 6 | Tab through a few links | Focus ring visible in both themes | ☑ (headless: 2px solid outline in `--ring`) |
| 7 | Enable reduced motion, hover elements with CSS transitions | Transitions are instant or near-instant | ☑ (headless: `duration-slow` 0.4s → 0.00001s) |

## Contrast (fill in)

| Pair | Light ratio | Dark ratio | AA pass |
|---|---|---|---|
| fg / bg | 19.80 | 18.96 | ☑ |
| muted-fg / bg | 6.97 | 8.07 | ☑ |
| primary-fg / primary | 19.80 | 19.80 | ☑ |
| success-fg / success-soft | 8.30 | 10.62 | ☑ |
| warning-fg / warning-soft | 8.15 | 10.39 | ☑ |
| danger-fg / danger-soft | 6.80 | 8.51 | ☑ |
| info-fg / info-soft | 8.49 | 8.15 | ☑ |

Full table (18 pairs, incl. status text on bg and input borders) in the frontend's `docs/design-tokens.md`; all are asserted by `npm test`.

## Non-functional

- [x] Lighthouse CLS on `/dev/tokens` < 0.05 (0)
- [x] Only the font weights actually used are loaded: 2 variable font files per page (Fraunces + Inter, latin, ~115 KB); the `/dev/fonts` candidates load only on that page
- [x] `docs/design-tokens.md` is complete

## Lighthouse (mobile, headless, Lighthouse 12.8, production build)

| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Home (3 runs) | 93–95 | 100 | 100 | 100 | 2.9–3.1 s | 0 | 50–80 ms |
| `/dev/tokens` | 95 | 100 | 100 | 63 | 3.0 s | 0 | 60 ms |

The `/dev/tokens` SEO score is expected: its only failing audit is "is-crawlable", because `/dev/*` is noindex on purpose.

Home LCP rose from ~2.5 s (module 04) to ~3.0 s. The LCP element is still the hero PNG; the two variable fonts (~115 KB, replacing four small Poppins files) compete with it for bandwidth. Not preloading the heading font gained only ~0.1 s, so both stay preloaded. The hero image is rebuilt in module 10 (smaller, AVIF), which is where LCP < 2.5 s gets fixed.

## Result

| Date | Result | Notes |
|---|---|---|
| 2026-10-20 | Partial pass | Automated checks (format, lint, typecheck, 44 tests, build), headless browser checks and Lighthouse done. Remaining: owner confirms the font pair on `/dev/fonts`; item 5 in a real browser |
