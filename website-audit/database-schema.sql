-- Dularhat Secondary School Database Schema
-- Designed for PostgreSQL (Supabase)

-- ============================================
-- SCHOOL PROFILE
-- ============================================
CREATE TABLE school_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value_bn TEXT,
  value_en TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- NOTICES
-- ============================================
CREATE TABLE notice_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_bn TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  color TEXT DEFAULT '#048200',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE notices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_bn TEXT NOT NULL,
  title_en TEXT,
  description_bn TEXT,
  description_en TEXT,
  category_id UUID REFERENCES notice_categories(id),
  document_url TEXT,
  is_published BOOLEAN DEFAULT true,
  is_important BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- TEACHERS
-- ============================================
CREATE TABLE teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_bn TEXT NOT NULL,
  name_en TEXT,
  designation_bn TEXT,
  designation_en TEXT,
  subject_bn TEXT,
  subject_en TEXT,
  qualification TEXT,
  joining_date DATE,
  registration_number TEXT,
  photo_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_headmaster BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- STAFF
-- ============================================
CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_bn TEXT NOT NULL,
  name_en TEXT,
  position_bn TEXT,
  position_en TEXT,
  qualification TEXT,
  photo_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ADMINISTRATION / COMMITTEE
-- ============================================
CREATE TABLE administrators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_bn TEXT NOT NULL,
  name_en TEXT,
  role_bn TEXT NOT NULL,
  role_en TEXT,
  qualification TEXT,
  message_bn TEXT,
  message_en TEXT,
  photo_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- GALLERY
-- ============================================
CREATE TABLE gallery_albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_bn TEXT NOT NULL,
  title_en TEXT,
  description_bn TEXT,
  description_en TEXT,
  cover_image_url TEXT,
  event_date DATE,
  is_published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id UUID REFERENCES gallery_albums(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption_bn TEXT,
  caption_en TEXT,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ACADEMIC CLASSES & SUBJECTS
-- ============================================
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_bn TEXT NOT NULL,
  name_en TEXT,
  grade_number INTEGER,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_bn TEXT NOT NULL,
  name_en TEXT,
  class_id UUID REFERENCES classes(id),
  discipline TEXT, -- Science, Humanities, Business
  is_compulsory BOOLEAN DEFAULT true
);

-- ============================================
-- ROUTINES
-- ============================================
CREATE TABLE routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_bn TEXT NOT NULL,
  title_en TEXT,
  class_id UUID REFERENCES classes(id),
  routine_type TEXT NOT NULL, -- 'class' | 'exam'
  document_url TEXT,
  is_published BOOLEAN DEFAULT true,
  valid_from DATE,
  valid_to DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- RESULTS
-- ============================================
CREATE TABLE results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_bn TEXT NOT NULL,
  title_en TEXT,
  exam_type TEXT NOT NULL, -- 'JSC' | 'SSC'
  exam_year INTEGER,
  board TEXT DEFAULT 'Barisal',
  total_appeared INTEGER,
  total_passed INTEGER,
  pass_rate DECIMAL(5,2),
  a_plus_count INTEGER,
  gpa_5 INTEGER,
  document_url TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ADMISSIONS
-- ============================================
CREATE TABLE admissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_bn TEXT NOT NULL,
  title_en TEXT,
  class_id UUID REFERENCES classes(id),
  academic_year TEXT,
  start_date DATE,
  end_date DATE,
  description_bn TEXT,
  description_en TEXT,
  document_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- DOCUMENTS
-- ============================================
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_bn TEXT NOT NULL,
  title_en TEXT,
  document_type TEXT, -- 'pdf' | 'doc' | 'image'
  category TEXT, -- 'notice' | 'routine' | 'result' | 'admission' | 'circular' | 'other'
  document_url TEXT NOT NULL,
  is_published BOOLEAN DEFAULT true,
  published_date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- SITE SETTINGS
-- ============================================
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  type TEXT DEFAULT 'text', -- 'text' | 'image' | 'boolean' | 'number'
  label TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ADMIN USERS (managed by Supabase Auth)
-- ============================================
CREATE TABLE admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT,
  role TEXT DEFAULT 'editor', -- 'super_admin' | 'admin' | 'editor'
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all tables
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE administrators ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_profile ENABLE ROW LEVEL SECURITY;

-- Public read for published content
CREATE POLICY "Public can read published notices" ON notices
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public can read active teachers" ON teachers
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can read active staff" ON staff
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can read administrators" ON administrators
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can read published albums" ON gallery_albums
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public can read gallery images" ON gallery_images
  FOR SELECT TO public USING (true);

CREATE POLICY "Public can read published routines" ON routines
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public can read published results" ON results
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public can read active admissions" ON admissions
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can read published documents" ON documents
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public can read school profile" ON school_profile
  FOR SELECT TO public USING (true);

-- Admin full access (authenticated users with admin role)
CREATE POLICY "Admins can manage notices" ON notices
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage teachers" ON teachers
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage staff" ON staff
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Indexes
CREATE INDEX idx_notices_published ON notices(is_published, published_at DESC);
CREATE INDEX idx_notices_category ON notices(category_id);
CREATE INDEX idx_teachers_active ON teachers(is_active, sort_order);
CREATE INDEX idx_staff_active ON staff(is_active, sort_order);
CREATE INDEX idx_gallery_albums_published ON gallery_albums(is_published);
CREATE INDEX idx_gallery_images_album ON gallery_images(album_id, sort_order);
CREATE INDEX idx_results_year ON results(exam_year DESC, exam_type);

-- Initial seed data for notice categories
INSERT INTO notice_categories (name_bn, name_en, slug, color) VALUES
  ('সাধারণ', 'General', 'general', '#6B7280'),
  ('একাডেমিক', 'Academic', 'academic', '#2563EB'),
  ('পরীক্ষা', 'Examination', 'examination', '#DC2626'),
  ('ভর্তি', 'Admission', 'admission', '#059669'),
  ('ফলাফল', 'Result', 'result', '#D97706'),
  ('ছুটি', 'Holiday', 'holiday', '#7C3AED'),
  ('অনুষ্ঠান', 'Event', 'event', '#DB2777');

-- Initial seed for classes
INSERT INTO classes (name_bn, name_en, grade_number, sort_order) VALUES
  ('ষষ্ঠ শ্রেণি', 'Class Six', 6, 1),
  ('সপ্তম শ্রেণি', 'Class Seven', 7, 2),
  ('অষ্টম শ্রেণি', 'Class Eight', 8, 3),
  ('নবম শ্রেণি', 'Class Nine', 9, 4),
  ('দশম শ্রেণি', 'Class Ten', 10, 5);
