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

- **`cartSlice` (Redux Toolkit):** items `{ variantId, quantity }[]` plus the priced result from the server (lines, subtotal, warnings) and a status
- **Guests:** items saved to localStorage by a Redux **listener middleware** (`createListenerMiddleware`: saves on every cart change, loads once on startup); prices from `POST /cart/quote` through a `quoteCart` thunk whenever items or currency change
- **Logged-in users:** the same slice synced with the server through thunks (`addToCart`, `updateQuantity`, `removeFromCart` call the cart API with `fetch`); **optimistic updates**: the reducer applies the change on `pending`, and `rejected` restores the previous items and shows an error toast
- **`useCart()`** hook (selectors + dispatch) hiding the guest/user difference
- **Merge on login:** `mergeGuestCart` thunk runs after login: local items → `POST /cart/merge` → clear local storage
- **`wishlistSlice`:** product ids for the logged-in user, toggled optimistically through thunks
- **Add to cart** wired on the product page, quick add on cards, sticky mobile bar; Buy now → add + go to checkout
- **Fly-to-cart animation:** a copy of the product image flies to the cart icon (transform only), then the badge bumps; skipped with reduced motion
- **Cart drawer:** lines (image, name, variant, price, quantity stepper, remove with Undo toast), warnings (price changed, quantity reduced, unavailable), subtotal, **free-delivery progress bar** (threshold from `/shipping/zones` for the default zone in the current currency), Checkout and Continue shopping buttons, empty state with suggestions
- **Cart page** `/cart` (`noindex`) with the same content in a full layout
- **Cross-tab sync** for the guest cart (`storage` event → dispatch `cartHydrated`)
- **Wishlist:** heart toggles with optimistic update for logged-in users; guests get a "Log in to save favourites" modal; `/user/wishlist` grid with move-to-cart; delivery estimates on the product page now come from `/shipping/zones`

## Not included

- Checkout (module 31)

## Notes

- The free-delivery bar uses the Inside Dhaka threshold as the headline for Taka and the International threshold for USD; the exact fee is calculated at checkout from the address.
- Keep the slice serializable; derived values (totals) come from the server response, never computed from stale prices.
- The cart drawer opens through `uiSlice.openCartDrawer` (added in module 04), so "Add to cart" anywhere can open it.

## You'll learn

- Client state vs server state, and where each lives (Redux vs server responses)
- Async thunks with optimistic updates and rollback
- Redux listener middleware for persistence and cross-tab sync
- Shared-element style animations with transforms
