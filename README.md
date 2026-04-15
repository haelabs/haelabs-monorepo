# haelabs-monorepo

Nx + pnpm monorepo foundation for Haelabs.

## Current scope

This repository currently establishes the workspace shell, root tooling, and repository conventions needed for future product work.

Primary reserved app paths:
- `apps/petabase`
- `apps/api`
- `apps/pawscroll` (optional future app)

Do not create a separate `apps/admin` application. Internal/admin flows should live inside `petabase`.

## Prerequisites

- Node.js 24+
- pnpm 10+

If pnpm is not available, enable it with Corepack:

```bash
corepack enable
corepack prepare pnpm@10.8.1 --activate
```

## Getting started

```bash
pnpm install
pnpm exec nx show projects
pnpm build
pnpm lint
pnpm test
pnpm typecheck
```

The root scripts are intentionally safe in an empty workspace. They succeed even before real apps or packages exist.

App-level commands:

```bash
pnpm exec nx serve petabase
pnpm exec nx build petabase
pnpm exec nx serve api
pnpm exec nx build api
```

## Repository layout

- `apps/` for deployable applications
- `packages/` for shared packages and config packages
- `docs/` for architecture and contributor docs
- `tools/` for local scripts and workspace tooling

See `docs/monorepo-foundation.md` for the current structure and extension rules.
For backend foundation conventions, `docs/api-foundation.md` is the canonical reference.
See `docs/petabase-foundation.md` for web app routing and i18n conventions.
