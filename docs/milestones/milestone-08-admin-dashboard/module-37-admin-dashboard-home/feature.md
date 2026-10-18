# Module 37: Admin dashboard home

| | |
|---|---|
| Milestone | 08 Admin dashboard |
| Repo | both |
| Depends on | 29, 32 |
| Unblocks | 38, 39 |

## Goal

Give the admin an at-a-glance view of the business and build the shared admin components (data table, filters, stat cards, charts) that the other admin modules reuse. Charts are hand-built with SVG, in line with the project's "custom components" rule.

## Included

**Backend (`modules/stats`, ADMIN + STAFF)**
- `GET /admin/stats/overview?from=&to=`: revenue (converted to Taka using each order's exchange-rate snapshot), orders count, average order value, new customers, pending orders, comparison with the previous period
- `GET /admin/stats/sales-series?range=7d|30d|90d`: revenue and orders per day
- `GET /admin/stats/orders-by-status`
- `GET /admin/stats/top-products?limit=5`
- `GET /admin/stats/low-stock?threshold=5`
- Efficient SQL (`date_trunc`, grouping), index on orders (`placedAt`, `status`); only counts non-cancelled orders as revenue (document the definition)
- Test data generator: 10,000 orders over 6 months

**Frontend**
- `/admin/dashboard`: KPI `StatCard`s with trend vs the previous period, range selector, sales area/line chart, orders-by-status bar chart, top products, low-stock table, recent orders, "pending orders to confirm" call to action
- **Custom SVG charts** (`components/admin/charts`): linear/time scales, axes with nice ticks, responsive width (ResizeObserver), hover/focus tooltips, a visually hidden data table for screen readers
- **Shared admin components:** `DataTable` (column config, sorting, server pagination, row actions, column visibility, loading/empty states — generalized from module 32's table), `FilterBar`, `PageHeader`, `StatCard`, `ConfirmDialog`

## Not included

- Exportable reports (CSV of orders is in module 39; full reports post-MVP)

## Notes

- Revenue from USD orders is shown in Taka using the rate stored on each order, so historical numbers never change when today's rate changes.
- Keep chart code generic (data in, SVG out) so it can be reused for future reports.

## You'll learn

- SQL aggregation and time series
- Building charts from scratch: scales, axes, accessibility
- Designing reusable data tables
