# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kappa is a cluster-based comic recommender system frontend built with **TypeScript**, **React 19**, **Vite 7**, **TailwindCSS v4**, and **TanStack Router**. The application allows users to rate comics and receive recommendations using different clustering algorithms (K-means and DBSCAN).

## Development Commands

- **Start development server**: `pnpm dev`
- **Build for production**: `pnpm build`
- **Preview production build**: `pnpm preview`
- **Run tests**: `pnpm test`
- **Lint**: `pnpm lint`
- **Format**: `pnpm format`
- **Check (lint + format)**: `pnpm check`

## Architecture

### Routing (TanStack Router - File-based)
- `src/routes/__root.tsx` — Root layout (PreferencesProvider, Footer)
- `src/routes/index.tsx` — Home page: comic search + rating via Algolia InstantSearch
- `src/routes/results.tsx` — Results page: displays ML recommendations (algorithm via URL search params)
- `src/routes/comic/$id.tsx` — Comic detail page: fetches from Jikan API
- `src/routeTree.gen.ts` — Auto-generated route tree (do not edit)

### URL Structure
- `/` — Home page with comic search and rating
- `/results?algorithm=kmeans` — K-Means recommendations
- `/results?algorithm=dbscan` — DBSCAN recommendations
- `/comic/:id` — Comic details page

### State Management
- **PreferencesContext** (`src/context/PreferencesContext.tsx`): Shared user preferences (rated comics) via React Context
- **URL Search Params**: Algorithm selection stored in URL (`?algorithm=kmeans|dbscan`)
- **Session Storage**: Tutorial modal visibility via `useStorage` hook

### Key Components (`src/Components/`)
- **ComicCard**: Displays Algolia search results with star rating
- **PredictionCard**: Displays ML-recommended comics with star rating
- **UserPreferences**: Shows rated comics, algorithm selection buttons (TanStack Router Links)
- **ComicCardOverlay**: Hover overlay for navigating to comic details
- **TutorialModal**: First-time user guidance (uses shadcn Dialog)
- **FloatingHelpButton**: Reopens tutorial modal
- **NavBar / NavBarResult**: Navigation headers
- **SearchBox**: Algolia-powered search input

### UI Components (`src/Components/ui/`)
- shadcn/ui components: `button`, `card`, `badge`, `dialog`, `star-rating`
- All icons use `lucide-react`

### Hooks (`src/Hooks/`)
- **useRating**: Shared rating logic (add/update preferences) — used by ComicCard and PredictionCard
- **useMangaDetails**: Fetches manga data from Jikan API via react-query
- **useStorage**: Generic sessionStorage/localStorage hook with type safety

### Data Fetching
- **Algolia**: Comic search via `react-instantsearch` v7 + `algoliasearch` v5 lite client
- **Kappa API**: ML recommendations via `fetch` + `@tanstack/react-query` `useMutation` (in `results.tsx`)
- **Jikan API**: Manga details via `@tanstack/react-query` `useQuery` (in `useMangaDetails.ts`)

### External Services
- **Algolia Search**: Comic search (requires `VITE_ALGOLIA_APP_ID` and `VITE_ALGOLIA_API_KEY`)
- **Kappa API**: ML recommendations (requires `VITE_KAPPA_API_URL` and `VITE_KAPPA_API_TOKEN`)

### Entry Point
- `index.html` → `src/main.tsx` → `RouterProvider` + `QueryClientProvider`

### Styling
- **TailwindCSS v4** with CSS-first configuration (`src/index.css`)
- Custom color palette: `kappa-black` (#0e0e0e), `kappa-dark-gray` (#1c1c1c), `kappa-gray` (#757575), `kappa-green` (#57946c)
- shadcn/ui CSS variables for theming
- Nunito font family

## Environment Variables Required
```
VITE_ALGOLIA_APP_ID=your_algolia_app_id
VITE_ALGOLIA_API_KEY=your_algolia_api_key
VITE_KAPPA_API_URL=your_api_url
VITE_KAPPA_API_TOKEN=your_api_token
```

## Technology Stack

- **Runtime**: React 19, TypeScript 5.9
- **Build**: Vite 7 with `@vitejs/plugin-react`
- **Routing**: TanStack Router (file-based, with `@tanstack/router-plugin`)
- **Data Fetching**: TanStack React Query v5
- **Search**: Algolia (`algoliasearch` v5 + `react-instantsearch` v7)
- **Styling**: TailwindCSS v4 (`@tailwindcss/vite`)
- **UI Library**: shadcn/ui (new-york style) + Radix UI primitives
- **Icons**: lucide-react
- **Linting & Formatting**: Biome
- **Package Manager**: pnpm

### Type Definitions
- `src/types/index.ts` — All shared types (UserPreference, ComicHit, Algorithm, PredictionResponse, MangaData, etc.)
- `src/vite-env.d.ts` — Vite client types, ImportMetaEnv, and asset module declarations
