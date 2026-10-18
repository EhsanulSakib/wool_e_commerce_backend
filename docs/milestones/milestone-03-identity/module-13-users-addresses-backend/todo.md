# Module 13: Users & addresses (backend) · Todo

Branch: `feat/13-users-addresses-backend` (backend repo)

## 1. Shared schemas

- [ ] `shared/validation/phone.ts`: BD phone schema with normalization; E.164 schema
- [ ] `shared/data/bd-locations.ts`: divisions and districts
- [ ] `shared/validation/address.ts`: discriminated union (`country: "BD"` vs others)

## 2. Profile

- [ ] `GET /users/me`
- [ ] `PATCH /users/me` (name, phone)
- [ ] `POST /users/me/change-password` (verify current, hash new, revoke other sessions)

## 3. Addresses

- [ ] `Address` model + migration (index on `userId`)
- [ ] List, create, update, delete endpoints with ownership checks (404 for others)
- [ ] First address becomes default automatically
- [ ] `POST /:id/default` in a transaction (unset others, set this one)
- [ ] Deleting the default makes the most recent remaining address default
- [ ] Limit addresses per user (e.g. 10)

## 4. Locations

- [ ] `GET /locations/bd` with `Cache-Control: public, max-age=86400`
- [ ] `GET /locations/countries`

## 5. Admin

- [ ] `GET /admin/users` with search, filters, pagination
- [ ] `GET /admin/users/:id` (profile + address count + created date)
- [ ] `PATCH /admin/users/:id` status (ADMIN, STAFF) and role (ADMIN only); banning revokes all sessions
- [ ] Admin can't ban or demote themselves

## 6. Docs and tests

- [ ] OpenAPI docs for all endpoints
- [ ] Tests: profile update, change password revokes sessions, address CRUD, one default invariant, other user's address 404, BD phone normalization, BD address validation, international address validation, admin filters, role rules

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
