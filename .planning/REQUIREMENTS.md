# REQUIREMENTS

## Table Stakes (MVP Must-Haves)
- **R1**: Create `apps/api` in the Nx monorepo as a NestJS app.
- **R2**: Configure TypeScript, ESLint, Prettier, and Nx integration consistently for `apps/api`.
- **R3**: Implement the API as a modular monolith in `apps/api`.
- **R4**: Establish foundation source structure with `main.ts`, `app.module.ts`, `common/`, `config/`, `health/`, `modules/`, plus `infrastructure/` and `shared/response/` (or equivalent) as needed.
- **R5**: Reserve future domain placeholders under `modules/` for `auth`, `organizations`, `branches`, `users`, `roles`, and `permissions`.
- **R6**: Standardize bootstrap with global prefix `/api`, URI versioning `/v1`, and effective route base `/api/v1/*`.
- **R7**: Add centralized environment/config loading with startup validation and fail-fast behavior on invalid configuration.
- **R8**: Enable global request validation with whitelist behavior and consistent sanitized DTO error behavior.
- **R9**: Add central exception handling via global filter with consistent error envelopes.
- **R10**: Define and apply base success response envelope strategy for JSON responses.
- **R11**: Configure env-driven CORS allowlist.
- **R12**: Add request-aware structured logging for startup and request lifecycle events.
- **R13**: Implement `GET /api/v1/health`.
- **R14**: Health payload must include service/app status and API version.
- **R15**: Health payload must include database readiness/connectivity status when available, or a stub-compatible readiness structure when DB integration is deferred.
- **R16**: Keep health endpoint public and auth-ready (do not make bootstrap choices that block Better Auth or session-based auth later).
- **R17**: Keep DB integration minimal in this issue but provide clear readiness integration points compatible with future Prisma + PostgreSQL/Neon.
- **R18**: Ensure `nx serve api` starts successfully and `nx build api` succeeds.
- **R19**: Document API foundation conventions: folder layout, route versioning, config pattern, response contracts, and extension points.

## Features (Scoped To Spec 31)
- **F1**: Nx-integrated NestJS API scaffold at `apps/api`.
- **F2**: Standardized bootstrap baseline (`/api/v1`, validation, exception filter, CORS, structured logging).
- **F3**: Cross-cutting backend foundation structure (`common`, `config`, `health`, `modules`, infrastructure/shared paths).
- **F4**: Centralized config subsystem with startup validation and fail-fast behavior.
- **F5**: Deployment-ready versioned health endpoint (`GET /api/v1/health`).
- **F6**: Standard response contracts: success `{ data, meta? }` and error `{ error: { code, message, details? }, meta? }`.
- **F7**: Public health behavior compatible with future auth/session architecture.
- **F8**: Foundation documentation for future domain module expansion.

## Out Of Scope Items Mentioned In Spec
- **O1**: Implementing auth in this issue (auth-ready structure only).
- **O2**: Adding business-domain schema and business logic in this issue.
- **O3**: Mandatory full DB integration now (stub-compatible readiness is acceptable).
- **O4**: Immediate implementation of optional split health endpoints (`GET /api/v1/health/live`, `GET /api/v1/health/ready`).

## Acceptance Criteria Mapped To Requirements
| Acceptance Criterion | Mapped Requirements |
| --- | --- |
| `apps/api` exists and works with `nx serve api` and `nx build api` | R1, R2, R3, R18 |
| App uses `/api/v1` route base | R6 |
| CORS is env-driven | R11 |
| Validation is globally enabled | R8 |
| `common/`, `config/`, `health/`, `modules/`, and required infrastructure/shared placeholders exist | R4, R5 |
| Env values are loaded centrally, validated at startup, and fail fast on invalid config | R7 |
| `/api/v1/health` returns healthy/unhealthy state suitable for deployment checks | R13, R14, R15 |
| `GET /api/v1/health` returns 200 in healthy conditions | R13, R14 |
| Health payload follows agreed response envelope | R10, R14, R15 |
| Global exception filter returns consistent error envelopes | R9 |
| Exception filter normalizes framework/application errors | R9 |
| DTO validation errors return consistent sanitized responses | R8, R9 |
| JSON success responses follow consistent `{ data, meta }` shape | R10 |
| Invalid env/config fails fast at startup with readable output | R7 |
| CORS behavior matches configured allowlist | R11 |
| Logging emits structured startup and request information | R12 |
| Health endpoint remains public and unaffected by future auth scaffolding | R16 |
| Repo docs explain layout, routing, config pattern, response contract, and extension points | R19 |

## Completion Tracking

### Completed by 01-01-PLAN.md
- [x] R1
- [x] R2
- [x] R3
- [x] R4
- [x] R5
- [x] R6
- [x] R7
- [x] R11
- [x] R18
