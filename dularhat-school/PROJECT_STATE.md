# Dularhat Secondary School - Project State

## Current Module: Phase C (Results CMS)

### 1. Database Changes
- Prepared `supabase/results_schema.sql` migration script.
- Defines `results` table with specific fields (`exam_type`, `year`, `file_url`, etc.) and a constraint on `exam_type` (`'SSC'`, `'JSC'`, `'School Examination'`, `'Other'`).
- Awaiting manual execution by the administrator in the Supabase Dashboard.

### 2. Storage Changes
- Reused the `school-media` centralized bucket.
- Result files are routed to the `results/` path within the bucket.
- Max file size configured to 10MB; validated server-side.

### 3. Admin Routes
- Created `/admin/results` for listing results with view/edit/delete actions.
- Created `/admin/results/new` for uploading new results.
- Created `/admin/results/[id]/edit` for editing results and replacing files securely.

### 4. Public Routes
- Created `/results` for presenting published results to students/parents.
- Includes client-side filtering by Year and Exam Type.
- Database query strictly filters `is_published = true` before serving to the client.

### 5. RLS Status
- RLS enabled on the `results` table.
- `Public` can SELECT where `is_published = true`.
- `Authenticated` users have full access (INSERT, UPDATE, DELETE).

### 6. Storage Security Status
- Reused `src/utils/supabase/storage.ts` for standardized upload and deletion.
- Ensures old files are deleted when updated.
- Ensures orphaned uploads are cleaned up if a DB operation fails during creation or updating.
- Safe deletions handled strictly server-side.

### 7. Validation Status
- Input validation handled server-side before interacting with Supabase.
- Validates file extensions, size limits (10MB), string lengths, enum constraints, and valid numerical years.

### 8. Build Status
- `npm run build` is pending execution and verification. Will be verified in the next step.

### 9. Remaining Issues
- **Action Required**: The administrator must execute the `supabase/results_schema.sql` script in the Supabase SQL Editor. 
- Wait for build verification.
