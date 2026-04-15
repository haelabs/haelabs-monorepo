# REQUIREMENTS

## Table Stakes (MVP Must-Haves)
- **R1**: Create `apps/api` in the Nx + pnpm monorepo using NestJS.
- **R2**: Keep API foundation scope to backend platform setup only (no business modules implemented in this spec).
- **R3**: Configure TypeScript, ESLint, Prettier, and Nx integration consistently for the API app.
- **R4**: Structure the API as a modular monolith in `apps/api`.
- **R5**: Provide source layout with `main.ts`, `app.module.ts`, `common/`, `config/`, `health/`, `modules/`, and infrastructure/shared folders as needed.
- **R6**: Reserve future domain module placeholders for `auth`, `organizations`, `branches`, `users`, `roles`, and `permissions`.
- **R7**: Standardize bootstrap with global `/api` prefix, URI versioning `/v1`, and effective route base `/api/v1/*`.
- **R8**: Configure global validation pipeline with whitelist behavior and consistent DTO error sanitization.
- **R9**: Add centralized exception handling with a consistent error envelope.
- **R10**: Define a base success response envelope strategy (`{ data, meta? }`).
- **R11**: Configure env-driven CORS allowlist behavior.
- **R12**: Add request-aware structured logging for startup and request lifecycle events.
- **R13**: Implement centralized config/env loading with startup validation and fail-fast behavior.
- **R14**: Implement `GET /api/v1/health`.
- **R15**: Health response must include service/app status and API version.
- **R16**: Health response must include DB connectivity/readiness when available, or a stub-compatible readiness shape when DB is deferred.
- **R17**: Keep DB integration minimal here but preserve a clean readiness integration point for future Prisma + PostgreSQL/Neon.
- **R18**: Keep health endpoint public and avoid bootstrap choices that block future Better Auth or session-based auth.
- **R19**: Ensure `nx serve api` starts successfully.
- **R20**: Ensure `nx build api` succeeds.
- **R21**: Document folder conventions, route versioning, response contracts, config pattern, and extension points for future modules.
- **R22**: Keep foundation deployment-ready for local dev, CI, and Railway health checking.

## Features (Scoped To Spec 31)
- **F1**: NestJS API foundation app in `apps/api` under Nx.
- **F2**: Standardized API bootstrap (`/api/v1`, validation, exception handling, CORS, logging).
- **F3**: Foundation directory architecture for cross-cutting backend concerns.
- **F4**: Centralized configuration subsystem with startup validation.
- **F5**: Public, versioned health endpoint for deployment checks.
- **F6**: Consistent response contract strategy for success and error payloads.
- **F7**: Auth-ready and DB-ready foundation without implementing those domains now.
- **F8**: Documentation of conventions and extension points for upcoming modules.

## Out Of Scope Items Mentioned In Spec
- **O1**: Implementing auth functionality in this issue (only reserve `modules/auth` and keep endpoint public/auth-ready).
- **O2**: Implementing business-domain schema/entities and business logic.
- **O3**: Requiring immediate full Prisma/database integration (stub-compatible DB readiness is acceptable).
- **O4**: Requiring immediate split health endpoints (`/health/live`, `/health/ready`).

## Requirements Traceability

### Phase 1 - Foundation Scaffold And Bootstrap Baseline

