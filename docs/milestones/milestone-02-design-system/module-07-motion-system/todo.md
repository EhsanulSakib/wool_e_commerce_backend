# Module 07: Motion system · Todo

Branch: `feat/07-motion-system` (frontend repo)

## 1. Packages

- [ ] Install `motion`; keep `gsap`, `@gsap/react`, `lenis` (update to latest)
- [ ] Confirm GSAP plugins used (`ScrollTrigger`, `SplitText`) are available in the installed version

## 2. Providers

- [ ] `src/providers/motion-provider.tsx`: `LazyMotion` (`domAnimation`, `strict`) + `MotionConfig` (`reducedMotion="user"`, token transitions)
- [ ] `src/providers/smooth-scroll-provider.tsx`: Lenis root, `autoRaf: false`, GSAP ticker drives `lenis.raf`, `ScrollTrigger.update` on scroll, `lagSmoothing(0)`, `syncTouch: false`
- [ ] Option to disable Lenis for a layout (prop or context)
- [ ] `src/lib/gsap.ts`: registers plugins once; exports `gsap`, `ScrollTrigger`, `SplitText`
- [ ] Replace the old `SmoothScrolling` provider

## 3. Helpers

- [ ] `useLenisControls()` → `stop`, `start`, `scrollTo`
- [ ] `useReducedMotion` usage pattern documented (Motion's hook + `gsap.matchMedia`)
- [ ] `useIsPointerFine()` for hover-only effects
- [ ] `src/components/motion/presets.ts` with token-based variants

## 4. Components

- [ ] `Reveal` (`whileInView`, `viewport={{ once: true, margin }}`)
- [ ] `Stagger` (container + item variants)
- [ ] `TextReveal` (SplitText lines with mask; reverts on unmount; plain text with reduced motion)
- [ ] `Parallax` (GSAP scrub on `y`, desktop only via `matchMedia`)
- [ ] `Magnetic` (pointer move with rAF, resets on leave, pointer-fine only)
- [ ] `Marquee` (CSS keyframes, duplicated content with `aria-hidden` copy, pause on hover/focus)
- [ ] `CountUp` (Motion `animate` on a value once in view; final value in the HTML for SEO)

## 5. Cleanup and docs

- [ ] Replace `GsapAnimationWrapper` and `Counter` usages; delete them
- [ ] `/dev/motion` demo page (noindex, dev only)
- [ ] `docs/animation.md`: rules, which tool for what, examples, checklist before shipping an animation

## 6. Verify

- [ ] Bundle analyzer: GSAP absent from routes that don't use it
- [ ] Performance recording at 4× CPU throttle on `/dev/motion`

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
