# Module 31: Checkout (frontend)

| | |
|---|---|
| Milestone | 06 Cart, checkout & COD |
| Repo | frontend |
| Depends on | 16, 28, 29, 30 |
| Unblocks | 34 |

## Goal

A fast, trustworthy checkout that works without an account: the customer fills in their details, sees the delivery fee and total update live, and places a Cash on Delivery order. Afterwards they can track it, and logged-in customers see it in `/user/orders`.

## Included

- **`/checkout`** (`noindex`, dynamic). One page with clear sections:
  1. **Contact:** name, phone (BD format with `+880` hint), email (optional, "get order updates by email")
  2. **Shipping address:** logged-in users choose a saved address or add a new one; guests use the address form from module 16 (BD cascade or international)
  3. **Delivery:** zone, fee, estimate from `/shipping/quote`, updating when the address changes
  4. **Payment:** Cash on Delivery when available; otherwise a clear reason ("COD is only available for Taka orders in Bangladesh"); online payment shown as "coming soon" until module 34
  5. **Review & place order:** note field, terms link
- **Order summary:** sticky on desktop, collapsible on mobile; items, subtotal, delivery, total in the current currency (from the quote endpoints)
- **Idempotency:** a UUID per checkout session (sessionStorage) sent as `Idempotency-Key`; button disabled while submitting
- **Errors:** `OUT_OF_STOCK` shows which items and offers to update the cart; validation errors mapped to fields; network errors keep the form data
- **Success page** `/checkout/success/[orderNumber]`: animated checkmark (and subtle confetti, skipped with reduced motion), order summary, "We'll call you to confirm" message, link to tracking; guests get a "create an account" prompt
- **`/track-order`:** order number + phone form → status timeline, items, totals
- **`/user/orders`:** list with colored status pills; **`/user/orders/[orderNumber]`:** detail with timeline and a Cancel button while Pending (confirmation modal)
- Dashboard stats (module 16) now show real order counts and recent orders

## Not included

- Online payment flow (module 34)

## Notes

- Mobile first: large inputs, correct `inputmode`/`autocomplete` (`name`, `tel`, `email`, `address-line1`, `postal-code`), sticky total + Place order button at the bottom.
- Never compute totals on the client; show what the server quoted.

## You'll learn

- Multi-section forms with live server quotes
- Error recovery UX
- Idempotency from the client side
