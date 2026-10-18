# Module 17: Currency (backend) · QA

## Automated

- [ ] Rounding and conversion unit tests pass, including:

| Taka amount | Rate (BDT per USD) | Rule | Expected USD |
|---|---|---|---|
| 2,450 | 122 | END_99 | 19.99 (20.08 → 20 → 19.99) |
| 2,520 | 122 | END_99 | 20.99 (20.66 → 21 → 20.99) |
| 2,450 | 122 | NONE | 20.08 |
| 2,453 | 1 (BDT) | NEAREST_10 | 2,450 |

- [ ] Endpoint and rule tests from todo section 6 pass

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | `GET /currencies` | BDT and USD with symbol, decimals; cache headers present | ☐ |
| 2 | Admin creates EUR (inactive) | Created; not in the public list | ☐ |
| 3 | Activate EUR | Appears in the public list | ☐ |
| 4 | Change USD rate | `200`; history shows old → new with the admin's id | ☐ |
| 5 | Try to change BDT rate | `400 BASE_CURRENCY_RATE_FIXED` | ☐ |
| 6 | Try to deactivate BDT | `400` | ☐ |
| 7 | Customer token on any admin currency route | `403` | ☐ |

## Non-functional

- [ ] No `Number()`/`parseFloat()` on money values in the code (search the module)
- [ ] Money format in responses documented in `/docs`

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