#### Plan 01-01: Bootstrap baseline with fail-fast env validation, route versioning, and env-driven CORS
- **Completed:** 2026-04-14
- **Requirements Implemented:**
  - ✅ R1: Create `apps/api` in the Nx + pnpm monorepo using NestJS.
  - ✅ R2: Keep API foundation scope to backend platform setup only (no business modules implemented in this spec).
  - ✅ R3: Configure TypeScript, ESLint, Prettier, and Nx integration consistently for the API app.
  - ✅ R4: Structure the API as a modular monolith in `apps/api`.
  - ✅ R5: Provide source layout with `main.ts`, `app.module.ts`, `common/`, `config/`, `health/`, `modules/`, and infrastructure/shared folders as needed.
  - ✅ R6: Reserve future domain module placeholders for `auth`, `organizations`, `branches`, `users`, `roles`, and `permissions`.
  - ✅ R7: Standardize bootstrap with global `/api` prefix, URI versioning `/v1`, and effective route base `/api/v1/*`.
  - ✅ R11: Configure env-driven CORS allowlist behavior.
  - ✅ R18: Keep health endpoint public and avoid bootstrap choices that block future Better Auth or session-based auth.

#### Plan 01-02: Contract tests, stabilized envelope/logging contracts, and comprehensive API foundation documentation
- **Completed:** 2026-04-15
- **Requirements Implemented:**
  - ✅ R8: Configure global validation pipeline with whitelist behavior and consistent DTO error sanitization.
  - ✅ R9: Add centralized exception handling with a consistent error envelope.
  - ✅ R10: Define a base success response envelope strategy (`{ data, meta? }`).
  - ✅ R12: Add request-aware structured logging for startup and request lifecycle events.
  - ✅ R13: Implement centralized config/env loading with startup validation and fail-fast behavior.
  - ✅ R14: Implement `GET /api/v1/health`.
  - ✅ R15: Health response must include service/app status and API version.
  - ✅ R16: Health response must include DB connectivity/readiness when available, or a stub-compatible readiness shape when DB is deferred.
  - ✅ R17: Keep DB integration minimal here but preserve a clean readiness integration point for future Prisma + PostgreSQL/Neon.
  - ✅ R19: Ensure `nx serve api` starts successfully.

### Phase 3 - Documentation And Handoff Completeness

#### Plan 03-01: Harden canonical API foundation docs and handoff cross-links
- **Completed:** 2026-04-15
- **Requirements Implemented:**
  - ✅ R21: Document folder conventions, route versioning, config pattern, response contracts, and extension points for future modules.
  - ✅ R22: Keep foundation deployment-ready for local dev, CI, and Railway health checking.

### Remaining Requirements
- R20: Ensure `nx build api` succeeds. (Verification pending)

### Newly Completed In Phase 3
- ✅ R21: Document folder conventions, route versioning, config pattern, response contracts, and extension points for future modules.
- ✅ R22: Keep foundation deployment-ready for local dev, CI, and Railway health checking.

**Overall Progress:** 21/22 requirements complete (95.5%)

## Acceptance Criteria Mapped To Requirements
| Acceptance Criterion | Mapped Requirements |
| --- | --- |
| `apps/api` exists and works with `nx serve api` and `nx build api` | R1, R3, R4, R19, R20 |
| App uses `/api/v1` route base | R7 |
| CORS is env-driven | R11 |
| Validation is globally enabled | R8 |
| `common/`, `config/`, `health/`, `modules/`, and required infrastructure/shared placeholders exist | R5, R6 |
| Env values are loaded centrally, validated at startup, and fail fast on invalid config | R13 |
| `/api/v1/health` returns a healthy/unhealthy state suitable for deployment health checks | R14, R15, R16, R22 |
| `GET /api/v1/health` returns 200 in healthy conditions | R14, R15 |
| Health payload follows agreed response envelope | R10, R15, R16 |
| Invalid env/config fails fast at startup with readable error output | R13 |
| DTO validation errors return consistent sanitized error responses | R8 |
| Global exception filter returns consistent error envelopes | R9 |
| Exception filter normalizes framework/application errors | R9 |
| JSON success responses follow a consistent `{ data, meta }` shape | R10 |
| CORS behavior matches configured allowlist | R11 |
| Logging emits structured startup and request information | R12 |
| Health endpoint remains public and unaffected by future auth scaffolding | R18 |
| Repo docs explain layout, routing, config pattern, response contract, and extension points | R21 |
