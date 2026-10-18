# Module 30: Cart & wishlist (frontend)

| | |
|---|---|
| Milestone | 06 Cart, checkout & COD |
| Repo | frontend |
| Depends on | 15, 21, 23, 27 |
| Unblocks | 31 |

## Goal

A delightful, reliable cart for guests and logged-in users: instant feedback with optimistic updates, server-validated prices in the selected currency, a smooth fly-to-cart animation, a cart drawer and page, and a working wishlist.

## Included

- **Zustand store** (ROADMAP open question 2) persisted to localStorage for guests: only `{ variantId, quantity }[]`
- **Logged-in cart** via TanStack Query (`['cart', currency]`) with optimistic mutations and rollback
- **`useCart()`** hook hiding the guest/user difference (items, priced lines, subtotal, warnings, add/update/remove)
- **Guest pricing** through `POST /cart/quote` (query keyed by items + currency)
- **Merge on login:** local items → `POST /cart/merge` → clear local storage
- **Add to cart** wired on the product page, quick add on cards, sticky mobile bar; Buy now → add + go to checkout
- **Fly-to-cart animation:** a copy of the product image flies to the cart icon (transform only), then the badge bumps; skipped with reduced motion
- **Cart drawer:** lines (image, name, variant, price, quantity stepper, remove with Undo toast), warnings (price changed, quantity reduced, unavailable), subtotal, **free-delivery progress bar** (threshold from `/shipping/zones` for the default zone in the current currency), Checkout and Continue shopping buttons, empty state with suggestions
- **Cart page** `/cart` (`noindex`) with the same content in a full layout
- **Cross-tab sync** for the guest cart (storage event)
- **Wishlist:** heart toggles with optimistic update for logged-in users; guests get a "Log in to save favourites" modal; `/user/wishlist` grid with move-to-cart; delivery estimates on the product page now come from `/shipping/zones`

## Not included

- Checkout (module 31)

## Notes

- The free-delivery bar uses the Inside Dhaka threshold as the headline for Taka and the International threshold for USD; the exact fee is calculated at checkout from the address.
- Keep the store tiny and serializable; derived values (totals) come from the server response, never computed from stale prices.

## You'll learn

- Client state vs server state
- Optimistic updates and rollback
- Persisted stores and cross-tab sync
- Shared-element style animations with transforms
