# Contributing to PeakFit

Thanks for helping improve PeakFit. Use these steps to prepare and review changes.

## 1. Scope

Contributions should keep PeakFit's React frontend, Express API, and Supabase data layer working together.

## 2. Branches

Create a short-lived branch from the latest `main` for each focused change.

## 3. Runtime

Use a supported Node.js LTS release and the npm version recorded with the project.

## 4. Frontend setup

Install dependencies in `frontend/` and run the Vite development server from that directory.

## 5. Backend setup

Install dependencies in `backend/` and run the API development server in a separate terminal.

## 6. Environment files

Copy each `.env.example` to a local `.env`; keep local environment files out of commits.

## 7. Secret handling

Never commit Supabase service-role keys, OAuth client secrets, access tokens, or production credentials.

## 8. Database changes

Add schema changes as timestamped SQL migrations under `supabase/migrations/`.

## 9. Row-level security

Enable and verify row-level security for user-owned data; policies should scope rows to the authenticated user.

## 10. Supabase keys

Use the publishable key in client-facing configuration; privileged keys must stay server-side and should not be needed by normal API requests.

## 11. Authentication redirects

When changing auth flows, account for local, Vercel, and GitHub Pages callback URLs.

## 12. API routes

Keep API route handlers under `backend/src/routes/` and mount new route groups in the Express app.

## 13. Input validation

Validate request values at the API boundary and return a clear client error for invalid input.

## 14. Error responses

Avoid returning stack traces, secrets, or database internals in API error responses.

## 15. Frontend components

Prefer the shared UI components in `frontend/src/components/ui/` for consistent controls.

## 16. Accessibility

Use semantic elements, associated labels, keyboard support, and visible focus styles for interactive UI.

## 17. Responsive layouts

Check changed screens at narrow and wide viewport sizes; keep primary actions reachable on mobile.

## 18. Motion

Keep animation purposeful and respect the reduced-motion preference for nonessential effects.

## 19. Formatting

Match the existing TypeScript, JavaScript, and CSS style in the touched files.

## 20. Local verification

Before opening a pull request, run the relevant frontend or backend checks for the changed area and report any failures.

## 21. Pull request summary

Describe the user-facing behavior, database impact, required environment changes, and verification performed.
