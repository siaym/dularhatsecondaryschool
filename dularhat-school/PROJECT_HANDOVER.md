# Dularhat Secondary School Project Handover

**Welcome, next agent!** You are inheriting a production-ready Next.js codebase that has just completed a massive security audit and hardening phase. Please read this document carefully before modifying any code.

---

## 1. Project Overview & Current State
We are building a bilingual (Bengali/English) institutional website and CMS for Dularhat Secondary School (EIIN 101297). 

**What is completed (Phases A–D):**
- **Public Website**: Homepage (Hero, Stats, Academics preview), Notices, Gallery, Teachers, Staff, Committee, Documents, Results. The UI/UX is fully approved and responsive.
- **Admin Dashboard (`/admin`)**: Fully functional CMS modules for Settings, Notices, Gallery, Teachers, Staff, Committee, Documents, and Results.
- **Database (Supabase)**: All schemas, triggers, and Row Level Security (RLS) policies have been successfully executed on the remote database.
- **Storage**: A centralized Supabase Storage bucket (`school-media`) handles all uploads with strict security policies.

**What is remaining:**
- **Phase E: Academic CMS** (Next immediate task)
- **Phase F: Final Audit & Deployment Prep**

---

## 2. Core Architectural Patterns
You **MUST** adhere to the following established patterns to maintain consistency and security:

### A. Authorization (CRITICAL)
- **`requireAdmin()`**: Found in `src/utils/supabase/admin.ts`. You must invoke `await requireAdmin()` at the top of **every single Server Action** that mutates the database or storage. 
- Do NOT use `const { data: { user } } = await supabase.auth.getUser()`. That only checks if a user is logged in, not if they are an administrator.
- The `admin_users` table restricts CMS access. The remote DB has already been bootstrapped with the headmaster's UID.

### B. Database & RLS
- All new tables must include: `id` (UUID), `is_published` or `is_active` (boolean), `created_at`, and `updated_at`.
- You must create SQL schema files in `supabase/` for any new tables (e.g., `supabase/academic_schema.sql`).
- All new tables must have RLS enabled.
- **Public Policies**: `for select using (is_published = true)`
- **Admin Policies**: `to authenticated using (public.is_admin()) with check (public.is_admin())`

### C. Storage
- **Bucket**: Always use the existing `school-media` bucket. Do not create new buckets.
- **Utility**: Always use `uploadFile` and `deleteFileFromUrl` from `src/utils/supabase/storage.ts` for handling files in Server Actions. It validates MIME types and file sizes.

### D. File Cleanliness
- Ensure there are no TypeScript `any` types in your catch blocks. Use `catch (e: unknown) { throw new Error(e instanceof Error ? e.message : 'Unknown error') }`.
- Run `npm run lint` and `npm run build` frequently. The current build is 100% clean.

---

## 3. Strict Rules & Constraints
1. **DO NOT REDESIGN THE UI**: The user has strictly locked the UI. Do not change colors, typography, navbars, or the homepage hero. Stick to the existing Tailwind utility patterns.
2. **NO SECRETS IN CHAT**: The `SUPABASE_SERVICE_ROLE_KEY` was accidentally leaked previously. It has been rotated. **Never output `.env.local` contents, API keys, or passwords in your chat responses or artifact files.**
3. **DO NOT BUILD AN ERP**: The Academic CMS should be a lightweight informational system (e.g., publishing the syllabus, exam routines, or academic calendar documents), not a heavy student-portal/ERP. Discuss the schema with the user before coding it.

---

## 4. Your First Task: Phase E (Academic CMS)
Your immediate goal upon starting is to engage the user regarding **Phase E: Academic CMS**. 

1. Propose a lightweight SQL schema for the Academic CMS.
2. Draft an implementation plan (`implementation_plan.md`) outlining the server actions and admin UI components.
3. Wait for the user's approval before generating the code.
