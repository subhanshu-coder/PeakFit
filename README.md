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

## Features

- Email/password signup and login through Supabase Auth
- Monday–Saturday workout split templates and day customization
- Exercise library and muscle-group filtering
- Mifflin–St Jeor calorie and macro planning
- Set-by-set workout logging and strength trend charts
- Per-user data isolation enforced by Postgres RLS

## Environment variables

See `backend/.env.example` and `frontend/.env.example`. Keep `.env` files out of version control. The API requires `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`; it does not need a service-role key.

