# Module 29: Orders (backend) · QA

## Automated

- [ ] All tests from todo section 7 pass, including the concurrency test (run it 10 times; never two successes)

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Guest `POST /orders` (BDT, Dhaka, COD) | `201`, status PENDING, totals = items + Inside Dhaka fee | ☐ |
| 2 | Same request with the same `Idempotency-Key` | Same order returned; no second order | ☐ |
| 3 | Request without `Idempotency-Key` | `400` | ☐ |
| 4 | Add `"price": 1` to an item | `400` (unknown key) | ☐ |
| 5 | Order more than the stock | `409 OUT_OF_STOCK` naming the variant; stock unchanged | ☐ |
| 6 | USD + COD | `400 PAYMENT_METHOD_NOT_AVAILABLE` | ☐ |
| 7 | Emails in Mailpit | Customer "received" email + store alert | ☐ |
| 8 | Order numbers of 3 consecutive orders | Unique and increasing | ☐ |
| 9 | Admin PENDING → SHIPPED | `409 INVALID_TRANSITION` | ☐ |
| 10 | Admin PENDING → CONFIRMED → PROCESSING → SHIPPED → DELIVERED | History rows for each; emails; payment PAID at delivered | ☐ |
| 11 | Customer cancels a CONFIRMED order | `409` (only PENDING can be cancelled by customers) | ☐ |
| 12 | Admin cancels a PROCESSING order | Stock restored | ☐ |
| 13 | Track with correct and wrong phone | Correct → limited view with masked address; wrong → generic `404` | ☐ |
| 14 | Admin list: filter Pending, search by phone | Correct results | ☐ |

## Non-functional

- [ ] No email or HTTP call happens inside the placement transaction (code review)
- [ ] Placement completes in < 300 ms locally

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
