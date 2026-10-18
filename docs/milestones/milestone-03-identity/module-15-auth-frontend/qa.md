# Module 15: Auth (frontend) · QA

## Automated

- [ ] `safeNext()` and schema tests pass

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Register with an email that already exists | Inline error under the email field | ☐ |
| 2 | Register with a weak password | Strength meter low; inline error on submit | ☐ |
| 3 | Complete registration, open Mailpit link | `/verify-email` success state | ☐ |
| 4 | Log in unverified (new account) | Message + working "resend email" button | ☐ |
| 5 | Log in, reload | Account menu visible after reload | ☐ |
| 6 | Visit `/login` while logged in | Redirected to `/user/dashboard` | ☐ |
| 7 | Logged out, open `/user/dashboard` | Redirected to `/login?next=/user/dashboard`; after login lands there | ☐ |
| 8 | Open `/login?next=https://evil.example` and log in | Lands on `/user/dashboard`, not the external site | ☐ |
| 9 | Customer opens `/admin/dashboard` | Redirect or "no access" page | ☐ |
| 10 | Admin opens the account menu | Admin link visible | ☐ |
| 11 | Log out | Menu shows Login; protected pages redirect again | ☐ |
| 12 | Fill every form with the keyboard only | All doable; errors announced | ☐ |
| 13 | Save a password with the browser's password manager | Offers to save on register; autofills on login | ☐ |
| 14 | Forms at 360 px | Image hidden, form usable, correct mobile keyboards (email) | ☐ |

## Non-functional

- [ ] Lighthouse `/login`: Performance ≥ 90, Accessibility 100
- [ ] `noindex` meta on all auth pages
- [ ] No auth tokens readable from JavaScript

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
