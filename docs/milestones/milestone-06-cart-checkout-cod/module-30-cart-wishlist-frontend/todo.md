# Module 30: Cart & wishlist (frontend) · Todo

Branch: `feat/30-cart-wishlist-frontend` (frontend repo)

## 1. State

- [ ] `features/cart/api.ts`: cart, quote, merge, wishlist calls with the `fetch` wrapper (module 14)
- [ ] `store/slices/cartSlice.ts`: items, priced lines, subtotal, warnings, status; reducers for local add/update/remove/clear
- [ ] Thunks: `quoteCart` (guest), `fetchCart`, `addToCart`, `updateQuantity`, `removeFromCart` (user), `mergeGuestCart`
- [ ] Optimistic updates: apply on `pending`, restore on `rejected` (+ error toast)
- [ ] Listener middleware: save guest items to localStorage on change, load on startup, re-quote when items or currency change
- [ ] `storage` event listener for cross-tab sync
- [ ] `useCart()` hook (selectors + dispatch), same shape for guests and users
- [ ] Run `mergeGuestCart` after login, then clear local items
- [ ] `store/slices/wishlistSlice.ts` + toggle thunk (optimistic)

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

- [ ] `useWishlist()` hook over `wishlistSlice`
- [ ] Heart on cards and product page; guest → login modal
- [ ] `/user/wishlist` page with move-to-cart and remove

## 6. Tests

- [ ] `cartSlice` reducer tests (add/merge quantities, clamp, optimistic rollback)
- [ ] Thunk tests with mocked `fetch` for guest and user modes
- [ ] Listener middleware test (saves to and loads from localStorage)

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
