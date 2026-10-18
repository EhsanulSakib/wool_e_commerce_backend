# Milestone 07 QA: Online payments & reviews

Run this on staging (IPN needs a public URL) after modules 33–36 have each passed their own `qa.md`.

## Entry criteria

- [ ] Modules 33–36 are ☑ in the ROADMAP master index
- [ ] Staging deployed with SSLCommerz sandbox credentials

## Scenario 1: Taka payment with bKash (sandbox)

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Guest checkout in Taka, choose online payment | Redirect to the SSLCommerz sandbox page | ☐ |
| 2 | Pay with the sandbox bKash option | Back on the success page; order Confirmed + Paid | ☐ |
| 3 | Check email and `/track-order` | Payment received email; timeline shows Pending → Confirmed (system) | ☐ |
| 4 | Admin order detail | Payment record with transaction ids; status Confirmed | ☐ |

## Scenario 2: USD card payment

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Switch to USD, international address, checkout | Only online card payment offered | ☐ |
| 2 | Pay with a sandbox test card | Order Paid in USD; amounts correct | ☐ |

## Scenario 3: Failure and recovery

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Cancel on the gateway page | Cancelled page with a Retry button; order Unpaid | ☐ |
| 2 | Retry and pay | Order Paid; one successful payment record | ☐ |
| 3 | Start a payment and abandon it; wait past the timeout | Order auto-cancelled; stock restored; email sent | ☐ |
| 4 | Replay the success callback (curl) with a made-up `val_id` | Rejected; order unchanged | ☐ |

## Scenario 4: Reviews

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Logged-in customer with a delivered order opens `/user/orders` | "Review this product" prompt | ☐ |
| 2 | Write a 4-star review | Appears on the product page; rating summary and card rating update | ☐ |
| 3 | Customer without a purchase opens the product page | "Only verified buyers can review" | ☐ |
| 4 | Admin hides the review via the API | Removed from page and averages | ☐ |
| 5 | Rich Results Test on the product page | Product with aggregateRating valid | ☐ |

## Cross-cutting checks

- [ ] **Payment integrity:** amount and currency mismatch from the gateway → payment marked failed, order not paid
- [ ] **Idempotency:** success redirect + IPN for the same transaction → one update, one email
- [ ] **COD regression:** milestone 06 scenario 1 still passes
- [ ] **Accessibility:** payment result pages and review modal pass axe
- [ ] **Performance:** product page with reviews still ≥ 90 mobile Lighthouse

## Exit criteria

- [ ] All scenarios and checks pass on staging

## Sign-off

| Date | Tester | Result | Notes |
|---|---|---|---|
| | | | |
