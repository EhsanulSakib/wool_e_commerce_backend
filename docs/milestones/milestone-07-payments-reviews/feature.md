# Milestone 07: Online payments & reviews

| | |
|---|---|
| Repos | backend + frontend |
| Depends on | [06 Cart, checkout & COD](../milestone-06-cart-checkout-cod/feature.md) |
| Next milestone | [08 Admin dashboard](../milestone-08-admin-dashboard/feature.md) |

## Goal

Two features that build on orders. **Online payments:** SSLCommerz (sandbox) for Taka (bKash, Nagad, cards) and USD (cards), with server-side verification, IPN handling, retries and automatic cancellation of unpaid orders. This also unlocks USD checkout. **Reviews:** customers who received a product can rate and review it, and ratings appear on product pages, cards and in search results.

## When it's done

- A customer can pay online in Taka or USD in the SSLCommerz sandbox; paid orders are confirmed automatically.
- Fake or duplicated payment callbacks never mark an order as paid twice or wrongly.
- Unpaid online orders are cancelled after a timeout and their stock is released.
- Verified buyers can review products; ratings update on product pages and in structured data.

## Modules (build in this order)

| # | Module | Repo | Depends on | Summary |
|---|---|---|---|---|
| 33 | [Payments (backend)](module-33-payments-backend/feature.md) | backend | 29 | SSLCommerz init, callbacks, IPN, validation, idempotency, unpaid-order expiry |
| 34 | [Payments (frontend)](module-34-payments-frontend/feature.md) | frontend | 31, 33 | Payment option in checkout, redirect, result pages, retry |
| 35 | [Reviews (backend)](module-35-reviews-backend/feature.md) | backend | 20, 29 | Verified-purchase reviews, rating aggregates, admin moderation API |
| 36 | [Reviews (frontend)](module-36-reviews-frontend/feature.md) | frontend | 16, 23, 35 | Rating summary, review list, write-review modal, prompts, JSON-LD |

Payments (33 → 34) and reviews (35 → 36) don't depend on each other; build either pair first.

## Not in this milestone

- Direct bKash/Nagad integration, Stripe/PayPal, refunds through the gateway (post-MVP)
- Review photos and "helpful" votes (post-MVP)

## Open questions that affect this milestone

- **Online payment without login** (ROADMAP open question 5). Assumption: yes.
- **Paid orders skip admin confirmation** (open question 6). Assumption: yes.
- **Who can review** (open question 8). Assumption: verified buyers only, published immediately, admin can hide.
- SSLCommerz **live** credentials need a registered business; the portfolio can stay on sandbox.
