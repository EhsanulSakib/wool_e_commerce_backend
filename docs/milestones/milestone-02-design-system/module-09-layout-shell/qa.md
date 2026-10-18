# Module 09: Layout shell · QA

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Check the layout at 360, 390, 768, 1024, 1280, 1536 px | No overflow; navbar and footer adapt; no horizontal scroll | ☐ |
| 2 | Scroll down 300 px, then up | Navbar hides, then shows; no content jump | ☐ |
| 3 | Dismiss the announcement bar, reload | Stays dismissed with no flash | ☐ |
| 4 | Hover "Shop" on desktop; move away | Mega menu opens after a short delay, closes when leaving | ☐ |
| 5 | Tab to "Shop", press Enter, then Escape | Opens and closes; focus returns to the link | ☐ |
| 6 | Open the mobile menu | Drawer animates in, focus trapped, background locked | ☐ |
| 7 | Scroll past 600 px | Scroll-to-top appears with the progress ring filling as you scroll | ☐ |
| 8 | Click scroll-to-top with reduced motion on | Jumps instantly to the top | ☐ |
| 9 | Open the contact button, click WhatsApp | Opens `wa.me/<number>` in a new tab | ☐ |
| 10 | iPhone emulation with a home indicator | Floating buttons sit above the safe area | ☐ |
| 11 | Visit `/does-not-exist` | Custom 404 page; Network tab shows status 404 | ☐ |
| 12 | Throw an error in a test page | `error.tsx` shows with a working Retry button | ☐ |
| 13 | Press Tab once on a fresh page | "Skip to content" appears; Enter jumps to main content | ☐ |
| 14 | Switch themes on every element above | All readable in both themes | ☐ |

## Non-functional

- [ ] Lighthouse Accessibility 100 on a page with only the shell
- [ ] axe DevTools: 0 violations with the mega menu, mobile menu and drawers open
- [ ] Performance trace while scrolling: no React re-render on each scroll frame (React DevTools Profiler)

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
