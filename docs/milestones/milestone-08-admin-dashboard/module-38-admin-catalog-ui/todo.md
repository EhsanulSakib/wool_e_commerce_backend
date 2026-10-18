# Module 38: Admin catalog UI · Todo

Branch: `feat/38-admin-catalog-ui` (frontend repo)

## 1. Data

- [ ] Regenerate API types
- [ ] `features/admin/catalog/api.ts`: products, variants, prices, images, categories, attributes, media sign/register

## 2. Product list

- [ ] `/admin/products` with DataTable, filters, search, bulk actions

## 3. Product form

- [ ] Basics and content sections; slug auto-generation
- [ ] `MarkdownEditor` (textarea + toolbar for bold/italic/list/link + preview tab, sanitized preview)
- [ ] SEO section with snippet preview and counters
- [ ] Variant matrix: color/size pickers → `buildMatrix()` (tested) → editable table; bulk-fill; currency auto/manual toggles showing calculated values
- [ ] Image manager: dropzone, signed upload with progress (max 3 parallel), register, reorder (drag + keyboard buttons), color assignment, alt text, remove
- [ ] Save draft / Publish; API field errors mapped; unsaved-changes guard (`beforeunload` + route change)

## 4. Categories and attributes

- [ ] `/admin/categories` tree with reorder and create/edit modal (image upload reused)
- [ ] `/admin/attributes`: colors with hex picker + swatch preview; sizes with ordering

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
