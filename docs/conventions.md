# Monorepo Conventions

## Naming and Placement

### Apps (`apps/`)

Deployable applications live in `apps/`. Each app is an Nx project with its own `package.json`.

| Path | Purpose | Status |
|------|---------|--------|
| `apps/petabase` | Main product (web) | Reserved |
| `apps/api` | Backend API | Reserved |
| `apps/pawscroll` | Future product (if needed) | Optional |
| `apps/admin` | ❌ **Forbidden** | Do not create |

> **Why no `apps/admin`?** Internal and admin flows live inside `petabase`. A separate admin app adds premature complexity with no current justification.

**App naming rules:**
- Lowercase, hyphen-separated (e.g., `apps/my-feature`)
- Must not conflict with reserved paths above
- New apps require a brief proposal in an issue before scaffolding

### Packages (`packages/`)

Shared packages live in `packages/`. Each package is an Nx library.

| Package | Purpose |
|---------|---------|
| `packages/types` | Shared TypeScript types and interfaces |
| `packages/sdk` | Client SDK for the API |
| `packages/auth` | Authentication utilities and shared auth logic |
| `packages/utils` | General-purpose utility functions |
| `packages/ui` | Shared UI components |
| `packages/config` | Shared configuration (ESLint, TypeScript, etc.) |

**Package naming rules:**
- Lowercase, hyphen-separated (e.g., `packages/data-access`)
- Scoped packages use `@haelabs/` scope (e.g., `@haelabs/types`)
- Domain packages group by feature area when they grow

## Dependency Direction

Dependencies must flow in one direction:

```
apps/  →  shared/domain packages  →  config/util packages
```

- **Apps** may depend on any `packages/` library
- **Domain packages** (`types`, `sdk`, `auth`) may depend on `utils` and `config`
- **Util/config packages** (`utils`, `config`) must not depend on domain packages or apps
- **No circular dependencies** between any packages

> In practice: `apps/petabase` → `packages/sdk` → `packages/types` ✅
> But: `packages/config` → `packages/auth` ❌

## Shared Contracts and Types

Shared contracts and TypeScript types **must** live in `packages/*`, not duplicated inside apps.

- API response types → `packages/types`
- SDK client types → `packages/sdk` (re-exports from `packages/types` where needed)
- Auth-related types → `packages/auth`

If two apps need the same type, it belongs in a shared package — never copy-paste.

## Adding a New App

1. Create the app directory under `apps/<name>`
2. Add a `package.json` with the app's dependencies
3. Register any Nx targets (build, serve, test) in the app's `project.json`
4. Update this document with the new app's purpose
5. Run `pnpm install` to verify workspace integrity

## Adding a New Package

1. Create the package directory under `packages/<name>`
2. Add a `package.json` (set `"name": "@haelabs/<name>"` for published packages)
3. Export public API from `packages/<name>/src/index.ts`
4. Add the package to the dependency direction table above if it's a new category
5. Run `pnpm install` to verify workspace integrity

## MVP-Friendly Guidelines

- **Don't over-abstract.** Create packages when there's a real consumer, not speculatively.
- **Don't extract shared code prematurely.** If only one app uses it, keep it in the app until a second consumer appears.
- **Keep CI simple.** Avoid complex Nx affected-graph logic until there are multiple apps with real targets.
- **Prefer flat over deep.** A shallow `packages/` with clear names beats a deeply nested domain hierarchy at this stage.

---
*Last updated: 2026-04-14*
