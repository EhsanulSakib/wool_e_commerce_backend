# Module 11: Email service

| | |
|---|---|
| Milestone | 03 Identity |
| Repo | backend |
| Depends on | 02, 03 |
| Unblocks | 12, 25, 29 |

## Goal

Send transactional emails through SMTP with Nodemailer, using branded HTML templates. Emails are triggered by events, so the module that causes an email (auth, orders) doesn't need to know how emails are sent.

## Included

- `modules/notifications`: Nodemailer SMTP transport from env (`SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, `STORE_INBOX`)
- Verify the SMTP connection at startup (warning in development, error in production)
- `sendEmail({ to, subject, html, text })` with logging and one retry on failure; failures never crash a request
- Template system: TypeScript functions returning `{ subject, html, text }`, a shared base layout (black-and-white header with logo, footer with store contact), inline CSS for email clients, HTML escaping for every dynamic value
- First templates: **verify email**, **password reset**, **welcome**
- Event handlers: `user.registered` → verify email; `user.password_reset_requested` → reset email; `user.verified` → welcome
- Development-only preview route `GET /dev/emails/:template` that renders a template in the browser with sample data
- Tests using a test transport that captures messages instead of sending them

## Not included

- Order emails (module 29), contact form emails (module 25)
- Background job queue (post-MVP BullMQ module)

## Deliverables

| Item | Description |
|---|---|
| `notifications.sendEmail()` | Public function exported from the module's `index.ts` |
| 3 templates | Verify, reset, welcome |
| `/dev/emails/:template` | Preview in development only |

## Notes

- Locally, SMTP points at Mailpit (`localhost:1025`, no auth). In production, any SMTP provider works by changing env vars.
- Keep templates simple: single column, max ~600 px wide, system fonts, real text (not text in images).
- Every email has a plain-text version for clients that don't show HTML.

## You'll learn

- How SMTP works and what Nodemailer does
- Why email HTML is different from web HTML
- Decoupling with events
- Testing code that has external side effects
