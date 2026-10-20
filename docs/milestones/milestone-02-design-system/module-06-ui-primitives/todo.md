# Module 06: UI primitives · Todo

Repo: frontend, committed on `main` (see ROADMAP "Current practice")

## 1. Utilities

- [x] Install `clsx`, `tailwind-merge`; `src/lib/cn.ts` (tailwind-merge taught our custom tokens: `text-h1` vs `text-fg`, `z-modal`, `duration-fast`, `px-gutter`…; tested in `cn.test.ts`)
- [x] `src/lib/variants.ts`: helper that maps variant/size props to class strings with defaults

## 2. Basic components (`src/components/ui`)

- [x] `Button` (variants, sizes, loading, icons, `href` → `Link`, disabled)
- [x] `IconButton` (required `aria-label`, sizes, variants)
- [x] `Badge` (tones × styles, dot)
- [x] `NotificationDot` (count, max "9+", hidden at 0)
- [x] `Spinner` (keeps spinning with reduced motion via `data-essential-motion`: the motion is the message)
- [x] `Skeleton` (text, rect, circle; reduced-motion aware)
- [x] `Container`, `Section`, `Stack`, `Divider`, `VisuallyHidden`
- [x] `Icon` wrapper; decide on the icon set: **lucide-react** (one stroke set, per-icon modules). `react-icons` removed

## 3. Form controls

- [x] `Label`
- [x] `Input` (sizes, prefix/suffix slot, error style)
- [x] `PasswordInput` (toggle button with `aria-pressed`)
- [x] `Textarea` (auto-grow, max rows)
- [x] `Select` (styled native)
- [x] `Checkbox` (custom look, native input underneath)
- [x] `RadioGroup` + `Radio` (arrow-key navigation from native radios)
- [x] `Switch` (`role="switch"`, `aria-checked`)
- [x] `QuantityStepper` (−/+ buttons, typed input, clamps to min/max, announces value)
- [x] `FormField` (label, hint, error, wiring with `useId`)

## 4. Playground

- [x] `/dev/ui` route (excluded from production builds or behind an env flag, `noindex`): all `/dev/*` pages 404 in production unless `ENABLE_DEV_PAGES=true` at build time
- [x] Section per component showing all variants and states, light and dark side by side

## 5. Replace old code

- [x] Replace `PrimaryButton` usages with `Button`; delete `PrimaryButton` and `button.types.ts`

## 6. Tests

- [x] Button: renders `<a>` with `href`, `<button>` otherwise; doesn't fire `onClick` when loading/disabled
- [x] QuantityStepper: clamps to min/max; keyboard increments; typed value validated
- [x] FormField: error linked through `aria-describedby`; `aria-invalid` set

## Done when

- [x] Every item above is ticked
- [x] [qa.md](qa.md) passes
- [x] Committed on `main`, module marked ☑ in the ROADMAP master index

## Also done

- [x] Navbar: icons → lucide `Icon`, cart count → `NotificationDot`, Signup and Checkout → `Button`; root `<div>` → `<header>` (axe "region" rule)
- [x] `ThemeSwitcher` → `IconButton` (its tests still pass)
- [x] Token additions: `animate-shimmer` keyframes; reduced-motion rule skips `[data-essential-motion]`
- [x] Bug found by axe and fixed: `has-[:disabled]` on the field box matched a Select's placeholder `<option disabled>` and greyed out the whole box; now targets `input/select/textarea:disabled` only
