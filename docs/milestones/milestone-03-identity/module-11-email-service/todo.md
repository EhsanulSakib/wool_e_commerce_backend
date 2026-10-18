# Module 11: Email service · Todo

Branch: `feat/11-email-service` (backend repo)

## 1. Transport

- [ ] Install `nodemailer` and `@types/nodemailer`
- [ ] Add SMTP env vars to `env.ts` and `.env.example` (Mailpit defaults for development)
- [ ] `modules/notifications/mailer.ts`: create the transport; `verify()` at startup with environment-dependent handling
- [ ] `sendEmail()` with structured logging (to, template, message id), one retry, error swallowed and logged

## 2. Templates

- [ ] `templates/layout.ts`: base HTML (header, content slot, footer), inline styles, preheader text
- [ ] `templates/escape.ts`: HTML escaping helper; used for every dynamic value
- [ ] `verify-email.ts`: greeting, button + plain link, expiry note
- [ ] `password-reset.ts`: button + plain link, expiry note, "ignore if you didn't ask" line
- [ ] `welcome.ts`: short welcome, link to the shop
- [ ] Plain-text version for each

## 3. Events

- [ ] Add `user.registered`, `user.verified`, `user.password_reset_requested` to the event map type
- [ ] Register handlers in `modules/notifications/index.ts`

## 4. Preview

- [ ] `GET /dev/emails/:template` (only when `NODE_ENV=development`), sample data per template

## 5. Tests

- [ ] Test transport (`jsonTransport` or stream) injected in tests
- [ ] Each template renders with escaped user input
- [ ] Emitting `user.registered` sends one email to the right address with the verify link
- [ ] SMTP failure is logged and doesn't throw

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
