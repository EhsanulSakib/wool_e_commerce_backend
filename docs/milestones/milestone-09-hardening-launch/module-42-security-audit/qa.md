# Module 42: Security audit · QA

## Automated

- [ ] IDOR and route × role suites pass in CI
- [ ] `npm audit` step passes (no high/critical)
- [ ] Secret scanning passes

## Manual

| # | Check | Expected | ✓ |
|---|---|---|---|
| 1 | securityheaders.com (or `curl -I`) on staging frontend | CSP, HSTS, Referrer-Policy, Permissions-Policy, X-Content-Type-Options present | ☐ |
| 2 | Browse every page type with DevTools open | No CSP violations | ☐ |
| 3 | `/docs` on production config | Not reachable (or requires admin) | ☐ |
| 4 | Trigger a 500 in production config | Generic message, no stack | ☐ |
| 5 | Order with quantity `-1` and `1000000` | Rejected | ☐ |
| 6 | Replay an old payment success callback | No change | ☐ |
| 7 | Search the frontend build output for `JWT_SECRET`, `API_SECRET`, `STORE_PASSWORD` | Not found | ☐ |
| 8 | Review logs after failed logins and a ban | Events logged, no passwords/tokens | ☐ |
| 9 | Restore drill | Completed; time recorded | ☐ |

## Findings summary

| Severity | Found | Fixed | Planned |
|---|---|---|---|
| Critical | | | |
| High | | | |
| Medium | | | |
| Low | | | |

## Result

| Date | Result | Notes |
|---|---|---|
| | | |
