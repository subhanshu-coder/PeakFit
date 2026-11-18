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
