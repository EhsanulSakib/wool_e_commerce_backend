# Module 37: Admin dashboard home · QA

## Automated

- [ ] Stats endpoint tests against fixtures pass
- [ ] Scale/tick helper tests pass

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Generate 10,000 test orders, open the dashboard | Loads in < 1 s locally | ☐ |
| 2 | Compare "Revenue (30 days)" with a manual SQL query | Same number | ☐ |
| 3 | Include a USD order and change today's USD rate | Historical revenue unchanged | ☐ |
| 4 | Switch range 7 → 30 → 90 days | KPIs, trends and chart update; URL keeps the range | ☐ |
| 5 | Hover and keyboard-focus chart points | Tooltip with date and value | ☐ |
| 6 | Screen reader on the chart | Data table alternative available | ☐ |
| 7 | Low-stock table | Lists variants at or below the threshold | ☐ |
| 8 | Click the pending orders CTA | Opens `/admin/orders` filtered to Pending | ☐ |
| 9 | Resize the window | Charts redraw to fit; no overflow | ☐ |
| 10 | Dark mode | Charts and cards readable | ☐ |

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
