# Module 39: Admin operations UI · Todo

Branch: `feat/39-admin-operations-ui` (backend and frontend repos)

## 1. Backend

- [ ] `StoreSetting` model + migration; typed setting schemas; seed defaults from the current `site-config.ts`
- [ ] `GET /settings` (public, cache headers), `PATCH /admin/settings` (ADMIN), emit `settings.changed` (revalidation tag `settings`)
- [ ] `GET /admin/orders/export.csv` streaming with BOM
- [ ] Bulk status update endpoint
- [ ] Apply the permission matrix to every admin route
- [ ] Test: loop over all admin routes × (anonymous, CUSTOMER, STAFF, ADMIN) with expected status codes

## 2. Orders (frontend)

- [ ] Advanced filters + bulk status update with per-order results
- [ ] Invoice/packing slip page with print CSS
- [ ] CSV export button (uses current filters)

## 3. Customers, reviews, messages (frontend)

- [ ] `/admin/customers` list + detail (orders, addresses, lifetime value), ban/activate, role change (ADMIN)
- [ ] `/admin/reviews` moderation with reply
- [ ] `/admin/messages` with status changes

## 4. Settings (frontend, ADMIN)

- [ ] Store settings form
- [ ] Shipping zones and rates editor (per currency, COD toggle, estimates)
- [ ] Currencies: list, activate, edit, rate change with history and recalculation preview

## 5. Role-aware UI

- [ ] Sidebar filtered by role; "No access" page for direct visits
- [ ] Storefront reads contact info and announcement from `/settings`; remove hard-coded values from `site-config.ts`

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PRs merged, module marked ☑ in the ROADMAP master index
