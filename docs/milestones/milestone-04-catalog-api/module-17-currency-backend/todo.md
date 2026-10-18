# Module 17: Currency (backend) · Todo

Branch: `feat/17-currency-backend` (backend repo)

## 1. Schema

- [ ] `RoundingRule` enum
- [ ] `Currency` model (`code` as id), `ExchangeRateHistory` model
- [ ] Migration + partial unique index (or check in service) for a single base currency

## 2. Money helpers

- [ ] `shared/money.ts`: `add`, `multiply`, `convertFromBase`, `applyRounding`, `toApiAmount`
- [ ] Decide and document the API money format
- [ ] Unit tests for every rounding rule and conversion edge case (0, very small, very large, exact .99)

## 3. Module `currency`

- [ ] Repository + service (`listActive`, `getByCode`, `create`, `update`, `changeRate`)
- [ ] `changeRate` in a transaction: update rate, insert history, then emit `currency.rate_changed` after commit
- [ ] Business rules: single base, base rate fixed at 1, base can't be deactivated
- [ ] Public `index.ts` exports for other modules (`getActiveCurrencies`, `convertFromBase`)

## 4. Endpoints

- [ ] `GET /currencies` with `Cache-Control: public, s-maxage=300, stale-while-revalidate=3600`
- [ ] Admin CRUD + rate change + history (ADMIN only)
- [ ] OpenAPI docs

## 5. Seed

- [ ] BDT and USD (upsert)

## 6. Tests

- [ ] Public list returns only active currencies
- [ ] Customer can't change rates (`403`)
- [ ] Base currency protections
- [ ] Rate change creates history and emits the event (spy on the event bus)

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
