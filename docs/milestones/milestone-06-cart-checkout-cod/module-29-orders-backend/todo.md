# Module 29: Orders (backend) · Todo

Branch: `feat/29-orders-backend` (backend repo)

## 1. Schema

- [ ] Enums: `OrderStatus`, `PaymentStatus`, `PaymentMethod`
- [ ] `Order`, `OrderItem`, `OrderStatusHistory` models; indexes on `userId`, `status`, `placedAt`, `customerPhone`
- [ ] Postgres sequence for order numbers + formatter (`WL-` + year digits + padded number)
- [ ] Migration `orders`

## 2. Placement

- [ ] Zod schema (strict: unknown keys like `price` rejected)
- [ ] `Idempotency-Key` header required; lookup existing order by key first
- [ ] Transaction: price lines → shipping quote → payment rules → atomic stock decrement → create order/items/history → clear cart
- [ ] `409 OUT_OF_STOCK` with variant details when a decrement fails
- [ ] Emit `order.placed` after commit
- [ ] Guest rate limits per IP and per normalized phone

## 3. Status workflow

- [ ] `transitions.ts` with the allowed map + `canTransition()` (unit tested)
- [ ] `changeStatus(orderId, to, actor, note)`: validate, update timestamps, history row, stock restore on cancel, COD → PAID on delivered; emit `order.status_changed`

## 4. Customer and guest endpoints

- [ ] `GET /orders`, `GET /orders/:orderNumber` (own only)
- [ ] `POST /orders/:orderNumber/cancel` (PENDING only)
- [ ] `POST /orders/track` (number + phone; masked address; rate limited)

## 5. Admin endpoints

- [ ] `GET /admin/orders` with filters, search, sort, pagination
- [ ] `GET /admin/orders/:id`, `GET …/allowed-transitions`
- [ ] `PATCH /admin/orders/:id/status`, `PATCH /admin/orders/:id/note`

## 6. Emails

- [ ] Templates: received, confirmed, shipped, delivered, cancelled, admin new-order alert
- [ ] Handlers for `order.placed` and `order.status_changed` (skip customer email when no email given)

## 7. Docs and tests

- [ ] OpenAPI docs with all error codes
- [ ] Tests: guest COD happy path; logged-in with saved address; idempotent retry; concurrent last-unit race (two parallel requests → one 201, one 409); price fields rejected; USD + COD rejected; international + COD rejected; invalid transition 409; cancel restores stock; delivered COD → PAID; tracking with wrong phone 404; rate limit

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
