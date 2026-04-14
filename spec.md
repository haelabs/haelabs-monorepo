# Executive Summary
- Issue: Init API project with NestJS — project structure, health check, common, util
- Source: haelabs/openclaw-team#31
- Promoted: 2026-04-14 10:05
- Handoff source: latest comment containing the handoff document

---

## 📋 Handoff Document

### Overview
This issue creates the backend API foundation inside the monorepo. The goal is to scaffold a NestJS API app under `apps/api`, establish the project structure and cross-cutting backend conventions, and provide a working versioned health endpoint that future domain modules can build on.

Why this matters:
- gives the team a stable backend base before business modules are added
- ensures consistency for config, validation, error handling, logging, and response shape
- supports later auth, organization, branch, and user features without rework
- provides deployment-ready health checks for local dev, CI, and Railway

### Requirements
- [ ] Create `apps/api` inside the Nx monorepo
- [ ] Configure TypeScript, ESLint, Prettier, and Nx integration consistently
- [ ] Add environment/config handling with startup validation
- [ ] Establish a clear source structure (`common`, `config`, `health`, `modules`, infrastructure/shared folders as needed)
- [ ] Implement `/api/v1/health`
- [ ] Return basic service status and database readiness signal or stub-compatible readiness structure
- [ ] Add global request validation
- [ ] Add consistent error envelope handling
- [ ] Add base success response envelope strategy
- [ ] Configure CORS
- [ ] Add structured logging
- [ ] Ensure `nx serve api` and `nx build api` work

### Technical Spec
- **Architecture**
  - Implement `apps/api` as a NestJS modular monolith within the Nx + pnpm workspace.
  - Recommended source structure:
    - `main.ts`
    - `app.module.ts`
    - `common/` for framework-level shared concerns
    - `config/` for env validation and app config
    - `health/` for health controllers/modules/indicators
    - `modules/` for future domains (`auth`, `organizations`, `branches`, `users`, `roles`, `permissions`)
    - `infrastructure/` for DB/logging adapters if needed
    - `shared/response/` or equivalent for response envelope utilities
  - Bootstrap conventions:
    - global prefix `/api`
    - URI versioning `/v1`
    - effective route base `/api/v1/*`
    - global validation pipe with whitelist behavior
    - central exception filter
    - request-aware structured logging
    - env-driven CORS allowlist

- **API Design**
  - Required endpoint:
    - `GET /api/v1/health`
  - Recommended response shape:
    - success: `{ data, meta? }`
    - error: `{ error: { code, message, details? }, meta? }`
  - Health response should include at minimum:
    - service/app status
    - API version
    - database connectivity status if implemented, or a stub-compatible structure if DB integration is deferred
  - Optional later split:
    - `GET /api/v1/health/live`
    - `GET /api/v1/health/ready`
  - Auth is not in scope for implementation here, but the app must be auth-ready:
    - reserve `modules/auth`
    - keep health endpoint public
    - avoid bootstrap choices that block Better Auth or session-based auth later

- **Database Schema**
  - No business-domain schema is required in this issue.
  - The structure should anticipate near-term entities such as `organizations`, `branches`, `users`, `memberships`, `roles`, `sessions`, and `audit_logs`.
  - DB health should integrate cleanly with future Prisma + PostgreSQL/Neon setup.
  - If Prisma is not added here, leave a clear integration point for readiness indicators.

### Implementation Guide
1. Scaffold `apps/api` using NestJS inside the Nx workspace.
2. Add root API bootstrap with `/api/v1` routing, CORS, validation, and logging.
3. Create the foundational folder structure and keep domain modules as placeholders only.
4. Add centralized config loading and startup env validation.
5. Implement the health module and `GET /api/v1/health`.
6. Add a global exception filter for a consistent error envelope.
7. Add a response envelope strategy for JSON responses.
8. Add structured logging suitable for local and Railway logs.
9. Ensure the app runs via Nx and builds cleanly.
10. Document folder conventions, route versioning, response contracts, and where future modules belong.

### Task List
- **Task 1: Scaffold NestJS app in Nx workspace**
  - Estimate: M
  - Dependency: #28
  - Acceptance Criteria: `apps/api` exists and works with `nx serve api` and `nx build api`.

- **Task 2: Set up bootstrap and versioning**
  - Estimate: S
  - Dependency: Task 1
  - Acceptance Criteria: App uses `/api/v1` route base; CORS is env-driven; validation is globally enabled.

- **Task 3: Create foundation folder structure**
  - Estimate: S
  - Dependency: Task 1
  - Acceptance Criteria: `common/`, `config/`, `health/`, `modules/`, and required infrastructure/shared placeholders exist.

- **Task 4: Add environment configuration module**
  - Estimate: S
  - Dependency: Task 2
  - Acceptance Criteria: Env values are loaded centrally, validated at startup, and fail fast on invalid config.

- **Task 5: Implement health module**
  - Estimate: S
  - Dependency: Tasks 2, 4
  - Acceptance Criteria: `/api/v1/health` returns a healthy/unhealthy state suitable for deployment health checks.

- **Task 6: Add common error handling**
  - Estimate: S
  - Dependency: Task 2
  - Acceptance Criteria: Global exception filter returns consistent error envelopes.

- **Task 7: Add request validation pipeline**
  - Estimate: S
  - Dependency: Task 2
  - Acceptance Criteria: Invalid DTO input is rejected consistently with sanitized messages.

- **Task 8: Add response envelope strategy**
  - Estimate: M
  - Dependency: Tasks 2, 6
  - Acceptance Criteria: JSON success responses follow a consistent `{ data, meta }` shape.

- **Task 9: Add structured logging**
  - Estimate: S
  - Dependency: Task 2
  - Acceptance Criteria: Startup and request lifecycle logs are machine-readable.

- **Task 10: Document API foundation conventions**
  - Estimate: S
  - Dependency: Tasks 1-9
  - Acceptance Criteria: Repo docs explain layout, routing, config pattern, response contract, and extension points.

### Testing
- `nx serve api` starts successfully.
- `nx build api` succeeds.
- `GET /api/v1/health` returns 200 in healthy conditions.
- Health payload follows the agreed response envelope.
- Invalid env/config fails fast at startup with readable error output.
- DTO validation errors return consistent sanitized error responses.
- Exception filter normalizes framework/application errors.
- CORS behavior matches configured allowlist.
- Logging emits structured startup and request information.
- Health endpoint remains public and unaffected by future auth scaffolding.

### Decisions Made
- Use NestJS for the API foundation.
- Build the API as a modular monolith in `apps/api`.
- Standardize bootstrap from day one: versioning, config validation, response envelopes, error handling, validation, and logging.
- Keep business logic intentionally out of this issue.
- Keep the health endpoint public and deployment-friendly.
- Reserve domain placeholders for auth, organizations, branches, users, roles, and permissions.
- Keep DB integration minimal here, but make readiness checks compatible with future Prisma + Neon work.

### Open Questions
- Should Terminus be added now, or should the first health endpoint be custom and upgraded later?
- Should DB connectivity be implemented immediately or stubbed until the dedicated database issue lands?
- Which structured logger should be standardized, `pino`/`nestjs-pino` or another option?
- Should liveness/readiness endpoints be added now or after the first deploy pipeline is in place?
