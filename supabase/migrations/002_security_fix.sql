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
