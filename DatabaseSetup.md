# Database Setup Guide - atlascampth

This document outlines the steps to initialize and manage the PostgreSQL database for **atlascampth** using Supabase.

## 1. Prerequisites
- [Supabase CLI](https://supabase.com/docs/guides/cli) installed.
- A Supabase project created at [supabase.com](https://supabase.com).
- Project ID (ref): `aulpfxwgdxnmelphfzeb`
- Project linked via CLI: `npx supabase link --project-ref aulpfxwgdxnmelphfzeb`.

## 2. Initializing the Schema
The database uses **PostGIS** for geospatial queries and follows a localized Thai structure.

### Manual Setup via SQL Editor
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Go to **SQL Editor**.
3. Copy the contents of `supabase/schema.sql` and run it.
4. This will:
   - Enable the `postgis` extension.
   - Create `profiles`, `campsites`, and `reviews` tables.
   - Set up Row Level Security (RLS) policies.
   - Add a trigger for automatic `updated_at` timestamps.

### CLI Setup (Recommended for Local Dev)
If you are developing locally:
```bash
npx supabase start
```
The CLI will automatically apply migrations. Key migrations applied:
1. `initial_schema`: Base tables and PostGIS.
2. `add_region_and_district`: New columns for hierarchical filtering.

## 3. Seeding Data
To populate the database with initial Thai campsites:
1. Copy the contents of `supabase/seed.sql` into the **SQL Editor**.
2. Run the query.
*Note: Seed data now includes Region, Province, and District for full discovery functionality.*

## 4. Troubleshooting PostGIS
If you encounter `extension "postgis" already exists` errors, you can safely ignore them as the script uses `CREATE EXTENSION IF NOT EXISTS`.

## 5. Type Generation
After updating the schema, generate TypeScript types for the Next.js frontend:
```bash
npx supabase gen types typescript --linked > web/src/types/supabase.ts
```

---
*Last Updated: April 1, 2026*
