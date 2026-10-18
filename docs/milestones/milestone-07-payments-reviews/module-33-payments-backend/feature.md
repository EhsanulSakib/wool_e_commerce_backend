# Module 33: Payments (backend)

| | |
|---|---|
| Milestone | 07 Online payments & reviews |
| Repo | backend |
| Depends on | 29 |
| Unblocks | 34 |

## Goal

Accept online payments through SSLCommerz (sandbox) in Taka and USD. The customer is redirected to SSLCommerz's hosted page; we never handle card data. Every result is verified server-side with SSLCommerz's validation API before an order is marked paid, and every callback is processed idempotently.

## Included

- SSLCommerz sandbox store (register on the developer portal); env `SSLC_STORE_ID`, `SSLC_STORE_PASSWORD`, `SSLC_IS_LIVE=false`, `PUBLIC_API_URL`
- **`PaymentMethod.SSLCOMMERZ`** accepted by `POST /orders` for BDT and USD; COD rules unchanged
- **Guest access:** order placement returns a short-lived signed `paymentToken` (bound to the order); logged-in owners can use their session instead
- **`Payment` model:** order, provider, `tranId` (unique, ours), amount, currency, status (`INITIATED`, `SUCCESS`, `FAILED`, `CANCELLED`), `valId`, `bankTranId`, card type/brand, raw gateway payload (JSON), timestamps
- **`POST /payments/sslcommerz/init`** `{ orderNumber, paymentToken? }` → checks the order is UNPAID and online-paid, creates a `Payment` with a new `tranId`, calls the SSLCommerz session API (total, currency, success/fail/cancel/IPN URLs, customer and product info), returns `GatewayPageURL`
- **Callbacks** `POST /payments/sslcommerz/success | fail | cancel` (form posts from the browser): never trusted directly — on success, call the **validation API** with `val_id`, require status `VALID`/`VALIDATED`, and check `tran_id`, amount and currency match our records; then mark payment `SUCCESS`, order `PAID` and (open question 6) **CONFIRMED by system**; redirect (303) to the frontend result page
- **IPN** `POST /payments/sslcommerz/ipn` (server to server): same validation; no-op if already processed
- **Idempotency:** a database lock/unique update so success + IPN for the same transaction update the order once and send one email
- **Expiry job:** online orders unpaid after 30 minutes → CANCELLED, stock restored, email sent (in-process scheduler like `node-cron` now; BullMQ post-MVP)
- **Retry:** a new `init` for an UNPAID order creates a new `tranId`
- **Events/emails:** `payment.succeeded` (payment received email), `payment.failed`
- Logging of gateway payloads with sensitive fields redacted
- `GET /orders/:orderNumber/payment-status` for the frontend result pages

## Not included

- Refunds through the gateway API (post-MVP; admin marks REFUNDED manually for now)
- Direct bKash/Nagad (post-MVP)

## Notes

- The success/fail/cancel callbacks arrive as cross-site form POSTs, so SameSite cookies aren't sent; that's fine because we verify with `tran_id` + `val_id`, not the session.
- IPN needs a public URL: test it on staging or with a tunnel (`cloudflared`/`ngrok`) locally.
- Stock is reserved at order placement; the expiry job is what releases it for abandoned payments.

## You'll learn

- Hosted payment page flows and why the server must verify
- Webhooks/IPN and idempotent processing
- Scheduled jobs
