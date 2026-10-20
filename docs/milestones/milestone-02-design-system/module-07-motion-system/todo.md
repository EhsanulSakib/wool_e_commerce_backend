# Module 07: Motion system · Todo

Repo: frontend, committed on `main` (see ROADMAP "Current practice")

## 1. Packages

- [x] Install `motion`; keep `gsap`, `@gsap/react`, `lenis` (update to latest): motion 14.0.0, gsap 3.15.0, lenis 1.3.26, @gsap/react 2.1.2 (newest releases at least two weeks old). Motion 14: `staggerChildren` is deprecated, use `delayChildren: stagger(…)`
- [x] Confirm GSAP plugins used (`ScrollTrigger`, `SplitText`) are available in the installed version (SplitText with `mask`, `autoSplit`, `onSplit`)

## 2. Providers

- [x] `src/providers/motion-provider.tsx`: `LazyMotion` (`domAnimation`, `strict`) + `MotionConfig` (`reducedMotion="user"`, token transitions). `domAnimation` loads as a separate async chunk (13 KB gz)
- [x] `src/providers/smooth-scroll-provider.tsx`: Lenis root, `autoRaf: false`, GSAP ticker drives `lenis.raf`, `ScrollTrigger.update` on scroll, `lagSmoothing(0)`, `syncTouch: false`. **Changed design:** a GSAP ticker in the root provider would put GSAP in every page's bundle, so the provider runs its own rAF loop and GSAP components hand it to `gsap.ticker` while mounted (`useLenisScrollTrigger`, ref-counted). Lenis is created only with a fine pointer (see QA)
- [x] Option to disable Lenis for a layout (prop or context): `<NativeScroll />`
- [x] `src/lib/gsap.ts`: registers plugins once; exports `gsap`, `ScrollTrigger`, `SplitText`
- [x] Replace the old `SmoothScrolling` provider (deleted; `lenis/react` no longer used)

## 3. Helpers

- [x] `useLenisControls()` → `stop`, `start`, `scrollTo` (fall back to native scrolling when Lenis is off)
- [x] `useReducedMotion` usage pattern documented (Motion's hook + `gsap.matchMedia`)
- [x] `useIsPointerFine()` for hover-only effects (`src/hooks/useMediaQuery.ts`, useSyncExternalStore)
- [x] `src/components/motion/presets.ts` with token-based variants

## 4. Components

- [x] `Reveal` (`whileInView`, `viewport={{ once: true, margin }}`)
- [x] `Stagger` (container + item variants)
- [x] `TextReveal` (SplitText lines with mask; reverts on unmount; plain text with reduced motion). Screen readers read a visually hidden copy; the split copy is aria-hidden (SplitText's `aria: 'auto'` put `aria-label` on `<p>`, an axe violation)
- [x] `Parallax` (GSAP scrub on `y`, desktop only via `matchMedia`)
- [x] `Magnetic` (pointer move with rAF, resets on leave, pointer-fine only)
- [x] `Marquee` (CSS keyframes, duplicated content with `aria-hidden` copy, pause on hover/focus)
- [x] `CountUp` (Motion `animate` on a value once in view; final value in the HTML for SEO). Uses a tiny rAF tween + IntersectionObserver instead of Motion's `animate` (no extra bundle); keeps decimals (4.8)

## 5. Cleanup and docs

- [x] Replace `GsapAnimationWrapper` and `Counter` usages; delete them
- [x] `/dev/motion` demo page (noindex, dev only; same `ENABLE_DEV_PAGES` gate as the other dev pages)
- [x] `docs/animation.md`: rules, which tool for what, examples, checklist before shipping an animation

## 6. Verify

- [x] Bundle analyzer: GSAP absent from routes that don't use it
- [x] Performance recording at 4× CPU throttle on `/dev/motion`

## Done when

- [x] Every item above is ticked
- [x] [qa.md](qa.md) passes (real-browser smoothness checks noted in qa.md)
- [x] Committed on `main`, module marked ☑ in the ROADMAP master index

## Also done

- [x] No barrel file in `src/components/motion`: a barrel imported by a Server Component can pull every client module it re-exports (incl. GSAP) into the route
- [x] Token additions: `gsapEase` in `motion.ts`; `animate-marquee` keyframes in `tokens.css`
- [x] `vitest.setup.ts`: IntersectionObserver stub; `motion.test.tsx` (CountUp server HTML + decimals, Marquee copy hidden, reduced-motion presets)
