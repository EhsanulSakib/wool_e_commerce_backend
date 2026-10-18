# Module 19: Catalog admin (backend) · Todo

Branch: `feat/19-catalog-admin-backend` (backend repo)

## 1. Schema

- [ ] Enums `ProductStatus`, `AttributeType`
- [ ] Models: Category, Attribute, AttributeValue, Product, ProductVariant, VariantAttributeValue, VariantPrice, ProductImage
- [ ] Check constraint `stock >= 0` (raw SQL in the migration)
- [ ] Indexes for foreign keys and common lookups
- [ ] Migration `catalog`

## 2. Shared helpers

- [ ] `shared/slug.ts`: slugify + ensure unique (suffix `-2`, `-3`…)
- [ ] SKU generator from category code + color code + size code

## 3. Categories and attributes

- [ ] Categories CRUD, reorder, cycle check, delete protection
- [ ] Attributes and values CRUD (hex code validation for colors)

## 4. Products and variants

- [ ] Create product with matrix input `{ colors: [...], sizes: [...], basePrice, stock }` → variants + prices in one transaction
- [ ] Update product fields; publish (sets `publishedAt`), unpublish, archive
- [ ] Variant add/update/deactivate; stock set and adjust (`+n` / `-n`) without going below 0
- [ ] Price endpoints: set Taka price; set other currency manual price; reset to auto

## 5. Auto-price engine

- [ ] `recalculatePrices(currencyCode, variantIds?)` using `convertFromBase` + rounding, batch update in a transaction
- [ ] Run after a Taka price change (for that variant)
- [ ] Listener on `currency.rate_changed` (all variants)
- [ ] New active currency → generate auto prices for all variants

## 6. Images

- [ ] Attach MediaAsset to product (alt, optional color), reorder, remove
- [ ] Update `isMediaInUse` in module 18

## 7. Events and seed

- [ ] Emit product/category events after commits
- [ ] Seed: categories, attributes, ~30 products with variants, prices, stock, images, descriptions
- [ ] Bulk generator script (5,000 products) separate from the normal seed

## 8. Docs and tests

- [ ] OpenAPI docs for all admin endpoints
- [ ] Tests: matrix creates N variants with unique SKUs; auto USD prices correct; manual override kept on rate change; duplicate SKU 409; category cycle 400; negative stock rejected; customer 403

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
