# Module 04: Frontend setup · QA

## Baseline vs after (Lighthouse 12, mobile, headless Chrome, production build, same machine)

| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Home (before, Next 15.3.1) | 92 | 89 | 96 | 100 | 3.3 s | 0.004 | 70 ms |
| Home (after, run 1) | 96 | 100 | 100 | 100 | 2.6 s | 0 | 80 ms |
| Home (after, run 2) | 97 | 100 | 100 | 100 | 2.5 s | 0 | 60 ms |

Before: console errors (missing images, prefetch 404s), lazy-loaded LCP image, contrast and link-name failures. After: none of these. Remaining performance hints (large PNG hero, render-blocking CSS) are addressed in milestone 02 when the hero and images are rebuilt.

## Automated

- [x] `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` all pass
- [ ] CI is green on the PR
- [x] `npm audit --omit=dev` reports 0 vulnerabilities

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | `npm run dev`, open the home page | Page renders as before (navbar, banner) | ☐ |
| 2 | Toggle the theme | Colors switch; navbar, logo and button follow | ☐ (automated: `data-theme` toggles and is saved) |
| 3 | Set dark mode, hard-reload (Ctrl+Shift+R) | No flash of light theme | ☐ |
| 4 | Set the OS to dark, clear site data, reload | Site follows the system theme | ☐ |
| 5 | Open DevTools console on reload | No hydration warnings, no errors | ☑ (Lighthouse "errors in console" passes) |
| 6 | Visit `/about` | No redirect to `/` (404 for now) | ☑ |
| 7 | Load the home page and don't scroll | Hero text and image visible immediately | ☑ (hero image preloaded, no scroll-triggered fade) |
| 8 | DevTools device mode (touch), scroll | Native touch scrolling, no smoothing lag | ☐ |
| 9 | Desktop mouse wheel | Smooth scrolling still works | ☐ |
| 10 | View page source | `<body>` is a direct child of `<html>`; providers inside `<body>` | ☑ |
| 11 | `npm run analyze` | Bundle analyzer opens | ☐ |

## Non-functional

- [x] No Redux code left
- [x] Lighthouse "after" scores equal to or better than the baseline in every category

## Result

| Date | Result | Notes |
|---|---|---|
| 2026-10-19 | Partial pass | Automated checks and Lighthouse done. Remaining: manual items 1–4, 8, 9, 11 in a real browser; CI on the PR |
