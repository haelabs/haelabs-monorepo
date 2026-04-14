# Phase 01 Context (Spec 31)

## Tech Stack Decisions
- Backend framework is **NestJS**.
- API app lives at `apps/api` inside the **Nx + pnpm monorepo**.
- Tooling must be consistently configured for the API app: **TypeScript**, **ESLint**, **Prettier**, and **Nx targets**.
- Structured logging is required, with request-aware machine-readable output suitable for local development and Railway logs.
- DB readiness design must stay compatible with future **Prisma + PostgreSQL/Neon** integration.

## Architecture Choices
- API is a **modular monolith** in `apps/api`.
- Foundation source structure includes:
  - `main.ts`
  - `app.module.ts`
  - `common/`
  - `config/`
  - `health/`
  - `modules/` (future domain area)
  - `infrastructure/` (if needed)
  - `shared/response/` or equivalent for response envelopes
- Reserve placeholders under `modules/` for: `auth`, `organizations`, `branches`, `users`, `roles`, `permissions`.
- Keep business-domain logic and schema out of this scope.

## API Design Preferences
- Bootstrap conventions are fixed:
  - global prefix `/api`
  - URI versioning `/v1`
  - effective base route `/api/v1/*`
- Required endpoint is `GET /api/v1/health`.
- Health response should include:
  - service/app status
  - API version
  - database connectivity/readiness (or stub-compatible readiness structure if DB is deferred)
- Response envelope strategy:
  - success: `{ data, meta? }`
  - error: `{ error: { code, message, details? }, meta? }`
- Health endpoint remains public.
- Optional `live` / `ready` split endpoints are not required in this scope.

## Explicit Constraints And Requirements
- Centralized environment config loading with **startup validation** and **fail-fast** behavior is required.
- Global request validation with whitelist behavior is required.
- Global exception filtering with consistent error envelopes is required.
- CORS must be env-driven using an allowlist.
- `nx serve api` and `nx build api` must both work.
- API foundation docs must cover folder conventions, route versioning, response contract, config pattern, and future extension points.
- Auth implementation is out of scope, but bootstrap decisions must not block future Better Auth or session-based auth.
