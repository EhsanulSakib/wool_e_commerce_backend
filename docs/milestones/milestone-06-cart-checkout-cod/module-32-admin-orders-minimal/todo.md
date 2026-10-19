# Module 32: Admin orders (minimal) · Todo

Branch: `feat/32-admin-orders-minimal` (frontend repo)

## 1. Layout

- [ ] `app/admin/layout.tsx`: role check, sidebar, top bar, `noindex`, Lenis disabled
- [ ] "No access" page for non-staff users
- [ ] `/admin/dashboard` placeholder with pending count card

## 2. Orders list

- [ ] `features/admin/orders/api.ts` (list, detail, allowed transitions, change status, note)
- [ ] `/admin/orders` page: status tabs, search, table, pagination (all in URL params)
- [ ] Table component with column config, loading skeleton, empty state

## 3. Order detail

- [ ] `/admin/orders/[id]`: customer (tel link), address, items, totals, payment, timeline, note editor
- [ ] Action buttons from allowed transitions; Cancel requires a reason; confirm dialogs
- [ ] Toasts and refresh after each action

## 4. Polling

- [ ] Pending count refreshed every 60 s (`setInterval` + `fetch` in a small client component; cleared on unmount)

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
