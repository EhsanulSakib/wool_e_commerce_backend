# Module 31: Checkout (frontend) · QA

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Guest checkout with a Dhaka address | Inside Dhaka fee; COD available; total = summary | ☐ |
| 2 | Change district to Sylhet | Fee and total update to Outside Dhaka | ☐ |
| 3 | Place the order | Success page with order number and animation; cart empty | ☐ |
| 4 | Double-click Place order (fresh checkout) | One order only | ☐ |
| 5 | Empty cart, open `/checkout` | Redirected to `/cart` | ☐ |
| 6 | Make an item go out of stock (admin) before placing | Clear message naming the item; option to update the cart | ☐ |
| 7 | Switch to USD | COD unavailable with an explanation; Place order disabled | ☐ |
| 8 | International address in Taka | COD unavailable with an explanation | ☐ |
| 9 | Go offline, place order | Error message; form data kept; works after going online | ☐ |
| 10 | Logged in: pick a saved address | Address used; quote correct | ☐ |
| 11 | `/track-order` with number + phone | Timeline shows Pending | ☐ |
| 12 | `/user/orders` → detail → Cancel | Confirmation modal; status Cancelled | ☐ |
| 13 | Complete checkout at 360 px with the on-screen keyboard | Correct keyboards (tel, email); sticky total visible; no overflow | ☐ |
| 14 | Browser autofill for name/phone/address | Fields fill correctly | ☐ |
| 15 | Submit with errors using a screen reader | Errors announced and focus moves to the first error | ☐ |

## Non-functional

- [ ] Lighthouse mobile `/checkout` ≥ 90 Performance, 100 Accessibility
- [ ] `noindex` on checkout, success and tracking pages

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
