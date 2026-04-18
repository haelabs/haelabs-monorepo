# Codebase Structure

**Analysis Date:** 2026-04-18

## Directory Layout

```text
haelabs-monorepo/
├── apps/                  # Deployable applications (`api`, `petabase`)
├── packages/              # Shared workspace packages (currently `types` scaffold)
├── docs/                  # Architecture and foundation docs
├── tools/                 # CI and workspace scripts
├── .planning/codebase/    # Agent-generated codebase mapping docs
├── nx.json                # Nx workspace layout and target defaults
├── pnpm-workspace.yaml    # pnpm workspace package discovery
├── package.json           # Root command entrypoints
├── tsconfig.base.json     # Shared TS compiler and path aliases
└── README.md              # Repository onboarding and command references
```

## Directory Purposes

**`apps/api/`:**
- Purpose: NestJS backend application.
- Contains: Runtime source in `apps/api/src/`, Nx project config in `apps/api/project.json`, package scripts in `apps/api/package.json`.
- Key files: `apps/api/src/main.ts`, `apps/api/src/app.module.ts`, `apps/api/src/common/*`, `apps/api/src/health/*`.

**`apps/petabase/`:**
- Purpose: Next.js staff-facing web application.
- Contains: App Router routes in `apps/petabase/src/app/`, shared app-local libraries in `apps/petabase/src/lib/`, UI components in `apps/petabase/src/components/`, feature components in `apps/petabase/src/features/`.
- Key files: `apps/petabase/middleware.ts`, `apps/petabase/src/app/[locale]/layout.tsx`, `apps/petabase/src/lib/env.ts`, `apps/petabase/src/lib/api/client.ts`.

**`packages/types/`:**
- Purpose: Shared package placeholder under `@haelabs/types`.
- Contains: `packages/types/package.json` only.
- Key files: `packages/types/package.json`.

**`docs/`:**
- Purpose: Canonical architecture/convention references.
- Contains: Monorepo guidance in `docs/monorepo-foundation.md`, backend foundation in `docs/api-foundation.md`, frontend foundation in `docs/petabase-foundation.md`, and conventions in `docs/conventions.md`.
- Key files: `docs/monorepo-foundation.md`, `docs/api-foundation.md`, `docs/petabase-foundation.md`, `docs/conventions.md`.

**`tools/`:**
- Purpose: Workspace and CI automation scripts.
- Contains: Root target runner in `tools/scripts/run-target.mjs`, CI scripts in `tools/ci/*.sh`.
- Key files: `tools/scripts/run-target.mjs`, `tools/ci/run-affected.sh`, `tools/ci/smoke-check.sh`.

## Key File Locations

**Entry Points:**
- `package.json`: Root command entry (`build`, `lint`, `test`, `typecheck`).
- `apps/api/src/main.ts`: API bootstrap entry.
- `apps/petabase/src/app/layout.tsx`: Next root layout entry.
- `apps/petabase/middleware.ts`: Locale/auth middleware entry.

**Configuration:**
- `nx.json`: Nx layout (`appsDir`, `libsDir`) and target defaults.
- `pnpm-workspace.yaml`: Workspace package discovery for `apps/*`, `packages/*`, `tools/*`.
- `tsconfig.base.json`: Root TS options and `@haelabs/*` path aliases.
- `apps/petabase/tsconfig.json`: `@petabase/*` alias to `apps/petabase/src/*`.

**Core Logic:**
- `apps/api/src/common/`: API cross-cutting logic (logging/filter/interceptor).
- `apps/api/src/health/`: Health feature module.
- `apps/petabase/src/app/[locale]/`: Locale-scoped route tree and route-group layouts.
- `apps/petabase/src/lib/`: Shared app-local env/api/i18n/navigation/auth helpers.

**Testing:**
- `apps/api/src/**/*.spec.ts`: API tests (Node test runner).
- `apps/petabase`: No test files detected; `apps/petabase/package.json` test script prints placeholder text.

## Naming Conventions

**Files:**
- Kebab-case for most files: `request-logger.middleware.ts`, `response-envelope.interceptor.ts`, `locale-path.ts`, `sign-in-form.tsx`.
- Next App Router reserved names for route files: `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` in `apps/petabase/src/app/`.

**Directories:**
- Lowercase top-level app/package names: `apps/api`, `apps/petabase`, `packages/types`.
- Next route groups use parentheses and dynamic segment uses brackets: `apps/petabase/src/app/[locale]/(dashboard)`, `apps/petabase/src/app/[locale]/(auth)`.

## Where to Add New Code

**New Feature:**
- API domain feature modules: add under `apps/api/src/modules/<domain>/` and import in `apps/api/src/app.module.ts`.
- Petabase staff-facing pages: add under `apps/petabase/src/app/[locale]/(dashboard)/` or `apps/petabase/src/app/[locale]/admin/`.
- Tests: place API tests as co-located `*.spec.ts` under `apps/api/src/`; no established Petabase test directory yet.

**New Component/Module:**
- Petabase shared UI component: `apps/petabase/src/components/`.
- Petabase feature-scoped composition: `apps/petabase/src/features/<feature>/`.
- API cross-cutting reusable concern: `apps/api/src/common/`.

**Utilities:**
- Petabase app-local helper: `apps/petabase/src/lib/`.
- Backend shared non-domain contract/helper: `apps/api/src/shared/`.
- Cross-app shared contracts/packages: `packages/` (per conventions in `docs/conventions.md`).

## Special Directories

**`dist/`:**
- Purpose: Build output (for example `dist/apps/api/*`).
- Generated: Yes.
- Committed: No (`dist` in `.gitignore`).

**`node_modules/` and per-project `node_modules/`:**
- Purpose: Installed dependencies.
- Generated: Yes.
- Committed: No (`node_modules` in `.gitignore`).

**`apps/petabase/.next/`:**
- Purpose: Next.js build cache/artifacts.
- Generated: Yes.
- Committed: No (`.next` in `.gitignore`).

**`.nx/`:**
- Purpose: Nx local cache and workspace metadata.
- Generated: Yes.
- Committed: No (`.nx` in `.gitignore`).

**`.planning/codebase/`:**
- Purpose: Generated architecture/quality/stack mapping docs for GSD planning/execution commands.
- Generated: Yes.
- Committed: Yes (documentation directory in repository working tree).

---

*Structure analysis: 2026-04-18*
