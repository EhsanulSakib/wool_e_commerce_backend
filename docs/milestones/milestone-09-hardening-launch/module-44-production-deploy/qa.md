# Module 44: Production deploy · QA

## Checks

| # | Check | Expected | ✓ |
|---|---|---|---|
| 1 | Open the domain over HTTP | Redirects to HTTPS; valid certificate | ☐ |
| 2 | Register with a real Gmail/Outlook address | Email in the inbox (not spam); from the store domain | ☐ |
| 3 | Mail-tester score | 9/10 or better; SPF, DKIM, DMARC pass | ☐ |
| 4 | Throw a test error in frontend and backend | Both in Sentry with source-mapped stack traces | ☐ |
| 5 | Uptime alert test | Alert received | ☐ |
| 6 | `robots.txt` and `sitemap.xml` on production | Crawling allowed; sitemap valid and accepted in Search Console | ☐ |
| 7 | Staging robots/headers | Still `noindex` | ☐ |
| 8 | Secrets differ between staging and production | Confirmed (spot-check JWT and revalidation secrets) | ☐ |
| 9 | Deploy a trivial change, then roll it back | Both work; documented times | ☐ |
| 10 | Follow `docs/runbook.md` "restore database" steps on a temporary branch | Works as written | ☐ |
| 11 | READMEs | Screenshots, live link, architecture, scores, local setup | ☐ |

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
