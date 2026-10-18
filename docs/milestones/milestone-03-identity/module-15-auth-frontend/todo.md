# Module 15: Auth (frontend) · Todo

Branch: `feat/15-auth-frontend` (frontend repo)

## 1. Setup

- [ ] Install `react-hook-form`, `@hookform/resolvers`, `jose`
- [ ] `features/auth/schemas.ts` (login, register, forgot, reset) matching the backend rules
- [ ] `features/auth/api.ts` with typed calls for every auth endpoint

## 2. Layout and pages

- [ ] `(auth)/layout.tsx`: split layout, image, animated container, `noindex`
- [ ] `/login`: email, password, "forgot password" link, resend-verification flow on `EMAIL_NOT_VERIFIED`
- [ ] `/register`: name, email, password + strength meter, terms checkbox
- [ ] `/verify-email`: reads token from the URL, shows loading → success/expired states, resend option
- [ ] `/forgot-password`: email form, neutral success message
- [ ] `/reset-password`: token from URL, new password + confirm, success → login

## 3. Session

- [ ] `lib/auth/get-current-user.ts` (server, `cache()`)
- [ ] `features/auth/use-user.ts` (client, `['me']`)
- [ ] `proxy.ts` with `protectUser`, `protectAdmin`, `redirectAuthed` functions and a matcher that skips static files and `/api`
- [ ] `safeNext()` helper for redirect targets
- [ ] `/user/layout.tsx` and `/admin/layout.tsx` server checks (admin shows a "no access" page for customers)

## 4. Navbar

- [ ] `AccountMenu` (DropdownMenu) with role-based items
- [ ] Logout action

## 5. Tests

- [ ] `safeNext()` unit tests (relative OK, absolute/protocol-relative rejected)
- [ ] Form schema tests

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
