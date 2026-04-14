# REQUIREMENTS

## Table Stakes (MVP Must-Haves)
- **R1**: Create `apps/api` inside the Nx monorepo as a NestJS API app.
- **R2**: Configure TypeScript, ESLint, Prettier, and Nx integration consistently for the API app.
- **R3**: Implement the API foundation as a modular monolith in `apps/api`.
- **R4**: Establish the foundational source structure: `main.ts`, `app.module.ts`, `common/`, `config/`, `health/`, `modules/`, and `infrastructure/` + `shared/response/` (or equivalent) as needed.
- **R5**: Reserve domain placeholders under `modules/` for `auth`, `organizations`, `branches`, `users`, `roles`, and `permissions`.
- **R6**: Apply bootstrap conventions with global prefix `/api`, URI versioning `/v1`, and effective base `/api/v1/*`.
- **R7**: Add centralized environment/config loading with startup validation and fail-fast behavior for invalid config.
- **R8**: Enable global request validation with whitelist behavior and consistent sanitized DTO validation errors.
- **R9**: Add a central/global exception filter that returns a consistent error envelope.
- **R10**: Add a base JSON success envelope strategy using `{ data, meta? }`.
- **R11**: Configure env-driven CORS allowlist behavior.
- **R12**: Add request-aware structured logging for startup and request lifecycle events.
- **R13**: Implement `GET /api/v1/health`.
- **R14**: Ensure health response includes service/app status and API version.
- **R15**: Ensure health response includes database connectivity/readiness if implemented, or a stub-compatible readiness structure if DB is deferred.
- **R16**: Keep health endpoint public and keep bootstrap choices compatible with future Better Auth/session-based auth.
- **R17**: Keep DB integration minimal now but leave a clear readiness integration point compatible with future Prisma + PostgreSQL/Neon.
- **R18**: Ensure `nx serve api` and `nx build api` work.
- **R19**: Document folder conventions, route versioning, response contracts, config pattern, and extension points for future modules.

## Features (Scoped To Spec 31)
- **F1**: Nx + pnpm monorepo API foundation app at `apps/api` using NestJS.
- **F2**: Standardized API bootstrap (`/api/v1`, versioning, validation, exception filter, env-driven CORS, structured logging).
- **F3**: Backend foundation folder architecture for cross-cutting concerns and future domains.
- **F4**: Centralized config subsystem with startup env validation.
- **F5**: Deployment-ready health endpoint contract at `GET /api/v1/health`.
- **F6**: Consistent response envelope strategy for both success and error responses.
- **F7**: Auth-ready API foundation while leaving auth implementation out of this scope.
- **F8**: Foundation documentation for extension by future domain modules.

## Out Of Scope Items Mentioned In Spec
- **O1**: Implementing auth features in this issue (only reserve `modules/auth` and stay auth-ready).
- **O2**: Implementing business-domain schema and business-domain logic.
- **O3**: Requiring full Prisma/database integration immediately (stub-compatible readiness is acceptable).
- **O4**: Requiring immediate `live`/`ready` health endpoint split (`GET /api/v1/health/live`, `GET /api/v1/health/ready`).

## Acceptance Criteria Mapped To Requirements
| Acceptance Criterion | Mapped Requirements |
| --- | --- |
| `apps/api` exists and works with `nx serve api` and `nx build api` | R1, R2, R3, R18 |
| App uses `/api/v1` route base | R6 |
| CORS is env-driven | R11 |
| Validation is globally enabled | R8 |
| `common/`, `config/`, `health/`, `modules/`, and required infrastructure/shared placeholders exist | R4, R5 |
| Env values are loaded centrally, validated at startup, and fail fast on invalid config | R7 |
| `/api/v1/health` returns a healthy/unhealthy state suitable for deployment health checks | R13, R14, R15 |
| `GET /api/v1/health` returns 200 in healthy conditions | R13, R14 |
| Health payload follows agreed response envelope | R10, R14, R15 |
| Invalid env/config fails fast at startup with readable error output | R7 |
| DTO validation errors return consistent sanitized error responses | R8 |
| Global exception filter returns consistent error envelopes | R9 |
| Exception filter normalizes framework/application errors | R9 |
| JSON success responses follow a consistent `{ data, meta }` shape | R10 |
| CORS behavior matches configured allowlist | R11 |
| Logging emits structured startup and request information | R12 |
| Health endpoint remains public and unaffected by future auth scaffolding | R16 |
| Repo docs explain layout, routing, config pattern, response contract, and extension points | R19 |
