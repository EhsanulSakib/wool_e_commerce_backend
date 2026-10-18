# Module 33: Payments (backend) · QA

## Automated

- [ ] All mocked-gateway tests from todo section 8 pass

## Manual (sandbox; IPN on staging or through a tunnel)

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Place an SSLCOMMERZ order in BDT, call init | `GatewayPageURL` returned; Payment INITIATED | ☐ |
| 2 | Open the URL, pay with a sandbox method | Redirected to the frontend success URL; order PAID + CONFIRMED | ☐ |
| 3 | Check the `payments` row | `valId`, `bankTranId`, card type stored; payload saved with redactions | ☐ |
| 4 | IPN arrives after the success redirect | No second update; one email only | ☐ |
| 5 | Init for a USD order, pay with a test card | PAID in USD; amount matches | ☐ |
| 6 | Cancel on the gateway | Redirected to the cancelled URL; payment CANCELLED; order UNPAID | ☐ |
| 7 | Init again for the same order | New `tranId`; payment works | ☐ |
| 8 | POST a fake success with a random `val_id` | Validation fails; order unchanged | ☐ |
| 9 | Init without `paymentToken` as a guest | `401`/`403` | ☐ |
| 10 | Leave an order unpaid for 30+ minutes (or shorten the timeout) | Order CANCELLED, stock restored, email sent | ☐ |
| 11 | COD order flow | Still works exactly as before | ☐ |

## Non-functional

- [ ] Store password never logged; payloads redacted
- [ ] Gateway timeouts handled with a clear error to the user

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
