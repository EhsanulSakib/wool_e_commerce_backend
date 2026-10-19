# Module 04: Frontend setup · Todo

Branch: `feat/04-frontend-setup` (frontend repo)

## 1. Baseline

- [x] Lighthouse (mobile, incognito/headless) on the current home page; scores in [qa.md](qa.md)
- [x] `npm audit --omit=dev` before: critical Next.js advisories (incl. RCE in the React flight protocol) on 15.3.1

## 2. Upgrade

- [x] Read the Next.js 16 upgrade guide (bundled at `node_modules/next/dist/docs`)
- [x] Upgraded manually: `next@16.4.2`, `react`/`react-dom@19.3`, `eslint-config-next@16.4.2`, `@types/react*`, Tailwind 4.3, ESLint 9.39, `@types/node@26`
- [x] Applied the breaking changes that affect this app: `next lint` removed → `eslint .`; ESLint flat config; `middleware.ts` deleted (would have become `proxy.ts`); `next/image` `priority` → `preload`; tsconfig updated by Next (`jsx: react-jsx`, route types)
- [x] `npm audit --omit=dev`: 0 vulnerabilities (remaining 5 dev-only findings: `braces` via `eslint-config-next`)

## 3. Theme

- [x] ROADMAP open question 2 → Redux Toolkit for client state + Next.js `fetch` for data (no TanStack Query, no Zustand)
- [x] `ThemeProvider` from `next-themes` (`attribute="data-theme"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`)
- [x] `suppressHydrationWarning` on `<html>`
- [x] `ThemeSwitcher` uses `useTheme()`; both icons rendered, CSS shows the right one (no hydration mismatch)
- [x] Removed the old Redux theme code (`themeSlice`, old `store.ts`, `StorageProvider`, `useThemeSwitch`); theme now handled by `next-themes`
- [x] Redux re-added the App Router way: `src/store/store.ts` (`makeStore`, store per request), `src/store/hooks.ts` (typed hooks), `StoreProvider` (store created once with `useState`), `uiSlice` (cart drawer, mobile menu, search) used by the navbar; slice tests
- [x] Navbar and PrimaryButton use theme tokens (`text-foreground/70`, `bg-background`…) instead of `theme === 'light' ? … : …`; logo swaps via `dark:hidden` / `dark:block`
- [x] `globals.css` rewritten: variables per `data-theme`, Tailwind `dark:` variant follows `data-theme`, `color-scheme` set; fixed the broken dark block

## 4. Layout and leftovers

- [x] Root layout: `<html>` → `<body>` → providers → content
- [x] Deleted `src/middleware.ts` (the `/about` redirect)
- [x] Lenis: `lerp: 0.1`, `syncTouch: false` (removed the conflicting `duration`)
- [x] Removed `GsapAnimationWrapper` from the hero (hero visible on first paint); hero image uses `preload` + `sizes`
- [x] Real metadata (title template, description, `metadataBase`)
- [x] Fixed console errors found by the baseline: logo link `/home` → `/`, `prefetch={false}` on links to pages that don't exist yet, broken dropdown icons and cart placeholder image removed, `bg-opacity-50` (removed in Tailwind v4) → `bg-black/50`
- [x] Accessibility fixes from Lighthouse: closed cart drawer uses `inert`; hero counters are no longer `<h3>` (heading order); icon links have names
- [x] Old `Counter` rewritten without setState-in-effect (new React Hooks lint rule); replaced in module 07

## 5. Structure and config

- [x] Folders: `components/{ui,motion,layout,product,cart}`, `features`, `lib`, `styles`
- [x] `src/lib/env.ts`: Zod validation for `NEXT_PUBLIC_SITE_URL`; `.env.example` (and `.gitignore` exception for it)
- [x] `next.config.ts`: `poweredByHeader: false`, `reactStrictMode`, Cloudinary `remotePatterns`, AVIF/WebP
- [x] Bundle analyzer: built-in `next analyze` (Turbopack) instead of `@next/bundle-analyzer`
- [ ] React Compiler: not enabled yet; evaluate with measurements in module 41

## 6. Tooling

- [x] ESLint flat config (`eslint-config-next/core-web-vitals` + `/typescript` + `eslint-config-prettier`)
- [x] Prettier + `prettier-plugin-tailwindcss`, `.editorconfig`, `.gitattributes` (LF), `.nvmrc`
- [x] Scripts: `lint`, `typecheck` (`next typegen && tsc`), `format`, `format:check`, `test`, `test:watch`, `analyze`
- [x] Vitest + Testing Library + jsdom (`matchMedia` stub); ThemeSwitcher tests
- [x] `.github/workflows/ci.yml`: format, lint, typecheck, test, build, production audit
- [x] `README.md`: setup, scripts, theming, folder structure, env vars, link to the roadmap

## Done when

- [x] Every item above is ticked (React Compiler deliberately deferred)
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
