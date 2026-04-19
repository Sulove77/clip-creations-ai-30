# Vercel + GitHub Pages Compatibility Update Prompt

Apply ONLY the minimal Vercel/GitHub Pages compatibility and contact fixes without changing my personalized content.

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
    1. `/api/(.*)` -> `/api/$1` (must come before SPA catch-all)
    2. `/favicon.ico` -> `/placeholder.svg`
    3. `/(.*)` -> `/index.html`

### C) `api/contact.ts` (Vercel serverless handler)
- Create/update Vercel API function at `api/contact.ts`.
- Accept only `POST`; return `405` for other methods.
- Validate payload with `name`, `email`, `message`, optional `website`.
- Keep honeypot behavior: if `website` is present, return `{ ok: true }`.
- Keep rate limiting.
- Read only SMTP env vars:
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_USER`
  - `SMTP_PASS`
- Do NOT require `CONTACT_TO_EMAIL`.
- Use submitted form email (`parsed.data.email`) as the recipient.
- Normalize Gmail app password formatting (strip spaces/quotes).
- Return clear non-secret error messages for missing env vars and auth issues.

### D) `src/client.tsx`
- Do NOT block first paint on route loading.
- Remove awaited initial `router.load` before render.
- Render app first, then call non-blocking `router.load` (`void router.load()`).

### E) `src/routes/index.tsx`
- Avoid validating config multiple times.
- Parse config once at module scope and reuse for both head metadata and component rendering.

### F) `.github/workflows/deploy-pages.yml`
- Build step should run: `pnpm build:pages`.
- Remove duplicate manual index/fallback generation steps that are now redundant.

### G) Contact form support on GitHub Pages (`src/components/ContactSection.tsx` + docs)
- GitHub Pages is static, so `/api/contact` cannot run there.
- Add support for an optional env override endpoint in frontend submit logic:
  - Read `VITE_CONTACT_ENDPOINT`.
  - If on `github.io` and endpoint is missing, show a clear user-facing message instead of a failing submit.
  - If endpoint exists, submit to that URL.
- Keep default behavior as `/api/contact` for Vercel/server deployments.
- Handle non-JSON error responses safely in fetch error handling.
- Update docs to explain setup:
  - In `README.md`, add: `VITE_CONTACT_ENDPOINT=https://your-vercel-app.vercel.app/api/contact`.
  - Mention SMTP env vars must be configured on the backend host (for example, Vercel), not GitHub Pages.
  - Remove `CONTACT_TO_EMAIL` from docs/env examples because recipient now comes from submitted form email.

### H) Optional parity update for TanStack server route
- If `src/routes/api/contact.ts` exists in the repo, keep behavior aligned with `api/contact.ts`:
  - no `CONTACT_TO_EMAIL` dependency
  - recipient from submitted email
  - same validation/rate-limit flow

## After Edits
1. Run `pnpm build:pages`.
2. Run `pnpm build:vercel`.
3. Test contact behavior:
   - GitHub Pages with no `VITE_CONTACT_ENDPOINT` should show the clear guidance message.
   - With `VITE_CONTACT_ENDPOINT` set to a live backend, form submission should work.
   - On Vercel preview, `POST /api/contact` should return `200` for valid input.
4. If all checks pass, show a concise summary of changed files and exact diff stats.
5. Stop and ask before making any additional refactor/styling changes.
