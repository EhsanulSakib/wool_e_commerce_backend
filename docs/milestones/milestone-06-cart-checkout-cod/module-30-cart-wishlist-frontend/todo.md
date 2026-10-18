# Module 30: Cart & wishlist (frontend) · Todo

Branch: `feat/30-cart-wishlist-frontend` (frontend repo)

## 1. State

- [ ] Install `zustand` (if open question 2 confirmed)
- [ ] `features/cart/guest-store.ts`: items, add, update, remove, clear; `persist` middleware; storage-event sync
- [ ] `features/cart/api.ts`: cart, quote, merge, wishlist calls
- [ ] `useCart()`: guest → quote query; user → cart query; same return shape
- [ ] Optimistic mutations with rollback + error toast
- [ ] Merge on login (hook into the login success flow), then clear local items

## 2. Add to cart

- [ ] Wire product page button, sticky bar, card quick add, Buy now
- [ ] Disable when the variant isn't selected or sold out; show stock limits
- [ ] `FlyToCart` animation (image clone → cart icon, transform only), badge bump; reduced-motion fallback

## 3. Cart UI

- [ ] `CartDrawer` with lines, stepper, remove + Undo toast, warnings, subtotal, free-delivery bar, buttons, empty state
- [ ] `/cart` page (`noindex`)
- [ ] Navbar badge from `useCart()`

## 4. Shipping data

- [ ] Fetch `/shipping/zones` (cached) for the free-delivery bar and product page delivery box

## 5. Wishlist

- [ ] `useWishlist()` with optimistic toggle
- [ ] Heart on cards and product page; guest → login modal
- [ ] `/user/wishlist` page with move-to-cart and remove

## 6. Tests

- [ ] Guest store unit tests (add/merge quantities, clamp)
- [ ] `useCart` test with mocked API for guest and user modes

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
