# Module 05: Design tokens · Todo

Repo: frontend, committed on `main` (see ROADMAP "Current practice")

## 1. Colors

- [x] `src/styles/tokens.css`: primitive color variables (ink, paper, neutral 50–950, success, warning, danger, info)
- [x] Semantic variables for light theme
- [x] Semantic variables for dark theme
- [x] `@theme inline` mapping so Tailwind utilities use semantic tokens; Tailwind's default palette switched off (`--color-*: initial`)
- [x] Check contrast of every text pair (fg/bg, muted-fg/bg, status-fg/status-soft) in both themes; adjust until AA passes; record ratios in `docs/design-tokens.md`. Enforced by `src/styles/tokens.test.ts` (36 pair checks)

## 2. Typography

- [x] Pick the heading and body fonts: **Fraunces + Inter** (default). Compared with Playfair Display + DM Sans and Cormorant + Manrope on `/dev/fonts`; owner to confirm
- [x] Load them with `next/font` (variable, latin subset, `display: swap`), expose as CSS variables (`--font-heading`, `--font-body` → `font-display`, `font-sans`)
- [x] Fluid type scale with `clamp()` as utilities/classes (`text-display`, `text-h1`…`text-caption`)
- [x] Remove the old global `h1`–`p` `@apply` rules; set base `body` styles (16 px min, line height, font smoothing)

## 3. Layout tokens

- [x] Spacing scale and section spacing variables
- [x] Container max widths and responsive gutters
- [x] Radius scale
- [x] Shadow scale
- [x] Z-index scale

## 4. Motion tokens

- [x] CSS variables for durations and easings
- [x] `src/styles/motion.ts` exporting the same values for Motion and GSAP (a test fails if CSS and TS drift apart)
- [x] Global `prefers-reduced-motion` rule that shortens CSS transitions/animations

## 5. Details

- [x] Focus ring style (`:focus-visible`) using the `ring` token
- [x] Text selection colors
- [x] Scrollbar styling (thin, neutral)
- [x] Breakpoint values documented

## 6. Docs and preview

- [x] `docs/design-tokens.md` with every token, its purpose and contrast ratios
- [x] Temporary `/dev/tokens` page showing color swatches, type scale, spacing, radius, shadows in both themes (noindex)

## Done when

- [x] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] Committed on `main`, module marked ☑ in the ROADMAP master index

## Also done

- [x] Existing components (Navbar, PrimaryButton, Banner) moved to the new tokens: `foreground`/`background` → `fg`/`bg`, `bg-red-600` → `bg-danger`, `bg-black/50` → `bg-overlay`, `z-40`/`z-50` → `z-overlay`/`z-modal`, per-component focus rings → global `:focus-visible`
- [x] `src/lib/contrast.ts` (WCAG ratio) and `src/styles/parseTokens.ts` (reads tokens.css), shared by the test and `/dev/tokens`
- [x] README theming section updated
