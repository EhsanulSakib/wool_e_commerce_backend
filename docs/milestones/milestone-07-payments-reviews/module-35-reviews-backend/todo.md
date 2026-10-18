# Module 35: Reviews (backend) · Todo

Branch: `feat/35-reviews-backend` (backend repo)

## 1. Schema

- [ ] `ReviewStatus` enum, `Review` model (unique product + user, indexes on product + status + createdAt) + migration

## 2. Logic

- [ ] `canReview(userId, productId)` → finds a DELIVERED order with the product
- [ ] `recalculateRating(productId, tx)` → average + count of PUBLISHED reviews
- [ ] Create/edit/delete/hide all call `recalculateRating` inside the transaction

## 3. Endpoints

- [ ] Public list + summary with sort, star filter, pagination
- [ ] Create (verified only, 409 on duplicate), edit and delete (author only)
- [ ] `GET /users/me/reviewable`
- [ ] Admin list + update (status, reply)

## 4. Events, docs, tests

- [ ] Emit `product.updated` after rating changes
- [ ] OpenAPI docs
- [ ] Tests: non-buyer 403; buyer creates; duplicate 409; edit own / not others'; summary distribution; hide removes from list and average; delete updates average; reviewable list correct

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
