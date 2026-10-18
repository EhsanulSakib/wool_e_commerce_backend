# Module 05: Design tokens · Todo

Branch: `feat/05-design-tokens` (frontend repo)

## 1. Colors

- [ ] `src/styles/tokens.css`: primitive color variables (ink, paper, neutral 50–950, success, warning, danger, info)
- [ ] Semantic variables for light theme
- [ ] Semantic variables for dark theme
- [ ] `@theme inline` mapping so Tailwind utilities use semantic tokens
- [ ] Check contrast of every text pair (fg/bg, muted-fg/bg, status-fg/status-soft) in both themes; adjust until AA passes; record ratios in `docs/design-tokens.md`

## 2. Typography

- [ ] Pick the heading and body fonts (try 2–3 pairs on a test page, then decide)
- [ ] Load them with `next/font` (variable, latin subset, `display: swap`), expose as CSS variables
- [ ] Fluid type scale with `clamp()` as utilities/classes (`text-display`, `text-h1`…`text-caption`)
- [ ] Remove the old global `h1`–`p` `@apply` rules; set base `body` styles (16 px min, line height, font smoothing)

## 3. Layout tokens

- [ ] Spacing scale and section spacing variables
- [ ] Container max widths and responsive gutters
- [ ] Radius scale
- [ ] Shadow scale
- [ ] Z-index scale

## 4. Motion tokens

- [ ] CSS variables for durations and easings
- [ ] `src/styles/motion.ts` exporting the same values for Motion and GSAP
- [ ] Global `prefers-reduced-motion` rule that shortens CSS transitions/animations

## 5. Details

- [ ] Focus ring style (`:focus-visible`) using the `ring` token
- [ ] Text selection colors
- [ ] Scrollbar styling (thin, neutral)
- [ ] Breakpoint values documented

## 6. Docs and preview

- [ ] `docs/design-tokens.md` with every token, its purpose and contrast ratios
- [ ] Temporary `/dev/tokens` page showing color swatches, type scale, spacing, radius, shadows in both themes (noindex)

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
