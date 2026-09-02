-- ==============================================================================
-- Phase E: Academic CMS Schema
-- ==============================================================================

create table if not exists public.academic_events (
  id uuid primary key default uuid_generate_v4(),
  title_bn text not null,
  title_en text,
  description_bn text,
  description_en text,
  event_date date not null,
  end_date date, -- optional, for multi-day events
  event_type text not null default 'general', -- 'holiday', 'exam', 'event', 'general'
  is_published boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes
create index if not exists academic_events_date_idx on public.academic_events (event_date);
create index if not exists academic_events_published_idx on public.academic_events (is_published);

-- Enable RLS
alter table public.academic_events enable row level security;

-- Trigger for updated_at
create trigger handle_academic_events_updated_at 
before update on public.academic_events 
for each row execute procedure public.handle_updated_at();

-- Public can read published academic events
create policy "Public can view published academic events" 
  on public.academic_events for select using (is_published = true);

-- Secure Admin policies (relies on public.is_admin() from security_fix.sql)
create policy "Admins have full access to academic events" 
  on public.academic_events to authenticated using (public.is_admin()) with check (public.is_admin());
