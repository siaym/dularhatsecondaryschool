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
