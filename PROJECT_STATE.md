# PROJECT_STATE.md — Dularhat Secondary School Website

> **CRITICAL**: Any agent resuming this project MUST read this file first, then inspect the actual code before making any changes.

---

## 1. Project Overview

| Field | Value |
|-------|-------|
| **Project** | New production-ready website for Dularhat Secondary School |
| **Objective** | Research, design, and build a modern bilingual (Bengali/English) school website |
| **Content source** | https://dularhatsecondaryschool.edu.bd/ |
| **UX/Design reference** | https://badrakandahighschool.edu.bd/index.html (inspiration only — NO content or code copying) |
| **Project root** | `F:\antigravity\dularhatsecondaryschool\` |
| **Next.js project** | `F:\antigravity\dularhatsecondaryschool\dularhat-school\` |
| **Research audit** | `F:\antigravity\dularhatsecondaryschool\website-audit\` |

### Technology Stack
- **Framework**: Next.js 16.3.4 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **Icons**: lucide-react
- **Utilities**: clsx, tailwind-merge, class-variance-authority
- **Font**: `@fontsource-variable/noto-sans-bengali` (self-hosted via npm — build-time safe)
- **Database** (planned): Supabase PostgreSQL
- **Storage** (planned): Supabase Storage
- **Auth** (planned): Supabase Auth (admin panel)

---

## 2. Current Status

```
COMPLETED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phase 1-15: Research & Content Audit
  ✅ Crawled dularhatsecondaryschool.edu.bd
  ✅ Discovered sitemap.xml (6 pages found)
  ✅ Extracted school profile (EIIN, address, contact, history)
  ✅ Analyzed website structure (PHP/JS SPA — content rendered client-side)
  ✅ Searched secondary sources (Sohopathi, honoursadmission.com)
  ✅ Created website-audit/ directory with all audit files

