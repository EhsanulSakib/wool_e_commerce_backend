# Module 06: UI primitives

| | |
|---|---|
| Milestone | 02 Design system & storefront shell |
| Repo | frontend |
| Depends on | 05 |
| Unblocks | 08, 09 |

## Goal

Build the basic custom components every page uses: buttons, badges, loading states, layout helpers and form controls. All are accessible, themeable through tokens and documented on a `/dev/ui` playground page.

## Included

- **Utilities:** `cn()` (built on `clsx` + `tailwind-merge`, tiny class helpers, not UI libraries) and a small hand-written `variants()` helper for variant/size class maps
- **Button:** variants `primary`, `secondary`, `outline`, `ghost`, `link`; sizes `sm`, `md`, `lg`; loading state (`aria-busy`), left/right icons, full width; renders a Next `<Link>` when given `href`
- **IconButton:** icon-only, `aria-label` required by its types
- **Badge / Pill:** tones `neutral`, `success`, `warning`, `danger`/`sale`, `info`, `new`; styles `solid`, `soft`, `outline`; optional dot; `NotificationDot` for icons (cart count, bell)
- **Spinner**, **Skeleton** (shimmer that stops with reduced motion)
- **Layout:** `Container`, `Section`, `Divider`, `VisuallyHidden`, `Stack`
- **Icons:** one `Icon` wrapper with consistent sizing around one icon set (keep `react-icons` or switch to a single stroke set; decide here)
- **Form controls:** `Label`, `Input` (prefix/suffix, error state, sizes), `PasswordInput` (show/hide), `Textarea` (auto-grow), `Select` (styled native select), `Checkbox`, `RadioGroup`, `Switch`, `QuantityStepper` (min/max, keyboard, `aria-live` value)
- **FormField:** label + control + hint + error, ids wired with `useId`, `aria-describedby` and `aria-invalid`
- **`/dev/ui` playground:** every component in every variant and state, light/dark side by side; noindex and hidden in production
- Unit tests for Button, QuantityStepper and FormField

## Not included

- Overlays, tabs, carousel, price tag (module 08)

## Notes

- React 19 passes `ref` as a normal prop, so no `forwardRef` boilerplate.
- Keep components presentational. Data fetching and business logic stay in `features/`.
- The old `PrimaryButton` is replaced by the new `Button`; update its usages in the Navbar/Banner.

## You'll learn

- Designing a component API (variants, sizes, polymorphism)
- Accessible form patterns (labels, descriptions, errors)
- Testing components with Testing Library
