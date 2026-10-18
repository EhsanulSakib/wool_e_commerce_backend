# Module 13: Users & addresses (backend)

| | |
|---|---|
| Milestone | 03 Identity |
| Repo | backend |
| Depends on | 12 |
| Unblocks | 16, 28, 29 |

## Goal

Let users manage their profile, password and address book, and give admins a user list with ban/role controls. Addresses support Bangladeshi formats (division, district, area) and international addresses, because orders and shipping zones (modules 28, 29) depend on them.

## Included

- **Profile:** `GET /users/me`, `PATCH /users/me` (name, phone), `POST /users/me/change-password` (requires current password; revokes other sessions)
- **Address model:** label (Home/Office/Other), full name, phone, `country` (ISO code, default `BD`); for BD: `division`, `district`, `area`, `addressLine`, optional `postalCode`; for other countries: `addressLine1`, `addressLine2`, `city`, `stateRegion`, `postalCode`; `isDefault`
- **Validation:** Zod discriminated union on country (BD vs international)
- **Phone validation:** BD format `01XXXXXXXXX` (with optional `+88`/`88`), normalized to `+8801XXXXXXXXX`; international numbers in E.164
- **Address endpoints:** `GET/POST /users/me/addresses`, `PATCH/DELETE /users/me/addresses/:id`, `POST /users/me/addresses/:id/default` (transaction keeps exactly one default)
- **Ownership:** another user's address returns `404` (not `403`, to avoid revealing it exists)
- **Locations:** `GET /locations/bd` — static list of the 8 divisions and 64 districts (cached with long `Cache-Control`); `GET /locations/countries` — supported countries
- **Admin:** `GET /admin/users` (search by name/email/phone, filter by role/status, pagination), `GET /admin/users/:id`, `PATCH /admin/users/:id` (status for ADMIN/STAFF; role changes ADMIN only)
- Shared `phone` and `address` Zod schemas exported for reuse by orders (module 29)

## Not included

- Account deletion (post-MVP)
- Avatar upload (can use media from module 18 later)

## Notes

- Depends on ROADMAP open question 4 (international shipping). If the answer is "no", drop the international branch of the union and the countries endpoint.
- Area/thana lists are free text in the MVP (64 districts × hundreds of areas is a lot of data); a dropdown can come later.

## You'll learn

- Authorization by ownership
- Discriminated unions for data that varies by type
- Keeping invariants (one default address) with transactions
- Designing data for local and international formats
