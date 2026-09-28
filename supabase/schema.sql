-- Khan Cloth admin schema
-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

create extension if not exists "pgcrypto";

-- Fabrics / collections
create table if not exists public.fabrics (
  id text primary key,
  name text not null,
  category text not null,
  price_per_meter integer not null check (price_per_meter >= 0),
  note text not null default '',
  description text not null default '',
  colors jsonb not null default '[]'::jsonb,
  image text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- FAQs
create table if not exists public.faqs (
  id text primary key,
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Reviews
create table if not exists public.reviews (
  id text primary key,
  name text not null,
  city text not null,
  text text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Meters guide
create table if not exists public.meters_guide (
  id text primary key,
  label text not null,
  meters text not null,
  note text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Public read, authenticated write
alter table public.fabrics enable row level security;
alter table public.faqs enable row level security;
alter table public.reviews enable row level security;
alter table public.meters_guide enable row level security;

drop policy if exists "Public read fabrics" on public.fabrics;
create policy "Public read fabrics" on public.fabrics for select using (true);
drop policy if exists "Auth write fabrics" on public.fabrics;
create policy "Auth write fabrics" on public.fabrics for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Public read faqs" on public.faqs;
create policy "Public read faqs" on public.faqs for select using (true);
drop policy if exists "Auth write faqs" on public.faqs;
create policy "Auth write faqs" on public.faqs for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Public read reviews" on public.reviews;
create policy "Public read reviews" on public.reviews for select using (true);
drop policy if exists "Auth write reviews" on public.reviews;
create policy "Auth write reviews" on public.reviews for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Public read meters" on public.meters_guide;
create policy "Public read meters" on public.meters_guide for select using (true);
drop policy if exists "Auth write meters" on public.meters_guide;
create policy "Auth write meters" on public.meters_guide for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
