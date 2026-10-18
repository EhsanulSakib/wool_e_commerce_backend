# Module 36: Reviews (frontend)

| | |
|---|---|
| Milestone | 07 Online payments & reviews |
| Repo | frontend |
| Depends on | 16, 23, 35 |
| Unblocks | Milestone 07 QA |

## Goal

Show reviews where they help shoppers decide, and make writing one easy for verified buyers.

## Included

- **Product page reviews section** (replaces the placeholder): average stars, count, per-star distribution bars (click to filter), sort (newest, highest, lowest), list with "Verified buyer" badge and admin replies, load more
- Rating summary near the product title links to the reviews section
- **Write-review modal:** `RatingInput` (from module 08), title, body with character counter; available only to eligible users; others see why they can't review
- **Prompts:** "Review your purchase" on delivered items in `/user/orders/[orderNumber]` and a reviewable list on `/user/dashboard`
- Edit/delete own review
- **Structured data:** `AggregateRating` (and a few `Review` entries) added to the product JSON-LD from module 24
- Product cards and listing already show rating from the API; check they update after revalidation

## Not included

- Review photos, helpful votes (post-MVP)

## Notes

- The reviews list can be a client component loaded after the main content so it doesn't slow down the product page's LCP; the summary (average/count) stays server-rendered for SEO.

## You'll learn

- Accessible star input
- Structured data for reviews
- Loading secondary content without hurting performance
