# Module 31: Checkout (frontend) · Todo

Branch: `feat/31-checkout-frontend` (frontend repo)

## 1. Data

- [ ] Regenerate API types
- [ ] `features/checkout/api.ts`: shipping quote, place order, track order
- [ ] `features/orders/api.ts`: list, detail, cancel

## 2. Checkout page

- [ ] `/checkout` route (`noindex`); redirect to `/cart` if the cart is empty
- [ ] Contact section (react-hook-form + Zod, phone normalization preview)
- [ ] Address section: saved address picker (logged in) or reused `AddressForm`
- [ ] Delivery section: live quote on address change (debounced), loading state
- [ ] Payment section: COD availability logic and messages
- [ ] Review section: note, terms link, Place order button
- [ ] Order summary (sticky desktop, collapsible mobile)
- [ ] Sticky mobile footer with total + button

## 3. Placing the order

- [ ] Idempotency key in sessionStorage (new key after success)
- [ ] Disable button during submit; handle `OUT_OF_STOCK`, validation, network errors
- [ ] On success: clear cart, go to the success page

## 4. After the order

- [ ] `/checkout/success/[orderNumber]` with animation and summary (reads order data from the server; guests via a short-lived token or the data returned on placement)
- [ ] `/track-order` page with form and timeline component
- [ ] `/user/orders` list and `/user/orders/[orderNumber]` detail with Cancel (modal)
- [ ] Update `/user/dashboard` stats and recent orders

## 5. Shared components

- [ ] `OrderStatusPill` (status → tone)
- [ ] `OrderTimeline`

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
