# Module 27: Cart & wishlist (backend) · QA

## Automated

- [ ] Pricing unit tests and integration tests pass

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Add variant A (qty 2), then again (qty 1) | One line with quantity 3 | ☐ |
| 2 | Add 50 of a variant with stock 4 | Quantity 4; `QUANTITY_REDUCED` warning | ☐ |
| 3 | Archive a product that's in the cart, `GET /cart` | Line marked `UNAVAILABLE`, excluded from subtotal | ☐ |
| 4 | `GET /cart?currency=USD` | USD prices and subtotal | ☐ |
| 5 | `POST /cart/quote` with the same items as the cart | Same lines and subtotal as `GET /cart` | ☐ |
| 6 | Quote with an unknown variant id | `200` with that line marked `UNAVAILABLE` | ☐ |
| 7 | Merge `[A×2]` into a cart that has `A×3` (stock 4) | A×4 | ☐ |
| 8 | User B tries to read user A's cart | Impossible (cart is always the caller's own) | ☐ |
| 9 | `PUT /wishlist/:id` twice | One wishlist entry | ☐ |
| 10 | Quote 50 times quickly from one IP | Rate limited | ☐ |

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
