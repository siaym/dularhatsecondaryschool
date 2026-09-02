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
-- ==============================================================================
-- Phase B: Documents CMS Schema
-- ==============================================================================

create table if not exists public.documents (
  id uuid primary key default uuid_generate_v4(),
  title_bn text not null,
  title_en text,
  description_bn text,
  description_en text,
  category text not null,
  file_url text not null,
  file_name text not null,
  file_size bigint not null,
  mime_type text not null,
  is_published boolean default false not null,
  sort_order integer default 10 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes
create index if not exists documents_category_idx on public.documents (category);
create index if not exists documents_is_published_idx on public.documents (is_published);
create index if not exists documents_sort_order_idx on public.documents (sort_order);

-- Enable RLS
alter table public.documents enable row level security;

-- Trigger for updated_at
create trigger handle_documents_updated_at 
before update on public.documents 
for each row execute procedure public.handle_updated_at();

-- Public can read published documents
create policy "Public can view published documents" on public.documents 
  for select using (is_published = true);

-- ==============================================================================
-- Phase D: Committee CMS Schema
-- ==============================================================================

create table if not exists public.committee (
  id uuid primary key default uuid_generate_v4(),
  name_bn text not null,
  name_en text,
  designation_bn text not null,
  designation_en text,
  photo_url text,
  sort_order integer default 10 not null,
  is_active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes
create index if not exists committee_is_active_idx on public.committee (is_active);
create index if not exists committee_sort_order_idx on public.committee (sort_order);

-- Enable RLS
alter table public.committee enable row level security;

-- Trigger for updated_at
create trigger handle_committee_updated_at 
before update on public.committee 
for each row execute procedure public.handle_updated_at();

-- Public can read active committee members
create policy "Public can view active committee members" on public.committee 
  for select using (is_active = true);
-- ==============================================================================
-- Phase C: Results CMS
-- Run this in the Supabase SQL Editor
-- ==============================================================================

create table public.results (
  id uuid primary key default uuid_generate_v4(),
  title_bn text not null,
  title_en text,
  exam_type text not null, -- 'SSC', 'JSC', 'School Examination', 'Other'
  year integer not null,
  description_bn text,
  description_en text,
  file_url text not null,
  file_name text not null,
  file_size bigint not null,
  mime_type text not null,
  is_published boolean default false not null,
  sort_order integer default 10 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint check_exam_type check (exam_type in ('SSC', 'JSC', 'School Examination', 'Other'))
);

-- Indexes for performance
create index results_exam_type_idx on public.results (exam_type);
create index results_year_idx on public.results (year);
create index results_is_published_idx on public.results (is_published);
create index results_sort_order_idx on public.results (sort_order);

-- Enable RLS
alter table public.results enable row level security;

-- Public can read published results
create policy "Public can view published results" on public.results 
  for select using (is_published = true);

-- Admins (Authenticated Users) can do everything
create policy "Admins have full access to results" on public.results 
  to authenticated using (true) with check (true);

-- Trigger for updated_at
create trigger handle_results_updated_at 
  before update on public.results 
  for each row execute procedure public.handle_updated_at();
-- ==============================================================================
-- CRITICAL SECURITY FIXES
-- Run this in the Supabase SQL Editor
-- ==============================================================================

-- 1. Create admin_users table
create table if not exists public.admin_users (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on admin_users
alter table public.admin_users enable row level security;

-- 2. Create the is_admin() helper function
-- This avoids circular dependencies and safely checks if the requesting user is in the admin_users table.
-- Using SECURITY DEFINER so it can access admin_users regardless of policies, 
-- but we restrict it to only check auth.uid().
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from admin_users
    where user_id = auth.uid()
  );
$$;

-- 3. Policy for admin_users (Admins can view and manage other admins)
create policy "Admins can view admins" on public.admin_users for select using (public.is_admin());
create policy "Admins can insert admins" on public.admin_users for insert with check (public.is_admin());
create policy "Admins can update admins" on public.admin_users for update using (public.is_admin());
create policy "Admins can delete admins" on public.admin_users for delete using (public.is_admin());

-- 4. Rebuild RLS Policies for CMS Tables
-- First, drop the insecure 'Admins have full access' policies
drop policy if exists "Admins have full access to settings" on public.school_settings;
drop policy if exists "Admins have full access to notices" on public.notices;
drop policy if exists "Admins have full access to gallery" on public.gallery;
drop policy if exists "Admins have full access to teachers" on public.teachers;
drop policy if exists "Admins have full access to staff" on public.staff;
drop policy if exists "Admins have full access to committee" on public.committee;
drop policy if exists "Admins have full access to documents" on public.documents;
drop policy if exists "Admins have full access to results" on public.results;

-- Create secure policies utilizing is_admin()
-- Settings
create policy "Admins manage settings" on public.school_settings to authenticated using (public.is_admin()) with check (public.is_admin());

-- Notices
create policy "Admins manage notices" on public.notices to authenticated using (public.is_admin()) with check (public.is_admin());

-- Gallery
create policy "Admins manage gallery" on public.gallery to authenticated using (public.is_admin()) with check (public.is_admin());

-- Teachers
create policy "Admins manage teachers" on public.teachers to authenticated using (public.is_admin()) with check (public.is_admin());

-- Staff
create policy "Admins manage staff" on public.staff to authenticated using (public.is_admin()) with check (public.is_admin());

-- Committee
create policy "Admins manage committee" on public.committee to authenticated using (public.is_admin()) with check (public.is_admin());

-- Documents
create policy "Admins manage documents" on public.documents to authenticated using (public.is_admin()) with check (public.is_admin());

-- Results
create policy "Admins manage results" on public.results to authenticated using (public.is_admin()) with check (public.is_admin());


-- 5. Storage Security Policies for 'school-media' bucket
-- Ensure bucket exists (or create if missing)
insert into storage.buckets (id, name, public) 
values ('school-media', 'school-media', true) 
on conflict (id) do nothing;

-- Drop any existing insecure storage policies on this bucket
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Auth Upload" on storage.objects;
drop policy if exists "Auth Update" on storage.objects;
drop policy if exists "Auth Delete" on storage.objects;
drop policy if exists "Public read access" on storage.objects;
drop policy if exists "Admin full access" on storage.objects;
drop policy if exists "Public read school-media" on storage.objects;
drop policy if exists "Admin manage school-media" on storage.objects;

-- Create explicit policies
create policy "Public read school-media" 
on storage.objects for select 
using (bucket_id = 'school-media');

create policy "Admin insert school-media" 
on storage.objects for insert 
to authenticated 
with check (bucket_id = 'school-media' and public.is_admin());

create policy "Admin update school-media" 
on storage.objects for update 
to authenticated 
using (bucket_id = 'school-media' and public.is_admin());

create policy "Admin delete school-media" 
on storage.objects for delete 
to authenticated 
using (bucket_id = 'school-media' and public.is_admin());


-- ==============================================================================
-- 6. MANUAL BOOTSTRAP INSTRUCTION
-- ==============================================================================
-- IMPORTANT: You must associate your own account as the first admin.
-- Find your auth.users UUID in the Supabase Dashboard -> Authentication -> Users.
-- Then uncomment and run the following line (replace the UUID with yours):
-- 
-- insert into public.admin_users (user_id) values ('YOUR-AUTH-UUID-HERE');
-- ==============================================================================
