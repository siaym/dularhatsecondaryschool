# Dularhat Secondary School

Official bilingual website and lightweight content management system for Dularhat Secondary School.

## Features
- Bengali / English
- Notices
- Gallery
- Teachers
- Staff
- Managing Committee
- Academic information
- Documents
- Results
- Admin CMS
- Supabase authentication
- Supabase Storage
- Row Level Security

## Tech Stack
- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- PostgreSQL

## Development
```bash
npm install
npm run dev
```

## Production
```bash
npm run lint
npm run build
```

## Environment Variables
Create a `.env.local` file at the root of the project with the following keys. **Never commit actual API keys to version control.**

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```
