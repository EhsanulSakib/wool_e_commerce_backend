# Milestone 03: Identity

| | |
|---|---|
| Repos | backend + frontend |
| Depends on | [01 Foundations](../milestone-01-foundations/feature.md), [02 Design system](../milestone-02-design-system/feature.md) |
| Next milestone | [04 Catalog & currency API](../milestone-04-catalog-api/feature.md) |

## Goal

People can create an account, verify their email, log in and stay logged in securely, reset a forgotten password, and manage their profile and addresses in `/user/dashboard`. Admin and staff roles exist and are enforced. This comes before the catalog because every admin endpoint (products, prices, images) needs role checks.

## When it's done

- A new customer can register, receive a verification email in Mailpit, verify, log in and manage addresses.
- Sessions survive reloads and access-token expiry (silent refresh), and stolen refresh tokens are detected.
- A seeded admin can log in; customers are blocked from admin routes in both the API and the UI.
- The frontend talks to the backend through a type-safe client generated from the API's OpenAPI spec.

## Modules (build in this order)

| # | Module | Repo | Depends on | Summary |
|---|---|---|---|---|
| 11 | [Email service](module-11-email-service/feature.md) | backend | 02, 03 | Nodemailer SMTP, HTML templates, event-driven sending, dev preview |
| 12 | [Auth (backend)](module-12-auth-backend/feature.md) | backend | 02, 03, 11 | Register, verify, login, refresh rotation, logout, password reset, roles |
| 13 | [Users & addresses (backend)](module-13-users-addresses-backend/feature.md) | backend | 12 | Profile, change password, address book (BD + international), admin user list |
| 14 | [API client](module-14-api-client/feature.md) | frontend | 03, 04 | Next rewrites, OpenAPI → TS types, typed fetch client, silent refresh, TanStack Query |
| 15 | [Auth (frontend)](module-15-auth-frontend/feature.md) | frontend | 08, 12, 14 | Auth pages, route protection in `proxy.ts`, current user, account menu |
| 16 | [User dashboard](module-16-user-dashboard/feature.md) | frontend | 13, 15 | `/user/dashboard`, profile, sessions, addresses |

Modules 11–13 (backend) and 14 (frontend) can be built in parallel; 15 needs 12 and 14; 16 needs 13 and 15.

## Not in this milestone

- Orders in the dashboard (module 31), wishlist (module 30)
- Phone OTP and Google login (post-MVP)
- Admin user management UI (module 39; the API exists from module 13)

## Open questions that affect this milestone

- **International shipping** (ROADMAP open question 4) decides whether addresses support countries other than Bangladesh in module 13. Assumption: yes.
