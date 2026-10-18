# Module 34: Payments (frontend)

| | |
|---|---|
| Milestone | 07 Online payments & reviews |
| Repo | frontend |
| Depends on | 31, 33 |
| Unblocks | Milestone 07 QA |

## Goal

Add online payment to checkout: show the right payment options for the currency and address, hand the customer over to SSLCommerz smoothly, and handle every outcome (success, failure, cancellation, slow confirmation) with clear pages and a retry option.

## Included

- **Payment section** in checkout: "Pay online" option with logos (bKash, Nagad, cards for Taka; cards for USD) next to COD; COD hidden for USD/international with the existing explanation
- **Flow:** place order (SSLCOMMERZ) → `init` with the order number (+ `paymentToken` for guests) → full-page redirect to `GatewayPageURL`, with a "Redirecting to secure payment…" overlay
- **Result pages:** `/checkout/payment/success`, `/checkout/payment/failed`, `/checkout/payment/cancelled` (`?order=`); each reads the real payment status from the API, never from the query string
- **Pending state:** if the payment is still being confirmed, poll the status a few times with a friendly message
- **Retry:** failed/cancelled pages offer "Try again" (new init) and "Switch to Cash on Delivery" when allowed
- **Order views:** payment status pill in `/user/orders`, order detail and tracking; "Pay now" for unpaid online orders still inside the payment window
- Cart cleared only after the order is placed (not after payment), matching the backend's stock reservation

## Not included

- Saved cards, wallets (post-MVP)

## Notes

- Use `window.location.assign()` for the gateway redirect; it's a different site, not a client-side route.
- Pressing Back from the gateway should land on a page that shows the order's current state, not re-submit anything.

## You'll learn

- Redirect-based payment UX
- Handling eventual consistency (callbacks that arrive later)
