# Module 07: Motion system · QA

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Open `/dev/motion`, scroll with a mouse wheel | Smooth Lenis scrolling; reveals trigger once | ☐ |
| 2 | Scroll back up past revealed items | They stay visible (no re-animation) | ☐ |
| 3 | DevTools touch emulation, scroll | Native scrolling (no smoothing), reveals still work | ☐ |
| 4 | Parallax section on desktop vs mobile width | Moves on desktop, static on mobile | ☐ |
| 5 | Hover a Magnetic button with a mouse | Follows the cursor slightly, returns on leave | ☐ |
| 6 | Hover/focus a Marquee | Pauses | ☐ |
| 7 | CountUp scrolled into view, then view source | Animates once; final number is in the HTML | ☐ |
| 8 | Enable "prefers-reduced-motion: reduce" emulation, reload | Nothing animates; all content visible; marquee static | ☐ |
| 9 | Call `stop()` then `start()` from a test button | Scrolling locks and unlocks | ☐ |
| 10 | Navigate away from `/dev/motion` and back | No duplicate ScrollTriggers, no console errors | ☐ |

## Performance

- [ ] Performance panel at 4× CPU throttle, scrolling `/dev/motion`: no long tasks over 100 ms during scroll; frames mostly under 16 ms
- [ ] Rendering panel "Paint flashing": scrolling and reveals don't repaint large areas
- [ ] Bundle analyzer: Motion's initial chunk is the small LazyMotion version; GSAP not in the shared bundle

## Non-functional

- [ ] `docs/animation.md` written
- [ ] No component animates `width`, `height`, `top`, `left` or `margin`

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
