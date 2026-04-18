# AGENTS.md

## Purpose
This repository is the foundation for a Nx + pnpm monorepo.

Current priority is establishing stable workspace structure and conventions so future phases can add product code without top-level rework.

## Product Naming Direction
- Primary apps: `apps/petabase` and `apps/api`
- Optional future app path: `apps/pawscroll`
- Do not create a separate `apps/admin` app
- Internal/admin flows belong inside `petabase` via route/path separation

## Target Top-Level Layout
- `apps/`: deployable applications
- `packages/`: shared packages (ui, types, sdk, auth, utils, configs)
- `docs/`: project and architecture documentation
- `tools/`: scripts and developer tooling

## Dependency Boundaries
- Allowed direction: `apps -> packages`
- Shared contracts and types must live in `packages/*` (not duplicated in apps)
- Avoid circular dependencies across apps/packages
- Keep database ownership in `apps/api` initially unless reuse is proven

## Implementation Rules for Agents
- Keep setup MVP-first; avoid premature complexity and over-segmentation
- Prefer documented conventions when scaffolding is not yet needed
- If uncertain between adding new structure vs documenting reserved paths, choose the simpler option and document it clearly
- Preserve existing user changes; do not revert unrelated files
- Do not introduce secrets or `.env` values into tracked files

## Workspace Commands
When available, standard root scripts should be:
- `pnpm build`
- `pnpm lint`
- `pnpm test`
- `pnpm typecheck`

If scripts are not yet defined, add or document them as part of the current task instead of inventing ad hoc alternatives.

## Design Reference
- Use root `DESIGN.md` as the visual design source of truth for UI generation tasks
- When implementing frontend/UI, read and follow `DESIGN.md` tokens and rules before coding
- Preserve existing design direction unless explicitly asked to redefine it

## Definition of Done for Foundation Tasks
- Nx workspace initializes and is recognized
- pnpm workspace discovery is configured correctly
- Root scripts for build/lint/test/typecheck exist or are explicitly documented
- Repository layout and naming conventions are documented and aligned with this file

<!-- GSD:project-start source:PROJECT.md -->
## Project

**Petabase - Veterinary PIMS MVP**

Petabase is a bilingual (Thai/English), mobile-first veterinary practice information management system (PIMS) focused on clinics in Thailand. It combines clinic operations workflows across dashboarding, patient records, appointments, consultations, and billing into one staff-facing web app backed by a role-aware API. This MVP establishes the data and product foundation for clinic operations before post-MVP expansion.

**Core Value:** Clinic staff can run core day-to-day veterinary operations in one localized system without relying on expensive or poorly localized alternatives.

### Constraints

