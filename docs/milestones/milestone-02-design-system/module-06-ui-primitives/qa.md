# Module 06: UI primitives · QA

## Automated

- [ ] Unit tests for Button, QuantityStepper, FormField pass
- [ ] `npm run lint` and `npm run typecheck` pass (IconButton without `aria-label` is a type error)

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Open `/dev/ui` in light and dark | Every component readable and consistent in both themes | ☐ |
| 2 | Tab through the whole page | Every interactive element focusable with a visible ring, logical order | ☐ |
| 3 | Click a loading Button | Nothing happens; screen reader hears it as busy | ☐ |
| 4 | Button with `href`, inspect the DOM | It's an `<a>` and navigates | ☐ |
| 5 | QuantityStepper at max, press + | Value stays at max, + button disabled | ☐ |
| 6 | Type `abc` or `999` into QuantityStepper | Value corrected to a valid number | ☐ |
| 7 | Toggle PasswordInput visibility | Text shows/hides; button state announced | ☐ |
| 8 | Use arrow keys in a RadioGroup | Selection moves between options | ☐ |
| 9 | Toggle Switch with Space | State changes, `aria-checked` updates | ☐ |
| 10 | Show a FormField error, use a screen reader | Error is read together with the label | ☐ |
| 11 | Build for production, visit `/dev/ui` | Not available (404) unless the env flag is on | ☐ |

## Non-functional

- [ ] axe DevTools: 0 violations on `/dev/ui`
- [ ] No hard-coded colors in `src/components/ui`
- [ ] Every component accepts `className` for layout overrides

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
