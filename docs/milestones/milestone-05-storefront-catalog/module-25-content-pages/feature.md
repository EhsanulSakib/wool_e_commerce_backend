# Module 25: Content pages

| | |
|---|---|
| Milestone | 05 Storefront catalog |
| Repo | both |
| Depends on | 09, 11, 14, 24 |
| Unblocks | 26, 39 |

## Goal

Add the brand and policy pages a real store needs, plus a working contact form. Payment gateways (including SSLCommerz) require Terms, Privacy, Refund/Return policy, About and Contact pages before they approve a merchant, so these must exist before online payments go live.

## Included

**Backend**
- `ContactMessage` model: name, email, phone (optional), subject, message, status (`NEW`, `READ`, `REPLIED`), IP, user agent, timestamps
- `POST /contact` (public): Zod validation, honeypot field (bots that fill it are silently ignored), strict rate limit
- Emails: notification to `STORE_INBOX`, auto-reply to the sender (templates added to module 11's system)
- Admin API: `GET /admin/contact-messages` (filter by status), `PATCH /admin/contact-messages/:id` (status) — UI comes in module 39

**Frontend**
- Pages: `/about` (brand story with motion), `/contact` (form + WhatsApp/phone/email/address + business hours), `/faq` (accordion + `FAQPage` JSON-LD), `/shipping-returns`, `/privacy-policy`, `/terms`, `/refund-policy`, `/size-guide`
- Long-form pages written in MDX with custom prose styles from the design tokens (readable line length, heading anchors)
- Footer and floating contact button link to these pages
- All pages in the sitemap with metadata

## Not included

- CMS for editing content (post-MVP)
- Contact messages admin UI (module 39)

## Notes

- The policy text should describe the real setup: COD and online payment, delivery zones and times, return window for knitwear (e.g. unworn, tags attached, within 7 days), refund method per payment type. Have someone review it before launch.
- The FAQ answers common questions: COD, delivery times, international shipping, sizing, wool care, returns.

## You'll learn

- MDX for content-heavy pages
- Spam protection without CAPTCHAs (honeypot + rate limiting)
- Structured data for FAQs
