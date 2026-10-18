# Milestone 06 QA: Cart, checkout & Cash on Delivery

Run this locally and then on staging after modules 27–32 have each passed their own `qa.md`.

## Entry criteria

- [ ] Modules 27–32 are ☑ in the ROADMAP master index
- [ ] Staging deployed and seeded

## Scenario 1: Guest COD order, full lifecycle

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | As a guest (Taka), add 2 different products to the cart | Fly-to-cart animation; badge shows 2; drawer shows correct prices | ☐ |
| 2 | Checkout: fill name, phone, email, Dhaka address | Delivery "Inside Dhaka" with its fee; COD available | ☐ |
| 3 | Place the order | Success page with order number; cart emptied | ☐ |
| 4 | Check email | "Order received — we'll call to confirm" email | ☐ |
| 5 | Check stock of both variants (product page) | Reduced by the ordered quantities | ☐ |
| 6 | Admin opens `/admin/orders` | New order under "Pending" | ☐ |
| 7 | Admin confirms | Status Confirmed; customer gets "Order confirmed" email | ☐ |
| 8 | Guest opens `/track-order` with order number + phone | Timeline shows Pending → Confirmed | ☐ |
| 9 | Admin: Processing → Shipped → Delivered | Emails for Shipped and Delivered; payment status becomes Paid | ☐ |
| 10 | Tracking page | Full timeline with dates | ☐ |

## Scenario 2: Logged-in customer

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | As a guest, add 1 item; then log in | Guest cart merged into the account cart | ☐ |
| 2 | Checkout with a saved address (Outside Dhaka) | Outside Dhaka fee; free delivery when subtotal crosses the threshold | ☐ |
| 3 | Place the order, open `/user/orders` | Order listed with a Pending pill | ☐ |
| 4 | Cancel it from the order detail | Status Cancelled; stock restored | ☐ |

## Scenario 3: Edge cases

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Two browsers buy the last unit at the same moment | One order succeeds, the other sees "out of stock" with the item highlighted | ☐ |
| 2 | Double-click "Place order" | Exactly one order created | ☐ |
| 3 | Send a crafted request with a lower price or a fake total | Order created with server prices (or request rejected); no tampering effect | ☐ |
| 4 | Switch to USD, go to checkout | COD hidden with a clear message; order can't be placed yet | ☐ |
| 5 | International address in Taka | COD not available; clear message | ☐ |
| 6 | 6 guest orders from the same phone within an hour | Rate limit message | ☐ |
| 7 | Admin tries to set Pending → Shipped | Not offered in UI; API returns `409` | ☐ |

## Cross-cutting checks

- [ ] **Totals:** for 5 random orders, `subtotal + shipping = total` and line totals match unit price × quantity in the order's currency
- [ ] **Mobile checkout:** completed at 360 px with only the on-screen keyboard
- [ ] **Accessibility:** axe 0 violations on cart drawer, cart page, checkout, success, tracking, admin orders
- [ ] **Performance:** Lighthouse mobile on cart and checkout ≥ 90 Performance
- [ ] **Security:** `/admin/orders` and admin order APIs blocked for customers; tracking requires the matching phone
- [ ] **Regression:** milestone 05 scenario 1 still passes

## Exit criteria

- [ ] All scenarios and checks pass, locally and on staging

## Sign-off

| Date | Tester | Result | Notes |
|---|---|---|---|
| | | | |
