# Dularhat Secondary School — UI/UX Design Specification

> **Version:** 1.0  
> **Date:** 2026-09-01  
> **Reference:** Badrakanda High School (UX patterns) + Original design  
> **Content source:** Verified from dularhatsecondaryschool.edu.bd live crawl  

---

## Table of Contents

1. [Design Principles](#1-design-principles)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing & Layout Grid](#4-spacing--layout-grid)
5. [Component Library](#5-component-library)
   - TopBar
   - Header / Navigation
   - Mobile Navigation
   - Footer
   - Language Switch
6. [Page Specifications](#6-page-specifications)
   - Home
   - About
   - About / History
   - About / Mission & Vision
   - Administration
   - Administration / Headmaster
   - Administration / Committee
   - Teachers
   - Staff
   - Academics
   - Academics / Routine
   - Academics / Examination
   - Admission
   - Notice Board
   - Notice Detail
   - Results
   - Gallery
   - Contact
7. [States](#7-states)
   - Loading
   - Empty
   - Error
8. [Responsive Behavior](#8-responsive-behavior)
9. [Bilingual Switching](#9-bilingual-switching)
10. [Animation & Interaction](#10-animation--interaction)

---

## 1. Design Principles

1. **Bengali-first** — Default language is Bengali; English is secondary but fully supported.
2. **Clarity over decoration** — Educational institution websites must be scannable and trustworthy.
3. **Content hierarchy** — Most important content (notices, headmaster message) is above the fold.
4. **Mobile-ready** — Majority of users in rural Bangladesh access on mobile.
5. **Accessible** — ARIA labels, sufficient color contrast (WCAG AA minimum), semantic HTML.
6. **No guessed data** — Sections with no real data show explicit empty states, not dummy content.

---

## 2. Color System

### Brand Colors (from verified live site)
```
Primary Green     #048200    RGB(4, 130, 0)      — School brand, buttons, links
Primary Dark      #025500    RGB(2, 85, 0)        — Hover states, nav background
Primary Light     #06B300    RGB(6, 179, 0)       — Accents, highlights
```

### Design System Colors
```
Surface White     #FFFFFF    — Page background
Surface Gray      #F8F9FA    — Card backgrounds, alternate rows
Surface Green     #F0F7EE    — Tinted section backgrounds (green-tinted white)
Border            #E2E8E0    — Card borders, dividers

Text Primary      #1A1A1A    — Headings, primary body text
Text Secondary    #4B5563    — Subheadings, body text
Text Muted        #9CA3AF    — Captions, metadata, placeholders

Accent Amber      #D97706    — CTAs, highlights, badges (educational prestige feel)
Accent Red        #DC2626    — Important notices, alerts
Accent Blue       #2563EB    — Links within body text, EMIS/external links

Success           #16A34A    — Pass results, success states
Warning           #CA8A04    — Pending states, warnings
Error             #DC2626    — Error states, critical notices

Topbar Background #025500    — Dark green for top utility bar
Header Background #FFFFFF    — White header with green logo text
Nav Background    #048200    — Full-width green navigation bar
Footer Background #025500    — Dark green footer
```

### Color Usage Rules
- `#048200` — Primary actions (buttons, active nav, links)
- `#025500` — TopBar, Footer, hover states
- `#D97706` — Accent for section decorations, badge highlights
- `#DC2626` — Important/urgent notice badges only
- Never use red for normal UI elements — only true alerts
- Maintain 4.5:1 contrast ratio for all text on colored backgrounds

---

## 3. Typography

### Font Stack
```css
/* Bengali (primary) */
font-family: 'Noto Sans Bengali', 'SolaimanLipi', sans-serif;
/* English / fallback */
font-family: 'Inter', 'Plus Jakarta Sans', system-ui, sans-serif;
/* School name display (large headings) */
/* Use Noto Sans Bengali Bold/ExtraBold weight */
```

### Type Scale
```
Display XL   — 48px / 3rem       Bold     — School name in Hero
Display L    — 36px / 2.25rem    Bold     — Page hero headings
H1           — 30px / 1.875rem   Bold     — Page titles
H2           — 24px / 1.5rem     SemiBold — Section headings
H3           — 20px / 1.25rem    SemiBold — Sub-section headings
H4           — 18px / 1.125rem   Medium   — Card titles
Body L       — 18px / 1.125rem   Regular  — Lead paragraph
Body         — 16px / 1rem       Regular  — Default body text
Body S       — 14px / 0.875rem   Regular  — Card body, metadata
Caption      — 12px / 0.75rem    Medium   — Labels, badges, breadcrumbs
```

### Line Heights
```
Headings:  1.25
Body text: 1.75 (Bengali text needs more line height for readability)
Captions:  1.4
```

### Font Weights
- 300 (Light) — large hero subtitles only
- 400 (Regular) — body text
- 500 (Medium) — UI labels, nav items
- 600 (SemiBold) — section headings, card titles
- 700 (Bold) — page headings
- 800 (ExtraBold) — school name display

---

## 4. Spacing & Layout Grid

### Container
```
Max width:   1280px (7xl)
Horizontal padding:
  Mobile:    16px (px-4)
  Tablet:    24px (px-6)
  Desktop:   32px (px-8)
```

### Spacing Scale (Tailwind)
```
4px   (1)  — micro spacing (icon gaps)
8px   (2)  — tight element spacing
12px  (3)  — inner card padding small
16px  (4)  — base unit (icon + label gaps)
20px  (5)  — tight section content gaps
24px  (6)  — card padding, medium gaps
32px  (8)  — large gaps, section padding
40px  (10) — section margins (mobile)
48px  (12) — section top/bottom padding
64px  (16) — large section spacing (desktop)
80px  (20) — hero padding
96px  (24) — very large sections
```

### Border Radius
```
sm:   6px  — input fields, small tags
md:   8px  — buttons
lg:   12px — cards (default)
xl:   16px — featured cards
2xl:  20px — hero content box, modals
full: 50%  — avatars, circular badges
```

### Breakpoints
```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

---

## 5. Component Library

### 5.1 TopBar

**Purpose:** Utility bar with contact info and social links  
**Visibility:** Desktop only (hidden on mobile)  
**Height:** 40px

```
Layout: [email] [mobile] ————————————— [Twitter] [Facebook] [Instagram] [LinkedIn]

Background: #025500 (dark green)
Text color: #ffffff
Font: 13px / Caption
Icon size: 14px

Left items (separated by thin divider |):
  📧 dularhathighschool@gmail.com   (tel link)
  📞 01309101297                    (tel link)

Right items (icon only, 28px circle hover):
  Twitter icon
  Facebook icon
  Instagram icon
  LinkedIn icon
```

### 5.2 Header

**Position:** Sticky (sticks to top on scroll)  
**Height:** 80px desktop / 64px mobile  
**Scroll behavior:** Adds box-shadow + slight background opacity on scroll

```
Desktop Layout:
[ LOGO ] [ School Name / Location / Established ] ——————— [ Language Toggle ]

Logo: Circular school crest — 64px × 64px
School name: 
  Bengali: দুলারহাট মাধ্যমিক বিদ্যালয়  (24px, Bold, #048200 or dark green)
  Sub: চরফ্যাশন, ভোলা (14px, Regular, gray)
  Sub: স্থাপিত: ১৯৬৩ ইং (13px, Regular, gray)

Language toggle: [বাংলা | EN] — pill toggle, right aligned

Mobile Layout:
[ LOGO ] [ School Name ] ——————— [ 🌐 Lang ] [ ☰ Menu ]
```

### 5.3 Navigation Bar

**Position:** Below header, full-width  
**Height:** 48px  
**Background:** #048200

```
Desktop — Horizontal nav:
[ হোম ] [ আমাদের সম্পর্কে ▾ ] [ প্রশাসন ▾ ] [ শিক্ষকবৃন্দ ] [ কর্মচারীবৃন্দ ] [ একাডেমিক ▾ ] [ ভর্তি ] [ নোটিশ ] [ ফলাফল ] [ গ্যালারি ] [ যোগাযোগ ]

Nav item styles:
  Default: text-white, font-medium, 14px, py-3 px-4, hover:bg-primary-dark
  Active:  bg-primary-dark, font-semibold, border-bottom: 2px solid amber

Dropdown (on hover — desktop):
  White dropdown card, border, rounded-lg, shadow-lg
  Items: text-gray-700, hover:bg-green-50, hover:text-green-700, 14px

Dropdown structure:
  আমাদের সম্পর্কে:
    → বিদ্যালয় পরিচিতি (/about)
    → ইতিহাস (/about/history)
    → লক্ষ্য ও উদ্দেশ্য (/about/mission)
  প্রশাসন:
    → প্রধান শিক্ষকের বাণী (/administration/headmaster)
    → ম্যানেজিং কমিটি (/administration/committee)
  একাডেমিক:
    → শ্রেণি ও বিষয় (/academics)
    → রুটিন (/academics/routine)
    → পরীক্ষা (/academics/examination)
```

### 5.4 Mobile Navigation (Drawer)

**Trigger:** Hamburger button (top-right of mobile header)  
**Type:** Slide-in drawer from left (full-height)  
**Width:** 80vw, max 320px  
**Overlay:** Semi-transparent black overlay behind drawer

```
Drawer structure:
┌─────────────────────┐
│ [×] Close           │
│ [Logo] School Name  │
│─────────────────────│
│ হোম                 │
│ আমাদের সম্পর্কে ›  │   (tap to expand accordion)
│   বিদ্যালয় পরিচিতি │
│   ইতিহাস           │
│   লক্ষ্য ও উদ্দেশ্য│
│ প্রশাসন ›          │
│   প্রধান শিক্ষক    │
│   ম্যানেজিং কমিটি  │
│ শিক্ষকবৃন্দ        │
│ কর্মচারীবৃন্দ      │
│ একাডেমিক ›         │
│ ভর্তি              │
│ নোটিশ              │
│ ফলাফল              │
│ গ্যালারি           │
│ যোগাযোগ            │
│─────────────────────│
│ [বাংলা] [English]  │  (language toggle at bottom)
│─────────────────────│
│ 📞 01309101297      │
│ ✉ dularhath...      │
└─────────────────────┘

Sub-items: Accordion expand, indented 16px, 13px text
Active item: left border #D97706 (amber), bg-green-50
```

### 5.5 PageHeader (Inner Pages)

```
Background: Gradient from #048200 to #025500
Padding: py-12
Content:
  Breadcrumb: "হোম › [Parent] › Current" (small, text-green-300)
  H1: Page title (28-36px, white, bold)
  Subtitle: (14px, text-green-200)
```

### 5.6 Footer

**Background:** #025500  
**Layout:** 4-column grid (desktop), stacked (mobile)

```
Column 1 — সংক্ষিপ্ত পরিচিতি (Brief Overview)
  School logo (small)
  Brief description text (from school-profile description_bengali)
  Social icons: Twitter, Facebook, Instagram, LinkedIn

Column 2 — অন্যান্য লিঙ্ক (Other Links — internal)
  নোটিশ বোর্ড → /notices
  শিক্ষক ও শিক্ষিকা → /teachers
  মাল্টিমিডিয়া ক্লাসরুম → /academics
  দৈনিক শিক্ষা → external

Column 3 — গুরুত্বপূর্ণ লিঙ্ক (Important Links — external)
  এনটিআরসিএ → external
  মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর → external
  শিক্ষা মন্ত্রণালয় → external
  শিক্ষক বাতায়ন → external
  ই এম এই এস → external

Column 4 — আমাদের ঠিকানা (Contact)
  গ্রাম: দুলারহাট, উপজেলা: চরফ্যাশন
  জেলা: ভোলা, পোস্ট কোড: ৮০৪১
  Phone: 01309101297
  Email: dularhathighschool@gmail.com

Bottom bar:
  © Copyright দুলারহাট মাধ্যমিক বিদ্যালয় — All Rights Reserved
  [centered, 12px, text-green-300]
```

### 5.7 Language Switch

**Placement:** Header (desktop: right side; mobile: drawer bottom)  
**Style:** Pill toggle

```
[বাংলা | EN]
  Active: white text, green background
  Inactive: green text, white background
  Border: 1px solid #048200
  Border-radius: full
  Font: 13px, medium

On switch:
  - All visible text re-renders in selected language
  - URL does not change (client-side context state)
  - Preference stored in localStorage
  - Default: Bengali (bn)
```

### 5.8 Notice Card

```
Structure:
┌─────────────────────────────────────────────────────────┐
│ [🔴 জরুরি] [🟢 পরীক্ষা] [Category Badge]  📅 তারিখ   │
│                                                         │
│ Notice Title (bold, 15px, gray-900)                    │
│ Short description if available (13px, gray-600)        │
│                                              [বিস্তারিত →] │
└─────────────────────────────────────────────────────────┘

States:
  Important: border-red-200, bg-red-50/20, left-border: 3px solid red
  Normal:    border-gray-100, bg-white
  Hover:     shadow-md, border-primary

Category badge colors:
  পরীক্ষা (Examination): red
  ভর্তি (Admission):      green
  অনুষ্ঠান (Event):      pink
  ফলাফল (Result):        amber
  ছুটি (Holiday):        purple
  সাধারণ (General):      gray
```

### 5.9 Teacher Card

```
Structure:
┌─────────────────────┐
│   [Avatar / Photo]  │  — 80px circle, object-cover
│                     │
│   Teacher Name      │  — 16px, bold, centered
│   Designation       │  — 13px, italic, gray-600, centered
│   Subject           │  — 13px, gray-500, centered
│                     │
│ [✉] [📞] [fb] [↗]  │  — Action icons row
└─────────────────────┘

Card: white, rounded-xl, border, shadow-sm
Hover: shadow-md, border-primary/30, transform translateY(-2px)
Photo fallback: Initials in colored circle (generated from name)
```

### 5.10 Staff Card

```
Identical structure to Teacher Card
Position instead of Subject/Designation
```

### 5.11 Stats Counter

```
4-item grid (2×2 on mobile, 4×1 on desktop):

┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│    🏫    │ │    📖    │ │    🎓    │ │    📝    │
│   ১৯৬৩  │ │  ৬ষ্ঠ–১০ম│ │    ৩টি  │ │JSC & SSC│
│  প্রতিষ্ঠা│ │  শ্রেণি │ │  বিভাগ  │ │পরীক্ষা কেন্দ্র│
└──────────┘ └──────────┘ └──────────┘ └──────────┘

Background: white with green top border (3px)
Icon: 32px emoji or Lucide icon
Value: 24px, bold, primary green
Label: 12px, gray-600
```

### 5.12 Section Heading Pattern

```
[Section Title]     — H2, 24px, bold, gray-900
[━━━━━━━━]         — 48px wide, 3px, primary green, rounded
[Subtitle text]     — 14px, gray-500 (optional)
```

---

## 6. Page Specifications

### 6.1 Home Page (`/`)

**Layout:** Full-width sections, stacked vertically

```
COMPONENT HIERARCHY:
<TopBar />                          — contact/social, desktop only
<Header />                          — logo, school name, language toggle
<NavBar />                          — full-width green nav
<main>
  <HeroSection />
  <StatsSection />
  <NoticeAndHeadmasterSection />    — 2-column: notices left, headmaster right
  <AboutSection />
  <AcademicsSection />
  <GallerySection />
  <ContactSection />
</main>
<Footer />
```

#### HeroSection

```
Layout: Full viewport width, min-height 480px (desktop), 320px (mobile)
Background: School building image (placeholder until real photo) OR
            Green gradient with decorative pattern overlay

Content (centered, over dark overlay):
  School Logo (96px circle)
  H1: দুলারহাট মাধ্যমিক বিদ্যালয়          (Display XL, white, bold)
      Dularhat Secondary School               (18px, white/70, below)
  Tagline: চরফ্যাশন উপজেলার পশ্চিমাঞ্চলের প্রথম শিক্ষা প্রতিষ্ঠান  (16px, white/80)
  Established: স্থাপিত: ১লা এপ্রিল ১৯৬৩     (13px, amber/gold chip)
  CTA buttons:
    [নোটিশ বোর্ড]  — solid green-dark button
    [আমাদের সম্পর্কে]  — outline white button
```

#### StatsSection

```
Layout: 4-column grid, white background, shadow-sm
  1. প্রতিষ্ঠাকাল: ১৯৬৩
  2. শ্রেণি: ৬ষ্ঠ–১০ম
  3. বিভাগ: ৩টি (বিজ্ঞান, ব্যবসায়, মানবিক)
  4. পরীক্ষা কেন্দ্র: JSC ও SSC
```

#### NoticeAndHeadmasterSection

```
Layout: 2-column grid (lg:grid-cols-3 gap-8)
  Left (col-span-2): Notice Board
    Section heading: সর্বশেষ নোটিশ
    [কোনো নোটিশ নেই] — empty state if no data
    OR: List of 5 notice cards
    [সকল নোটিশ দেখুন →] button
  
  Right (col-span-1): Headmaster's Message Card
    Photo (80px circle, Mohammad Hosen)
    Name: মোহাম্মদ হোসেন
    Designation: প্রধান শিক্ষক
    School: দুলারহাট মাধ্যমিক বিদ্যালয়
    Quote/excerpt: (first 2 lines of message)
    [বিস্তারিত পড়ুন →] link
```

#### AboutSection

```
Layout: 2-column (lg:grid-cols-2)
  Left: Text content
    H2: বিদ্যালয় সম্পর্কে
    Description paragraph (from school-profile description_bengali)
    History excerpt
    [আরও জানুন →] button → /about
  
  Right: Info grid (2×2)
    EIIN: 101297
    প্রতিষ্ঠাতা: Mr. Mahabubur Rahaman
    শিক্ষা বোর্ড: বরিশাল
    প্রতিষ্ঠা: ১লা এপ্রিল ১৯৬৩
```

#### AcademicsSection

```
Layout: 3-column card grid
  Card 1: বিজ্ঞান (Science)    — blue accent, 🔬 icon
  Card 2: ব্যবসায় শিক্ষা     — amber accent, 📊 icon
  Card 3: মানবিক (Humanities) — green accent, 📚 icon
Each card:
  Icon, name, "ক্লাস ৯–১০" label
  [বিস্তারিত →] link
```

#### GallerySection

```
Layout: Masonry-style 3-column grid (shows max 6 images)
Empty state: "গ্যালারি তৈরি হচ্ছে" with camera icon
[সকল ছবি দেখুন →] link → /gallery
```

#### ContactSection

```
Layout: 2-column
  Left: Contact info cards
    Address, Phone, Email, Website
  Right: Contact form (name, email, message, send button)
    Note: "ফর্ম পাঠানো বর্তমানে সক্রিয় নয়" if no backend
```

---

### 6.2 About Page (`/about`)

```
COMPONENT HIERARCHY:
<PageHeader title="বিদ্যালয় পরিচিতি" breadcrumb="হোম › আমাদের সম্পর্কে" />
<main className="max-w-7xl grid lg:grid-cols-3 gap-10">
  <div className="lg:col-span-2">
    <OverviewSection />          — description, history
    <MissionVisionSection />     — 2-card grid
    <KeyFactsSection />          — 10-item fact grid
    <InfrastructureSection />    — 4-item grid
  </div>
  <aside>
    <PageSidebar sectionLinks quickLinks contactCard />
  </aside>
</main>
```

**Sidebar section links:**
- বিদ্যালয় পরিচিতি → /about (active)
- ইতিহাস → /about/history
- লক্ষ্য ও উদ্দেশ্য → /about/mission

---

### 6.3 About / History Page (`/about/history`)

```
<PageHeader title="বিদ্যালয়ের ইতিহাস" breadcrumb="হোম › আমাদের সম্পর্কে › ইতিহাস" />
<main className="max-w-7xl grid lg:grid-cols-3 gap-10">
  <div className="lg:col-span-2">
    <HistoryNarrative />       — Long-form text from school-profile.history_english / history_bengali
    <TimelineMilestones />     — Vertical timeline
      1963: প্রতিষ্ঠা
      1964: আনুষ্ঠানিক স্বীকৃতি
      Present: JSC/SSC কেন্দ্র
    <FoundersSection />        — 2 cards (founder + first headmaster)
  </div>
  <PageSidebar sectionLinks=[about section] />
</main>
```

---

### 6.4 About / Mission & Vision Page (`/about/mission`)

```
<PageHeader title="লক্ষ্য ও উদ্দেশ্য" />
<main className="max-w-7xl grid lg:grid-cols-3 gap-10">
  <div className="lg:col-span-2">
    <MissionCard />    — green tinted, 🎯 icon, মিশন text
    <VisionCard />     — amber tinted, 🔭 icon, দর্শন text
    <MottoCard />      — "উন্নত শিক্ষা একটি উন্নত জাতির সমান"
    <ValuesGrid />     — 4–6 value pills/cards
  </div>
  <PageSidebar sectionLinks=[about section] />
</main>
```

---

### 6.5 Administration Page (`/administration`)

```
<PageHeader title="প্রশাসন" />
<main className="max-w-7xl grid lg:grid-cols-3 gap-10">
  <div className="lg:col-span-2">
    <HeadmasterPreviewCard />   — Photo, name, designation, excerpt, [বিস্তারিত] link
    <ManagingCommitteeIntro />  — Brief description, [কমিটি দেখুন] link
  </div>
  <PageSidebar sectionLinks=[admin section] />
</main>

Sidebar section links:
  প্রধান শিক্ষকের বাণী → /administration/headmaster (active when on /administration)
  ম্যানেজিং কমিটি → /administration/committee
```

---

### 6.6 Administration / Headmaster Page (`/administration/headmaster`)

```
<PageHeader title="প্রধান শিক্ষকের বাণী" />
<main className="max-w-7xl grid lg:grid-cols-3 gap-10">
  <div className="lg:col-span-2">
    <section className="prose">
      Full headmaster message text (from administration.json)
      Source: মোহাম্মদ হোসেন — প্রধান শিক্ষক
    </section>
  </div>
  <aside>
    <HeadmasterProfileCard />
      Photo (placeholder if unavailable)
      নাম: মোহাম্মদ হোসেন
      পদবী: প্রধান শিক্ষক
      বিদ্যালয়: দুলারহাট মাধ্যমিক বিদ্যালয়
    <PageSidebar sectionLinks=[admin section] />
  </aside>
</main>
```

---

### 6.7 Administration / Committee Page (`/administration/committee`)

```
<PageHeader title="ম্যানেজিং কমিটি" />
<main className="max-w-7xl">
  <EmptyState />     — "ম্যানেজিং কমিটির তথ্য শীঘ্রই আসছে"
                     — OR table if data provided by admin
</main>
```

Empty state: Informational message explaining that managing committee details will be available soon. Do not show dummy names.

---

### 6.8 Teachers Page (`/teachers`)

```
<PageHeader title="শিক্ষক ও শিক্ষিকা" breadcrumb="হোম › শিক্ষকবৃন্দ" />
<main className="max-w-7xl">
  <div className="mb-6">
    — Designation filter tabs: সকল | প্রধান শিক্ষক | সহকারী প্রধান | সিনিয়র | সহকারী
    — Search input (optional, client-side)
  </div>
  <TeacherGrid />     — Responsive grid: 2col mobile, 3col tablet, 4col desktop
    14 teacher cards (from verified data)
  — PhotoPlaceholder: Initials avatar if photo URL not available
</main>
```

**Teacher card detail (on click/expand — optional modal):**
```
Name, Designation, Subject, Qualification, Registration Number
[Contact icons]
```

---

### 6.9 Staff Page (`/staff`)

```
<PageHeader title="কর্মকর্তা ও কর্মচারী" />
<main className="max-w-7xl">
  <StaffGrid />    — same card pattern as teachers
    5 staff cards (from verified data):
      মোঃ হান্নান — Office Supporting Staff
      মোঃ কামাল উদ্দিন — Security Guard
      মোঃ আবদুল আলী — Security Guard
      মোঃ সুমন — Cleaner
      শারমিনা — Cleaner
</main>
```

---

### 6.10 Academics Page (`/academics`)

```
<PageHeader title="একাডেমিক" />
<main className="max-w-7xl grid lg:grid-cols-3 gap-10">
  <div className="lg:col-span-2">
    <ClassesSection />       — 5 class cards (Class 6–10)
    <DisciplinesSection />   — 3 discipline cards (Science, Business, Humanities)
    <ExamCentreSection />    — JSC & SSC center info card
    <SubjectsTable />        — Subject list per class (if available — else EmptyState)
  </div>
  <PageSidebar sectionLinks=[
    শ্রেণি ও বিষয় → /academics (active)
    রুটিন → /academics/routine
    পরীক্ষা → /academics/examination
  ] />
</main>
```

---

### 6.11 Academics / Routine Page (`/academics/routine`)

```
<PageHeader title="ক্লাস রুটিন" />
<main className="max-w-7xl">
  <EmptyState
    icon=📅
    title="রুটিন এখনো আপলোড করা হয়নি"
    subtitle="বিদ্যালয় কর্তৃপক্ষ শীঘ্রই ক্লাস রুটিন আপলোড করবেন।"
  />
  — OR: PDFViewer / DownloadCard when admin uploads routine
</main>
<PageSidebar sectionLinks=[academics section] />
```

---

### 6.12 Academics / Examination Page (`/academics/examination`)

```
<PageHeader title="পরীক্ষার তথ্য" />
<main className="max-w-7xl grid lg:grid-cols-3 gap-10">
  <div className="lg:col-span-2">
    <ExamInfoCards />    — JSC info card, SSC info card
    <BoardInfoCard />    — Barisal Education Board details
    <EmptyState />       — "পরীক্ষার সময়সূচি পরে আপলোড করা হবে"
  </div>
  <PageSidebar sectionLinks=[academics section] />
</main>
```

---

### 6.13 Admission Page (`/admission`)

```
<PageHeader title="ভর্তি তথ্য" />
<main className="max-w-7xl grid lg:grid-cols-3 gap-10">
  <div className="lg:col-span-2">
    <AdmissionInfoCard />    — Classes 6–10, disciplines available
    <RequirementsCard />     — Admission requirements (general info)
    <EmptyState />           — "ভর্তির বিস্তারিত তথ্য শীঘ্রই প্রকাশিত হবে"
    <ContactForAdmission />  — Phone and email CTA
  </div>
  <PageSidebar quickLinks contactCard />
</main>
```

---

### 6.14 Notice Board Page (`/notices`)

```
<PageHeader title="নোটিশ বোর্ড" />
<main className="max-w-7xl">
  <FilterBar />     — Search input + Category filter dropdown
  <NoticeList />    — Full-width, scrollable
    — If empty: EmptyState "কোনো নোটিশ প্রকাশিত হয়নি"
    — If has data: Notice cards (chronological, latest first)
  <Pagination />    — If more than 10 notices
</main>
```

---

### 6.15 Notice Detail Page (`/notices/[id]`)

```
<PageHeader title="নোটিশ বিস্তারিত" breadcrumb="হোম › নোটিশ › [Notice Title]" />
<main className="max-w-4xl">
  <NoticeDetailCard>
    Category badge + Date
    H1: Notice title
    Body content (rich text / markdown)
    [Download PDF] button if attachment exists
    [← নোটিশ বোর্ডে ফিরুন] back link
  </NoticeDetailCard>
</main>
```

---

### 6.16 Results Page (`/results`)

```
<PageHeader title="পরীক্ষার ফলাফল" />
<main className="max-w-7xl">
  <ExternalResultsCard>
    — JSC result: link to board website
    — SSC result: link to board website
    Text: "বরিশাল শিক্ষা বোর্ডের ওয়েবসাইটে গিয়ে ফলাফল দেখুন"
    [বোর্ডের ওয়েবসাইট ভিজিট করুন →] external link
  </ExternalResultsCard>
  <EmptyState />     — "ফলাফল সম্পর্কিত তথ্য শীঘ্রই যোগ করা হবে"
</main>
```

---

### 6.17 Gallery Page (`/gallery`)

```
<PageHeader title="গ্যালারি" />
<main className="max-w-7xl">
  <AlbumFilterTabs />    — সকল | বিদ্যালয় | অনুষ্ঠান | পুরস্কার
  <GalleryGrid />        — Masonry or uniform grid, 3 cols (desktop), 2 cols (mobile)
    Each image: overlay on hover with caption
    Click: Lightbox modal
  <EmptyState>
    icon=🖼️
    title="গ্যালারি তৈরি হচ্ছে"
    subtitle="শীঘ্রই ছবি আপলোড করা হবে।"
  </EmptyState>
</main>
```

---

### 6.18 Contact Page (`/contact`)

```
<PageHeader title="যোগাযোগ" />
<main className="max-w-7xl grid lg:grid-cols-2 gap-12">
  <div>
    <h2>যোগাযোগের তথ্য</h2>
    <ContactCards>
      Address: গ্রাম: দুলারহাট, উপজেলা: চরফ্যাশন, জেলা: ভোলা, পোস্ট কোড: ৮০৪১
      Phone: 01309101297
      Alt Phone: 01391012970
      Email: dularhathighschool@gmail.com
      Website: dularhatsecondaryschool.edu.bd
      Office Hours: রবি–বৃহস্পতিবার ৮:০০–২:০০ (শুক্র-শনি বন্ধ)
    </ContactCards>
  </div>
  <div>
    <MapPlaceholder />      — Google Maps embed or placeholder with search link
    <ContactForm>
      Name input
      Email input
      Message textarea
      Send button (NOTE: Backend required for actual sending)
    </ContactForm>
  </div>
</main>
```

---

## 7. States

### 7.1 Loading States

**Page-level loading** (between navigation):
```
— Next.js App Router handles with Suspense
— Use skeleton screens (not spinners) for card grids
— Skeleton: gray animated shimmer blocks matching card shape
```

**Teacher card skeleton:**
```
┌─────────────────────┐
│   [●●● circle]      │   gray-200 shimmer, 80px
│   [━━━━━━━━━]       │   name: 120px × 16px
│   [━━━━━━]          │   designation: 80px × 12px
└─────────────────────┘
```

**Notice card skeleton:**
```
┌─────────────────────────────────────────────────────────┐
│ [●●●] [━━━━━] ════════════════════════ [━━━━━━━━]       │
│ [━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━]      │
└─────────────────────────────────────────────────────────┘
```

### 7.2 Empty States

Each empty state has:
- Relevant emoji icon (48px)
- Title (16px, bold, gray-700)
- Subtitle (14px, gray-500)
- Optional action button

```
Teachers empty:
  icon: 👩‍🏫
  title: "শিক্ষকদের তথ্য এখনো যোগ করা হয়নি"
  subtitle: "বিদ্যালয় প্রশাসন শীঘ্রই শিক্ষকদের তথ্য আপলোড করবেন"

Notices empty:
  icon: 📋
  title: "কোনো নোটিশ প্রকাশিত হয়নি"
  subtitle: "নতুন নোটিশ প্রকাশিত হলে এখানে দেখা যাবে"

Gallery empty:
  icon: 🖼️
  title: "গ্যালারি তৈরি হচ্ছে"
  subtitle: "শীঘ্রই ছবি যোগ করা হবে"

Results empty:
  icon: 📊
  title: "ফলাফল এখনো প্রকাশিত হয়নি"
  subtitle: "ফলাফল প্রকাশের পর এখানে দেখা যাবে"

Routine empty:
  icon: 📅
  title: "রুটিন এখনো আপলোড করা হয়নি"
  subtitle: "বিদ্যালয় কর্তৃপক্ষ শীঘ্রই রুটিন আপলোড করবেন"

Committee empty:
  icon: 👥
  title: "ম্যানেজিং কমিটির তথ্য শীঘ্রই আসছে"
  subtitle: ""
```

### 7.3 Error States

**Page not found (404):**
```
Green header with school branding
H1: ৪০৪ — পাতা খুঁজে পাওয়া যায়নি
Subtitle: আপনি যে পাতাটি খুঁজছেন সেটি পাওয়া যায়নি।
[হোম পেজে ফিরুন] button
```

**Data fetch error:**
```
inline in section, not full page
icon: ⚠️
text: "তথ্য লোড করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।"
[আবার চেষ্টা করুন] button
```

---

## 8. Responsive Behavior

### Breakpoint Behavior Table

| Element                 | Mobile (< 640px)           | Tablet (640–1024px)       | Desktop (≥ 1024px)         |
|-------------------------|---------------------------|--------------------------|---------------------------|
| TopBar                  | Hidden                    | Hidden                   | Visible                   |
| Header school name      | Single line, smaller      | Full 2-line               | Full 3-line               |
| Navigation              | Hidden → Drawer           | Hidden → Drawer           | Horizontal bar            |
| Hero height             | 320px                     | 400px                    | 480px                     |
| Stats grid              | 2×2                       | 2×2                      | 1×4                       |
| Notices/Headmaster      | Stacked (notices → HM)    | Stacked                  | 2-column (2:1)            |
| About section           | Stacked                   | Stacked                  | 2-column (1:1)            |
| Teacher grid            | 2 columns                 | 3 columns                | 4 columns                 |
| Staff grid              | 2 columns                 | 3 columns                | 4 columns                 |
| Academics disciplines   | 1 column                  | 2 columns                | 3 columns                 |
| Gallery grid            | 2 columns                 | 3 columns                | 3 columns (larger)        |
| Footer                  | Single column stacked     | 2 columns                | 4 columns                 |
| Page sidebar            | Below main content        | Below main content        | Right column (col-span-1) |
| Inner page layout       | Single column             | Single column             | 3-col (2+1)               |

### Mobile-specific rules:
- Minimum tap target: 44×44px
- No hover states on mobile
- Drawer navigation: swipe-to-close
- Phone numbers are always `<a href="tel:...">` links
- Forms use native keyboard (no custom keyboards)

---

## 9. Bilingual Switching

### Implementation Pattern

```tsx
// Context: LanguageContext
type Language = "bn" | "en";
type BilingualText = { bengali: string; english: string };

// Usage:
const { t, language, setLanguage } = useLanguage();
t({ bengali: "হোম", english: "Home" })  // returns correct string
```

### Language Coverage

| Section               | Bengali | English |
|-----------------------|---------|---------|
| Navigation            | ✅      | ✅      |
| School name           | ✅      | ✅      |
| About / History       | ✅      | ✅      |
| Mission / Vision      | ✅      | ✅      |
| Headmaster message    | ✅      | ❌ Not available |
| Teacher names         | ✅      | ✅ (transliterated) |
| Staff names           | ✅      | ✅ (transliterated) |
| Notices               | ✅      | ❌ Admin-entered |
| Academic info         | ✅      | ✅      |
| Contact info          | ✅      | ✅      |
| Footer                | ✅      | ✅      |
| UI labels             | ✅      | ✅      |

### Language Fallback Rule:
- If English text not available, always fall back to Bengali (never empty)
- Headmaster message: Bengali only — English toggle shows message in Bengali with note "(Bengali only)"

### Persistent storage:
- Language preference stored in `localStorage` key `dularhat-lang`
- Default: `"bn"` (Bengali)

---

## 10. Animation & Interaction

### Principles
- Animations should be **subtle** and **purposeful** — not decorative
- Respect `prefers-reduced-motion` media query
- Duration guidelines: 150ms (micro), 300ms (standard), 500ms (page transitions)

### Specific Animations

| Interaction            | Animation                                              |
|------------------------|--------------------------------------------------------|
| Page load              | Fade in content sections (opacity 0→1, 300ms, stagger) |
| Section entry (scroll) | Slide up + fade in (translateY 20px→0, opacity 0→1)   |
| Card hover             | Slight lift (translateY -2px), shadow increase, 200ms  |
| Nav dropdown open      | Fade + slide down (opacity 0→1, translateY -4px→0)    |
| Mobile drawer open     | Slide in from left (translateX -100%→0, 300ms ease)   |
| Mobile drawer close    | Slide out to left, 250ms                               |
| Language switch        | Content re-renders with 150ms fade (opacity 0.5→1)    |
| Notice card hover      | Border color change + shadow, 200ms                    |
| Button hover           | Background darken, scale(1.02), 150ms                  |
| Stats counter          | Count-up animation on first scroll into view           |
| Gallery lightbox open  | Scale up from thumbnail position, backdrop fade        |
| Loading skeleton        | Shimmer wave animation, 1.5s loop                      |

---

*End of Design Specification v1.0*
