# Vercel + GitHub Pages Compatibility Update Prompt

Apply ONLY the minimal Vercel/GitHub Pages compatibility fixes without changing my personalized content.

## Constraints
1. Do not edit `src/content/portfolio.config.ts`.
2. Do not edit `src/components/HeroSection.tsx`.
3. Do not edit `src/components/ui/background-beams-with-collision.tsx`.
4. Keep all personal text/images/section data intact.
5. Make the smallest possible diff.

## Required Edits

### A) `package.json`
- Ensure scripts include:
  - `"build:pages": "pnpm build && node scripts/generate-client-index.mjs"`
  - `"build:vercel": "pnpm build:pages"`
- Keep existing `"build": "vite build"`.

### B) `vercel.json`
- Set/keep:
  - `"$schema": "https://openapi.vercel.sh/vercel.json"`
  - `"framework": "vite"`
  - `"installCommand": "pnpm install --frozen-lockfile"`
  - `"buildCommand": "pnpm build:vercel"`
  - `"outputDirectory": "dist/client"`
  - rewrites:
    1. `/favicon.ico` -> `/placeholder.svg`
    2. `/(.*)` -> `/index.html`

### C) `src/client.tsx`
- Do NOT block first paint on route loading.
- Remove awaited initial `router.load` before render.
- Render app first, then call non-blocking `router.load` (`void router.load()`).

### D) `src/routes/index.tsx`
- Avoid validating config multiple times.
- Parse config once at module scope and reuse for both head metadata and component rendering.

### E) `.github/workflows/deploy-pages.yml`
- Build step should run: `pnpm build:pages`.
- Remove duplicate manual index/fallback generation steps that are now redundant.

## After Edits
1. Run `pnpm build:pages`.
2. Run `pnpm build:vercel`.
3. If both pass, show a concise summary of changed files and exact diff stats.
4. Stop and ask before making any additional refactor/styling changes.
