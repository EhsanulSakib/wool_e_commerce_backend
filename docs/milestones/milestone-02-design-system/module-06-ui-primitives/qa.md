# Module 06: UI primitives · QA

## Automated

- [x] Unit tests for Button, QuantityStepper, FormField pass (+ `cn`/`variants`; 72 tests total)
- [x] `npm run lint` and `npm run typecheck` pass (IconButton without `aria-label` is a type error, locked in by a `@ts-expect-error` in `Button.test.tsx`)

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Open `/dev/ui` in light and dark | Every component readable and consistent in both themes | ☑ (screenshots reviewed; each section renders light and dark side by side) |
| 2 | Tab through the whole page | Every interactive element focusable with a visible ring, logical order | ☑ (headless: 115 tab stops, all with a visible ring) |
| 3 | Click a loading Button | Nothing happens; screen reader hears it as busy | ☑ (`aria-busy`, `aria-disabled`, stays focusable; click and submit ignored) |
| 4 | Button with `href`, inspect the DOM | It's an `<a>` and navigates | ☑ |
| 5 | QuantityStepper at max, press + | Value stays at max, + button disabled | ☑ |
| 6 | Type `abc` or `999` into QuantityStepper | Value corrected to a valid number | ☑ (`999` → max; letters never accepted; empty → last valid value) |
| 7 | Toggle PasswordInput visibility | Text shows/hides; button state announced | ☑ (`aria-pressed` toggles) |
| 8 | Use arrow keys in a RadioGroup | Selection moves between options | ☑ (native radios) |
| 9 | Toggle Switch with Space | State changes, `aria-checked` updates | ☑ |
| 10 | Show a FormField error, use a screen reader | Error is read together with the label | ☑ (hint + error in `aria-describedby`, `aria-invalid`; verified in tests and DOM, not with a real screen reader) |
| 11 | Build for production, visit `/dev/ui` | Not available (404) unless the env flag is on | ☑ (`/dev/ui`, `/dev/tokens`, `/dev/fonts` → 404; 200 with `ENABLE_DEV_PAGES=true`) |

## Non-functional

- [x] axe: 0 violations on `/dev/ui` in both themes (axe-core 4.10 in headless Chrome)
- [x] No hard-coded colors in `src/components/ui` (Tailwind's palette is off, so they can't exist)
- [x] Every component accepts `className` for layout overrides

## Result

## Lighthouse, home page (mobile, production build)

| Run | Performance | Accessibility | Best Practices | SEO | LCP | TBT |
|---|---|---|---|---|---|---|
| 1 | 90 | 100 | 100 | 100 | 3.1 s | 210 ms |
| 2 | 87 | 100 | 100 | 100 | 3.8 s | 110 ms |
| 3 | 90 | 100 | 100 | 100 | 3.5 s | 60 ms |

Down from 93–95 after module 05. JavaScript grew 165 → 176 KB (mostly `tailwind-merge` and icons, now in the client bundle with Button); LCP is still the hero PNG and most of it is render delay, which varies a lot between runs (1.7–3.3 s). Not fixed here: the home page is rebuilt in module 10 (and audited in module 41), where the ≥ 90 target is enforced.

## Result

| Date | Result | Notes |
|---|---|---|
| 2026-10-20 | Pass | All automated, headless and axe checks pass. Not done with a real screen reader (item 10 verified through the DOM). Home Performance at 87–90, see above |
