# Module 25: Content pages · QA

## Automated

- [ ] Backend contact tests pass

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Submit the contact form | Success message; store notification + auto-reply in Mailpit; row in `contact_messages` | ☐ |
| 2 | Submit with invalid email | Inline error; nothing sent | ☐ |
| 3 | Fill the hidden honeypot (DevTools) and submit | Success shown to the user, but nothing saved or emailed | ☐ |
| 4 | Submit 4 times quickly | Fourth gets a rate-limit message | ☐ |
| 5 | Open every content page at 360 px and desktop | Readable, consistent, no overflow | ☐ |
| 6 | FAQ accordion with keyboard | Opens/closes; `aria-expanded` correct | ☐ |
| 7 | Rich Results / schema validator on `/faq` | Valid FAQPage | ☐ |
| 8 | Footer links | All go to the right pages | ☐ |
| 9 | `/sitemap.xml` | Includes all content pages | ☐ |
| 10 | Admin `GET /admin/contact-messages?status=NEW` | Lists the new message | ☐ |

## Non-functional

- [ ] Lighthouse: SEO 100 and Accessibility 100 on content pages
- [ ] Policy texts reviewed and match the store's real rules

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
