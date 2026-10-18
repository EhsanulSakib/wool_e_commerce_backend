# Milestone 03 QA: Identity

Run this after modules 11–16 have each passed their own `qa.md`. Use the real frontend + backend running together, Mailpit open in another tab.

## Entry criteria

- [ ] Modules 11–16 are ☑ in the ROADMAP master index
- [ ] CI green in both repos
- [ ] Database reset and seeded (includes the admin user)

## Scenario 1: New customer

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Register on `/register` | Success message asking to check email | ☐ |
| 2 | Try to log in before verifying | Clear "please verify your email" message with a resend option | ☐ |
| 3 | Open the email in Mailpit, click the link | `/verify-email` shows success | ☐ |
| 4 | Log in | Redirected to `/user/dashboard`; navbar shows the account menu | ☐ |
| 5 | Reload the page | Still logged in | ☐ |
| 6 | Add a Bangladeshi address (division → district cascade) and an international one | Both saved; one marked default | ☐ |
| 7 | Log out | Navbar shows Login; `/user/dashboard` now redirects to `/login?next=/user/dashboard` | ☐ |

## Scenario 2: Session lifetime

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Set access token lifetime to 1 minute (dev), log in, wait 2 minutes, click around | Still logged in (silent refresh), no error flashes | ☐ |
| 2 | Log in on two browsers, "log out everywhere" in one | The other is logged out on its next request | ☐ |
| 3 | Copy the refresh cookie, refresh normally, then replay the old cookie with curl | Replay rejected and all that user's sessions revoked | ☐ |

## Scenario 3: Forgot password

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Request a reset for an existing and a non-existing email | Same message for both | ☐ |
| 2 | Use the link from Mailpit to set a new password | Success; old password no longer works; other sessions revoked | ☐ |
| 3 | Use the same link again | "Link expired or already used" | ☐ |

## Scenario 4: Roles

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Log in as the seeded admin | Account menu shows an Admin link | ☐ |
| 2 | As a customer, open `/admin/dashboard` | Redirected or shown a "no access" page | ☐ |
| 3 | As a customer, call `GET /api/v1/admin/users` | `403` | ☐ |
| 4 | Anonymous, call the same endpoint | `401` | ☐ |
| 5 | Admin bans the customer via the API, customer refreshes | Customer is logged out and can't log in | ☐ |

## Cross-cutting checks

- [ ] **Cookies** (DevTools → Application): `HttpOnly`, `SameSite=Lax`, `Secure` in production mode, refresh cookie path limited to the auth routes
- [ ] **No tokens in JS:** `document.cookie` in the console shows no auth tokens; nothing in localStorage
- [ ] **CSRF:** a POST with a foreign `Origin` header is rejected
- [ ] **Rate limits:** 6 quick failed logins return `429`
- [ ] **Logs:** no passwords, tokens or cookies in backend logs
- [ ] **Accessibility:** auth pages and dashboard pass axe with 0 violations; forms completable with keyboard only
- [ ] **Performance:** Lighthouse on `/login` ≥ 90 Performance, 100 Accessibility
- [ ] **Regression:** milestone 02 home page scores unchanged (± 3 points)

## Exit criteria

- [ ] All scenarios and checks pass
- [ ] Open question 4 answered or assumption accepted

## Sign-off

| Date | Tester | Result | Notes |
|---|---|---|---|
| | | | |
