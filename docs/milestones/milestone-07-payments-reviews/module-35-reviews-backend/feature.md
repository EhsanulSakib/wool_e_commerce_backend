# Module 35: Reviews (backend)

| | |
|---|---|
| Milestone | 07 Online payments & reviews |
| Repo | backend |
| Depends on | 20, 29 |
| Unblocks | 36, 39 |

## Goal

Trustworthy product reviews: only customers who received the product can review it, ratings are aggregated onto the product for fast display, and admins can hide or reply to reviews.

## Included

- **Review model:** product, user, order (the delivered order that proves the purchase), rating 1–5, title, body, `status` (`PUBLISHED`, `HIDDEN`), `adminReply`, timestamps; unique (product, user)
- **Rules** (ROADMAP open question 8): logged-in users with a DELIVERED order containing the product can review; published immediately; one review per product per user; editable by the author
- **Endpoints:**
  - `GET /products/:slug/reviews?sort=newest|highest|lowest&rating=&page=` (published only) + `summary` (average, count, count per star)
  - `POST /products/:slug/reviews`, `PATCH /reviews/:id`, `DELETE /reviews/:id` (author only)
  - `GET /users/me/reviewable` (delivered products not yet reviewed, for prompts)
  - Admin: `GET /admin/reviews` (filter by status, rating, product), `PATCH /admin/reviews/:id` (`status`, `adminReply`)
- **Aggregates:** `Product.ratingAvg` and `ratingCount` recalculated in the same transaction whenever a review is created, edited, hidden or deleted
- **Events:** `product.updated` after aggregate changes (page revalidation and cache)
- Text limits (title 100, body 2,000), whitespace trimming, rate limit on creation; text stored as plain text

## Not included

- Review photos, helpful votes, review request emails (post-MVP)

## Notes

- Storing the average on the product (denormalization) keeps listing queries fast; the price is keeping it correct, which is why it's updated inside the same transaction.

## You'll learn

- Denormalization and keeping aggregates consistent
- Business-rule authorization (verified purchase)
- Moderation workflows
