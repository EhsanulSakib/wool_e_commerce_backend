# Module 32: Admin orders (minimal)

| | |
|---|---|
| Milestone | 06 Cart, checkout & COD |
| Repo | frontend |
| Depends on | 15, 29 |
| Unblocks | 37 |

## Goal

The first piece of the admin panel: a role-protected `/admin` layout and an orders page where staff confirm or cancel pending COD orders (usually after calling the customer) and move orders through the workflow. This completes the COD flow end to end; the full dashboard comes in milestone 08.

## Included

- **`/admin` layout:** server-side role check (ADMIN, STAFF), sidebar navigation (Dashboard, Orders; other items shown as "coming soon"), top bar with the account menu, `noindex`, Lenis disabled, compact spacing
- **`/admin/dashboard`:** placeholder with a "Pending orders: N" card linking to the filtered list
- **`/admin/orders`:** table (order number, date, customer, phone, total in its currency, payment method, status pill); status tabs (Pending, Confirmed, Processing, Shipped, Delivered, Cancelled); search by number/phone/email; server-side pagination via URL params
- **`/admin/orders/[id]`:** customer info with click-to-call phone link, shipping address, items, totals, payment info, status timeline, admin note; action buttons generated from the allowed transitions (Confirm, Cancel with reason, Mark processing, Mark shipped, Mark delivered); confirmation dialogs; toasts
- Pending count refreshes every 60 seconds (real-time notifications are post-MVP)

## Not included

- KPIs, charts, products, customers, settings (milestone 08)

## Notes

- Build the table so it becomes the reusable `DataTable` in module 37 (columns config, server pagination, empty/loading states).
- Status actions come from the API's allowed transitions, so the UI can never offer an invalid move.

## You'll learn

- Role-based layouts
- Data tables with server-side filtering and pagination
- UIs driven by a state machine
