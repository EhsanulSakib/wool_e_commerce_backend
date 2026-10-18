# Module 18: Media (backend)

| | |
|---|---|
| Milestone | 04 Catalog & currency API |
| Repo | backend |
| Depends on | 03, 12 |
| Unblocks | 19, 38 |

## Goal

Let admins upload images straight from the browser to Cloudinary using short-lived signatures from our API, so image bytes never pass through our server. Store metadata in a `MediaAsset` table that products and categories reference.

## Included

- Cloudinary account and env vars (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLOUDINARY_FOLDER`)
- **`POST /admin/media/sign`:** returns signature, timestamp, API key, folder and allowed upload params (formats jpg/png/webp/avif, max 5 MB)
- **`POST /admin/media`:** after upload, the client sends the `public_id`; the API verifies it with Cloudinary's Admin API (exists, in our folder, allowed format/size, dimensions) and saves a `MediaAsset`
- **MediaAsset model:** `publicId` (unique), `url`, `width`, `height`, `format`, `bytes`, `alt`, `createdById`, timestamps
- `GET /admin/media` (paginated, newest first), `PATCH /admin/media/:id` (alt text), `DELETE /admin/media/:id` (only if unused; deletes from Cloudinary too)
- URL helper for transformation URLs (`f_auto,q_auto,w_<n>`), mainly for emails and OG images
- **Seed upload script:** uploads local seed images to Cloudinary once (idempotent by `public_id`) and creates `MediaAsset` rows for the catalog seed in module 19

## Not included

- Upload UI (module 38)
- Video

## Notes

- The signature only covers the parameters we sign (folder, timestamp, allowed formats). Anything else the client sends is rejected by Cloudinary.
- Storing width/height lets the frontend reserve space for images and avoid layout shift.

## You'll learn

- Signed direct uploads and why servers shouldn't proxy file bytes
- Verifying client-reported data with the source of truth
- How image CDNs transform images on the fly
