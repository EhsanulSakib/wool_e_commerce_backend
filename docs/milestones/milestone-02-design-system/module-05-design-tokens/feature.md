# Module 05: Design tokens

| | |
|---|---|
| Milestone | 02 Design system & storefront shell |
| Repo | frontend |
| Depends on | 04 |
| Unblocks | 06, 07 |

## Goal

Define every visual decision once, as tokens: colors, type, spacing, radius, shadows, layers and motion. Components only ever use semantic tokens, so dark mode and future rebranding are a token change, not a component change.

## Included

- **Primitive colors:** `ink` (near-black, e.g. `#0A0A0A`), `paper` (`#FFFFFF`), neutral scale 50–950, status colors: success (green), warning (amber), danger/sale (red), info (blue)
- **Semantic colors:** `bg`, `fg`, `surface`, `surface-raised`, `muted`, `muted-fg`, `border`, `ring`, `primary`, `primary-fg`, `secondary`, `secondary-fg`, and for each status: base, `-fg`, `-soft` (pill background)
- **Light and dark mapping** under `[data-theme="light"]` and `[data-theme="dark"]` (primary and secondary invert)
- **Typography:** choose the font pair (suggestion: a serif display font for headings + a clean sans for body), loaded with `next/font` (variable fonts, only needed weights, `display: swap`); fluid scale with `clamp()`: display, h1–h6, body-lg, body, small, caption; line heights and letter spacing
- Replace the current global `h1`–`p` rules in `globals.css` (5 breakpoints each, 12 px body text on mobile) with the fluid scale; body text ≥ 16 px on mobile
- **Spacing** scale, section spacing, container widths and side gutters
- **Radius**, **shadows** (subtle, suited to black & white), **z-index** scale (base, dropdown, sticky, overlay, modal, toast, floating)
- **Motion tokens:** durations (fast 150 ms, base 250 ms, slow 400 ms, slower 700 ms) and easings (standard, emphasized, out-expo), shared by CSS, Motion and GSAP via one TS file + CSS variables
- **Breakpoints**, focus ring style, text selection color, scrollbar styling
- Contrast check for every text/background pair in both themes (WCAG AA)
- `docs/design-tokens.md` in the frontend repo listing every token and when to use it

## Not included

- Components (modules 06, 08)

## Notes

- Tailwind v4: primitives and semantic tokens live in CSS variables; `@theme inline` exposes them as utilities (`bg-surface`, `text-muted-fg`, `border-border`).
- A single `src/styles/motion.ts` exports durations and easings so JS animations use the same values as CSS.
- Status colors are for small accents only (badges, pills, dots, alerts). Large areas stay black, white and gray.

## You'll learn

- Primitive vs semantic tokens and why components use only semantic ones
- Fluid typography with `clamp()`
- Color contrast rules (WCAG AA) and how to check them
- Font loading without layout shift
