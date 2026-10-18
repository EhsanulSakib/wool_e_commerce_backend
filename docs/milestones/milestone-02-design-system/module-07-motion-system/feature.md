# Module 07: Motion system

| | |
|---|---|
| Milestone | 02 Design system & storefront shell |
| Repo | frontend |
| Depends on | 04, 05 |
| Unblocks | 08, 09 |

## Goal

Set up Motion, GSAP and Lenis so they work together without fighting, stay fast on mid-range phones, and respect reduced-motion settings. Provide a small set of reusable motion components so pages don't reinvent animations.

## Included

- **Motion provider:** `LazyMotion` with `domAnimation` features (`strict` mode, so only the small `m.*` components are used) + `MotionConfig` with `reducedMotion="user"` and default transitions from the motion tokens
- **Lenis provider:** root Lenis with `autoRaf: false`, driven by `gsap.ticker`; `ScrollTrigger.update` on every Lenis scroll; `gsap.ticker.lagSmoothing(0)`; `syncTouch: false`; can be disabled per layout (admin)
- **`useLenis` helpers:** `stop()`/`start()` (for modals), `scrollTo()` (scroll-to-top, anchor links)
- **GSAP setup:** register plugins once (`ScrollTrigger`, `SplitText`); `gsap.matchMedia()` for breakpoints and reduced motion; GSAP code loaded only in client components on pages that use it
- **Motion presets** (`src/components/motion/presets.ts`): `fadeUp`, `fadeIn`, `scaleIn`, `slideIn`, stagger container, using the tokens
- **Components** (`src/components/motion`):
  - `Reveal` — fade/slide in once when entering the viewport
  - `Stagger` — children reveal one after another
  - `TextReveal` — line/word mask reveal with SplitText
  - `Parallax` — scroll-linked image movement, desktop only
  - `Magnetic` — element follows the cursor slightly, pointer devices only
  - `Marquee` — infinite CSS marquee, pauses on hover, static with reduced motion
  - `CountUp` — number counts up once in view (replaces the current `Counter`)
- `/dev/motion` demo page (noindex) showing each component
- `docs/animation.md` in the frontend repo with the 7 animation rules from the ROADMAP and examples

## Not included

- Overlay animations (module 08), page sections (modules 09, 10)

## Notes

- Never wrap the LCP element (hero heading/image) in `Reveal`; Motion renders its initial state on the server, so the element would start invisible.
- Animate `transform` and `opacity` only. Use `will-change` only during an animation, not permanently.
- Pointer-only effects (`Magnetic`, hover parallax) check `(hover: hover) and (pointer: fine)`.
- Delete the old `GsapAnimationWrapper` and `Counter` after replacing their usages.

## You'll learn

- How the browser renders a frame (layout → paint → composite) and why transform/opacity are cheap
- `requestAnimationFrame` and a single shared animation loop
- Keeping animation libraries out of the main bundle
- Accessible motion (reduced-motion preferences)
