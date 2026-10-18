# Module 32: Admin orders (minimal) · QA

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Customer opens `/admin/orders` | "No access" page or redirect | ☐ |
| 2 | Staff opens `/admin/orders` | Pending tab with new orders | ☐ |
| 3 | Search by customer phone | Matching orders only | ☐ |
| 4 | Page 2 of results, reload | Same page and filters (URL params) | ☐ |
| 5 | Open a pending order | Only Confirm and Cancel buttons shown | ☐ |
| 6 | Confirm | Status Confirmed; timeline updated; customer email sent | ☐ |
| 7 | Mark processing → shipped → delivered | Each step updates; payment shows Paid at the end | ☐ |
| 8 | Cancel an order without a reason | Dialog requires a reason | ☐ |
| 9 | Cancel with a reason | Cancelled; stock restored (check product page) | ☐ |
| 10 | Add an admin note, reload | Note kept | ☐ |
| 11 | Place a new guest order, wait up to 60 s on the dashboard | Pending count increases | ☐ |
| 12 | Tablet width (768 px) | Table usable (horizontal scroll inside the table only) | ☐ |

## Non-functional

- [ ] `noindex` on all admin pages
- [ ] axe: 0 violations on list and detail

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
