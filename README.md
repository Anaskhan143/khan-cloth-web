# Khan Cloth Web

Public marketing site for **Khan Cloth and Tailoring Shop** — fabric catalog + WhatsApp orders.

## Stack
- React + Vite + TypeScript
- Optional Supabase (auth + content CMS at `/admin`)
- Static fallback data in `src/data/` when Supabase is not configured
- WhatsApp deep links for orders

## Run
```bash
npm install
npm run dev
```

Without env vars the public site still works from local data. Admin login needs Supabase.

## Admin setup (Supabase)

1. Create a free project at [supabase.com](https://supabase.com).
2. In the SQL Editor, run the full script in `supabase/schema.sql` (tables + RLS + public `fabrics` storage bucket for collection / colour photos).
   If you already ran an older schema, re-run at least the **storage** section at the bottom of that file so image uploads work.
3. Authentication → Users → Add user: create an email/password account (that email is the admin username).
4. Project Settings → API Keys: copy **Project URL** and **anon** / **publishable** key into `.env`:

```bash
cp .env.example .env
# then fill in:
# VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
# VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

5. Restart `npm run dev`, open `/admin/login`, sign in, then on the dashboard click **Import starter content** to load fabrics, FAQs, reviews, and meters from the codebase into the database.
6. In **Collections**, add/edit fabrics with a cover image and per-colour photos (uploaded to Supabase Storage).
7. For production (e.g. Vercel), add the same `VITE_*` env vars and redeploy.

Edits in `/admin` save to Supabase and show on the public site. Without Supabase, the site keeps using `src/data/*.ts`.

## Real vs dummy

### Real (from you)
- Logo (`public/logo.png`)
- WhatsApp: +92 340 5666212
- Address: B-5, Rawal Arcade, F-8 Markaz, Islamabad
- Google Maps link
- Hours (Mon–Sat / Sunday)
- Instagram `@kctsinsta`, TikTok `@kcts_1`
- Facebook page name (exact page URL still a search link — replace when you have it)
- Free delivery all over Pakistan messaging

### Dummy (replace later)
- Fabric names, prices, and colour swatches (editable in `/admin` once Supabase is set up, or in `src/data/fabrics.ts`)
- Payment methods note on “How to order”
- Hero background is a designed gradient (not a real fabric photo)
- Facebook link is a search URL until you share the exact page link

## WhatsApp number
Configured in `src/data/shop.ts` as `923405666212`.
