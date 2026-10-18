# Module 38: Admin catalog UI

| | |
|---|---|
| Milestone | 08 Admin dashboard |
| Repo | frontend |
| Depends on | 18, 19, 37 |
| Unblocks | Milestone 08 QA |

## Goal

Manage the catalog from the UI: products with a variant matrix, prices per currency (auto or manual), stock, images uploaded straight to Cloudinary with drag-and-drop ordering, plus categories and attributes.

## Included

- **`/admin/products`:** DataTable (image, name, category, status, Taka price range, total stock, updated); filters (status, category, low stock); search; bulk publish/archive
- **`/admin/products/new` and `/admin/products/[id]`:** form sections
  - Basics: name, slug (auto, editable), category, status, featured
  - Content: short description, description (Markdown editor with live preview, hand-built), material, care instructions
  - SEO: title and description with a live Google-style snippet preview and length counters
  - **Variants:** pick colors and sizes → matrix table (one row per combination) with SKU, stock, Taka price, compare-at; for each other currency a toggle "auto / manual" showing the calculated auto value; bulk-fill a column
  - **Images:** drag-and-drop upload (signature from module 18 → direct upload to Cloudinary with progress bars → register), reorder by drag (pointer events) with keyboard alternative (move up/down buttons), assign an image to a color, alt text
  - Save draft / Publish; unsaved-changes warning on leave; field-level validation errors from the API
- **`/admin/categories`:** tree view with reorder, create/edit modal (name, slug, parent, image, description, SEO, active)
- **`/admin/attributes`:** colors (name + hex picker + preview swatch) and sizes (ordered list)

## Not included

- Bulk CSV import/export of products (post-MVP)

## Notes

- Use `react-hook-form` field arrays for the variant matrix; keep the matrix generator a pure function (same logic as the backend, tested).
- Upload several images in parallel but cap concurrency (e.g. 3) to stay responsive.

## You'll learn

- Complex forms with nested arrays
- Direct-to-cloud uploads with progress
- Drag-and-drop with an accessible alternative
- Guarding unsaved changes
