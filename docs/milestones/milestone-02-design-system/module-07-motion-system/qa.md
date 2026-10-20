# Module 07: Motion system · QA

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Open `/dev/motion`, scroll with a mouse wheel | Smooth Lenis scrolling; reveals trigger once | ☑ (one wheel event: scroll glides 0 → 238 → 359 → … → 551 px over ~360 ms; all reveals at opacity 1) |
| 2 | Scroll back up past revealed items | They stay visible (no re-animation) | ☑ |
| 3 | DevTools touch emulation, scroll | Native scrolling (no smoothing), reveals still work | ☑ (touch emulation: Lenis not created; reveals run) |
| 4 | Parallax section on desktop vs mobile width | Moves on desktop, static on mobile | ☑ (1440 px: transform changes with scroll; 390 px: none) |
| 5 | Hover a Magnetic button with a mouse | Follows the cursor slightly, returns on leave | ☑ (`translate3d(30px, 6px, 0)` on hover, cleared on leave) |
| 6 | Hover/focus a Marquee | Pauses | ☑ (hover and focus-within: `paused`) |
| 7 | CountUp scrolled into view, then view source | Animates once; final number is in the HTML | ☑ (`12,500+`, `4.8`, `৳3,000` in the server HTML) |
| 8 | Enable "prefers-reduced-motion: reduce" emulation, reload | Nothing animates; all content visible; marquee static | ☑ (no Lenis, reveals at opacity 1, text not split, marquee `animation: none` + copy hidden, no parallax, CountUp final) |
| 9 | Call `stop()` then `start()` from a test button | Scrolling locks and unlocks | ☑ (wheel while stopped: scrollY stays 0; after start(): 797) |
| 10 | Navigate away from `/dev/motion` and back | No duplicate ScrollTriggers, no console errors | ☑ (split pieces 11 before / 11 after; console clean) |

## Performance

- [ ] Performance panel at 4× CPU throttle, scrolling `/dev/motion`: no long tasks over 100 ms during scroll; frames mostly under 16 ms. **Not met in headless Chrome, and not caused by our code** (see Measurements). Re-check in a real browser with GPU
- [ ] Rendering panel "Paint flashing": scrolling and reveals don't repaint large areas (needs a real browser; components only animate transform/opacity)
- [x] Bundle: Motion's initial chunk is the small LazyMotion version (`domAnimation` is a separate 13 KB gz async chunk, not in the initial HTML); GSAP is in one chunk loaded only by `/dev/motion`, absent from `/`

## Non-functional

- [x] `docs/animation.md` written
- [x] No component animates `width`, `height`, `top`, `left` or `margin`

## Result

## Measurements (headless Chrome, production build)

**Scroll at 4× CPU, `/dev/motion`:** with Lenis, 70% of frames < 17 ms and 4–6 long tasks > 100 ms; with native scrolling (reduced motion), 96% and 1. A CPU profile shows ~75% of the time is the browser itself (`(program)` + native `scrollTo`); Lenis, GSAP and Motion JavaScript together are a few hundred ms over a 5 s scroll. `/dev/ui`, which has no animations at all, scores worse (58%). Cause: Lenis scrolls on the main thread, which DevTools throttles 4×, and headless Chrome rasterizes in software; native scrolling stays on the (unthrottled) compositor. Judge this on a real browser with GPU.

**Home page Lighthouse (mobile):**

| State | Performance | TBT | LCP |
|---|---|---|---|
| After module 06 | 87–90 | 60–210 ms | 3.1–3.8 s |
| Module 07, first version | 69–71 | 580–830 ms | 3.6–4.3 s |
| Module 07, Lenis only with a fine pointer | 80–93 | 60–250 ms | 3.3–4.7 s |

Found with A/B builds: removing CountUp changed nothing; removing the Lenis provider brought TBT back to 60–270 ms. Lighthouse emulates a touch phone, where Lenis does nothing useful but still ran its loop and scroll reads, so it is now created only with a fine pointer (as the spec intends: smooth wheel on desktop, native touch). Also fixed: CountUp built a new `Intl.NumberFormat` every frame. The remaining spread is the hero PNG (LCP), rebuilt in module 10.

**Bugs found and fixed during QA:**
- TextReveal: SplitText's `aria: 'auto'` caused an axe `aria-prohibited-attr` violation on `<p>`; it now uses an sr-only copy + an aria-hidden visual copy (0 axe violations)
- TextReveal: the span wrappers were `display: inline`, so the mask didn't clip and the slide-up had no effect; display is now set in `onSplit` (CSS selectors broke line detection)
- CountUp rounded 4.8 to 5; it now keeps the value's decimals

## Result

| Date | Result | Notes |
|---|---|---|
| 2026-10-20 | Partial pass | Manual items 1–10 verified in headless Chrome; bundle, axe and docs done. Remaining: the 4×-CPU smoothness and paint-flashing checks in a real browser with GPU |
