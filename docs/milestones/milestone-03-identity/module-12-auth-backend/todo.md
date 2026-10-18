# Module 12: Auth (backend) · Todo

Branch: `feat/12-auth-backend` (backend repo)

## 1. Schema

- [ ] Add `passwordHash`, `emailVerifiedAt`, `lastLoginAt` to `User`
- [ ] `Session` model with indexes on `userId` and `familyId`
- [ ] `VerificationToken` model with `TokenType` enum, index on `tokenHash`
- [ ] Migration `auth`

## 2. Crypto helpers (`modules/auth/lib`)

- [ ] Argon2id `hashPassword` / `verifyPassword`
- [ ] `generateToken()` (random 32 bytes, base64url) and `sha256()`
- [ ] JWT sign/verify (library: `jose` or `jsonwebtoken`), `JWT_SECRET`, `ACCESS_TTL`, `REFRESH_TTL` in `env.ts`
- [ ] Cookie helpers `setAuthCookies(res, …)` / `clearAuthCookies(res)`

## 3. Registration and verification

- [ ] `POST /auth/register` (Zod: name, email, password) → create user (INACTIVE), token, emit `user.registered`
- [ ] `POST /auth/verify-email` (token) → set `emailVerifiedAt`, ACTIVE, mark token used, emit `user.verified`
- [ ] `POST /auth/resend-verification` (email) → same response whether or not the user exists

## 4. Login and sessions

- [ ] `POST /auth/login` → verify password, reject unverified (`EMAIL_NOT_VERIFIED`) and banned, create session, set cookies, update `lastLoginAt`
- [ ] `POST /auth/refresh` → find session by hash; if revoked → revoke family + 401; else rotate (new session row, old one `replacedBy`)
- [ ] `POST /auth/logout` → revoke current session, clear cookies
- [ ] `POST /auth/logout-all` → revoke all user sessions
- [ ] `GET /auth/sessions`, `DELETE /auth/sessions/:id` (own sessions only)

## 5. Password reset

- [ ] `POST /auth/forgot-password` → token (1 hour), emit event, same response always
- [ ] `POST /auth/reset-password` → validate token, set new hash, revoke all sessions, mark token used

## 6. Middleware

- [ ] `authenticate`: read cookie/bearer, verify JWT, load minimal user, reject banned/inactive
- [ ] `optionalAuth`: attach user if a valid token exists, otherwise continue
- [ ] `authorize(...roles)`
- [ ] Origin check middleware for POST/PUT/PATCH/DELETE (allowlist from `CORS_ORIGINS`)
- [ ] Strict rate limiters on login/register/forgot/resend

## 7. Seed and docs

- [ ] Seed admin from env (upsert)
- [ ] OpenAPI docs for every endpoint, including cookie descriptions and error codes

## 8. Tests

- [ ] Register → verify → login → refresh → logout happy path
- [ ] Login before verification, wrong password, unknown email (same message)
- [ ] Refresh token reuse revokes the family
- [ ] Reset token single-use and expiry
- [ ] `authorize` returns 403 for wrong role, 401 without token
- [ ] Foreign `Origin` rejected
- [ ] Rate limit returns 429

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
