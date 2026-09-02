ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE public.staff ADD COLUMN IF NOT EXISTS email text;
