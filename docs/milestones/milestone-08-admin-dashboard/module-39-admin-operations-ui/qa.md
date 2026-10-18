# Module 39: Admin operations UI · QA

## Automated

- [ ] Route × role permission test passes for every admin route

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Filter orders by last 7 days + online payment + USD | Correct results | ☐ |
| 2 | Bulk-confirm 3 pending orders (one already cancelled) | 2 confirmed, 1 reported as invalid | ☐ |
| 3 | Print an invoice (Print preview, A4) | Clean layout, no navigation, all totals | ☐ |
| 4 | Export CSV, open in Excel | Columns correct; ৳ and $ display correctly | ☐ |
| 5 | Customer detail | Orders, addresses, lifetime value in Taka | ☐ |
| 6 | STAFF tries to change a customer's role | Not offered; API `403` | ☐ |
| 7 | Hide a review and reply to another | Storefront reflects both | ☐ |
| 8 | Mark a contact message as read/replied | Status updates; filter works | ☐ |
| 9 | Change WhatsApp number and announcement text | Storefront floating button and bar update after revalidation | ☐ |
| 10 | Edit the Inside Dhaka fee and free-delivery threshold | Checkout quote and cart progress bar use the new values | ☐ |
| 11 | Change USD rate in the currencies screen | Preview shows how many auto prices change; history row added | ☐ |
| 12 | STAFF opens `/admin/settings/currencies` | "No access" | ☐ |

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
