# Dularhat Secondary School — Website Sitemap

## Discovered Pages (from live crawl — 2026-09-01)

```
URL                                                                  Status    Content
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
https://dularhatsecondaryschool.edu.bd/                              ✅ Loaded  Home (partial — main content blank, footer OK)
https://dularhatsecondaryschool.edu.bd/page/head-master-message      ✅ Loaded  Headmaster's Message (content visible)
https://dularhatsecondaryschool.edu.bd/page/teacher                  ✅ Loaded  Teachers (14 teacher cards visible)
https://dularhatsecondaryschool.edu.bd/page/gallery                  ⚠️ Partial Gallery (page loads, content blank)
https://dularhatsecondaryschool.edu.bd/page/employ-staff             ✅ Loaded  Staff / Employees (5 staff cards visible)
https://dularhatsecondaryschool.edu.bd/page/short-summary            ✅ Loaded  School Summary / About (table visible)
```

## Pages NOT in Sitemap (not discovered)
- `/notices` or `/notice-board` — accessible via footer link "নোটিশ বোর্ড" but URL not confirmed
- `/admission` — not found anywhere
- `/results` — not found anywhere
- `/routine` — not found anywhere
- `/contact` — not found anywhere (contact info only in footer and topbar)
- `/multimedia-classroom` — linked in sidebar as "মাল্টিমিডিয়া ক্লাসরুম"

## Navigation Structure (from footer — verified)

### অন্যান্য লিঙ্ক (Other Links)
- নোটিশ বোর্ড (Notice Board)
- শিক্ষক ও শিক্ষিকা (Teachers)
- মাল্টিমিডিয়া ক্লাসরুম (Multimedia Classroom)
- দৈনিক শিক্ষা (Daily Education — external link)

### গুরুত্বপূর্ণ লিঙ্ক (Important Links — external)
- এনটিআরসিএ (NTRCA)
- মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর (DSHE)
- শিক্ষা মন্ত্রণালয় (Ministry of Education)
- শিক্ষক বাতায়ন (Shikkhok Batayon)
- ই এম এই এস (EMIS)

### আমাদের ঠিকানা (Our Address — footer)
- গ্রাম: দুলারহাট, উপজেলা: চরফ্যাশন
- জেলা: ভোলা, পোস্ট কোড: ৮০৪১
- Phone: +88 01309101297
- Email: dularhathighschool@gmail.com

## Notes

- Website is a SPA (Single Page Application) — all URLs return the same HTML shell
- Content is loaded client-side from a PHP backend
- No pagination or separate category pages discovered
- Homepage main content area (hero, about section, gallery) was blank during crawl
- Teachers and Staff pages loaded successfully
- Gallery page loaded but gallery grid was empty

## New Website Sitemap (Confirmed & Proposed)

```
/                       Home
/about                  About
  /about/history        History
  /about/mission        Mission & Vision
/administration         Administration
  /administration/headmaster        Headmaster's Message
  /administration/committee         Managing Committee
/teachers               Teachers (14 confirmed)
/staff                  Staff (5 confirmed)
/academics              Academics
  /academics/routine    Class Routine
  /academics/examination Examination Information
/admission              Admission (no source data — admin to populate)
/notices                Notices (no source data — admin to populate)
  /notices/[id]         Notice Detail
/results                Results (no source data — admin to populate)
/gallery                Gallery (no source data — admin to populate)
/contact                Contact

/admin                  Admin Dashboard (protected)
  /admin/dashboard      Dashboard
  /admin/notices        Manage Notices
  /admin/teachers       Manage Teachers
  /admin/staff          Manage Staff
  /admin/gallery        Manage Gallery
  /admin/settings       Site Settings
```