Phase 16: Design Analysis
  ✅ Documented design decisions in website-audit/design-analysis.md
  ✅ Determined color scheme (green #016B00 primary, amber secondary)
  ✅ Typography: Noto Sans Bengali + modern system stack

Phase 22-23: Technical Architecture
  ✅ Next.js project created and npm installed (dularhat-school/)
  ✅ Additional packages installed (lucide-react, clsx, tailwind-merge, cva)
  ✅ Database schema designed (website-audit/database-schema.sql)

Implementation — Core
  ✅ src/data/school-data.ts — all verified school data
  ✅ src/contexts/LanguageContext.tsx — Bengali/English language provider
  ✅ src/app/globals.css — Tailwind v4 + CSS variables
  ✅ src/app/layout.tsx — root layout with font, metadata, SEO
  ✅ src/app/page.tsx — homepage assembler
  ✅ src/components/layout/TopBar.tsx
  ✅ src/components/layout/Header.tsx (sticky, mobile drawer, dropdowns)
  ✅ src/components/layout/Footer.tsx
  ✅ src/components/ui/PageHeader.tsx — shared page header component
  ✅ src/components/ui/PageSidebar.tsx — shared sidebar component
  ✅ src/components/home/HeroSection.tsx
  ✅ src/components/home/StatsSection.tsx
  ✅ src/components/home/AboutSection.tsx
  ✅ src/components/home/HeadmasterSection.tsx
  ✅ src/components/home/NoticesSection.tsx (with sample data)
  ✅ src/components/home/QuickLinksSection.tsx
  ✅ src/components/home/AcademicsSection.tsx
  ✅ src/components/home/GallerySection.tsx (with placeholder)
  ✅ src/components/home/ContactSection.tsx

Implementation — All Pages
  ✅ src/app/about/page.tsx
  ✅ src/app/about/history/page.tsx
  ✅ src/app/about/mission/page.tsx
  ✅ src/app/administration/page.tsx
  ✅ src/app/administration/headmaster/page.tsx
  ✅ src/app/administration/committee/page.tsx
  ✅ src/app/teachers/page.tsx
  ✅ src/app/staff/page.tsx
  ✅ src/app/academics/page.tsx
  ✅ src/app/academics/routine/page.tsx
  ✅ src/app/academics/examination/page.tsx
  ✅ src/app/admission/page.tsx
  ✅ src/app/notices/page.tsx
  ✅ src/app/notices/[id]/page.tsx
  ✅ src/app/results/page.tsx
  ✅ src/app/gallery/page.tsx
  ✅ src/app/contact/page.tsx

Infrastructure
  ✅ next.config.ts — image remotePatterns configured
  ✅ src/app/sitemap.ts — sitemap.xml generation
  ✅ src/app/robots.ts — robots.txt
  ✅ npm run build — PASSES with zero errors (22 static routes)

NOT STARTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⬜ Supabase integration (database + storage)
  ⬜ Admin dashboard (/admin routes)

BLOCKED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🚫 Supabase credentials — need user to provide SUPABASE_URL and SUPABASE_ANON_KEY
  🚫 Actual school images — source website content is JS-rendered, images not extractable by static crawl
  🚫 Headmaster name/photo — not publicly available online
  🚫 Individual teacher data — not publicly available (CMS-rendered)
  🚫 Actual notice data — not publicly available (CMS-rendered)
```

---

## 3. Current Architecture

### Folder Structure
```
F:\antigravity\dularhatsecondaryschool\
├── PROJECT_STATE.md                   ← THIS FILE
├── website-audit/                     ← Research/content audit
│   ├── school-profile.json            ← All verified school data
│   ├── contacts.json
│   ├── administration.json
│   ├── teachers.json
│   ├── staff.json
│   ├── academics.json
│   ├── notices.json
│   ├── gallery.json
│   ├── sitemap.md
│   ├── design-analysis.md
│   ├── database-schema.sql
│   └── school-data.ts                 ← TypeScript version (reference)
└── dularhat-school/                   ← Next.js project root
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    ├── postcss.config.mjs
    └── src/
        ├── app/
        │   ├── globals.css
        │   ├── layout.tsx             ← Root layout, fonts, metadata
        │   ├── page.tsx               ← Homepage
        │   └── about/
        │       └── page.tsx           ← About page
        ├── components/
        │   ├── layout/
        │   │   ├── TopBar.tsx
        │   │   ├── Header.tsx
        │   │   └── Footer.tsx
        │   └── home/
        │       ├── HeroSection.tsx
        │       ├── StatsSection.tsx
        │       ├── AboutSection.tsx
        │       ├── HeadmasterSection.tsx
        │       ├── NoticesSection.tsx
        │       ├── QuickLinksSection.tsx
        │       ├── AcademicsSection.tsx
        │       ├── GallerySection.tsx
        │       └── ContactSection.tsx
        ├── contexts/
        │   └── LanguageContext.tsx    ← Bengali/English toggle
        └── data/
            └── school-data.ts         ← All school constants
```

### Routes (App Router)
```
/ ......................... Homepage (all sections)
/about ..................... School overview + history + mission
/about/history ............. School history (TODO)
/about/mission ............. Mission & Vision (TODO)
/administration ............ Admin overview (TODO)
/administration/headmaster . Headmaster's message (TODO)
/administration/committee .. Managing committee (TODO)
/teachers .................. Teacher list (TODO)
/staff ..................... Staff list (TODO)
/academics ................. Classes & subjects (TODO)
/academics/routine ......... Class/exam routine (TODO)
/academics/examination ..... Exam info (TODO)
/admission ................. Admission info (TODO)
/notices ................... Notice board (TODO)
/notices/[id] .............. Notice detail (TODO)
/results ................... Exam results (TODO)
/gallery ................... Photo gallery (TODO)
/contact ................... Contact page (TODO)
/admin ..................... Admin dashboard (TODO — protected)
```

### Key Components
| Component | Path | Purpose |
|-----------|------|---------|
| `LanguageContext` | `src/contexts/LanguageContext.tsx` | Bengali/English state + `t()` helper |
| `schoolData` | `src/data/school-data.ts` | All verified school constants |
| `navLinks` | `src/data/school-data.ts` | Navigation structure |
| `TopBar` | `src/components/layout/TopBar.tsx` | Phone/email/language toggle (desktop) |
| `Header` | `src/components/layout/Header.tsx` | Sticky nav with mobile drawer |
| `Footer` | `src/components/layout/Footer.tsx` | Site footer with links + contact |

---

## 4. Design System

### Colors
```css
--color-primary:      #016B00   /* School green — primary brand */
--color-primary-dark: #024D00   /* Darker green — hover states */
--color-primary-light: #02A200  /* Lighter green — accents */
--color-secondary:    #D97706   /* Amber — secondary accent */
```

### Typography
- **Bengali font**: Noto Sans Bengali (Google Fonts, weights 300/400/500/600/700/800)
- **English**: system-ui / sans-serif fallback
- **Font variable**: `--font-noto-bengali`

### Key Design Conventions
- `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` — standard container
- `rounded-xl` / `rounded-2xl` — border radius for cards
- Section headings always have a `w-16 h-1 bg-[#016B00] rounded` underline
- Category badges use colored pill styles
- Language context: `t(bilingualObject)` returns the correct language string
- All bilingual strings use `{ bengali: "...", english: "..." }` shape

### Responsive Breakpoints (Tailwind defaults)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## 5. Content Status

### Verified School Data (in `src/data/school-data.ts`)
| Data | Status |
|------|--------|
| School name (Bengali + English) | ✅ Verified |
| EIIN: 101297 | ✅ Verified |
| Established: 1st April 1963 | ✅ Verified |
| Education Board: Barisal | ✅ Verified |
| Address: Dularhat Bazar, Charfashion, Bhola | ✅ Verified |
| Mobile: 01727379120, 01391012970 | ✅ Verified |
| Email: dularhathighschool@gmail.com | ✅ Verified |
| Website: dularhatsecondaryschool.edu.bd | ✅ Verified |
| Tagline (Bengali) | ✅ Verified |
| Classes 6–10 | ✅ Verified |
| 3 Disciplines (Science, Business, Humanities) | ✅ Verified |
| JSC & SSC exam centre | ✅ Verified |
| Founder: Mr. Mahabubur Rahaman | ✅ Verified |
| First Headmaster: Mr. Arab Ali Mia (M.A) | ✅ Verified |
| Logo URL | ✅ Verified (favicon, 32x32) |

### Missing / Unavailable Data
| Data | Status | Reason |
|------|--------|--------|
| Current headmaster name | ❌ Not found | JS-rendered CMS |
| Individual teacher names | ❌ Not found | JS-rendered CMS |
| Staff names | ❌ Not found | JS-rendered CMS |
| Actual notice content | ❌ Not found | JS-rendered CMS |
| Gallery images | ❌ Not found | JS-rendered CMS |
| School phone (landline) | ❌ Not found | Not published |
| Facebook page URL | ❌ Not found | Not confirmed |
| Google Maps link | ❌ Not found | Not provided |
| Admission fees/dates | ❌ Not found | Not published |
| Result statistics | ❌ Not found | Not published |
| Class routine PDFs | ❌ Not found | Not published |
| High-res school logo | ❌ Only favicon | 32x32 only |

---

## 6. Important Architectural Decisions

1. **Next.js App Router** — chosen for SEO (server-side rendering vs current JS-SPA)
2. **Tailwind CSS v4** — latest version, uses `@import "tailwindcss"` not `@tailwind` directives
3. **`"use client"` on interactive components** — all components using `useLanguage()` must be client components
4. **Bilingual pattern**: All user-facing text uses `{ bengali: "...", english: "..." }` objects; the `t()` function from `useLanguage()` returns the correct string
5. **Dularhat is the ONLY content source** — never use Badrakanda content/code
6. **Badrakanda is UX reference only** — site returned 403, so design inspired by standard BD school website patterns
7. **Supabase for backend** — schema designed, not yet connected
8. **Sample data for notices/gallery** — used until Supabase is connected and admin populates real data
9. **No guessed data** — all missing fields use explicit "Not found" or placeholder messages
10. **Admin panel architecture** — planned at `/admin/**` with Supabase Auth protection

---

## 7. Known Problems / TODOs

| Problem | Severity | Resolution |
|---------|----------|------------|
| `src/app/about/page.tsx` uses `"use client"` at page level — should be default export from a separate client component | Medium | Refactor: page.tsx stays server, extract `AboutClient.tsx` |
| No `next.config.ts` image domains for school logo URL | Medium | Add `dularhatsecondaryschool.edu.bd` to `remotePatterns` |
| Gallery shows placeholders only | Low | Need actual images from school |
| Notices show sample data only | Low | Need Supabase connection + admin to add real notices |
| TopBar not visible on mobile (hidden md:block) — language switch only in mobile header | Low | By design — mobile has language switch in Header |
| Supabase not connected | Medium | Need credentials from user |
| No `sitemap.xml` generation | Low | Add `app/sitemap.ts` |
| No `robots.txt` | Low | Add `app/robots.ts` |
| Build not tested yet | High | Run `npm run build` after pages complete |
| `about/page.tsx` mixes `"use client"` inline function — invalid in Next.js 13+ | High | Fix immediately |

---

## 8. Last Completed Task

```
Last completed (2026-09-01, ~1:08 PM +06:00):
- Hero Section & Shrinking Sticky Navbar Corrections Implemented:
  ✅ Completely removed the yellow diagonal stripe from the Hero Section.
  ✅ School photograph (/images/school-photo-main.jpg) is clean, unobstructed, and visually prominent.
  ✅ Fluid multi-shade organic green wave (#76C043 -> #3EA635 -> #016B00) on the left side.
  ✅ All previous verified Dularhat information preserved:
     - Established: ১৯৬৩ (1963)
     - EIIN: 101297
     - School Name: দুলারহাট মাধ্যমিক বিদ্যালয়
     - Location: চরফ্যাশন, ভোলা, বাংলাদেশ
     - Tagline: "দক্ষ মানবসম্পদ গড়ে তুলতে আমরা অঙ্গীকারাবদ্ধ"
     - Full verified school description
     - Pill CTAs with ▶ icons: "বিদ্যালয় সম্পর্কে" & "সর্বশেষ নোটিশ"
     - Quick statistics ribbon (১৯৬৩, ৫টি শ্রেণি, ৩টি বিভাগ, JSC ও SSC কেন্দ্র)
     - Floating bottom-right phone enquiry widget
  ✅ Two-State Shrinking Sticky Navbar (Header.tsx):
     - State 1 (Top): Spacious, larger logo (56px), clean white background.
     - State 2 (Scrolled): Smoothly shrinks into a compact sticky bar (40px logo, tighter padding, shadow).
     - Full official logo used with compact typography.
     - Separate competing TopBar disabled so navbar & hero remain dominant.
- Ran `npm run build` — PASSES with zero errors (22 static routes, 1 dynamic route)
```

---

## 9. Next Task (IMMEDIATE)

**The website frontend is complete and builds cleanly. Next steps are backend integration:**

### Step 1 — Supabase integration (requires user credentials)
Ask user for:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
Then:
1. Install `@supabase/supabase-js`
2. Create `src/lib/supabase.ts`
3. Run the SQL schema from `website-audit/database-schema.sql` in Supabase SQL editor
4. Replace sample notice data with real Supabase queries
5. Replace gallery placeholders with Supabase Storage images

### Step 2 — Admin dashboard
Create `/admin` routes protected by Supabase Auth:
- `/admin` — dashboard overview
- `/admin/notices` — CRUD for notices
- `/admin/gallery` — upload/manage gallery images
- `/admin/login` — login page

### Step 3 — Optional enhancements
- Real Google Maps embed for contact page
- PWA manifest for mobile install
- Analytics (if desired)

---

## 10. Continuation Instructions

When resuming this project:

1. **READ THIS FILE FIRST**
2. Read `dularhat-school/src/data/school-data.ts` — understand the bilingual data shape
3. Read `dularhat-school/src/contexts/LanguageContext.tsx` — understand the `t()` helper
4. Inspect existing components in `src/components/` before creating new ones
5. Check `npm run build` output for errors before adding more pages
6. Follow the bilingual pattern: `{ bengali: "...", english: "..." }` for all user-facing text
7. All components using `useLanguage()` MUST have `"use client"` directive
8. Never copy Badrakanda content — Dularhat is the only content source
9. Update this file after completing each meaningful step

### How to run the dev server:
```bash
cd F:\antigravity\dularhatsecondaryschool\dularhat-school
npm run dev
```
Then open http://localhost:3000

### How to build:
```bash
cd F:\antigravity\dularhatsecondaryschool\dularhat-school
npm run build
```
