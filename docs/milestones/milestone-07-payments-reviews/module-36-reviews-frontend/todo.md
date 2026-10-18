# Module 36: Reviews (frontend) · Todo

Branch: `feat/36-reviews-frontend` (frontend repo)

## 1. Data

- [ ] Regenerate API types
- [ ] `features/reviews/api.ts`: list + summary, create, update, delete, reviewable

## 2. Product page

- [ ] `ReviewSummary` (server-rendered average, count, distribution)
- [ ] `ReviewList` (client): sort, star filter from distribution bars, load more, verified badge, admin reply
- [ ] Rating near the title linking to `#reviews`

## 3. Writing

- [ ] `WriteReviewModal` with `RatingInput`, title, body + counter, validation, success toast
- [ ] Eligibility: logged out → login prompt; not a buyer → explanation; already reviewed → edit
- [ ] Edit/delete own review

## 4. Prompts

- [ ] "Review this product" on delivered items in order detail
- [ ] Reviewable products card on `/user/dashboard`

## 5. SEO

- [ ] Add `aggregateRating` (+ up to 5 `review` items) to the product JSON-LD when count > 0

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
