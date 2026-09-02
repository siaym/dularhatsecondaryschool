export type Notice = {
  id: string;
  title_bn: string;
  title_en: string;
  description_bn: string;
  description_en: string;
  category: string;
  is_important: boolean;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  attachment_url: string | null;
};

export type GalleryItem = {
  id: string;
  title_bn: string;
  title_en: string;
  description_bn: string;
  description_en: string;
  category: string;
  image_url: string;
  is_published: boolean;
  display_order: number;
  created_at: string;
};

export type Teacher = {
  id: string;
  name_bn: string;
  name_en: string | null;
  designation_bn: string;
  designation_en: string | null;
  subject_bn: string | null;
  subject_en: string | null;
  photo_url: string | null;
  phone: string | null;
  email: string | null;
  sort_order: number;
  is_headmaster: boolean;
  is_active: boolean;
  created_at: string;
};

export type Staff = {
  id: string;
  name_bn: string;
  name_en: string | null;
  designation_bn: string;
  designation_en: string | null;
  photo_url: string | null;
  phone: string | null;
  email: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type SchoolSettings = {
  id: number;
  school_name_bn: string | null;
  school_name_en: string | null;
  phone: string | null;
  email: string | null;
  address_bn: string | null;
  address_en: string | null;
  established_year: number | null;
  eiin: string | null;
  facebook_url: string | null;
  youtube_url: string | null;
  headmaster_message_bn: string | null;
  headmaster_message_en: string | null;
  chairman_message_bn: string | null;
  chairman_message_en: string | null;
  footer_description_bn: string | null;
  footer_description_en: string | null;
  updated_at: string;
};

export type DocumentItem = {
  id: string;
  title_bn: string;
  title_en: string | null;
  description_bn: string | null;
  description_en: string | null;
  category: string;
  file_url: string;
  file_name: string | null;
  file_size: number | null;
  mime_type: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type CommitteeItem = {
  id: string;
  name_bn: string;
  name_en: string | null;
  designation_bn: string;
  designation_en: string | null;
  photo_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ResultItem = {
  id: string;
  title_bn: string;
  title_en: string | null;
  exam_type: 'SSC' | 'JSC' | 'School Examination' | 'Other';
  year: number;
  description_bn: string | null;
  description_en: string | null;
  file_url: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};
