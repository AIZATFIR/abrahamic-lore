-- User profiles — linked 1:1 to auth.users
-- Auth credentials (email/password) stay in Supabase Auth, never here.

create table public.profiles (
  id                    uuid primary key references auth.users(id) on delete cascade,
  display_name          text,
  religion_preference   text check (
                          religion_preference in (
                            'islam','christianity','judaism',
                            'other','multiple','educational','undisclosed'
                          )
                        ),
  learning_preferences  jsonb not null default '[]',
  onboarding_completed  boolean not null default false,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- RLS: users can only read/write their own profile
alter table public.profiles enable row level security;

create policy "own profile read"
  on public.profiles for select
  using (auth.uid() = id);

create policy "own profile insert"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "own profile update"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Keep updated_at current
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();
