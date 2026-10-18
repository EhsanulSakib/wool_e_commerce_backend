# Module 28: Shipping (backend) · Todo

Branch: `feat/28-shipping-backend` (backend repo)

## 1. Schema

- [ ] `ShippingZone`, `ShippingRate` models + migration

## 2. Logic

- [ ] `resolveZone(address)` pure function + unit tests (Dhaka, Gazipur, Chattogram, US, UK)
- [ ] `quoteShipping({ address, currency, subtotal })` using rates and thresholds
- [ ] Export from `shipping/index.ts`

## 3. Endpoints

- [ ] `GET /shipping/zones` (public, cache headers)
- [ ] `POST /shipping/quote` (public, validated)
- [ ] Admin CRUD for zones and rates; missing-rate warning in the response

## 4. Seed

- [ ] Three zones with rates in BDT and USD, COD flags, estimates

## 5. Events, docs, tests

- [ ] Emit `shipping.changed` on admin edits (for revalidation/caching)
- [ ] OpenAPI docs
- [ ] Tests: quote per zone, free delivery at exactly the threshold, missing rate error, COD rules per currency, admin-only CRUD

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
