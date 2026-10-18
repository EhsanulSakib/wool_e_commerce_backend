# Module 37: Admin dashboard home · Todo

Branch: `feat/37-admin-dashboard-home` (backend and frontend repos)

## 1. Backend stats

- [ ] `modules/stats` with repository using SQL aggregates
- [ ] Overview, sales series, orders by status, top products, low stock endpoints
- [ ] Revenue definition documented (which statuses count, Taka conversion via snapshot)
- [ ] Index review for `orders(placed_at, status)`
- [ ] Test data generator script (10,000 orders, mixed currencies and statuses)
- [ ] Tests comparing endpoint results with hand-calculated fixtures

## 2. Shared admin components (frontend)

- [ ] `DataTable` (generalize module 32's table)
- [ ] `FilterBar`, `PageHeader`, `StatCard` (value, label, trend arrow + %), `ConfirmDialog`

## 3. Charts (frontend)

- [ ] `scaleLinear`, `scaleTime`, `niceTicks` helpers (tested)
- [ ] `AreaChart`/`LineChart` with axes, tooltip on hover and keyboard focus, responsive width
- [ ] `BarChart`
- [ ] Hidden data table alternative for each chart

## 4. Dashboard page

- [ ] Range selector (7/30/90 days) in URL params
- [ ] KPI cards, sales chart, status chart, top products, low stock, recent orders, pending CTA
- [ ] Loading skeletons and empty states

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PRs merged, module marked ☑ in the ROADMAP master index
