# Module 27: Cart & wishlist (backend)

| | |
|---|---|
| Milestone | 06 Cart, checkout & COD |
| Repo | backend |
| Depends on | 12, 17, 20 |
| Unblocks | 29, 30 |

## Goal

A server-side cart for logged-in users, a public price-quote endpoint so guest carts (stored in the browser) always show server-validated prices, cart merging on login, and a wishlist.

## Included

- **Models:** `Cart` (one per user), `CartItem` (cart, variant, quantity, added at; unique per cart + variant), `WishlistItem` (user, product; unique)
- **Cart endpoints** (authenticated):
  - `GET /cart?currency=` → lines with current price in the currency, line totals, subtotal, and warnings per line (`OUT_OF_STOCK`, `QUANTITY_REDUCED`, `UNAVAILABLE` when the variant is inactive or the product archived)
  - `POST /cart/items` `{ variantId, quantity }` → adds or increments, clamps to stock and a per-line maximum (e.g. 10)
  - `PATCH /cart/items/:variantId` `{ quantity }`, `DELETE /cart/items/:variantId`, `DELETE /cart`
  - `POST /cart/merge` `{ items: [{ variantId, quantity }] }` → merges a guest cart after login (sums quantities, clamps)
- **Quote endpoint** (public, rate limited): `POST /cart/quote` `{ currency, items }` → same priced response as `GET /cart`, without storing anything; used by guest carts and by checkout to show totals
- **Wishlist endpoints** (authenticated): `GET /wishlist` (product cards in the requested currency), `PUT /wishlist/:productId`, `DELETE /wishlist/:productId` (idempotent)
- Prices are **never stored** in the cart; they're always looked up in `VariantPrice` for the requested currency
- The cart pricing logic lives in one service function reused by orders (module 29)

## Not included

- Shipping fees (module 28) and order placement (module 29)
- Abandoned cart emails (post-MVP)

## Notes

- The same `priceLines(items, currency)` function powers cart, quote and order placement, so the numbers can never disagree.
- Unknown variant ids in a quote produce an `UNAVAILABLE` line warning instead of failing the whole request.

## You'll learn

- Upserts and unique constraints
- Designing one pricing function that every flow trusts
- Idempotent endpoints
