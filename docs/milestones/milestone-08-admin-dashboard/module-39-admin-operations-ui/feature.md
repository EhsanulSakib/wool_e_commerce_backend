# Module 39: Admin operations UI

| | |
|---|---|
| Milestone | 08 Admin dashboard |
| Repo | both |
| Depends on | 25, 28, 35, 37 |
| Unblocks | Milestone 08 QA |

## Goal

Everything else an admin needs day to day: complete order management (including invoices and CSV export), customers, review moderation, contact messages, and store settings (currencies, exchange rates, shipping, announcement bar, contact details), with STAFF/ADMIN permissions enforced everywhere.

## Included

**Backend**
- `StoreSetting` table (key/value with typed Zod schemas): announcement text, WhatsApp number, Messenger link, phone, email, address, social links, business hours; `GET /settings` (public, cached) and `PATCH /admin/settings` (ADMIN); emits `settings.changed` → revalidation
- `GET /admin/orders/export.csv?filters…` streaming CSV (UTF-8 with BOM so Excel shows ৳ correctly)
- Bulk order status update endpoint (validates each transition)
- Permission matrix (see milestone feature.md) applied with `authorize()` on every admin route; tests that loop over routes × roles

**Frontend**
- **Orders (full):** filters (date range, payment method/status, currency), bulk status update, printable invoice/packing slip page (print CSS, A4), CSV export button, timeline with notes
- **Customers:** `/admin/customers` list (search, status filter), detail (profile, addresses, orders, lifetime value in Taka), ban/activate, role change (ADMIN only)
- **Reviews:** `/admin/reviews` list by status/rating, hide/publish, reply
- **Messages:** `/admin/messages` (contact form) with status changes and a mailto reply link
- **Settings (ADMIN only):** `/admin/settings/store` (store settings form), `/admin/settings/shipping` (zones and per-currency rates editor), `/admin/settings/currencies` (currencies, rate change with history and "N auto prices will be recalculated" preview)
- Sidebar items and actions hidden based on role; direct visits show "No access"
- Storefront switches from `site-config.ts` to `/settings` for contact info and announcement text

## Not included

- Audit log, custom roles (post-MVP)

## Notes

- UI hiding is for convenience; the API is the real gate. The route × role test is the proof.

## You'll learn

- Admin UX patterns for operations work
- Streaming CSV responses
- Print stylesheets
- Permission matrices
