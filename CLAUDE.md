# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the ZHURYLO family website - a Ukrainian heritage website with a casino-inspired dark luxury aesthetic. Built as a single-page application with React, TypeScript, Vite, and shadcn/ui components with extensive Radix UI primitives.

**Key Technology Stack:**
- **Build tool:** Vite with React SWC plugin
- **Framework:** React 18 with TypeScript
- **Routing:** React Router v6
- **State Management:** TanStack Query (React Query) for server state
- **UI Components:** shadcn/ui built on Radix UI primitives
- **Styling:** Tailwind CSS with custom casino-inspired theme
- **Forms:** React Hook Form with Zod validation
- **Animations:** Framer Motion

## Development Commands

```bash
# Install dependencies
npm i

# Start dev server (runs on http://[::]:8080)
npm run dev

# Build for production
npm run build

# Build for development mode
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Routing Structure

The application uses React Router with the following page routes defined in [src/App.tsx](src/App.tsx):
- `/` - Home page with hero, values preview, story preview, gallery preview, and join section
- `/history` - History page
- `/values` - Values page
- `/directions` - Directions page
- `/gallery` - Gallery page
- `/contact` - Contact page
- `*` - 404 Not Found page

All routes render page components from [src/pages/](src/pages/).

### Component Organization

**Layout System:**
- [src/components/layout/Layout.tsx](src/components/layout/Layout.tsx) - Main layout wrapper with Header and Footer
- [src/components/layout/Header.tsx](src/components/layout/Header.tsx) - Navigation header
- [src/components/layout/Footer.tsx](src/components/layout/Footer.tsx) - Site footer

**Page Components:**
All pages are in [src/pages/](src/pages/) and follow a simple pattern - they import the Layout wrapper and compose sections/components within it.

**Home Page Sections:**
Home page ([src/pages/Index.tsx](src/pages/Index.tsx)) is composed of modular sections in [src/components/home/](src/components/home/):
- `HeroSection.tsx` - Hero banner
- `ValuesPreview.tsx` - Values preview section
- `StoryPreview.tsx` - Story/history preview
- `GalleryPreview.tsx` - Gallery preview
- `JoinSection.tsx` - Call-to-action section

**UI Components:**
shadcn/ui components are in [src/components/ui/](src/components/ui/). These are pre-built, customizable components from shadcn/ui library built on Radix UI primitives.

### Styling & Theming

**Custom Casino-Inspired Theme:**
The project uses a dark luxury aesthetic with custom color palette defined in [tailwind.config.ts](tailwind.config.ts) and [src/index.css](src/index.css):

**Brand Colors:**
- `gold` - Primary brand color (HSL: 43 74% 49%)
- `burgundy` - Secondary deep crimson (HSL: 348 83% 25%)
- `crimson` - Neon accent
- `emerald` - Dark emerald accent (HSL: 160 84% 18%)
- `noir` - Deep black background tones
- `cream` - Light accent colors

**Typography:**
- Display font: `Playfair Display` (serif) - for headings
- Body font: `Crimson Text` (serif) - for body text

**Custom Animations:**
Tailwind config includes custom keyframe animations:
- `fade-in`, `fade-in-up`, `fade-in-scale` - Entry animations
- `slide-in-right`, `slide-in-left` - Sliding transitions
- `neon-pulse` - Glowing neon effect
- `text-shimmer` - Shimmer text effect

**Custom Gradients:**
- `gradient-casino` - Noir gradient
- `gradient-gold` - Gold gradient
- `gradient-burgundy` - Burgundy gradient

### Path Aliases

TypeScript path alias `@/*` maps to `./src/*` (configured in [tsconfig.json](tsconfig.json) and [vite.config.ts](vite.config.ts)).

Example: `import { Button } from "@/components/ui/button"`

### Global Providers

[src/App.tsx](src/App.tsx) wraps the application with:
- `QueryClientProvider` - TanStack Query for data fetching
- `TooltipProvider` - Radix UI tooltips
- `Toaster` and `Sonner` - Toast notifications
- `BrowserRouter` - React Router

## TypeScript Configuration

TypeScript is configured with relaxed strictness for faster development:
- `noImplicitAny: false`
- `noUnusedParameters: false`
- `noUnusedLocals: false`
- `strictNullChecks: false`
- `allowJs: true`

Project uses project references with separate configs for app code ([tsconfig.app.json](tsconfig.app.json)) and Node/Vite config ([tsconfig.node.json](tsconfig.node.json)).

## ESLint Configuration

Using flat config format ([eslint.config.js](eslint.config.js)) with:
- TypeScript ESLint recommended rules
- React Hooks plugin with recommended rules
- React Refresh plugin (warns on non-constant exports)
- `@typescript-eslint/no-unused-vars` disabled

## Adding New Components

When adding shadcn/ui components, they should be placed in [src/components/ui/](src/components/ui/). The project uses [components.json](components.json) for shadcn/ui configuration with Tailwind CSS and custom paths.

## Lovable Integration

This project was originally created with Lovable (a UI generation tool). The `lovable-tagger` plugin is enabled in development mode to tag components for the Lovable editor.
