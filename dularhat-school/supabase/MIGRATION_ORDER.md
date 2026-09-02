# Remote Database Migration Checklist

This document details the exact SQL migration order required to initialize your remote Supabase database with all features from Phases A–D and the critical Security Fix.

> **CRITICAL**: The tests proved that **none** of these files have been executed remotely yet. Your remote database has no tables and no storage buckets. You must execute them in the exact order specified below.

## 1. Inventory of SQL Files

### A. `schema.sql` (Base Schema)
- **Tables Created**: `school_settings`, `notices`, `gallery`, `teachers`, `staff`
- **Columns**: Standard CMS columns (UUIDs, multi-lingual text, `is_published`/`is_active`, `updated_at`)
- **Indexes**: (Implicit primary keys)
- **Functions/Triggers**: Creates the global `handle_updated_at()` Postgres function and attaches it to the tables.
- **RLS Policies**: Creates Public Read policies. (Also creates insecure Admin policies which will be dropped later).
- **Safe to execute?**: Yes, must be first.

### B. `documents_schema.sql`
- **Tables Created**: `documents`
- **Columns**: `title_bn`, `title_en`, `description_bn`, `category`, `file_url`, `file_name`, `file_size`, `mime_type`, `is_published`, `sort_order`, `created_at`, `updated_at`
- **Indexes**: `category`, `is_published`, `sort_order`
- **Functions/Triggers**: Attaches `handle_updated_at()`
- **RLS Policies**: Creates Public Read policy.
- **Safe to execute?**: Yes, requires `schema.sql` to run first (depends on `handle_updated_at()`).

### C. `committee_schema.sql`
- **Tables Created**: `committee`
- **Columns**: `name_bn`, `name_en`, `designation_bn`, `designation_en`, `photo_url`, `sort_order`, `is_active`, `created_at`, `updated_at`
- **Indexes**: `is_active`, `sort_order`
- **Functions/Triggers**: Attaches `handle_updated_at()`
- **RLS Policies**: Creates Public Read policy.
- **Safe to execute?**: Yes, requires `schema.sql` to run first.

### D. `results_schema.sql`
- **Tables Created**: `results`
- **Columns**: `title_bn`, `exam_type`, `year`, `file_url`, `file_name`, `file_size`, `mime_type`, `is_published`, `sort_order`, etc.
- **Constraints**: `check_exam_type`
- **Indexes**: `exam_type`, `year`, `is_published`, `sort_order`
- **Functions/Triggers**: Attaches `handle_updated_at()`
- **RLS Policies**: Creates Public Read policy. (Creates insecure Admin policy which will be dropped).
- **Safe to execute?**: Yes, requires `schema.sql` to run first.

### E. `security_fix.sql` (Security Hardening)
- **Tables Created**: `admin_users` (references `auth.users`)
- **Functions**: `is_admin()` (SECURITY DEFINER)
- **Storage Buckets**: Creates `school-media` bucket.
- **Storage Policies**: Public read; Admin-only insert, update, delete on `school-media`.
- **RLS Policies**: 
  - Drops insecure policies across ALL 8 CMS tables.
  - Creates secure `to authenticated using (public.is_admin())` policies for all CMS mutations.
- **Dependencies**: Because this script modifies policies on `committee`, `documents`, and `results`, **it must run absolutely last**, after all other tables exist.

---

## 2. Remote Database Requirements Checklist

I have cross-referenced the application code (`src/app/admin/*/actions.ts`, public routes, etc.). Every table referenced in the Next.js codebase is explicitly covered by these migrations.

- [x] `notices`
- [x] `gallery`
- [x] `teachers`
- [x] `staff`
- [x] `committee`
- [x] `documents`
- [x] `results`
- [x] `school_settings`
- [x] `admin_users`
- [x] required indexes
- [x] RLS enabled on all tables
- [x] Storage buckets (`school-media`)
- [x] Storage policies
- [x] `is_admin()` function
- [x] required constraints (`check_exam_type`)

---

## 3. Exact Execution Order

Please open your Supabase Dashboard -> **SQL Editor**, and copy/paste/execute the contents of these files in this exact sequence:

1. **`supabase/schema.sql`**
2. **`supabase/documents_schema.sql`**
3. **`supabase/committee_schema.sql`**
4. **`supabase/results_schema.sql`**
5. **`supabase/security_fix.sql`**

> **IMPORTANT FINAL STEP**:
> After running #5, look at the very bottom of `security_fix.sql`. You must uncomment the final `INSERT` statement and replace the UUID with your actual user ID from the Supabase Authentication page to bootstrap your admin access.

---

*Once you have completed this checklist, I will run the final direct-API security tests to prove the remote backend is locked down before we proceed to Academic CMS.*
