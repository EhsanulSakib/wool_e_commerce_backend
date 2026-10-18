# Module 21: Currency storefront · Todo

Branch: `feat/21-currency-storefront` (frontend repo)

## 1. Routing

- [ ] Move `app/(shop)` to `app/[currency]/(shop)`
- [ ] `generateStaticParams` in `[currency]/layout.tsx` from active currencies
- [ ] Unknown currency param → `notFound()`

## 2. Proxy

- [ ] `lib/currency/server.ts`: allowed currencies, `getCurrencyFromCookie()`
- [ ] `proxy.ts`: `rewriteCurrency` function composed with the auth functions from module 15
- [ ] Matcher excludes `/api`, `/_next`, static assets, `/user`, `/admin`, auth routes
- [ ] Redirect direct `/bdt/...` or `/usd/...` visits to the clean URL

## 3. Data and formatting

- [ ] Server fetch of `/currencies` with caching
- [ ] `CurrencyProvider` + `useCurrency()`
- [ ] `formatPrice` uses API metadata (symbol, decimals)

## 4. Switcher

- [ ] Server action (or route handler) `setCurrency(code)`: validate, set cookie (1 year, `SameSite=Lax`)
- [ ] Wire `CurrencySwitcher` in navbar, mobile menu, footer; `router.refresh()` after change
- [ ] Show current currency symbol in the navbar

## 5. Country prompt

- [ ] Read the country header on the server (with `?country=` override in development)
- [ ] `CurrencyPrompt` banner/toast for non-BD visitors without a cookie; dismiss stored in a cookie

## 6. Verify

- [ ] `npm run build` output shows prerendered pages for each currency
- [ ] Update home page product prices to come from the currency context

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
