'use client';

import { createClient } from '@/utils/supabase/client';

export type AcademicEvent = {
  id: string;
  title_bn: string;
  title_en: string | null;
  description_bn: string | null;
  description_en: string | null;
  event_date: string;
  end_date: string | null;
  event_type: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};
