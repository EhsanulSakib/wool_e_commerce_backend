# Module 22: Product listing · QA

## Automated

- [ ] `parseFilters` / `serializeFilters` round-trip tests pass

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Apply color + size + price filters on `/shop` | URL updates; results match; count updates | ☐ |
| 2 | Press browser Back | Previous filter state and results restored | ☐ |
| 3 | Copy the URL into a new tab | Same results | ☐ |
| 4 | Mobile: open filters, choose, Apply | Drawer closes; results update | ☐ |
| 5 | Price slider with keyboard (arrows, PageUp/PageDown) | Values change; screen reader reads them | ☐ |
| 6 | Remove a filter pill; Clear all | Results update accordingly | ☐ |
| 7 | Filter combination with no results | Empty state with "clear filters" action | ☐ |
| 8 | Load more | Next items appended; no scroll jump; URL `page` updated | ☐ |
| 9 | View source of `/shop?page=2` | Page 2 products in the HTML | ☐ |
| 10 | Slow 3G throttle, change a filter | Skeleton/pending state shown, no frozen UI | ☐ |
| 11 | Search overlay: type "card" | Cardigans appear within ~300 ms | ☐ |
| 12 | Overlay keyboard: ↓ ↓ Enter, then Escape | Navigates to the product; Escape closes | ☐ |
| 13 | Unknown collection slug | 404 page | ☐ |
| 14 | Switch currency on a filtered page | Prices and price filter in the new currency | ☐ |

## Non-functional

- [ ] Lighthouse mobile `/shop` ≥ 90 Performance; CLS < 0.1 as images load
- [ ] Grid animation smooth at 4× CPU throttle
- [ ] axe: 0 violations with the filter drawer and search overlay open

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
