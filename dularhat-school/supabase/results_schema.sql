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
