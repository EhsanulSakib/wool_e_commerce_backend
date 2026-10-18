# Module 21: Currency storefront · QA

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Clear cookies, open the home page | Prices in Taka | ☐ |
| 2 | Switch to USD | Prices change to $; URL path unchanged | ☐ |
| 3 | Hard-reload with "Disable cache" | USD shown immediately in the first HTML (check view source) | ☐ |
| 4 | Set the cookie to `xyz` manually, reload | Falls back to Taka; no error | ☐ |
| 5 | Visit `/usd/` directly | Redirected to `/` | ☐ |
| 6 | Visit `/user/dashboard` and `/login` | Not rewritten; work as before | ☐ |
| 7 | `?country=US` with no currency cookie | USD prompt appears | ☐ |
| 8 | `?country=BD` | No prompt | ☐ |
| 9 | Dismiss the prompt, reload | Doesn't come back | ☐ |
| 10 | `npm run build` | Build output lists pages for both currencies | ☐ |
| 11 | Switcher with keyboard | Opens, changes, closes; focus handled | ☐ |

## Non-functional

- [ ] Lighthouse home page scores unchanged from milestone 02 (± 3)
- [ ] CLS stays < 0.1 when switching currency (no price flash on load)

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
