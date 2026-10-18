# Module 35: Reviews (backend) · QA

## Automated

- [ ] All tests from todo section 4 pass

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | User without a delivered order posts a review | `403 NOT_VERIFIED_BUYER` | ☐ |
| 2 | User with a delivered order posts 5 stars | `201`; product `ratingAvg` 5, `ratingCount` 1 | ☐ |
| 3 | Second user posts 3 stars | Average 4.0, count 2 | ☐ |
| 4 | First user posts again on the same product | `409` | ☐ |
| 5 | First user edits to 4 stars | Average 3.5 | ☐ |
| 6 | Admin hides the 3-star review | Average 4.0, count 1; hidden review not in the public list | ☐ |
| 7 | Summary endpoint | Correct count per star | ☐ |
| 8 | Body with HTML tags | Stored and returned as plain text | ☐ |
| 9 | `GET /users/me/reviewable` | Lists delivered, not-yet-reviewed products | ☐ |
| 10 | After a rating change | Backend logs a revalidation call for the product | ☐ |

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
