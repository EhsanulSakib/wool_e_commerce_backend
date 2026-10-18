# Module 12: Auth (backend) · QA

## Automated

- [ ] All tests from todo section 8 pass in CI

## Manual (through `/docs` or an HTTP client)

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Register with a new email | `201`; verification email in Mailpit | ☐ |
| 2 | Register again with the same email | `409 EMAIL_TAKEN` (or a neutral response if you chose that; documented) | ☐ |
| 3 | Log in before verifying | `403 EMAIL_NOT_VERIFIED` | ☐ |
| 4 | Verify with the emailed token | `200`; user ACTIVE in Prisma Studio | ☐ |
| 5 | Log in | `200`; two `Set-Cookie` headers with HttpOnly, SameSite=Lax, correct paths | ☐ |
| 6 | Inspect `sessions` table | Refresh token stored only as a hash | ☐ |
| 7 | Call `/auth/refresh` | New cookies; old session marked replaced | ☐ |
| 8 | Call `/auth/refresh` again with the old refresh token | `401`; all sessions of that family revoked | ☐ |
| 9 | `forgot-password` with existing and unknown emails | Identical responses; email only for the existing one | ☐ |
| 10 | Reset password, then reuse the link | First works; second `400 TOKEN_INVALID` | ☐ |
| 11 | Wait past the reset token expiry (or set it to 1 min) | `400 TOKEN_EXPIRED` | ☐ |
| 12 | Edit the JWT payload (role → ADMIN) and call an admin route | `401` (signature invalid) | ☐ |
| 13 | POST with `Origin: https://evil.example` | `403` | ☐ |
| 14 | 6 wrong logins in a minute | `429` | ☐ |
| 15 | Log in as the seeded admin | Works; role ADMIN in `/auth/sessions` claims | ☐ |

## Non-functional

- [ ] Passwords, tokens and hashes never appear in responses or logs
- [ ] Argon2 parameters documented; login takes a reasonable time (~100–300 ms) locally
- [ ] All endpoints documented in `/docs` with error codes

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
