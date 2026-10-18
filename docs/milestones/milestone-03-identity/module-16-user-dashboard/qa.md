# Module 16: User dashboard · QA

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Logged out, open `/user/profile` | Redirected to login, then back after login | ☐ |
| 2 | Change name in profile | Navbar account menu shows the new name immediately | ☐ |
| 3 | Change password, then use a second browser session | Second session logged out | ☐ |
| 4 | Revoke one session from the list | That device is logged out on its next request | ☐ |
| 5 | Add a BD address: pick Chattogram division | District list shows only Chattogram's districts | ☐ |
| 6 | Add an international address | Country select; city/postal fields required | ☐ |
| 7 | Set another address as default | Badge moves instantly; survives reload | ☐ |
| 8 | Stop the backend, try set default | Change rolls back; error toast | ☐ |
| 9 | Delete an address | Confirmation modal; removed from the list | ☐ |
| 10 | Dashboard at 360 px | Navigation usable (tabs/bottom nav), cards stack | ☐ |
| 11 | Keyboard only through profile and address forms | All reachable; modal focus trapped | ☐ |

## Non-functional

- [ ] axe: 0 violations on all `/user` pages
- [ ] `noindex` present on every `/user` page

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
