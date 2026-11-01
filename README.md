# PeakFit

PeakFit is a full-stack strength training tracker with workout split planning, exercise browsing, nutrition targets, and workout history.

## Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, React Router, Zustand, Recharts, Axios
- **API:** Node.js and Express
- **Authentication and data:** Supabase Auth and Postgres, with row-level security on all user-owned tables

## Local setup

1. Create a Supabase project and enable email/password authentication. The API uses the project's **publishable key**; never put a secret or service-role key in the frontend or API environment.
2. The migration in [`supabase/migrations/20260927000000_peakfit_core.sql`](supabase/migrations/20260927000000_peakfit_core.sql) has been applied to the PeakFit project. To provision another project, apply it with the Supabase SQL Editor.
3. Copy `backend/.env.example` to `backend/.env`. The PeakFit project URL and publishable key are already filled in; set the frontend origin(s) in `FRONTEND_URL` for your deployment.
4. In one terminal, run `cd backend`, `npm install`, and `npm run dev`.
5. Copy `frontend/.env.example` to `frontend/.env`. In another terminal, run `cd frontend`, `npm install`, and `npm run dev`.

The API accepts Supabase access tokens, verifies them with Supabase Auth, and uses a request-scoped client so database queries run with the signed-in user's JWT. The database policies independently enforce row ownership. Access tokens refresh through Supabase Auth when the API returns an expired-session response.

## Production hosting

- **Vercel:** import this repository as a new Vercel project from the repository root. `vercel.json` builds the Vite app as a static site and serves the Express API as a serverless function. Add `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, and `FRONTEND_URL` as Production environment variables.
- **GitHub Pages:** the Actions workflow builds and publishes the frontend at `https://subhanshu-coder.github.io/PeakFit/`. It uses the Vercel API at `https://peak-fit-nu.vercel.app/api`; update `VITE_API_URL` in `.github/workflows/pages.yml` if Vercel assigns a different production domain.

## Features

- Email/password signup and login through Supabase Auth
- Monday–Saturday workout split templates and day customization
- Exercise library and muscle-group filtering
- Mifflin–St Jeor calorie and macro planning
- Set-by-set workout logging and strength trend charts
- Per-user data isolation enforced by Postgres RLS

## Environment variables

See `backend/.env.example` and `frontend/.env.example`. Keep `.env` files out of version control. The API requires `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`; it does not need a service-role key.

## Google sign-in

To enable Google sign-in, configure Google as a provider in the Supabase dashboard and add the deployed site URLs to Supabase Auth's allowed redirect URLs. The Google OAuth client secret belongs in Supabase's provider settings, not in the frontend.


## Troubleshooting

### Sign-in redirects

Check that the OAuth return URL matches the deployed origin exactly. For GitHub Pages, include the repository base path `/PeakFit/` in the app URL.


### Signup confirmation

If signup does not immediately create a session, check whether email confirmation is enabled in Supabase Auth and complete the confirmation link before signing in.


For local auth testing, add the local Vite origin (usually `http://localhost:5173`) to Supabase Auth's allowed redirect URLs.


### API connection

Set `VITE_API_URL` to the API origin plus `/api` for production builds; the frontend does not read backend-only environment variables.


After changing Vercel environment variables, trigger a new production deployment so the API runtime receives the updated values.


GitHub Pages deployments are produced by the Actions workflow; check its run in the Actions tab if the published site does not reflect the latest commit.


The GitHub Pages build uses the repository subpath `/PeakFit/`; use the Vercel deployment for a root-domain URL.
 

The backend exposes `/api/health` for a quick availability check on the deployed API.
 

Workout and nutrition records are scoped to the authenticated Supabase user and protected by database row-level security.
 

Apply SQL migrations in filename timestamp order when provisioning a fresh database.
 

A Supabase publishable key is designed for client use when row-level security is enabled; never expose a service-role key in browser code.
 

The local frontend and API run as separate development processes; check each terminal for its startup URL and port.
 

Google OAuth also requires the provider's authorized redirect URI to match the callback URL shown in Supabase's provider settings.
 

After changing auth redirect settings, start a fresh sign-in attempt so the browser receives a new OAuth authorization request.


## Deployment check

After publishing, open the site URL and confirm the latest GitHub Actions run succeeded. For API-backed pages, verify that the configured API URL is reachable before troubleshooting sign-in or saved data.
