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
