# Milestone 06: Cart, checkout & Cash on Delivery

| | |
|---|---|
| Repos | backend + frontend |
| Depends on | [05 Storefront catalog](../milestone-05-storefront-catalog/feature.md) |
| Next milestone | [07 Online payments & reviews](../milestone-07-payments-reviews/feature.md) |

## Goal

Shoppers can buy. Guests or logged-in customers add items to the cart, check out with Cash on Delivery by filling in a details form (no login needed), and track their order. Orders start as **Pending**; an admin confirms them from a first, minimal admin orders page, then moves them through Processing → Shipped → Delivered.

## When it's done

- A guest can go from product page to placed COD order in under 2 minutes on a phone.
- Stock can't be oversold, even with two people buying the last item at the same time.
- Prices and totals always come from the server; tampering with the request changes nothing.
- The admin confirms, ships and delivers orders from `/admin/orders`; the customer gets emails and sees the timeline on `/track-order` or `/user/orders`.

## Modules (build in this order)

| # | Module | Repo | Depends on | Summary |
|---|---|---|---|---|
| 27 | [Cart & wishlist (backend)](module-27-cart-wishlist-backend/feature.md) | backend | 12, 17, 20 | Server cart for users, price quotes for guest carts, merge on login, wishlist |
| 28 | [Shipping (backend)](module-28-shipping-backend/feature.md) | backend | 13, 17 | Zones (Inside Dhaka, Outside Dhaka, International), fees and free-delivery thresholds per currency, quotes |
| 29 | [Orders (backend)](module-29-orders-backend/feature.md) | backend | 11, 13, 27, 28 | Guest/user COD orders in one transaction, idempotency, stock safety, status machine, tracking, emails |
| 30 | [Cart & wishlist (frontend)](module-30-cart-wishlist-frontend/feature.md) | frontend | 15, 21, 23, 27 | Guest + user cart, cart drawer and page, fly-to-cart, wishlist |
| 31 | [Checkout (frontend)](module-31-checkout-frontend/feature.md) | frontend | 16, 28, 29, 30 | Checkout without login, success page, track order, order history |
| 32 | [Admin orders (minimal)](module-32-admin-orders-minimal/feature.md) | frontend | 15, 29 | `/admin` layout + orders list/detail with confirm, cancel, status changes |

Backend modules 27 → 28 → 29 first; then 30 → 31; 32 can be built right after 29, in parallel with 30–31.

## Not in this milestone

- Online payments (milestone 07). **USD orders can't be completed yet**, because COD is Taka-only; checkout shows a "card payment coming soon" message for USD.
- Coupons (post-MVP)
- Full admin dashboard (milestone 08)

## Open questions that affect this milestone

- **Email for guest orders** (ROADMAP open question 7). Assumption: phone required, email optional.
- **International shipping** (open question 4) decides whether the International zone exists in module 28.
