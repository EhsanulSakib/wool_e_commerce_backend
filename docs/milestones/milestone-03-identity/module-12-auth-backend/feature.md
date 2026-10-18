# Module 12: Auth (backend)

| | |
|---|---|
| Milestone | 03 Identity |
| Repo | backend |
| Depends on | 02, 03, 11 |
| Unblocks | 13, 15, 17, 18, 27 |

## Goal

Secure, hand-built authentication: registration with email verification, login with short-lived access tokens and rotating refresh tokens in httpOnly cookies, logout (one device or all), password reset, and role-based authorization middleware used by every later module.

## Included

- **Models:** extend `User` (`passwordHash`, `emailVerifiedAt`, `lastLoginAt`); add `Session` (user, hashed refresh token, token family, user agent, IP, expiry, revoked at, replaced by) and `VerificationToken` (user, type `EMAIL_VERIFY` / `PASSWORD_RESET`, hashed token, expiry, used at)
- **Passwords:** Argon2id hashing; policy (min 8 chars, max 128, not equal to email)
- **Tokens:**
  - Access token: JWT, 15 minutes, claims `sub`, `role`, `sid`
  - Refresh token: random 256-bit value, only its SHA-256 hash stored; 30 days; **rotated on every refresh**; reusing an old refresh token revokes the whole token family (theft detection)
- **Cookies:** `access_token` (httpOnly, SameSite=Lax, Secure in production, path `/`), `refresh_token` (same flags, path `/api/v1/auth`)
- **Endpoints** (`/api/v1/auth`): `POST register`, `POST verify-email`, `POST resend-verification`, `POST login`, `POST refresh`, `POST logout`, `POST logout-all`, `POST forgot-password`, `POST reset-password`, `GET sessions`, `DELETE sessions/:id`
- **Middleware:** `authenticate` (cookie or `Authorization: Bearer`), `optionalAuth` (guest-capable routes like checkout), `authorize(...roles)`; banned/inactive users rejected
- **CSRF defense:** Origin/Referer check on state-changing requests that use cookies
- **Anti-enumeration:** login error is always "Invalid email or password"; forgot-password and resend always return the same response
- **Rate limits:** login, register, forgot-password, resend (per IP and per email)
- **Events:** `user.registered`, `user.verified`, `user.password_reset_requested`
- **Seed:** admin user from `ADMIN_EMAIL` / `ADMIN_PASSWORD`
- OpenAPI docs and integration tests for everything

## Not included

- Profile and address endpoints (module 13)
- Phone OTP, Google login (post-MVP)

## Notes

- The second migration (adding auth fields to `User`) shows how schema changes work on an existing table.
- Unverified users can't log in, but they can still place guest COD orders later (module 29) — orders don't require an account.
- `JWT_SECRET` must be long and random; validated for minimum length in `env.ts`.

## You'll learn

- Password hashing and why Argon2id
- JWTs vs opaque tokens, and why we use both
- Refresh token rotation and reuse detection
- Cookie security flags, CSRF and user enumeration
