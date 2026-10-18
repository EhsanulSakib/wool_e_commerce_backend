# Module 04: Frontend setup

| | |
|---|---|
| Milestone | 01 Foundations |
| Repo | frontend |
| Depends on | none |
| Unblocks | 05, 07, 14 |

## Goal

Bring the existing Next.js app up to date and fix its foundations before building on it: upgrade Next (the current 15.3.1 has critical security advisories, including remote code execution), move theming to CSS variables, fix the root layout, remove leftovers, and set up the folder structure, tooling and CI.

## Included

- Upgrade to the latest Next.js 16.x and React using the official upgrade guide and codemods
- `npm audit` clean (no high or critical findings in production dependencies)
- Theme: remove the Redux theme slice and `StorageProvider`; use `next-themes` with `attribute="data-theme"`, `suppressHydrationWarning` on `<html>`
- Root layout fix: providers inside `<body>` (they currently wrap it, which is invalid HTML)
- Fix the missing semicolon in the dark theme block of `globals.css`
- Remove the leftover `middleware.ts` that redirects `/about` to `/`
- Lenis: `syncTouch: false` (native scrolling on phones); full GSAP integration comes in module 07
- Remove the hero's scroll-scrubbed GSAP wrapper, which keeps the hero invisible until you scroll (bad for LCP); module 07 replaces it
- State management decision (ROADMAP open question 2; assumption: TanStack Query + Zustand). Remove Redux packages if confirmed; the new libraries are installed when first needed (modules 14 and 30)
- Folder structure from the ROADMAP (`components/ui`, `components/motion`, `components/layout`, `components/product`, `features`, `lib`, `styles`)
- `src/lib/env.ts`: validate public env vars with Zod
- `next.config.ts`: `poweredByHeader: false`, `reactStrictMode`, image remote patterns placeholder for Cloudinary
- ESLint + Prettier (+ Tailwind class sorting plugin); scripts: `lint`, `format`, `typecheck`
- Vitest + Testing Library setup (used from module 06)
- Bundle analyzer script
- GitHub Actions: lint, typecheck, test, build
- Record a Lighthouse baseline of the current home page

## Not included

- Design tokens and new components (milestone 02)
- API client (module 14)

## Notes

- Upgrade in small commits: dependencies first, then codemods, then fixes. Run the app after each step.
- With `next-themes` + CSS variables, components never check the theme in JavaScript. All the `theme === "light" ? … : …` code in the Navbar and PrimaryButton goes away when those components are rebuilt in milestone 02. Until then, keep them working.
- Consider enabling the React Compiler if it's stable in the installed Next version; measure before keeping it.

## You'll learn

- Upgrading a framework safely and reading security advisories
- Theming with CSS variables and avoiding hydration mismatches
- Why the LCP element must be visible on first paint
- Setting up a frontend toolchain and CI
