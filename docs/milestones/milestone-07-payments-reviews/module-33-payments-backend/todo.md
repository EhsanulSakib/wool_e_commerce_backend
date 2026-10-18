# Module 33: Payments (backend) · Todo

Branch: `feat/33-payments-backend` (backend repo)

## 1. Setup

- [ ] Register an SSLCommerz sandbox store; add env vars
- [ ] Read the SSLCommerz API docs (session init, validation API, IPN)

## 2. Schema and orders

- [ ] Add `SSLCOMMERZ` to `PaymentMethod`; `PaymentStatus` usage for online orders
- [ ] `Payment` model + `PaymentStatusEnum` + migration
- [ ] Allow SSLCOMMERZ in `POST /orders` (BDT and USD); return a signed `paymentToken` for guests

## 3. Gateway client

- [ ] `modules/payments/sslcommerz.client.ts`: `createSession()`, `validate(valId)` with timeouts and error mapping
- [ ] Mock implementation for tests

## 4. Endpoints

- [ ] `POST /payments/sslcommerz/init` (owner session or valid `paymentToken`)
- [ ] `POST …/success`, `…/fail`, `…/cancel` (urlencoded body parser, validation, 303 redirect to frontend)
- [ ] `POST …/ipn`
- [ ] `GET /orders/:orderNumber/payment-status`

## 5. Processing

- [ ] `confirmPayment(tranId, valId)`: validate with gateway, compare amount/currency/tranId, update payment + order in a transaction with a guard (`WHERE status = 'INITIATED'`), add history row (system), emit events
- [ ] Mismatch → payment FAILED, alert log, order stays UNPAID

## 6. Expiry job

- [ ] Scheduler every 5 minutes: cancel online orders UNPAID for > 30 minutes (restore stock, history, email)
- [ ] Make the job safe to run twice (same guard pattern)

## 7. Emails

- [ ] Templates: payment received, payment failed/expired

## 8. Docs and tests

- [ ] OpenAPI docs (callbacks documented as gateway-only)
- [ ] Tests with the mocked gateway: success flow; invalid `val_id`; amount mismatch; duplicate success + IPN processed once; cancel/fail; expiry job cancels and restores stock; guest init without/with wrong token rejected

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
