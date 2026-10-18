# Milestone 02: Design system & storefront shell

| | |
|---|---|
| Repos | frontend |
| Depends on | [01 Foundations](../milestone-01-foundations/feature.md) (module 04) |
| Next milestone | [03 Identity](../milestone-03-identity/feature.md) |

## Goal

Create the look and feel of the store before any real data exists: black-and-white design tokens, a complete custom UI kit (no UI library), a smooth and fast motion system, the site layout (navbar, footer, floating buttons) and an animated home page running on mock data. Every later page is built from these pieces.

## When it's done

- `/dev/ui` shows every component in every state, in light and dark mode, all keyboard accessible.
- The home page is fully animated and scores ≥ 90 Performance and 100 Accessibility/Best Practices/SEO on mobile Lighthouse.
- Animations stay smooth with 4× CPU throttling and switch off with reduced motion.
- No component uses hard-coded colors; everything goes through tokens.

## Modules (build in this order)

| # | Module | Depends on | Summary |
|---|---|---|---|
| 05 | [Design tokens](module-05-design-tokens/feature.md) | 04 | Colors, fonts, fluid type, spacing, radius, shadows, z-index, motion tokens, dark mode |
| 06 | [UI primitives](module-06-ui-primitives/feature.md) | 05 | Buttons, badges, skeletons, form controls, `/dev/ui` playground |
| 07 | [Motion system](module-07-motion-system/feature.md) | 04, 05 | Motion + GSAP + Lenis setup, reusable motion components, performance rules |
| 08 | [UI overlays & display](module-08-ui-overlays-display/feature.md) | 06, 07 | Modal, drawer, dropdown, tooltip, toast, tabs, accordion, carousel, price tag, rating… |
| 09 | [Layout shell](module-09-layout-shell/feature.md) | 06, 07, 08 | Announcement bar, navbar, mega menu, mobile menu, footer, floating buttons, 404/error pages |
| 10 | [Home page](module-10-home-page/feature.md) | 09 | Product card v1 and the animated home page on mock data |

## Not in this milestone

- Real data from the backend (milestone 05)
- Working cart, search and currency switcher (UI shells only here; wired in modules 21, 22, 30)

## Open questions that affect this milestone

- **Taka format** `৳1,250` vs `Tk 1,250` (ROADMAP open question 3) — needed by module 08 (PriceTag).
- **Fonts** — chosen in module 05.
- **Images** — the home page needs knitwear photos. Use royalty-free images (Unsplash/Pexels, check each license) until real product photos exist.
