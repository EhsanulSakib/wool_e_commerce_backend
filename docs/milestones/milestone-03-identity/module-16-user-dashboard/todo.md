# Module 16: User dashboard · Todo

Branch: `feat/16-user-dashboard` (frontend repo)

## 1. Layout

- [ ] `app/user/layout.tsx`: server auth check, sidebar (desktop), tabs/bottom nav (mobile), `noindex`
- [ ] Active link styling; page titles

## 2. Dashboard

- [ ] `/user/dashboard`: greeting, stats cards (placeholder data for orders), default address, shortcuts

## 3. Profile and security

- [ ] `/user/profile` profile form (name, phone) with optimistic update of the current user in `authSlice`
- [ ] Change password form (current, new, confirm) with success toast and session note
- [ ] Sessions list (device, IP, last used, current badge), revoke one, revoke all others

## 4. Addresses

- [ ] `features/addresses/api.ts` (fetch calls) + `addressesSlice` with thunks
- [ ] `AddressCard` (default badge, edit, delete, set default)
- [ ] `AddressForm` (BD and international variants, division → district cascade, phone validation); works in a modal and inline
- [ ] Add/edit modal, delete confirmation modal
- [ ] Optimistic set-default and delete with rollback on error
- [ ] Empty state

## 5. Placeholders

- [ ] `/user/orders` and `/user/wishlist` with "coming soon" empty states

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