- **Localization**: Thai/English bilingual support from the start - core market requirement
- **Platform**: Mobile-first responsive web UX - clinic staff usage pattern across devices
- **Architecture**: `apps/petabase` (Next.js) + `apps/api` (NestJS) in existing Nx monorepo - aligns with established repository boundaries
- **Cost/Adoption**: MVP scope must stay focused on table-stakes clinic operations - affordability and time-to-value are key
- **Delivery Sequencing**: UI prototype modules precede backend wiring for faster iteration with stakeholders
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript 5.9.3 - Workspace language for `apps/api` and `apps/petabase` (`package.json`, `apps/api/package.json`, `apps/petabase/package.json`)
- JavaScript (ES modules + CommonJS) - Tooling and config scripts in `tools/scripts/run-target.mjs`, `apps/api/eslint.config.cjs`, `.github/workflows/*.yml`
- Shell (bash) - CI helpers in `tools/ci/*.sh`
## Runtime
- Node.js runtime required for workspace commands (`README.md` states Node.js 24+)
- Node.js 22 used by CI workflows (`.github/workflows/ci.yml`, `.github/workflows/deploy-production.yml`)
- pnpm 10.8.1 (`package.json` `packageManager`, `.github/workflows/*.yml`)
- Lockfile: present at `pnpm-lock.yaml`
## Frameworks
- Nx 22.6.5 - Monorepo task orchestration (`package.json`, `nx.json`, `apps/*/project.json`)
- NestJS 11.1.6 - Backend API app in `apps/api` (`apps/api/package.json`, `apps/api/src/main.ts`)
- Next.js 15.5.9 + React 19.1.1 - Frontend app in `apps/petabase` (`apps/petabase/package.json`, `apps/petabase/src/app/*`)
- Node built-in test runner (`node:test`) - API tests (`apps/api/package.json` test script, `apps/api/src/**/*.spec.ts`)
- TypeScript compiler (`tsc`) - Build/typecheck (`apps/api/tsconfig.build.json`, `apps/petabase/tsconfig.json`)
- ts-node + ts-node-dev - API local execution (`apps/api/package.json`)
- ESLint + Prettier - Lint/format (`apps/api/eslint.config.cjs`, `apps/petabase/.eslintrc.json`, `apps/*/.prettierrc.json`)
## Key Dependencies
- `@nestjs/*` - API framework and DI/runtime (`apps/api/package.json`, `apps/api/src/main.ts`)
- `next`, `react`, `react-dom` - Web app runtime (`apps/petabase/package.json`, `apps/petabase/src/app/layout.tsx`)
- `zod` - Runtime env validation in both apps (`apps/api/src/config/env.validation.ts`, `apps/petabase/src/lib/env.ts`)
- `pino` - Structured API logging (`apps/api/package.json`, `apps/api/src/common/logging/app-logger.service.ts`)
- `class-validator` + `class-transformer` - Request validation pipeline support (`apps/api/package.json`, `apps/api/src/main.ts`)
- `rxjs` - Nest stream/interceptor usage (`apps/api/package.json`, `apps/api/src/common/interceptors/response-envelope.interceptor.ts`)
## Configuration
- API env is validated at startup via `ConfigModule.forRoot({ validate: validateEnv })` in `apps/api/src/app.module.ts`
- API env contract is defined in `apps/api/src/config/env.validation.ts` (`NODE_ENV`, `APP_NAME`, `API_VERSION`, `PORT`, `LOG_LEVEL`, `CORS_ORIGINS`)
- Petabase env is validated in `apps/petabase/src/lib/env.ts` (`NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_DEFAULT_LOCALE`, `NEXT_PUBLIC_ENABLE_AUTH_GUARD`)
- `.env*` files: Not detected in repository root (`glob: .env*`, `glob: **/.env*`)
- Workspace/Nx config: `nx.json`, `tools/scripts/run-target.mjs`, `apps/*/project.json`
- TypeScript config: `tsconfig.base.json`, `apps/api/tsconfig*.json`, `apps/petabase/tsconfig.json`
- Frontend config: `apps/petabase/next.config.ts`
- CI/CD config: `.github/workflows/ci.yml`, `.github/workflows/deploy-production.yml`
## Platform Requirements
- Node.js + pnpm toolchain (`README.md`)
- Nx workspace commands via root scripts in `package.json`
- Frontend deployment target: Vercel (`.github/workflows/deploy-production.yml`, `docs/devops/cicd.md`)
- API deployment target: Railway (`.github/workflows/deploy-production.yml`, `docs/devops/cicd.md`)
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- Use kebab-case for TypeScript/TSX files in both apps, e.g. `apps/api/src/common/interceptors/response-envelope.interceptor.ts`, `apps/petabase/src/features/auth/components/sign-in-form.tsx`.
- Use Next.js reserved names for route files, e.g. `apps/petabase/src/app/layout.tsx`, `apps/petabase/src/app/page.tsx`, `apps/petabase/src/app/[locale]/error.tsx`.
- Use `*.spec.ts` for tests, co-located with source, e.g. `apps/api/src/config/env.validation.spec.ts`.
- Use camelCase for functions and methods, e.g. `buildCorsOriginValidator` in `apps/api/src/main.ts`, `getProtectedPath` in `apps/petabase/src/lib/auth/protection.ts`.
- Use PascalCase for class names, e.g. `HttpExceptionFilter` in `apps/api/src/common/filters/http-exception.filter.ts`, `ResponseEnvelopeInterceptor` in `apps/api/src/common/interceptors/response-envelope.interceptor.ts`.
- Use camelCase for local variables and parameters, e.g. `requestId`, `durationMs` in `apps/api/src/common/logging/request-logger.middleware.ts`.
- Use UPPER_SNAKE_CASE for module-level constants, e.g. `API_PREFIX` in `apps/api/src/main.ts`, `PROTECTED_PREFIXES` in `apps/petabase/src/lib/auth/protection.ts`.
- Use PascalCase for type aliases and interfaces, e.g. `AppEnv` in `apps/api/src/config/env.validation.ts`, `ToastContextValue` in `apps/petabase/src/components/ui/toast-provider.tsx`.
## Code Style
- Tool used: Prettier (`apps/api/.prettierrc.json`, `apps/petabase/.prettierrc.json`).
- Key settings:
- API uses ESLint flat config in `apps/api/eslint.config.cjs` with `@typescript-eslint` recommended rules.
- API explicitly allows `any` (`@typescript-eslint/no-explicit-any: 'off'`) in `apps/api/eslint.config.cjs`.
- Petabase uses Next.js ESLint presets in `apps/petabase/.eslintrc.json` (`next/core-web-vitals`, `next/typescript`).
## Import Organization
- Use app-local alias `@petabase/*` defined in `apps/petabase/tsconfig.json`.
- Workspace aliases are defined in `tsconfig.base.json` (`@haelabs/types`, `@haelabs/sdk`, `@haelabs/auth`, `@haelabs/utils`, `@haelabs/ui`).
## Error Handling
- API standardizes HTTP error payloads through `HttpExceptionFilter` in `apps/api/src/common/filters/http-exception.filter.ts`.
- Validation and env parsing fail fast by throwing `Error`, e.g. `validateEnv` in `apps/api/src/config/env.validation.ts` and `env` parsing in `apps/petabase/src/lib/env.ts`.
- React error boundary page logs and exposes retry via `reset`, in `apps/petabase/src/app/[locale]/error.tsx`.
## Logging
- Use `AppLogger` wrapper service (`apps/api/src/common/logging/app-logger.service.ts`) and structured logs with object payloads.
- Use request-scoped logging in middleware (`apps/api/src/common/logging/request-logger.middleware.ts`) with `requestId`, `statusCode`, and `durationMs`.
- Frontend currently logs errors with `console.error(error)` in `apps/petabase/src/app/[locale]/error.tsx`.
## Comments
- Inline comments are minimal across app source files. Prefer expressive names and small helper functions (e.g. `normalizeApiPath` in `apps/petabase/src/lib/api/client.ts`) over explanatory comments.
- Not detected in app source files under `apps/api/src` and `apps/petabase/src`.
## Function Design
- Keep helpers focused and small (e.g. `isLocale` in `apps/petabase/src/lib/i18n/config.ts`, `classNames` in `apps/petabase/src/lib/utils/classnames.ts`).
- Use orchestrator-style functions for setup/bootstrap where required (e.g. `bootstrap` in `apps/api/src/main.ts`, `middleware` in `apps/petabase/middleware.ts`).
- Use typed object parameters for multi-value inputs, e.g. `useAuthGuard({ locale, isAuthenticated })` in `apps/petabase/src/hooks/use-auth-guard.ts`.
- Use generic signatures for reusable utilities, e.g. `apiRequest<TData>` in `apps/petabase/src/lib/api/client.ts`.
- Return plain typed objects for domain responses, e.g. health payload in `apps/api/src/health/health.service.ts`.
- Return discriminated/guarded shapes for transport helpers, e.g. `SuccessEnvelope<TData>` and `ErrorEnvelope` in `apps/petabase/src/lib/api/client.ts`.
## Module Design
- Use named exports for reusable helpers/services/modules, e.g. `export class AppLogger` in `apps/api/src/common/logging/app-logger.service.ts`, `export function apiGet` in `apps/petabase/src/lib/api/client.ts`.
- Use default exports for Next.js route components, e.g. `apps/petabase/src/app/page.tsx`, `apps/petabase/src/app/[locale]/layout.tsx`.
- Not detected in current app source directories (`apps/api/src`, `apps/petabase/src`).
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- Workspace orchestration is centralized in root Nx/pnpm config and scripts: `nx.json`, `pnpm-workspace.yaml`, `package.json`, `tools/scripts/run-target.mjs`.
- Backend architecture is modular NestJS with global cross-cutting concerns: `apps/api/src/main.ts`, `apps/api/src/app.module.ts`, `apps/api/src/common/*`.
- Frontend architecture is Next.js App Router with locale-first routing and route-grouped layouts: `apps/petabase/src/app/[locale]/*`, `apps/petabase/middleware.ts`.
## Layers
- Purpose: Define project graph, target execution, and shared workspace boundaries.
- Location: `nx.json`, `pnpm-workspace.yaml`, `package.json`, `tools/scripts/run-target.mjs`.
- Contains: Root scripts (`build`, `lint`, `test`, `typecheck`), Nx workspace layout, run-many orchestration.
- Depends on: `pnpm`, `nx`.
- Used by: All app targets in `apps/api/project.json` and `apps/petabase/project.json`.
- Purpose: Serve versioned HTTP endpoints under `/api/v1/*`.
- Location: `apps/api/src/`.
- Contains: Bootstrap (`main.ts`), module wiring (`app.module.ts`), health feature (`health/*`), shared response contracts (`shared/response/*`), cross-cutting modules (`common/*`), env validation (`config/env.validation.ts`).
- Depends on: `@nestjs/*`, `zod`, `pino`, `rxjs`.
- Used by: HTTP clients and smoke checks via `tools/ci/smoke-check.sh`.
- Purpose: Staff-facing UI with locale-scoped routes and route-group shell composition.
- Location: `apps/petabase/src/` plus edge middleware in `apps/petabase/middleware.ts`.
- Contains: App Router routes/layouts in `src/app/`, UI primitives in `src/components/`, feature UI in `src/features/`, environment and API helpers in `src/lib/`, locale messages in `src/messages/`.
- Depends on: `next`, `react`, `zod`.
- Used by: Browser clients.
## Data Flow
- Server-rendered route composition in App Router layouts/pages: `apps/petabase/src/app/[locale]/**/*.tsx`.
- Local component state with React hooks for interaction-only state (for example loading/toasts) in `apps/petabase/src/features/auth/components/sign-in-form.tsx` and `apps/petabase/src/components/ui/toast-provider.tsx`.
## Key Abstractions
- Purpose: Standardize API success and error payload shape.
- Examples: `apps/api/src/shared/response/response-envelope.ts`, `apps/api/src/common/interceptors/response-envelope.interceptor.ts`, `apps/api/src/common/filters/http-exception.filter.ts`.
- Pattern: Global interceptor/filter apply envelope across controllers.
- Purpose: Keep route generation and locale validation consistent.
- Examples: `apps/petabase/src/lib/i18n/config.ts`, `apps/petabase/src/lib/navigation/locale-path.ts`, `apps/petabase/src/hooks/use-locale-path.ts`, `apps/petabase/middleware.ts`.
- Pattern: Central helpers + middleware enforcement + route-group layouts.
- Purpose: Fail fast on invalid runtime configuration.
- Examples: `apps/api/src/config/env.validation.ts`, `apps/petabase/src/lib/env.ts`.
- Pattern: `zod` schema validation at startup/import time.
## Entry Points
- Location: `package.json` scripts delegating to `tools/scripts/run-target.mjs`.
- Triggers: `pnpm build|lint|test|typecheck`.
- Responsibilities: Run Nx targets across discovered projects.
- Location: `apps/api/src/main.ts`.
- Triggers: `pnpm --filter @haelabs/api run start` via `apps/api/project.json`.
- Responsibilities: Create Nest app, configure global middleware/pipes/filter/interceptor/CORS, start server.
- Location: `apps/petabase/src/app/layout.tsx`, `apps/petabase/src/app/page.tsx`, `apps/petabase/middleware.ts`.
- Triggers: `next dev/build/start` via `apps/petabase/project.json`.
- Responsibilities: Root document layout, root redirect to locale, locale/auth guard middleware.
## Error Handling
- API runtime errors are converted to structured envelopes in `apps/api/src/common/filters/http-exception.filter.ts`.
- API input validation errors are emitted by global `ValidationPipe` in `apps/api/src/main.ts` with `VALIDATION_ERROR` code payload.
- Web route-level errors use App Router error boundary at `apps/petabase/src/app/[locale]/error.tsx`.
## Cross-Cutting Concerns
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
