# Module 41: Performance audit · QA

## Before / after (staging, mobile)

| Page | Perf before | Perf after | LCP before | LCP after | First-load JS before | First-load JS after |
|---|---|---|---|---|---|---|
| Home | | | | | | |
| Shop | | | | | | |
| Collection | | | | | | |
| Product | | | | | | |
| Cart | | | | | | |
| Checkout | | | | | | |

## Checks

| # | Check | Expected | ✓ |
|---|---|---|---|
| 1 | Open a PR that adds a large dependency to the home page | Lighthouse CI fails the PR | ☐ |
| 2 | Normal PR | Lighthouse CI passes and posts results | ☐ |
| 3 | Bundle analyzer on a storefront route | No admin, chart or Markdown editor code | ☐ |
| 4 | Network tab on a product page (mobile) | Only the main image loads eagerly; images sized to the viewport | ☐ |
| 5 | Real-user vitals | Data arriving from staging visits | ☐ |
| 6 | Slowest queries list after fixes | All under the target (e.g. < 50 ms) | ☐ |
| 7 | Animated pages at 4× CPU throttle | No visible jank | ☐ |

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
