# Module 18: Media (backend) · Todo

Branch: `feat/18-media-backend` (backend repo)

## 1. Setup

- [ ] Create a Cloudinary account; note cloud name and keys
- [ ] Install the `cloudinary` SDK
- [ ] Env vars in `env.ts` and `.env.example`

## 2. Schema

- [ ] `MediaAsset` model + migration

## 3. Endpoints (ADMIN, STAFF)

- [ ] `POST /admin/media/sign` (sign timestamp + folder + allowed formats)
- [ ] `POST /admin/media` (verify with Admin API: folder prefix, format, bytes ≤ 5 MB; save row)
- [ ] `GET /admin/media` (pagination)
- [ ] `PATCH /admin/media/:id` (alt text)
- [ ] `DELETE /admin/media/:id` (reject with `409 MEDIA_IN_USE` if referenced; otherwise delete in Cloudinary then DB)

## 4. Helpers

- [ ] `buildImageUrl(publicId, { width, format })`
- [ ] `isMediaInUse(id)` (checks product/category references once module 19 exists; stub returning false until then)

## 5. Seed script

- [ ] `prisma/seed/upload-images.ts`: reads `prisma/seed/images/`, uploads with fixed `public_id`s, skips existing, upserts `MediaAsset`
- [ ] Script in package.json (`db:seed:images`)

## 6. Test helper and tests

- [ ] A tiny dev-only HTML page or script that signs and uploads a file (for manual testing before the admin UI exists)
- [ ] Tests with the Cloudinary SDK mocked: sign returns expected fields; verify rejects wrong folder/format/size; delete in-use asset returns 409

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
