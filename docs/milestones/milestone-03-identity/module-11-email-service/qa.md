# Module 11: Email service · QA

## Automated

- [ ] Template and event tests from todo section 5 pass

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Open `/dev/emails/verify-email` | Branded HTML email renders in the browser | ☐ |
| 2 | Trigger a test send (temporary script or test route) | Email appears in Mailpit with correct From, To, Subject | ☐ |
| 3 | In Mailpit, view HTML, text and mobile preview | All three readable; button and plain link both present | ☐ |
| 4 | Use a name like `<script>alert(1)</script>` in sample data | Shown as text, not executed or rendered as HTML | ☐ |
| 5 | Stop Mailpit, trigger a send | Error logged; the triggering request still succeeds | ☐ |
| 6 | Start with `NODE_ENV=production` | `/dev/emails/*` returns 404 | ☐ |
| 7 | Mailpit "HTML check" tab | No major client-compatibility warnings | ☐ |

## Non-functional

- [ ] SMTP credentials only in env
- [ ] Log lines contain the template name and recipient, never the email body or tokens

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
