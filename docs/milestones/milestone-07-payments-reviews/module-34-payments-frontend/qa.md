# Module 34: Payments (frontend) · QA

## Manual (sandbox)

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Taka checkout | Both COD and Pay online offered | ☐ |
| 2 | USD checkout | Only Pay online (cards) | ☐ |
| 3 | Pay online, complete payment | Success page with order summary and Paid status | ☐ |
| 4 | Open the success URL for an unpaid order manually | Page shows the real status (not "success") | ☐ |
| 5 | Cancel on the gateway | Cancelled page; Try again works | ☐ |
| 6 | Fail on the gateway, choose Switch to COD (Taka) | Order becomes COD Pending | ☐ |
| 7 | Press Back from the gateway page | Lands on a page showing the current order state; nothing re-submitted | ☐ |
| 8 | Refresh the success page | Still correct; no duplicate actions | ☐ |
| 9 | `/user/orders` for an unpaid online order | "Pay now" visible within the window | ☐ |
| 10 | Full flow on a phone (360 px) | Smooth; overlay readable; result pages clear | ☐ |

## Non-functional

- [ ] Result pages pass axe with 0 violations
- [ ] No sensitive data in URLs beyond the order number

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
