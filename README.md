# FitForge — Full-Stack Fitness Tracker

A complete strength-training program builder: a Monday–Saturday split engine
(every muscle trained twice a week by default, fully customizable), a diet /
macro calculator, and set-by-set progress logging with charts.

## Stack

**Backend** — Node.js, Express, JWT auth (bcryptjs + jsonwebtoken), a
dependency-free JSON file datastore (`backend/data.json`, auto-created — swap
for Postgres/Prisma later if you outgrow it).

**Frontend** — React 18, TypeScript, Vite, Tailwind CSS, Framer Motion
(hero animations + a magnetic custom cursor), React Router, Zustand (auth
state), Recharts (progress graphs), Axios.

## Project structure

```
fitforge/
  backend/
    src/
      data/            exercise library + split templates
      middleware/       JWT auth guard
      routes/           auth, exercises, plan, diet, logs
      utils/            diet macro calculator
      db.js             JSON file datastore
      server.js         Express app entry
  frontend/
    src/
      components/       Navbar, CustomCursor, RequireAuth, ui/*
      pages/             Landing, Login, Signup, Dashboard, SplitBuilder,
                         Exercises, Diet, Progress
      store/auth.ts       Zustand auth store (localStorage-persisted)
      lib/api.ts          Axios client with auth header injection
```

## Running it

**1. Backend**

```bash
cd backend
cp .env.example .env      # edit JWT_SECRET to something random
npm install
npm run dev                # http://localhost:5000
```

**2. Frontend** (in a second terminal)

```bash
cd frontend
npm install
npm run dev                # http://localhost:3000
```

Open `http://localhost:3000`, sign up, and you're in.

## How the program logic works

- **Split templates** (`backend/src/data/splitTemplates.js`) map Mon–Sat to
  muscle groups. The default, `ppl_2x` (Push/Pull/Legs), trains every muscle
  exactly twice across the week. Two other templates (`upper_lower_3x`,
  `bro_split`) are included, and you can fully customize any day's muscle
  groups from the in-app Split Builder — exercises re-populate automatically
  from the 30+ movement library.
- **Diet calculator** (`backend/src/utils/diet.js`) uses the Mifflin-St Jeor
  formula for BMR, an activity multiplier for TDEE, and a goal adjustment
  (cut −20%, maintain, bulk +15%), then splits macros (2 g/kg protein, 25%
  calories from fat, remainder as carbs) across four meals.
- **Progress logging** stores every set (reps + weight) per exercise per day;
  the Progress page charts the best weight logged per session for any
  exercise you've tracked.

## Notes

- Auth uses bcryptjs and a signed JWT (30-day expiry) — no native binary
  dependencies, so `npm install` should be trouble-free on any machine.
- The custom cursor (`CustomCursor.tsx`) automatically disables itself on
  touch devices.
- Swap the JSON datastore for a real database by replacing `backend/src/db.js`
  — every route only talks to `db.get/insert/update/filter/find`, so the rest
  of the app doesn't need to change.
