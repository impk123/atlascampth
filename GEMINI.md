# Project: atlascampth

A localized camping discovery and community platform for Thailand, inspired by The Campers Atlas and park4night.

## 🎯 Core Objectives
- Create a scalable, user-friendly camping platform in Thai.
- Help users discover campsites (National Parks, private, glamping, 4WD).
- Enable trip planning and community experience sharing.

## 🛠️ Tech Stack
- **Frontend:** Next.js 15 (React 19), Tailwind CSS 4.
- **Theme:** Custom Minimal Contrast (JetBrains Mono) with Light/Dark mode.
- **Backend/Database:** Supabase (PostgreSQL + PostGIS).
- **Storage:** Supabase Storage (Campsite photos/videos).
- **Maps:** Leaflet + OpenStreetMap (CartoDB tiles) - *Migrated from Mapbox for open-source flexibility.*
- **Search:** PostgreSQL Full-Text Search (Thai support).
- **Infrastructure:** Supabase Edge Functions (TypeScript).

## 🌍 Localization (Thai)
- Primary language: Thai (i18n support).
- Key focus: Hierarchical filtering (ภาค > จังหวัด > อำเภอ), Line integration, and localized terminology.

## 📈 Status & Roadmap
- [x] Research & Architecture Design.
- [x] Phase 1: MVP Setup (Frontend/Backend initialization, Schema, Maps).
- [x] Hierarchical Discovery System (Region/Province/District filters).
- [x] User-Submitted Basecamps (Suggest a Spot form).
- [ ] Phase 2: Community & Growth (Reviews, User Profiles).
- [ ] Phase 3: Advanced Features (Itinerary, Offline PWA, PM2.5 Alerts).

## 📝 Rules & Conventions
- Adhere to the architecture defined in `architecture_design.md`.
- Maintain Thai localization as a priority.
- Follow surgical update patterns for code changes.
- **Zero-Warning Policy:** Ensure `npm run lint` passes before major changes.
