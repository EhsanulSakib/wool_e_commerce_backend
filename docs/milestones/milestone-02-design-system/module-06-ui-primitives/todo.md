# Module 06: UI primitives · Todo

Branch: `feat/06-ui-primitives` (frontend repo)

## 1. Utilities

- [ ] Install `clsx`, `tailwind-merge`; `src/lib/cn.ts`
- [ ] `src/lib/variants.ts`: helper that maps variant/size props to class strings with defaults

## 2. Basic components (`src/components/ui`)

- [ ] `Button` (variants, sizes, loading, icons, `href` → `Link`, disabled)
- [ ] `IconButton` (required `aria-label`, sizes, variants)
- [ ] `Badge` (tones × styles, dot)
- [ ] `NotificationDot` (count, max "9+", hidden at 0)
- [ ] `Spinner`
- [ ] `Skeleton` (text, rect, circle; reduced-motion aware)
- [ ] `Container`, `Section`, `Stack`, `Divider`, `VisuallyHidden`
- [ ] `Icon` wrapper; decide on the icon set

## 3. Form controls

- [ ] `Label`
- [ ] `Input` (sizes, prefix/suffix slot, error style)
- [ ] `PasswordInput` (toggle button with `aria-pressed`)
- [ ] `Textarea` (auto-grow, max rows)
- [ ] `Select` (styled native)
- [ ] `Checkbox` (custom look, native input underneath)
- [ ] `RadioGroup` + `Radio` (arrow-key navigation from native radios)
- [ ] `Switch` (`role="switch"`, `aria-checked`)
- [ ] `QuantityStepper` (−/+ buttons, typed input, clamps to min/max, announces value)
- [ ] `FormField` (label, hint, error, wiring with `useId`)

## 4. Playground

- [ ] `/dev/ui` route (excluded from production builds or behind an env flag, `noindex`)
- [ ] Section per component showing all variants and states, light and dark side by side

## 5. Replace old code

- [ ] Replace `PrimaryButton` usages with `Button`; delete `PrimaryButton` and `button.types.ts`

## 6. Tests

- [ ] Button: renders `<a>` with `href`, `<button>` otherwise; doesn't fire `onClick` when loading/disabled
- [ ] QuantityStepper: clamps to min/max; keyboard increments; typed value validated
- [ ] FormField: error linked through `aria-describedby`; `aria-invalid` set

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
