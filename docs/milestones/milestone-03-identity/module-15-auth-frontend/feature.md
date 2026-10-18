# Module 15: Auth (frontend)

| | |
|---|---|
| Milestone | 03 Identity |
| Repo | frontend |
| Depends on | 08, 12, 14 |
| Unblocks | 16, 30, 32 |

## Goal

Polished, animated auth pages and reliable session handling in the App Router: protected `/user/*` and `/admin/*` routes, the current user available on the server and the client, and an account menu in the navbar.

## Included

- **Pages** in the `(auth)` route group: `/login`, `/register`, `/verify-email`, `/forgot-password`, `/reset-password`
- **Design:** split layout (knitwear image on one side, form on the other; image hidden on mobile), animated form entrance, password strength meter, show/hide password
- **Forms:** `react-hook-form` + Zod resolvers (schemas mirror the backend); server field errors mapped onto fields; correct `autocomplete` attributes for password managers
- **`proxy.ts`** (Next 16's replacement for `middleware.ts`):
  - `/user/*` without a session → `/login?next=<path>`
  - `/admin/*` → requires an access token whose verified role is ADMIN or STAFF
  - Logged-in users visiting `/login` or `/register` → `/user/dashboard`
  - Written as small composable functions so module 21 can add the currency rewrite
- **Current user:** `getCurrentUser()` server helper (React `cache()`, calls `/users/me` with forwarded cookies); `useUser()` client hook (TanStack Query `['me']`)
- **Server-side checks** in `/user` and `/admin` layouts (the proxy is a first filter; the layout is the real check)
- **Navbar account menu:** avatar dropdown with Dashboard, Orders, Logout; Admin link for ADMIN/STAFF; Login/Register when logged out
- **Logout:** POST `/auth/logout`, clear queries, `router.refresh()`
- **Open-redirect protection:** `next` accepts only relative paths
- `noindex` on all auth pages

## Not included

- Dashboard pages (module 16)

## Notes

- The proxy verifies the JWT signature with `jose` (works in the proxy runtime) using the same secret as the backend. Keep `JWT_SECRET` server-only.
- If the access token expired but a refresh cookie exists, the proxy lets `/user/*` through and the page refreshes the session client-side (or the server helper refreshes); document whichever approach you choose.

## You'll learn

- Form handling and validation UX
- Auth in the App Router: proxy, layouts, server helpers
- Preventing open redirects
