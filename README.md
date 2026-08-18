# Meridian Academy

Marketing and admissions site for Meridian Academy, a secondary school in Ibadan (est. 1998).
Frontend only — no backend. Built from the Claude Design canvas for the school.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript (strict)
- [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [zustand](https://zustand.docs.pmnd.rs) for client state, [zod](https://zod.dev) for content schemas
- React Three Fiber for the 3D campus labs
- Vitest + React Testing Library (unit), Playwright (E2E smoke)

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Scripts

| Script           | What it does           |
| ---------------- | ---------------------- |
| `pnpm dev`       | Dev server             |
| `pnpm build`     | Production build       |
| `pnpm lint`      | ESLint                 |
| `pnpm typecheck` | `tsc --noEmit`         |
| `pnpm format`    | Prettier write         |
| `pnpm test`      | Vitest unit tests      |
| `pnpm e2e`       | Playwright smoke tests |

## Structure

```
src/
  app/               Routes: /, /academics, /campus, /people, /admissions
  components/ui/     shadcn primitives only
  components/layout/ Header, footer, shared layout pieces
  features/          One folder per feature; owns its components, store, schema
  content/           Typed site content, validated with zod at module load
  lib/               Small shared utilities
e2e/                 Playwright specs
```

Rules of the road: one exported component per file, no file over ~150 lines,
route logic stays in its feature folder.

## Workflow

`main` is protected — all work lands via PR from a `feat/`, `fix/`, `chore/`, or `docs/` branch
with CI green. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Deployment

Vercel via GitHub Actions: preview per PR, production on merge to `main`.
Requires `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` repo secrets;
the deploy workflow no-ops (stays green) until they exist.
