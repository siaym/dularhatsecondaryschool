-- ==============================================================================
-- DULARHAT SECONDARY SCHOOL - SUPABASE INITIAL SCHEMA
-- ==============================================================================

-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. SCHOOL SETTINGS
--    For global configuration that might change (e.g. current headmaster, phone)
-- ------------------------------------------------------------------------------
create table public.school_settings (
  id uuid primary key default uuid_generate_v4(),
  setting_key text unique not null,
  setting_value text not null,
  description text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ------------------------------------------------------------------------------
-- 2. NOTICES
-- ------------------------------------------------------------------------------
create table public.notices (
  id uuid primary key default uuid_generate_v4(),
  title_bn text not null,
  title_en text,
  description_bn text,
  description_en text,
  category text not null, -- e.g. 'exam', 'admission', 'event', 'holiday'
  is_important boolean default false not null,
  attachment_url text,
  is_published boolean default false not null,
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ------------------------------------------------------------------------------
-- 3. GALLERY
-- ------------------------------------------------------------------------------
create table public.gallery (
  id uuid primary key default uuid_generate_v4(),
  title_bn text not null,
  title_en text,
  image_url text not null,
  category text not null, -- e.g. 'building', 'events', 'sports'
  display_order integer default 0 not null,
  is_published boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ------------------------------------------------------------------------------
-- 4. TEACHERS
-- ------------------------------------------------------------------------------
create table public.teachers (
  id uuid primary key default uuid_generate_v4(),
  name_bn text not null,
  name_en text,
  designation_bn text not null,
  designation_en text,
  subject_bn text,
  subject_en text,
  photo_url text,
  sort_order integer default 0 not null,
  is_active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ------------------------------------------------------------------------------
-- 5. STAFF
-- ------------------------------------------------------------------------------
create table public.staff (
  id uuid primary key default uuid_generate_v4(),
  name_bn text not null,
  name_en text,
  designation_bn text not null,
  designation_en text,
  photo_url text,
  sort_order integer default 0 not null,
  is_active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
alter table public.school_settings enable row level security;
alter table public.notices enable row level security;
alter table public.gallery enable row level security;
alter table public.teachers enable row level security;
alter table public.staff enable row level security;

-- 1. Public can read published data
create policy "Public can view published settings" on public.school_settings for select using (true);
create policy "Public can view published notices" on public.notices for select using (is_published = true);
create policy "Public can view published gallery" on public.gallery for select using (is_published = true);
create policy "Public can view active teachers" on public.teachers for select using (is_active = true);
create policy "Public can view active staff" on public.staff for select using (is_active = true);

-- 2. Admins (Authenticated Users) can do everything
-- Note: In Supabase, standard email/password authentication sets role() to 'authenticated'. 
-- This grants full access to anyone who can log in.
create policy "Admins have full access to settings" on public.school_settings to authenticated using (true) with check (true);
create policy "Admins have full access to notices" on public.notices to authenticated using (true) with check (true);
create policy "Admins have full access to gallery" on public.gallery to authenticated using (true) with check (true);
create policy "Admins have full access to teachers" on public.teachers to authenticated using (true) with check (true);
create policy "Admins have full access to staff" on public.staff to authenticated using (true) with check (true);

-- Functions to update 'updated_at' timestamp automatically
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_notices_updated_at before update on public.notices for each row execute procedure public.handle_updated_at();
create trigger handle_gallery_updated_at before update on public.gallery for each row execute procedure public.handle_updated_at();
create trigger handle_teachers_updated_at before update on public.teachers for each row execute procedure public.handle_updated_at();
create trigger handle_staff_updated_at before update on public.staff for each row execute procedure public.handle_updated_at();
