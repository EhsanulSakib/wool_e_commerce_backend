# Module 29: Orders (backend)

| | |
|---|---|
| Milestone | 06 Cart, checkout & COD |
| Repo | backend |
| Depends on | 11, 13, 27, 28 |
| Unblocks | 31, 32, 33, 35, 37 |

## Goal

Place orders safely, from guests or logged-in users, with Cash on Delivery: re-price everything on the server, reserve stock atomically, snapshot what was bought, never create duplicates, and move orders through a strict status workflow with a full history and customer emails.

## Included

- **Models:**
  - `Order`: `orderNumber` (unique, readable, e.g. `WL-260001` from a Postgres sequence), `userId` (nullable for guests), customer name/phone/email, `currencyCode`, `bdtPerUnit` snapshot, `subtotal`, `shippingFee`, `discountTotal` (0 until coupons), `total`, `paymentMethod` (`COD`; `SSLCOMMERZ` added in module 33), `paymentStatus` (`UNPAID`, `PAID`, `FAILED`, `REFUNDED`), `status` (`PENDING`, `CONFIRMED`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`), shipping address snapshot (JSON), shipping zone snapshot, customer note, admin note, `idempotencyKey` (unique), IP, user agent, `placedAt` and timestamps per status
  - `OrderItem`: product/variant ids (variant nullable on delete), product name, variant label ("Charcoal / M"), SKU, image URL, unit price, compare-at, quantity, line total
  - `OrderStatusHistory`: from, to, note, changed by (nullable = system), created at
- **`POST /orders`** (`optionalAuth`, `Idempotency-Key` header required). Body: items, currency, customer (name, phone, email optional), shipping address **or** saved `addressId` (logged in), payment method, note. In **one transaction**:
  1. Price lines with `cart.priceLines` (client prices are not accepted at all; strict schema)
  2. Quote shipping with `shipping.quoteShipping`
  3. Check payment rules: COD only for BDT and COD-enabled zones
  4. Decrement stock atomically per variant (`UPDATE … SET stock = stock - q WHERE id = … AND stock >= q`); if any row isn't updated → abort with `409 OUT_OF_STOCK` listing the variants
  5. Create order, items and the first history row (`PENDING`); clear the user's cart
  6. After commit: emit `order.placed`
- **Idempotency:** the same key returns the original order instead of creating a new one
- **Abuse limits:** guest orders rate limited per IP and per phone (e.g. 5 per hour)
- **Status machine:** allowed transitions only: PENDING → CONFIRMED | CANCELLED; CONFIRMED → PROCESSING | CANCELLED; PROCESSING → SHIPPED | CANCELLED; SHIPPED → DELIVERED. Cancelling restores stock (transaction). COD orders become `PAID` when DELIVERED
- **Customer endpoints:** `GET /orders` (own, paginated), `GET /orders/:orderNumber` (own), `POST /orders/:orderNumber/cancel` (only while PENDING)
- **Guest tracking:** `POST /orders/track` `{ orderNumber, phone }` → limited view (status, timeline, items, totals, masked address); rate limited; wrong combination returns a generic 404
- **Admin endpoints:** `GET /admin/orders` (filters: status, payment method/status, currency, date range; search by order number/phone/email; sort; pagination), `GET /admin/orders/:id`, `PATCH /admin/orders/:id/status` `{ status, note }`, `PATCH /admin/orders/:id/note`
- **Emails** (via events): order received (pending), confirmed, shipped, delivered, cancelled; new-order alert to `STORE_INBOX`
- `GET /orders/:orderNumber/allowed-transitions` (admin) so the UI only shows valid actions

## Not included

- Online payments (module 33), coupons and returns (post-MVP)

## Notes

- Use the strictest reasonable transaction isolation for placement, and keep the transaction short (no emails or HTTP calls inside it).
- Phone numbers are normalized with the shared schema from module 13 before comparing in tracking and rate limits.

## You'll learn

- Database transactions and race conditions
- Idempotency keys
- State machines for business workflows
- Why orders snapshot data instead of referencing it
