# Coding Conventions

**Analysis Date:** 2026-04-18

## Naming Patterns

**Files:**
- Use kebab-case for TypeScript/TSX files in both apps, e.g. `apps/api/src/common/interceptors/response-envelope.interceptor.ts`, `apps/petabase/src/features/auth/components/sign-in-form.tsx`.
- Use Next.js reserved names for route files, e.g. `apps/petabase/src/app/layout.tsx`, `apps/petabase/src/app/page.tsx`, `apps/petabase/src/app/[locale]/error.tsx`.
- Use `*.spec.ts` for tests, co-located with source, e.g. `apps/api/src/config/env.validation.spec.ts`.

**Functions:**
- Use camelCase for functions and methods, e.g. `buildCorsOriginValidator` in `apps/api/src/main.ts`, `getProtectedPath` in `apps/petabase/src/lib/auth/protection.ts`.
- Use PascalCase for class names, e.g. `HttpExceptionFilter` in `apps/api/src/common/filters/http-exception.filter.ts`, `ResponseEnvelopeInterceptor` in `apps/api/src/common/interceptors/response-envelope.interceptor.ts`.

**Variables:**
- Use camelCase for local variables and parameters, e.g. `requestId`, `durationMs` in `apps/api/src/common/logging/request-logger.middleware.ts`.
- Use UPPER_SNAKE_CASE for module-level constants, e.g. `API_PREFIX` in `apps/api/src/main.ts`, `PROTECTED_PREFIXES` in `apps/petabase/src/lib/auth/protection.ts`.

**Types:**
- Use PascalCase for type aliases and interfaces, e.g. `AppEnv` in `apps/api/src/config/env.validation.ts`, `ToastContextValue` in `apps/petabase/src/components/ui/toast-provider.tsx`.

## Code Style

**Formatting:**
- Tool used: Prettier (`apps/api/.prettierrc.json`, `apps/petabase/.prettierrc.json`).
- Key settings:
  - API app: `singleQuote: true`, `semi: true`, `trailingComma: "all"`, `printWidth: 100`.
  - Petabase app: `singleQuote: true`, `trailingComma: "all"`.

**Linting:**
- API uses ESLint flat config in `apps/api/eslint.config.cjs` with `@typescript-eslint` recommended rules.
- API explicitly allows `any` (`@typescript-eslint/no-explicit-any: 'off'`) in `apps/api/eslint.config.cjs`.
- Petabase uses Next.js ESLint presets in `apps/petabase/.eslintrc.json` (`next/core-web-vitals`, `next/typescript`).

## Import Organization

**Order:**
1. Built-in/runtime imports first, e.g. `import assert from 'node:assert/strict';` in `apps/api/src/config/env.validation.spec.ts`.
2. External package imports second, e.g. NestJS imports in `apps/api/src/main.ts`, Next imports in `apps/petabase/src/app/page.tsx`.
3. Internal imports last (project alias or relative), e.g. `@petabase/...` in `apps/petabase/src/features/auth/components/sign-in-form.tsx`, `./common/...` in `apps/api/src/main.ts`.

**Path Aliases:**
- Use app-local alias `@petabase/*` defined in `apps/petabase/tsconfig.json`.
- Workspace aliases are defined in `tsconfig.base.json` (`@haelabs/types`, `@haelabs/sdk`, `@haelabs/auth`, `@haelabs/utils`, `@haelabs/ui`).

## Error Handling

**Patterns:**
- API standardizes HTTP error payloads through `HttpExceptionFilter` in `apps/api/src/common/filters/http-exception.filter.ts`.
- Validation and env parsing fail fast by throwing `Error`, e.g. `validateEnv` in `apps/api/src/config/env.validation.ts` and `env` parsing in `apps/petabase/src/lib/env.ts`.
- React error boundary page logs and exposes retry via `reset`, in `apps/petabase/src/app/[locale]/error.tsx`.

## Logging

**Framework:** Pino in API, `console` in selected frontend/tooling files.

**Patterns:**
- Use `AppLogger` wrapper service (`apps/api/src/common/logging/app-logger.service.ts`) and structured logs with object payloads.
- Use request-scoped logging in middleware (`apps/api/src/common/logging/request-logger.middleware.ts`) with `requestId`, `statusCode`, and `durationMs`.
- Frontend currently logs errors with `console.error(error)` in `apps/petabase/src/app/[locale]/error.tsx`.

## Comments

**When to Comment:**
- Inline comments are minimal across app source files. Prefer expressive names and small helper functions (e.g. `normalizeApiPath` in `apps/petabase/src/lib/api/client.ts`) over explanatory comments.

**JSDoc/TSDoc:**
- Not detected in app source files under `apps/api/src` and `apps/petabase/src`.

## Function Design

**Size:**
- Keep helpers focused and small (e.g. `isLocale` in `apps/petabase/src/lib/i18n/config.ts`, `classNames` in `apps/petabase/src/lib/utils/classnames.ts`).
- Use orchestrator-style functions for setup/bootstrap where required (e.g. `bootstrap` in `apps/api/src/main.ts`, `middleware` in `apps/petabase/middleware.ts`).

**Parameters:**
- Use typed object parameters for multi-value inputs, e.g. `useAuthGuard({ locale, isAuthenticated })` in `apps/petabase/src/hooks/use-auth-guard.ts`.
- Use generic signatures for reusable utilities, e.g. `apiRequest<TData>` in `apps/petabase/src/lib/api/client.ts`.

**Return Values:**
- Return plain typed objects for domain responses, e.g. health payload in `apps/api/src/health/health.service.ts`.
- Return discriminated/guarded shapes for transport helpers, e.g. `SuccessEnvelope<TData>` and `ErrorEnvelope` in `apps/petabase/src/lib/api/client.ts`.

## Module Design

**Exports:**
- Use named exports for reusable helpers/services/modules, e.g. `export class AppLogger` in `apps/api/src/common/logging/app-logger.service.ts`, `export function apiGet` in `apps/petabase/src/lib/api/client.ts`.
- Use default exports for Next.js route components, e.g. `apps/petabase/src/app/page.tsx`, `apps/petabase/src/app/[locale]/layout.tsx`.

**Barrel Files:**
- Not detected in current app source directories (`apps/api/src`, `apps/petabase/src`).

---

*Convention analysis: 2026-04-18*
