# Module 04: Frontend setup · QA

## Baseline (fill in before starting)

| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| Home (before) | | | | | | |
| Home (after) | | | | | | |

## Automated

- [ ] `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` all pass
- [ ] CI is green on the PR
- [ ] `npm audit --omit=dev` reports no high or critical vulnerabilities

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | `npm run dev`, open the home page | Page renders as before (navbar, banner) | ☐ |
| 2 | Toggle the theme | Colors switch; navbar and button follow | ☐ |
| 3 | Set dark mode, hard-reload (Ctrl+Shift+R) | No flash of light theme | ☐ |
| 4 | Set the OS to dark, clear site data, reload | Site follows the system theme | ☐ |
| 5 | Open DevTools console on reload | No hydration warnings | ☐ |
| 6 | Visit `/about` | No redirect to `/` (a 404 is fine for now) | ☐ |
| 7 | Load the home page and don't scroll | Hero text and image are visible immediately | ☐ |
| 8 | DevTools device mode (touch), scroll | Native touch scrolling, no smoothing lag | ☐ |
| 9 | Desktop mouse wheel | Smooth scrolling still works | ☐ |
| 10 | View page source | `<body>` is a direct child of `<html>`; no provider markup outside `<body>` | ☐ |
| 11 | `npm run analyze` | Bundle report opens | ☐ |

## Non-functional

- [ ] No Redux code left (if open question 2 confirmed the switch)
- [ ] Lighthouse "after" scores are equal to or better than the baseline

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
