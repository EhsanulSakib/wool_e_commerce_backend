# Module 34: Payments (frontend) · Todo

Branch: `feat/34-payments-frontend` (frontend repo)

## 1. Data

- [ ] Regenerate API types
- [ ] `features/payments/api.ts`: init, payment status

## 2. Checkout

- [ ] "Pay online" option with logos per currency; availability rules alongside COD
- [ ] Placement with `SSLCOMMERZ` → init → redirect with overlay
- [ ] Error handling when init fails (message + retry, order stays visible in tracking)

## 3. Result pages

- [ ] Success page: fetch status; show summary; handle "still confirming" with polling (e.g. 5 tries, 2 s apart)
- [ ] Failed and cancelled pages: Try again (init), Switch to COD (when allowed), contact link
- [ ] All result pages `noindex`

## 4. Order views

- [ ] Payment status pill in order list/detail/tracking
- [ ] "Pay now" button for unpaid online orders within the window

## Done when

- [ ] Every item above is ticked
- [ ] [qa.md](qa.md) passes
- [ ] PR merged, module marked ☑ in the ROADMAP master index
