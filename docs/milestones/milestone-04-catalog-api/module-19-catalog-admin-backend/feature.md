# Module 19: Catalog admin (backend)

| | |
|---|---|
| Milestone | 04 Catalog & currency API |
| Repo | backend |
| Depends on | 17, 18 |
| Unblocks | 20, 24, 38 |

## Goal

Model the knitwear catalog and give admins full control over it through the API: categories, attributes (colors, sizes), products with variant matrices, per-currency prices with automatic conversion, stock and images. Seed a realistic catalog to build the storefront on.

## Included

- **Models:**
  - `Category`: name, slug (unique), description, image (MediaAsset), `parentId` (tree), sort order, active, SEO title/description
  - `Attribute`: name (Color, Size), slug, type (`COLOR`, `SIZE`, `TEXT`), sort order
  - `AttributeValue`: attribute, value (Charcoal, M), slug, `hexCode` for colors, sort order; unique (attribute, slug)
  - `Product`: name, slug (unique), short description, description (Markdown), material, care instructions, category, status (`DRAFT`, `ACTIVE`, `ARCHIVED`), featured, SEO title/description, `publishedAt`, `ratingAvg`, `ratingCount`, timestamps
  - `ProductVariant`: product, SKU (unique), stock (≥ 0, DB check constraint), active, sort order
  - `VariantAttributeValue`: links a variant to its color and size values; unique combination per product
  - `VariantPrice`: variant + currency (composite key), `amount`, `compareAtAmount`, `isManual`
  - `ProductImage`: product, MediaAsset, optional color (`attributeValueId`), alt, sort order
- **Admin endpoints** (ADMIN, STAFF where sensible):
  - Categories CRUD + reorder; prevent cycles; can't delete a category with products
  - Attributes and values CRUD
  - Products: create with a **variant matrix** (colors × sizes → variants with generated SKUs like `WL-SWT-CHAR-M`), update, publish/unpublish, archive
  - Variants: add, update, deactivate; stock set/adjust
  - Prices: set Taka price per variant (required) and per other currency either manual or auto
  - Images: attach, reorder, set color, remove
- **Auto-price engine:** when a Taka price changes or `currency.rate_changed` fires, recalculate every non-manual `VariantPrice` for that currency in a batch transaction
- **Slugs:** generated from names, unique, editable
- **Events:** `product.created/updated/archived`, `category.changed` (used for page revalidation in module 24 and caching in module 40)
- **Seed:** ~30 products across Sweaters, Cardigans, Scarves, Beanies, Accessories; colors (Charcoal, Cream, Oatmeal, Forest, Navy, Burgundy, Camel); sizes XS–XXL (One Size for scarves); Taka prices ৳1,890–৳8,900 with some sales; varied stock including sold-out variants; images from module 18; material and care text
- Bulk data script: generate 5,000 products for performance testing (module 20)

## Not included

- Public read endpoints (module 20)
- Admin UI (module 38)

## Notes

- Product descriptions are Markdown; the frontend renders them with sanitization. Never store raw HTML from the admin.
- `isManual = false` prices are owned by the engine; editing one through the API flips it to manual.

## You'll learn

- Relational modeling: one-to-many, many-to-many, self-relations
- Database constraints as a safety net
- Generating combinations (variant matrices)
- Keeping derived data (auto prices) in sync
