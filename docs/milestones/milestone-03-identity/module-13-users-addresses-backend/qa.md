# Module 13: Users & addresses (backend) · QA

## Automated

- [ ] All tests from todo section 6 pass

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | `PATCH /users/me` with phone `01712345678` | Stored as `+8801712345678` | ☐ |
| 2 | Phone `0123` or `01212345678` | `400` with a phone error | ☐ |
| 3 | Create a BD address without `district` | `400` naming `district` | ☐ |
| 4 | Create a US address without `city` | `400` naming `city` | ☐ |
| 5 | Create three addresses | First is default; only one default at any time | ☐ |
| 6 | Set the third as default | Badge moves; others unset | ☐ |
| 7 | Delete the default | Another address becomes default | ☐ |
| 8 | User B requests user A's address id | `404` | ☐ |
| 9 | Change password, then use a session from another browser | That session gets `401` | ☐ |
| 10 | `GET /locations/bd` | 8 divisions with their districts; long cache header | ☐ |
| 11 | STAFF `PATCH /admin/users/:id` role | `403` | ☐ |
| 12 | ADMIN bans a customer | Customer's next request `401`/`403`; can't log in | ☐ |
| 13 | ADMIN tries to ban themselves | `400` | ☐ |

## Non-functional

- [ ] Admin user list responds quickly with 1,000 seeded users (index on email/name search)
- [ ] No password hashes in any user response

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
