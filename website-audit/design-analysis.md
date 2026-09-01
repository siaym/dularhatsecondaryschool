# Dularhat Secondary School — Design Analysis

## Source Website Analysis (dularhatsecondaryschool.edu.bd)

### Technology
- PHP-based CMS (likely custom or Aark/similar BD educational CMS)
- Bootstrap 5 frontend
- jQuery
- AOS (Animate on Scroll)
- Swiper.js (slider/carousel)
- GLightbox (gallery lightbox)
- Google Fonts: Noto Sans Bengali
- SPA-style routing (all pages return same HTML shell, content rendered client-side)

### Color Scheme
- Primary: #048200 (Green)
- Secondary: #f85a40 (Orange-red)
- Background: #ffffff
- Text: #222222

### Layout Structure (Inferred from source code)
- Top bar with contact info and social links (green background)
- Header with logo, school name, navigation (green background)
- News scroll ticker
- Hero/Banner section (Swiper carousel)
- Educational section with main content + sidebar
  - Main: Services/quick links, gallery section
  - Sidebar: Notice board, Headmaster quote
- Footer (green background)

### Strengths of Current Design
- Uses Bengali font (Noto Sans Bengali) — important for local audience
- Green school branding is consistent
- Has notice ticker for urgent announcements
- Has sidebar with headmaster quote

### Weaknesses / Areas for Improvement
- Content not indexable (SPA, JS-rendered)
- No accessible static pages
- Limited SEO
- Mobile experience may be poor (Bootstrap not always responsive enough)
- No visible language switcher despite English meta tags
- No evident admin panel for easy content management
- Color scheme could be modernized while keeping green as brand color

---

## Badrakanda High School Analysis (badrakandahighschool.edu.bd)

### Notes
- Website returned 403 Forbidden on direct access
- Cannot directly inspect its implementation
- Based on the reference description and standard BD school website patterns:

### Standard BD School Website UX Patterns (Reference)
- Top bar: phone, email, social links
- Header: logo + school name + navigation
- Scrolling news ticker
- Hero banner with school images
- Quick statistics (students, teachers, etc.)
- About section with school introduction
- Principal/Headmaster message with photo
- Notice board section
- Teacher showcase
- Gallery grid
- Contact section with map
- Footer with links

---

## Design Decisions for New Website

### 1. Visual Identity
- Keep green (#048200) as primary brand color — it's the school's established color
- Use a slightly richer shade for modern feel: #016B00 or #025C00
- Accent: gold/amber (#D97706) for a more educational, prestigious feel
- Clean white backgrounds with subtle green accents

### 2. Typography
- Bengali: Noto Sans Bengali (consistent with current site)
- English: Inter or Plus Jakarta Sans (modern, educational)
- Heading hierarchy: proper h1-h6

### 3. Layout Architecture
- Next.js App Router for static/server rendering (SEO-friendly)
- Mobile-first responsive design
- Clean card-based layouts for teachers, notices
- Sticky navigation with scroll indicator

### 4. Key Sections
- Top bar (phone, email, social)
- Header (logo, name, nav, language switch)
- Hero (school name, tagline, CTA, school image)
- About (with school statistics)
- Headmaster's Message
- Latest Notices (with PDF download)
- Academics / Quick Links
- Gallery
- Contact + Map embed
- Footer

### 5. Differentiators from Current Site
- Server-side rendered (fully SEO indexed)
- Accessible (ARIA labels, semantic HTML)
- Mobile-optimized
- Bengali/English bilingual toggle
- Admin panel for content management
- Modern card design for notices and teachers
- Proper loading states and animations

### 6. Bilingual Strategy
- Default: Bengali
- Language toggle: বাংলা | English
- i18n: next-intl or custom context-based solution
- Bengali content always available; English where verified
