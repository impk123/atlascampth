# Testing & Quality Standards

## E2E Testing (Playwright/Cypress)
- **Coverage:** Every major user flow (Auth, CRUD, Workflows).
- **Interactions:** Simulate real user behavior (clicks, typing, navigation).
- **Assertions:** Verify DOM state, network calls, and storage (localStorage/cookies).
- **Reports:** Provide simulated logs or descriptions of test results.

## Performance & Accessibility
- **Lighthouse:** Aim for 95+ across Performance, Accessibility, Best Practices, and SEO.
- **Accessibility:** ARIA labels, WCAG compliance, keyboard navigation.
- **Security:** Input validation, CSP headers, rate limiting, and dependency audits.

## Code Quality
- **Types:** Strict TypeScript usage.
- **Architecture:** Clean Architecture, DRY principles.
- **Validation:** Zod/Yup for all API and form inputs.
