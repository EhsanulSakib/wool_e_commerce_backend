# Module 18: Media (backend) · QA

## Automated

- [ ] Mocked Cloudinary tests pass

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Customer calls `/admin/media/sign` | `403` | ☐ |
| 2 | Admin signs, uploads a JPG with the test page | Upload succeeds in Cloudinary | ☐ |
| 3 | Register the `public_id` via `POST /admin/media` | `201` with width, height, format, bytes | ☐ |
| 4 | Change the folder in the upload request (not matching the signature) | Cloudinary rejects the upload | ☐ |
| 5 | Register a `public_id` that doesn't exist | `400 MEDIA_NOT_FOUND` | ☐ |
| 6 | Upload a 7 MB image or a PDF | Rejected (by Cloudinary or by the verify step) | ☐ |
| 7 | Delete an unused asset | Gone from the DB and the Cloudinary console | ☐ |
| 8 | Run `db:seed:images` twice | Second run uploads nothing new | ☐ |
| 9 | Open a URL from `buildImageUrl(..., { width: 400 })` | Image served at 400 px in a modern format | ☐ |

## Non-functional

- [ ] `CLOUDINARY_API_SECRET` never sent to the client or logged
- [ ] Image bytes never pass through the API server

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
