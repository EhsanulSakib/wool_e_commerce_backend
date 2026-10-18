# Module 27: Cart & wishlist (backend) · Todo

Branch: `feat/27-cart-wishlist-backend` (backend repo)

## 1. Schema

- [ ] `Cart`, `CartItem`, `WishlistItem` models + migration (unique constraints, indexes)

## 2. Pricing

- [ ] `modules/cart/pricing.ts`: `priceLines(items, currency)` → lines (product snapshot fields, unit price, compare-at, line total, warnings) + subtotal
- [ ] Export it from `cart/index.ts` for orders
- [ ] Unit tests: normal, sold out, quantity above stock, archived product, unknown variant, USD prices

## 3. Cart endpoints

- [ ] `GET /cart` (creates the cart lazily)
- [ ] `POST /cart/items` (upsert + clamp)
- [ ] `PATCH /cart/items/:variantId`, `DELETE /cart/items/:variantId`, `DELETE /cart`
- [ ] `POST /cart/merge`
- [ ] `POST /cart/quote` (public, rate limited, max 50 lines)

## 4. Wishlist

- [ ] `GET /wishlist` (cards in currency)
- [ ] `PUT /wishlist/:productId`, `DELETE /wishlist/:productId`

## 5. Docs and tests

- [ ] OpenAPI docs
- [ ] Integration tests: add twice increments, clamp to stock, merge sums and clamps, user isolation, quote matches `GET /cart` for the same items, wishlist idempotency

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
