create table if not exists public.workout_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  split_type text not null,
  label text not null,
  days jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  constraint workout_plans_days_is_array check (jsonb_typeof(days) = 'array')
);

create index if not exists workout_plans_user_created_idx
  on public.workout_plans (user_id, created_at desc);

create table if not exists public.diet_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  input jsonb not null,
  bmr integer not null check (bmr > 0),
  tdee integer not null check (tdee > 0),
  calories integer not null check (calories > 0),
  protein integer not null check (protein >= 0),
  carbs integer not null check (carbs >= 0),
  fat integer not null check (fat >= 0),
  goal text not null check (goal in ('cut', 'maintain', 'bulk')),
  meals jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  constraint diet_plans_input_is_object check (jsonb_typeof(input) = 'object'),
  constraint diet_plans_meals_is_array check (jsonb_typeof(meals) = 'array')
);

create index if not exists diet_plans_user_created_idx
  on public.diet_plans (user_id, created_at desc);

create table if not exists public.workout_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  day text not null,
  entries jsonb not null,
  performed_at timestamptz not null default now(),
  constraint workout_logs_entries_is_array check (jsonb_typeof(entries) = 'array')
);

create index if not exists workout_logs_user_performed_idx
  on public.workout_logs (user_id, performed_at desc);

alter table public.workout_plans enable row level security;
alter table public.diet_plans enable row level security;
alter table public.workout_logs enable row level security;

revoke all on public.workout_plans, public.diet_plans, public.workout_logs from anon;
grant select, insert, update, delete on public.workout_plans, public.diet_plans, public.workout_logs to authenticated;

create policy "Users manage their workout plans"
  on public.workout_plans for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users manage their diet plans"
  on public.diet_plans for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users manage their workout logs"
  on public.workout_logs for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

