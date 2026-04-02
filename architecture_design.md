# Implementation Plan - atlascampth

This plan outlines the design and architecture for **atlascampth**, a localized camping discovery and community platform for Thailand, inspired by The Campers Atlas and park4night.

## 1. Objective
Create a scalable, user-friendly camping platform in Thai that helps users discover campsites, plan trips, and share experiences.

## 2. Key Features (Thai Context)
- **Interactive Geospatial Map:** Custom layers for National Parks (DNP), private campsites, glamping, and 4WD-only spots.
- **Thai Localization (i18n):** Full support for Thai language, including localized terminology (e.g., ลานกางเต็นท์, จุดพักรถ).
- **Social Integration:** Login and sharing via Line and Facebook (highly popular in Thailand).
- **Rich Media Gallery:** High-quality photos and videos of campsites to show "the vibe."
- **Community Reviews & Ratings:** User-generated content with verified spot status.
- **Trip Planner:** Ability to save "Favorite" spots and create a multi-stop itinerary.
- **Advanced Filtering:** Filter by amenities (electricity, pet-friendly, BBQ allowed, phone signal strength).
- **Offline Support:** Mobile-friendly PWA (Progressive Web App) with cached map data.

## 3. Recommended Tech Stack
- **Frontend:** **Next.js (React)**
  - Excellent SEO (crucial for discovery).
  - Server-Side Rendering (SSR) for fast initial loads.
  - Built-in i18n support.
- **Styling:** **Tailwind CSS**
  - Rapid UI development and responsive design.
- **Backend/Database:** **Supabase**
  - **PostgreSQL with PostGIS:** Essential for geospatial queries.
  - **Authentication:** Built-in support for Line, Facebook, and Google.
  - **Storage:** Built-in CDN for campsite photos and videos.
  - **Edge Functions:** For custom server-side logic (TypeScript).
- **Maps:** **Leaflet + OpenStreetMap**
  - Completely free and open-source.
  - Custom styled with CSS filters to match minimalist theme.
  - Efficient marker management for hierarchical filtering.

## 4. Scalable Architecture Design
### Frontend (Client Layer)
- **Next.js App:** Hosted on Vercel or Netlify.
- **Theme Engine:** Custom React 19-compliant ThemeProvider (zero-dependency).
- **State Management:** Hierarchical filtering state (Region -> Province -> District).

### Backend & Data Layer (Supabase)
- **Database:** PostgreSQL + PostGIS. Added `region_th` and `district_th` columns for refined discovery.
- **Auth:** Managed user sessions (Social logins planned).
- **Storage:** Managed buckets for media assets.
- **CI/CD:** Automated migrations and type generation.

## 5. Implementation Steps
### Phase 1: MVP (Complete)
- Basic landing page and interactive map.
- Hierarchical Discovery (Region/Province/District).
- Custom Minimalist UI (JetBrains Mono).
- Suggest a Spot form integration.

### Phase 2: Community & Growth (In Progress)
- User-submitted campsite spots with verification workflow.
- Review and rating system.
- Advanced filtering (Amenities).
- Social Auth (Line/Facebook).

### Phase 3: Advanced Features
- Trip planning and itinerary tool.
- Offline PWA functionality.
- Business dashboard for campsite owners.

## 6. Verification & Testing
- **Unit Testing:** Jest for backend logic.
- **Integration Testing:** Playwright for critical user flows (Login -> Find Site -> Review).
- **Load Testing:** k6 to ensure the map and search can handle concurrent users during peak Thai holiday seasons (e.g., Songkran).
