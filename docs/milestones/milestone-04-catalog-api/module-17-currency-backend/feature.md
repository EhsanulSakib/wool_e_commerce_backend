# Module 17: Currency (backend)

| | |
|---|---|
| Milestone | 04 Catalog & currency API |
| Repo | backend |
| Depends on | 03, 12 |
| Unblocks | 19, 21, 27, 28, 40 |

## Goal

Make currencies data instead of code. Taka is the base currency; USD is added at launch; any other currency can be added from the admin later. This module provides the currency table, exchange rates with history, rounding rules, and the money helpers every price-related module uses.

## Included

- **Currency model:** `code` (ISO 4217, primary key), `name`, `symbol`, `displayDecimals` (BDT 0, USD 2), `bdtPerUnit` (`numeric(18,6)`, "1 USD = 122.000000 BDT"; 1 for BDT), `roundingRule`, `isBase`, `isActive`, `sortOrder`, timestamps
- **Rounding rules** (enum): `NONE` (2 decimals), `NEAREST_1`, `NEAREST_10`, `END_99` (round to the nearest whole number, then subtract 0.01: 20.08 → 19.99, 20.60 → 20.99)
- **ExchangeRateHistory:** currency, old rate, new rate, changed by, changed at
- **Money helpers** (`shared/money.ts`): decimal arithmetic with `Prisma.Decimal` (never JS numbers for money), `convertFromBase(amountBdt, currency)`, `applyRounding(amount, rule)`, `toApiAmount()` (serialize as string or fixed number consistently)
- **Public endpoint:** `GET /currencies` (active currencies, long cache headers)
- **Admin endpoints:** `GET /admin/currencies`, `POST /admin/currencies`, `PATCH /admin/currencies/:code` (name, symbol, decimals, rounding, active, order), `PATCH /admin/currencies/:code/rate` (records history, emits `currency.rate_changed`), `GET /admin/currencies/:code/history`
- **Rules:** exactly one base currency (BDT); base can't be deactivated or have its rate changed; deactivating a currency is allowed only if it isn't the base
- **Seed:** BDT (base, ৳, 0 decimals, NEAREST_10) and USD ($, 2 decimals, END_99, current rate)

## Not included

- Recalculating product prices on rate change (module 19 listens to `currency.rate_changed`)
- Automatic daily rates from an API (post-MVP)

## Notes

- Decide one JSON format for money in API responses and use it everywhere. Recommendation: strings with fixed decimals (`"1890.00"`) so no precision is lost; the frontend formats them for display.
- The Taka symbol shown to customers comes from this table (ROADMAP open question 3).

## You'll learn

- Why money must never be a floating-point number
- Base vs display currencies, conversion and rounding strategies
- Keeping an audit trail of important changes
