# Module 30: Cart & wishlist (frontend) · QA

## Automated

- [ ] Store and hook tests pass

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Guest adds an item from the product page | Image flies to the cart; badge bumps; drawer optional/opens | ☐ |
| 2 | Reload | Cart kept | ☐ |
| 3 | Compare drawer prices with the API quote | Identical | ☐ |
| 4 | Switch currency | Cart re-priced in the new currency | ☐ |
| 5 | Increase quantity beyond stock | Stops at stock; message shown | ☐ |
| 6 | Remove a line, click Undo | Line restored | ☐ |
| 7 | Open a second tab, change the cart in the first | Second tab updates | ☐ |
| 8 | Log in with a guest cart | Items merged into the account; local storage cleared | ☐ |
| 9 | Logged in: go offline (DevTools), change quantity | Optimistic change rolls back; error toast | ☐ |
| 10 | Free-delivery bar near the threshold | Shows remaining amount; full bar when reached | ☐ |
| 11 | Guest taps the heart | Login modal | ☐ |
| 12 | Logged in: heart a product, open `/user/wishlist`, move to cart | Works; heart state consistent everywhere | ☐ |
| 13 | Reduced motion on, add to cart | No flying animation; badge updates | ☐ |
| 14 | Drawer with keyboard | Focus trapped; Escape closes; stepper usable | ☐ |

## Non-functional

- [ ] Fly-to-cart smooth at 4× CPU throttle
- [ ] Lighthouse mobile `/cart` ≥ 90 Performance
- [ ] axe: 0 violations with the drawer open

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
