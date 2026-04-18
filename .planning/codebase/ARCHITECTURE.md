# Architecture

**Analysis Date:** 2026-04-18

## Pattern Overview

**Overall:** App-centric Nx monorepo with two deployable applications and per-app architecture patterns.

**Key Characteristics:**
- Workspace orchestration is centralized in root Nx/pnpm config and scripts: `nx.json`, `pnpm-workspace.yaml`, `package.json`, `tools/scripts/run-target.mjs`.
- Backend architecture is modular NestJS with global cross-cutting concerns: `apps/api/src/main.ts`, `apps/api/src/app.module.ts`, `apps/api/src/common/*`.
- Frontend architecture is Next.js App Router with locale-first routing and route-grouped layouts: `apps/petabase/src/app/[locale]/*`, `apps/petabase/middleware.ts`.

## Layers

**Workspace Layer:**
- Purpose: Define project graph, target execution, and shared workspace boundaries.
- Location: `nx.json`, `pnpm-workspace.yaml`, `package.json`, `tools/scripts/run-target.mjs`.
- Contains: Root scripts (`build`, `lint`, `test`, `typecheck`), Nx workspace layout, run-many orchestration.
- Depends on: `pnpm`, `nx`.
- Used by: All app targets in `apps/api/project.json` and `apps/petabase/project.json`.

**API Application Layer (`apps/api`):**
- Purpose: Serve versioned HTTP endpoints under `/api/v1/*`.
- Location: `apps/api/src/`.
- Contains: Bootstrap (`main.ts`), module wiring (`app.module.ts`), health feature (`health/*`), shared response contracts (`shared/response/*`), cross-cutting modules (`common/*`), env validation (`config/env.validation.ts`).
- Depends on: `@nestjs/*`, `zod`, `pino`, `rxjs`.
- Used by: HTTP clients and smoke checks via `tools/ci/smoke-check.sh`.

**Web Application Layer (`apps/petabase`):**
- Purpose: Staff-facing UI with locale-scoped routes and route-group shell composition.
- Location: `apps/petabase/src/` plus edge middleware in `apps/petabase/middleware.ts`.
- Contains: App Router routes/layouts in `src/app/`, UI primitives in `src/components/`, feature UI in `src/features/`, environment and API helpers in `src/lib/`, locale messages in `src/messages/`.
- Depends on: `next`, `react`, `zod`.
- Used by: Browser clients.

## Data Flow

**API HTTP Request Flow (`apps/api`):**

1. Bootstrap configures global behaviors in `apps/api/src/main.ts` (prefix/versioning, validation pipe, filter, interceptor, CORS).
2. Incoming request gets correlation logging middleware in `apps/api/src/app.module.ts` via `RequestLoggerMiddleware` from `apps/api/src/common/logging/request-logger.middleware.ts`.
3. Controller/service return value (for example `apps/api/src/health/health.controller.ts` → `apps/api/src/health/health.service.ts`) is wrapped by `ResponseEnvelopeInterceptor` in `apps/api/src/common/interceptors/response-envelope.interceptor.ts`.
4. Exceptions are normalized by `HttpExceptionFilter` in `apps/api/src/common/filters/http-exception.filter.ts`.

**Web Routing + Locale Flow (`apps/petabase`):**

1. Request enters `apps/petabase/middleware.ts`.
2. Middleware resolves locale from `petabase.locale` cookie, `accept-language`, or default from `apps/petabase/src/lib/i18n/config.ts`.
3. Middleware redirects to locale-prefixed path when needed and can apply cookie-based auth gating for protected prefixes via `apps/petabase/src/lib/auth/protection.ts`.
4. Locale layouts/pages resolve message catalog through `apps/petabase/src/lib/i18n/dictionaries.ts` and render route-group layouts in `apps/petabase/src/app/[locale]/(dashboard)/layout.tsx` or `apps/petabase/src/app/[locale]/admin/layout.tsx`.

**Web-to-API Call Flow (`apps/petabase`):**

1. Client/server code calls `apiRequest`/`apiGet`/`apiPost` in `apps/petabase/src/lib/api/client.ts`.
2. Base URL comes from validated env in `apps/petabase/src/lib/env.ts`.
3. API envelope errors are converted to thrown `Error` in `apps/petabase/src/lib/api/client.ts`.

**State Management:**
- Server-rendered route composition in App Router layouts/pages: `apps/petabase/src/app/[locale]/**/*.tsx`.
- Local component state with React hooks for interaction-only state (for example loading/toasts) in `apps/petabase/src/features/auth/components/sign-in-form.tsx` and `apps/petabase/src/components/ui/toast-provider.tsx`.

## Key Abstractions

**Response Envelope Contract:**
- Purpose: Standardize API success and error payload shape.
- Examples: `apps/api/src/shared/response/response-envelope.ts`, `apps/api/src/common/interceptors/response-envelope.interceptor.ts`, `apps/api/src/common/filters/http-exception.filter.ts`.
- Pattern: Global interceptor/filter apply envelope across controllers.

**Locale Routing Contract:**
- Purpose: Keep route generation and locale validation consistent.
- Examples: `apps/petabase/src/lib/i18n/config.ts`, `apps/petabase/src/lib/navigation/locale-path.ts`, `apps/petabase/src/hooks/use-locale-path.ts`, `apps/petabase/middleware.ts`.
- Pattern: Central helpers + middleware enforcement + route-group layouts.

**Environment Validation Contract:**
- Purpose: Fail fast on invalid runtime configuration.
- Examples: `apps/api/src/config/env.validation.ts`, `apps/petabase/src/lib/env.ts`.
- Pattern: `zod` schema validation at startup/import time.

## Entry Points

**Workspace command entry:**
- Location: `package.json` scripts delegating to `tools/scripts/run-target.mjs`.
- Triggers: `pnpm build|lint|test|typecheck`.
- Responsibilities: Run Nx targets across discovered projects.

**API runtime entry:**
- Location: `apps/api/src/main.ts`.
- Triggers: `pnpm --filter @haelabs/api run start` via `apps/api/project.json`.
- Responsibilities: Create Nest app, configure global middleware/pipes/filter/interceptor/CORS, start server.

**Web runtime + routing entry:**
- Location: `apps/petabase/src/app/layout.tsx`, `apps/petabase/src/app/page.tsx`, `apps/petabase/middleware.ts`.
- Triggers: `next dev/build/start` via `apps/petabase/project.json`.
- Responsibilities: Root document layout, root redirect to locale, locale/auth guard middleware.

## Error Handling

**Strategy:** Centralized normalization per app boundary.

**Patterns:**
- API runtime errors are converted to structured envelopes in `apps/api/src/common/filters/http-exception.filter.ts`.
- API input validation errors are emitted by global `ValidationPipe` in `apps/api/src/main.ts` with `VALIDATION_ERROR` code payload.
- Web route-level errors use App Router error boundary at `apps/petabase/src/app/[locale]/error.tsx`.

## Cross-Cutting Concerns

**Logging:** Structured request/startup logging via `AppLogger` and request middleware in `apps/api/src/common/logging/app-logger.service.ts` and `apps/api/src/common/logging/request-logger.middleware.ts`.

**Validation:** Runtime/env validation via `apps/api/src/config/env.validation.ts` and `apps/petabase/src/lib/env.ts`; request payload validation via global `ValidationPipe` in `apps/api/src/main.ts`.

**Authentication:** Current auth gating is middleware-level, cookie-presence based, and feature-flag controlled in `apps/petabase/middleware.ts` with path rules from `apps/petabase/src/lib/auth/protection.ts`.

---

*Architecture analysis: 2026-04-18*
