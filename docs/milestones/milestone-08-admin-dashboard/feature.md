# Milestone 08: Admin dashboard

| | |
|---|---|
| Repos | backend + frontend |
| Depends on | [06 Cart, checkout & COD](../milestone-06-cart-checkout-cod/feature.md), [07 Online payments & reviews](../milestone-07-payments-reviews/feature.md) |
| Next milestone | [09 Hardening & launch](../milestone-09-hardening-launch/feature.md) |

## Goal

Run the whole store from `/admin` without touching the API docs: see how the business is doing, manage products (with variant matrices, per-currency prices and image uploads), handle orders end to end, manage customers and reviews, and change store settings like currencies, exchange rates, shipping fees and the announcement bar.

## When it's done

- `/admin/dashboard` shows sales, orders and stock health with custom charts.
- A new product can be created, priced in Taka and USD, illustrated and published entirely from the UI.
- Orders, customers, reviews, contact messages, shipping, currencies and store settings are all manageable from the UI.
- STAFF and ADMIN permissions are enforced in both the UI and the API.

## Modules (build in this order)

| # | Module | Repo | Depends on | Summary |
|---|---|---|---|---|
| 37 | [Admin dashboard home](module-37-admin-dashboard-home/feature.md) | both | 29, 32 | Stats endpoints, KPI cards, custom SVG charts, reusable admin components |
| 38 | [Admin catalog UI](module-38-admin-catalog-ui/feature.md) | frontend | 18, 19, 37 | Products, variant matrix, prices, image upload, categories, attributes |
| 39 | [Admin operations UI](module-39-admin-operations-ui/feature.md) | both | 25, 28, 35, 37 | Full order management, customers, reviews, messages, settings, permissions |

38 and 39 both build on 37's shared components and can be done in either order.

## Not in this milestone

- Audit log, fine-grained custom roles, CSV import, real-time notifications (post-MVP)

## Permission matrix (enforced in module 39)

| Area | STAFF | ADMIN |
|---|---|---|
| Dashboard | view | view |
| Orders | manage | manage |
| Products, categories, attributes | manage | manage |
| Reviews, contact messages | manage | manage |
| Customers | view | manage (ban, role) |
| Currencies, exchange rates, shipping, store settings | — | manage |
