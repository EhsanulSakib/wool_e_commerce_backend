# Module 16: User dashboard

| | |
|---|---|
| Milestone | 03 Identity |
| Repo | frontend |
| Depends on | 13, 15 |
| Unblocks | 31, 36 |

## Goal

Give customers their own area at `/user/dashboard` with profile, security and address management. Orders and wishlist pages get placeholders now and are filled in by later modules.

## Included

- **`/user` layout:** sidebar on desktop, horizontal tabs or bottom navigation on mobile; `noindex`; server-side auth check; Lenis allowed but simpler animations
- **`/user/dashboard`:** greeting, quick stats (orders count — placeholder until module 31), default address card, shortcuts
- **`/user/profile`:** edit name and phone; change password (with a note that other devices get logged out); active sessions list with "log out this device" and "log out everywhere"
- **`/user/addresses`:** address cards with default badge; add/edit in a modal; Bangladesh form with division → district cascading selects (from `/locations/bd`); international form variant (country select); set default; delete with confirmation
- Optimistic updates and cache invalidation with TanStack Query
- Empty states with friendly copy
- **Placeholders:** `/user/orders` (module 31), `/user/wishlist` (module 30)

## Not included

- Orders and wishlist content (modules 30, 31)

## Notes

- Reuse the address form component later in checkout (module 31); build it so it works inside a modal and inline.
- Phone inputs use `type="tel"` and `autocomplete="tel"`; show the `+880` hint for BD.

## You'll learn

- Protected layouts and nested navigation
- Cascading form fields
- Optimistic updates and rolling back on error
