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
  sort_order: number;
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
  sort_order: number;
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
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
