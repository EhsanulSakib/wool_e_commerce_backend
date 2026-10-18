# Module 19: Catalog admin (backend) · QA

## Automated

- [ ] All tests from todo section 8 pass

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Create a product with 3 colors × 4 sizes | 12 variants, unique SKUs, Taka prices set | ☐ |
| 2 | Check USD prices in Prisma Studio | Auto-filled, rounded with END_99, `isManual = false` | ☐ |
| 3 | Set one USD price manually | `isManual = true` | ☐ |
| 4 | Change the USD rate | Auto prices change; manual one doesn't | ☐ |
| 5 | Change one variant's Taka price | Only that variant's auto prices update | ☐ |
| 6 | Create a variant with an existing SKU | `409` | ☐ |
| 7 | Set category A's parent to its own child | `400 CATEGORY_CYCLE` | ☐ |
| 8 | Delete a category that has products | `409` | ☐ |
| 9 | Adjust stock by −100 on a variant with 5 | `400`; stock stays 5 | ☐ |
| 10 | Archive a product | Status ARCHIVED; event emitted (check logs) | ☐ |
| 11 | Run the seed twice | Same counts; no duplicates | ☐ |
| 12 | Browse seeded data in Prisma Studio | Realistic names, prices, stock, images, descriptions | ☐ |
| 13 | Run the bulk generator | 5,000 products created in reasonable time | ☐ |

## Non-functional

- [ ] Rate change recalculation for all seeded variants finishes in under a few seconds
- [ ] Descriptions stored as Markdown, not HTML

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
