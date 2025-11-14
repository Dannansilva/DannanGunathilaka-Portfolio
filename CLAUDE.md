# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 project (using the App Router) with TypeScript, React 19, and Tailwind CSS v4. The project was bootstrapped with `create-next-app` and uses Bun as the package manager (indicated by `bun.lock`).

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

Note: This project uses Bun, so you can also use `bun dev`, `bun build`, etc.

## Architecture

### Framework & Routing
- **Next.js App Router**: Uses the `app/` directory structure (not Pages Router)
- Pages are defined as `page.tsx` files within the `app/` directory
- Layouts are defined in `layout.tsx` files and wrap their children

### Key Files
- `app/layout.tsx`: Root layout that wraps all pages, includes font configuration (Geist Sans and Geist Mono)
- `app/page.tsx`: Home page component
- `app/globals.css`: Global styles with Tailwind v4 syntax and CSS variables for theming

### Styling
- **Tailwind CSS v4**: Uses the new `@import "tailwindcss"` syntax (not v3 syntax)
- **CSS Variables**: Theme colors defined in `globals.css` with dark mode support via `prefers-color-scheme`
- **Fonts**: Google Fonts (Geist and Geist Mono) loaded via `next/font/google`

### TypeScript Configuration
- Path alias `@/*` maps to the root directory
- Strict mode enabled
- Target: ES2017

### ESLint
- Uses Next.js ESLint configuration with TypeScript support
- Configured with the new flat config format (`eslint.config.mjs`)

## Important Notes

- When adding new pages, create them in the `app/` directory following the App Router conventions
- Use Server Components by default; add `"use client"` only when needed for interactivity
- Tailwind v4 uses a different syntax than v3 - use `@import "tailwindcss"` and `@theme` blocks
- Image optimization is built-in via `next/image` component
