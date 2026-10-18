# Module 21: Currency storefront

| | |
|---|---|
| Milestone | 05 Storefront catalog |
| Repo | frontend |
| Depends on | 09, 14, 17 |
| Unblocks | 22, 30 |

## Goal

Let shoppers choose their currency while keeping pages static and fast. The choice lives in a cookie; `proxy.ts` rewrites each request internally to a per-currency version of the page, so Taka and USD pages are cached separately and prices never flash or change after load.

## Included

- Move `(shop)` under `app/[currency]/` with `generateStaticParams` returning the active currencies (lowercase codes)
- **`proxy.ts`:** read the `currency` cookie (default `bdt`), validate it against the allowed list, rewrite `/shop` → `/usd/shop` internally; skip `/api`, `/_next`, static files, `/user`, `/admin` and auth pages; composed with module 15's auth functions
- Direct visits to `/usd/...` redirect to the clean URL (avoid duplicate URLs)
- **Currency data:** `/currencies` fetched on the server and cached; `CurrencyProvider` gives client components the current currency and its metadata
- **`formatPrice`** switched from the local map to API data
- **CurrencySwitcher** (navbar, mobile menu, footer): sets the cookie through a server action or route handler, then `router.refresh()`
- **Country prompt:** on hosting that provides a country header (e.g. `x-vercel-ip-country`), visitors outside BD without a currency cookie see a dismissible "Shopping from abroad? Switch to USD" prompt; dev override with `?country=US`
- **SEO:** no cookie → Taka, so crawlers always see the same prices; canonical URLs don't include the currency

## Not included

- Prices in the cart and checkout (modules 30, 31)
- Market-specific URLs like `/us` (post-MVP)

## Notes

- Why not just switch prices on the client? The server HTML would show Taka and then flip to USD after hydration (a visible flash, a layout shift and wrong prices for a moment). The rewrite gives each currency its own cached HTML.
- Keep the list of allowed currencies in sync with the API (fetched at build time and revalidated).

## You'll learn

- Rewrites in `proxy.ts` and how they differ from redirects
- Using a dynamic segment as a cache key
- Cookies in the App Router (server actions, route handlers)
- Personalization without losing static rendering
