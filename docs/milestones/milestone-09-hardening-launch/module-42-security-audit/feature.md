# Module 42: Security audit

| | |
|---|---|
| Milestone | 09 Hardening & launch |
| Repo | both |
| Depends on | all MVP modules |
| Unblocks | 44 |

## Goal

Review the whole system against the OWASP Top 10 and the security baseline in the ROADMAP, fix what's found, and add automated checks so the fixes stay fixed.

## Included

- **Access control:** automated tests for every admin route (from module 39) plus **IDOR tests** — user A can't read or change user B's orders, addresses, reviews, sessions, cart, wishlist; guest tracking requires the right phone
- **Authentication:** Argon2 parameters, JWT secret strength and rotation plan, cookie flags in production, session revocation paths, rate limits and lockout behavior
- **Injection:** review every raw SQL query (parameters only); Zod on every input; no dynamic `orderBy` from user input without an allowlist
- **Business logic:** negative/huge quantities, price tampering, currency/payment method mismatches, replayed idempotency keys, replayed payment callbacks
- **Configuration:** helmet headers, CORS, `/docs` disabled or protected in production, no stack traces, `trust proxy` correct for the host, `NODE_ENV=production`
- **Frontend headers:** Content Security Policy (nonce-based scripts via `proxy.ts`, images from Cloudinary, frames none), HSTS, Referrer-Policy, Permissions-Policy, X-Content-Type-Options
- **XSS:** `dangerouslySetInnerHTML` only for JSON-LD (escaped) and sanitized Markdown; user text rendered as text everywhere
- **Integrity:** SSLCommerz validation, signed revalidation webhook, signed payment tokens
- **SSRF:** no server-side fetches of user-supplied URLs (Cloudinary verification uses ids, not URLs)
- **Dependencies:** `npm audit` in CI failing on high/critical; Dependabot or Renovate configured
- **Secrets:** secret scanning in CI (e.g. gitleaks); `.env.example` without real values
- **Logging/monitoring:** security events logged (failed logins, role changes, bans, payment mismatches) without personal data in plain text
- **Data:** backups (Neon point-in-time restore) and a restore drill; data retention note for guest orders; privacy policy matches what's actually collected
- **Report:** `docs/security-review.md` with each check, finding, severity and fix

## Not included

- External penetration test (optional, post-MVP)

## Notes

- Treat this as a checklist exercise: go area by area, try to break it, write down what you tried.

## You'll learn

- The OWASP Top 10 in a real codebase
- Threat modeling
- Content Security Policy in Next.js
- Turning security fixes into automated tests
