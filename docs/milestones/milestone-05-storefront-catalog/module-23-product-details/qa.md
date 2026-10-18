# Module 23: Product details · QA

## Automated

- [ ] `resolveVariant` tests: valid combination, sold-out combination, missing combination, single-size products

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Open a product with several colors | First color selected; gallery shows its images | ☐ |
| 2 | Pick another color | Gallery switches; URL has `?color=`; reload keeps it | ☐ |
| 3 | Pick a sold-out size | Not selectable; announced as unavailable | ☐ |
| 4 | Pick a size with stock 3 | "Only 3 left"; quantity max 3 | ☐ |
| 5 | Desktop: hover the main image | Zoom follows the cursor | ☐ |
| 6 | Open the lightbox, use arrows, Escape | Works; focus returns | ☐ |
| 7 | Mobile: swipe the gallery | Images change; dots update | ☐ |
| 8 | Mobile: scroll past the Add to cart button | Sticky bar slides in; hides when scrolling back up to it | ☐ |
| 9 | Open the size guide | Accessible modal with the table | ☐ |
| 10 | Switch to USD | Price in USD; COD badge hidden | ☐ |
| 11 | Visit two products, then a third | Recently viewed shows the first two | ☐ |
| 12 | Visit `/products/does-not-exist` | 404 page with status 404 | ☐ |
| 13 | Description containing `<script>` in Markdown (test data) | Not executed | ☐ |

## Non-functional

- [ ] Lighthouse mobile ≥ 90; LCP is the main product image and < 2.5 s
- [ ] Only the first image loads eagerly (Network tab)
- [ ] axe: 0 violations with the lightbox and size guide open

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
