# Module 25: Content pages · Todo

Branch: `feat/25-content-pages` (backend and frontend repos)

## 1. Backend

- [ ] `ContactMessage` model + migration
- [ ] `modules/contact`: `POST /contact` with Zod, honeypot check, rate limit (e.g. 3 per hour per IP)
- [ ] Emit `contact.received` → email to `STORE_INBOX` + auto-reply (new templates)
- [ ] Admin endpoints: list with status filter + pagination, update status
- [ ] OpenAPI docs and tests (valid message saved + emails, honeypot ignored, rate limit, validation)

## 2. Frontend setup

- [ ] Configure MDX (`@next/mdx`) for content pages
- [ ] `Prose` styles from tokens (max width ~70ch, headings, lists, tables, links)

## 3. Pages

- [ ] `/about` with brand story sections and images (motion components)
- [ ] `/contact` with form (react-hook-form + Zod, hidden honeypot input) and contact details
- [ ] `/faq` with Accordion + `FAQPage` JSON-LD
- [ ] `/shipping-returns`, `/privacy-policy`, `/terms`, `/refund-policy` (MDX)
- [ ] `/size-guide` (tables per category, shared data with the product size guide modal)

## 4. Wiring

- [ ] Footer links, floating contact button "Contact page" option
- [ ] Metadata for each page; add to `sitemap.ts`

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PRs merged, module marked ☑ in the ROADMAP master index
