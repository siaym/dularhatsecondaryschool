DROP TABLE IF EXISTS public.school_settings;

CREATE TABLE public.school_settings (
  id integer primary key default 1,
  school_name_bn text,
  school_name_en text,
  phone text,
  email text,
  address_bn text,
  address_en text,
  established_year integer,
  eiin text,
  facebook_url text,
  youtube_url text,
  headmaster_message_bn text,
  headmaster_message_en text,
  chairman_message_bn text,
  chairman_message_en text,
  footer_description_bn text,
  footer_description_en text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

ALTER TABLE public.school_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published settings" ON public.school_settings FOR SELECT USING (true);
CREATE POLICY "Admins have full access to settings" ON public.school_settings TO authenticated USING (true) WITH CHECK (true);

INSERT INTO public.school_settings (id, school_name_bn, school_name_en, phone, email, address_bn, address_en, established_year, eiin) 
VALUES (
  1, 
  'দুলারহাট মাধ্যমিক বিদ্যালয়', 
  'Dularhat Secondary School', 
  '01727379120', 
  'dularhathighschool@gmail.com',
  'দুলারহাট বাজার, চরফ্যাশন, ভোলা',
  'Dularhat Bazar, Charfashion, Bhola',
  1963,
  '101297'
);
