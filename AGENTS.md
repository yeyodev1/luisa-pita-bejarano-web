# Agent Notes — Luisa Pita Bejarano Web Frontapp

## Stack
- Vue 3 + Vite + TypeScript + SCSS.
- pnpm workspace (single app; `pnpm-workspace.yaml` is present but malformed and can be ignored).
- State: Pinia. Routing: vue-router. Animation: GSAP + ScrollTrigger + Lenis smooth scroll.

## Daily commands
- `pnpm dev` — start Vite dev server.
- `pnpm build` — type-check with `vue-tsc -b` then `vite build`.
- `pnpm preview` — preview production build from `dist/`.

No test, lint, or formatter scripts are configured. Verification is `build` only.

## Architecture
- Entry: `src/main.ts` mounts `#app` from `index.html`.
- Router: `src/router/index.ts`. Route `meta` drives dynamic SEO (title, description, OG, canonical).
- Stores: `src/stores/user.ts` (Pinia, localStorage-backed auth state).
- HTTP: `src/services/httpBase.ts` is the Axios base class; consumes `VITE_API_BASE_URL`.
- Views: `src/views/` (Home, LegalNotice, PrivacyPolicy).
- Components: `src/components/{layout,home,ui}/`.

## Path alias
- `@/` maps to `./src` in both Vite and TypeScript.

## Styles
- `vite.config.ts` auto-injects `@use "@/styles/index.scss" as *;` into every `<style lang="scss">` block.
- `index.scss` forwards color and font variables; use them directly in component SCSS without re-importing.
- `src/styles/global.scss` is imported once in `main.ts` for global/base rules.
- Theme CSS variables live on `:root` / `[data-theme="dark"]` in `global.scss`.

## Environment
- Copy `.env.example` to `.env` for local dev.
- `VITE_API_BASE_URL` defaults to `http://localhost:8100/api` if unset.

## Config gotcha
- Both `vite.config.ts` and `vite.config.js` exist with identical content. Vite prefers `.ts`; `tsconfig.node.json` references only `vite.config.ts`. Treat `.ts` as the source of truth.

## Conventions
- `<script setup lang="ts">` for SFCs.
- Components are PascalCase (`HeroSection.vue`, `AppButton.vue`).
- Page SEO is defined in the route `meta`, not inside components.
- Images are served from Cloudinary (`res.cloudinary.com/dkosgkjpq`).
