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

