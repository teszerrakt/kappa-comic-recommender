# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kappa is a cluster-based comic recommender system frontend built with ReactJS, Vite, and TailwindCSS. The application allows users to rate comics and receive recommendations using different clustering algorithms (K-means and DBSCAN).

## Development Commands

- **Start development server**: `pnpm dev`
- **Build for production**: `pnpm build`
- **Preview production build**: `pnpm preview`
- **Run tests**: `pnpm test`

The project uses Vite as the build tool with React and TailwindCSS integration.

## Architecture

### Core Application Flow
1. **Home View** (`src/Views/Home.js`): Comic search and rating interface using Algolia InstantSearch
2. **Result View** (`src/Views/Result.js`): Displays personalized recommendations from API
3. **App State**: User preferences (ratings) and selected algorithm are managed at the app level

### Key Components
- **ComicCard**: Displays comic information with rating functionality
- **UserPreferences**: Shows selected comics and ratings, triggers recommendation
- **PredictionCard**: Displays recommended comics
- **TutorialModal**: First-time user guidance
- **SearchBox**: Algolia-powered comic search

### State Management
- React state is passed down from App.js to manage user preferences and algorithm selection
- User ratings are stored as an array in the `prefs` state
- Tutorial modal visibility is managed via localStorage (`useStorage` hook)

### External Services
- **Algolia Search**: Comic search functionality (requires `VITE_ALGOLIA_APP_ID` and `VITE_ALGOLIA_API_KEY`)
- **Kappa API**: Machine learning recommendations endpoint (requires `VITE_KAPPA_API_URL`)

### Routing
- `/` - Home page with comic search and rating
- `/kmeans` - K-means algorithm results
- `/dbscan` - DBSCAN algorithm results

### Styling
- TailwindCSS with custom color palette (kappa-black, kappa-dark-gray, kappa-gray, kappa-green)
- Responsive grid layouts for comic displays
- Custom viewport-based width utilities

## Environment Variables Required
```
VITE_ALGOLIA_APP_ID=your_algolia_app_id
VITE_ALGOLIA_API_KEY=your_algolia_api_key
VITE_KAPPA_API_URL=your_api_url
```

## Build Tool Migration Notes
The project has been migrated from Create React App (CRA) to Vite for improved performance and development experience:

- **Build Tool**: Vite replaces CRACO/CRA
- **Package Manager**: Uses pnpm for faster dependency management
- **Environment Variables**: Prefixed with `VITE_` instead of `REACT_APP_`
- **React Router**: Updated to v6 syntax with `Routes` and `element` props
- **React InstantSearch**: Updated to v7 from react-instantsearch-dom
- **JSX in .js files**: Configured via esbuild loader in vite.config.js