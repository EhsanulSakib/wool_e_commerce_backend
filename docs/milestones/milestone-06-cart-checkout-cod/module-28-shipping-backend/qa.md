# Module 28: Shipping (backend) · QA

## Automated

- [ ] `resolveZone` and quote tests pass

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Quote: BD, Dhaka, BDT, subtotal 2,000 | Inside Dhaka, fee ৳70, COD available, ৳1,000 to free delivery | ☐ |
| 2 | Same with subtotal 3,000 | Fee 0, free delivery applied | ☐ |
| 3 | Quote: BD, Sylhet, BDT, 2,000 | Outside Dhaka, ৳130 | ☐ |
| 4 | Quote: US, USD, 120 | International, $25, COD not available | ☐ |
| 5 | Quote: BD, Dhaka, USD | Fee in USD (if a rate exists); COD not available (USD) | ☐ |
| 6 | Admin deletes the USD rate of Outside Dhaka, quotes in USD | Clear error `SHIPPING_RATE_MISSING` | ☐ |
| 7 | Customer calls admin zone endpoints | `403` | ☐ |
| 8 | `GET /shipping/zones` | All active zones with rates and estimates; cache headers | ☐ |

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
