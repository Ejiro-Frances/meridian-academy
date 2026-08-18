# Contributing

## Branching

- Never commit to `main`. It is branch-protected: PR + green CI required.
- Branch names: `feat/<topic>`, `fix/<topic>`, `chore/<topic>`, `docs/<topic>`.
- One concern per branch. If a PR description needs the word "also", split it.

## Pull requests

- Fill in every section of the PR template. Screenshots are mandatory for visual changes.
- Keep PRs reviewable: prefer several small PRs over one large one.
- Branches auto-delete on merge.

## Commits

Conventional style: `feat: add fee calculator store`, `fix: clamp children count at 1`.

## Code conventions

- One exported component per file; files stay under ~150 lines.
- Feature code lives in `src/features/<feature>/` — components, `store.ts`, `schema.ts`, hooks.
- `src/components/ui/` is shadcn-managed; do not hand-edit primitives there beyond theming.
- Site copy and data live in `src/content/` as typed modules parsed by zod schemas —
  malformed content must fail the build, not the browser.
- Client state: zustand for input-like state (calculator, forms); URL `searchParams`
  for navigational state (selected arm, lab, tab, pin) so views deep-link.

## Before pushing

`pnpm lint && pnpm typecheck && pnpm test && pnpm build` — CI runs the same, plus Playwright.
Husky runs lint-staged on every commit.
