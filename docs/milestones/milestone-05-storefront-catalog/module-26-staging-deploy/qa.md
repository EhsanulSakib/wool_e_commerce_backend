# Module 26: Staging deploy · QA

## Manual

| # | Steps | Expected | ✓ |
|---|---|---|---|
| 1 | Merge a small change to `main` in each repo | Both deploy automatically | ☐ |
| 2 | Open the staging frontend URL | Home, shop, product pages load with real data | ☐ |
| 3 | Log in as the seeded admin on staging | Works; cookies set on the frontend domain | ☐ |
| 4 | Change a price via staging `/docs` | Staging product page updates | ☐ |
| 5 | Submit the contact form | Email arrives in the staging SMTP sandbox, not a real inbox | ☐ |
| 6 | `curl -I` staging frontend and backend | `X-Robots-Tag: noindex` present; robots.txt disallows all | ☐ |
| 7 | Open a PR in the frontend repo | Vercel preview URL posted on the PR | ☐ |
| 8 | Deploy a migration | Applied by the pre-deploy step; app healthy after | ☐ |
| 9 | Roll back the backend to the previous deploy | Service healthy on the old version | ☐ |
| 10 | Search both repos for secrets (`git grep -i secret`, etc.) | Nothing sensitive committed | ☐ |

## Non-functional

- [ ] Uptime monitor shows the backend up
- [ ] `docs/deploy.md` complete enough for someone else to deploy

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
