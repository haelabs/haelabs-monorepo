# ROADMAP

## Phase 1 - Foundation Scaffold And Bootstrap Baseline

### Goal
Create a runnable NestJS app in `apps/api` with the required monorepo/tooling integration and baseline bootstrap conventions so the API foundation is deployable as a skeleton.

### Included Tasks
- Task 1: Scaffold NestJS app in Nx workspace.
- Task 2: Set up bootstrap and versioning.
- Task 3: Create foundation folder structure.
- Task 4: Add environment configuration module.
- Task 7: Add request validation pipeline.
- Task 9: Add structured logging.

### Milestones And Dependencies
- **M1: Scaffold Ready (`#28` dependency)**
  - Deliverables: `apps/api` app with TypeScript/ESLint/Prettier/Nx integration.
  - Depends on: external issue `#28`.
- **M2: Bootstrap Baseline**
  - Deliverables: `/api` prefix + `/v1` versioning, env-driven CORS, global validation.
  - Depends on: M1.
- **M3: Config + Structure Baseline**
  - Deliverables: required folder layout, centralized env loading, startup validation/fail-fast.
  - Depends on: M1 and M2.
- **M4: Operational Baseline Logging**
  - Deliverables: machine-readable startup/request lifecycle logs.
  - Depends on: M2.

### Phase Exit (Shippable)
- `nx serve api` works with `/api/v1` base routing.
- `nx build api` succeeds.
- API foundation has validated config, baseline validation, CORS, and structured logs.

## Phase 2 - API Contracts And Health Readiness

### Goal
Add consistent API contracts and deployment health checks so the service can be monitored reliably and used as the base for future domain modules.

### Included Tasks
- Task 5: Implement health module.
- Task 6: Add common error handling.
- Task 8: Add response envelope strategy.

### Milestones And Dependencies
- **M5: Error Contract Standardization**
  - Deliverables: global exception filter with consistent error envelope.
  - Depends on: Phase 1 bootstrap baseline.
- **M6: Success Contract Standardization**
  - Deliverables: JSON success envelope strategy (`{ data, meta }`).
  - Depends on: M5.
- **M7: Deployment Health Contract**
  - Deliverables: `GET /api/v1/health` with service status, API version, and DB-readiness/connectivity or stub-compatible structure.
  - Depends on: Phase 1 config/bootstrap + M6.

### Phase Exit (Shippable)
- `GET /api/v1/health` returns 200 in healthy conditions.
- Success/error payloads are normalized to agreed contracts.
- Health endpoint is public and compatible with deferred DB/auth work.

## Phase 3 - Documentation And Handoff Completeness

### Goal
Complete foundation documentation so future contributors can extend the API without reworking top-level backend conventions.

### Included Tasks
- Task 10: Document API foundation conventions.

### Milestones And Dependencies
- **M8: Foundation Docs Published**
  - Deliverables: documented layout, route versioning, config pattern, response contracts, extension points, and where future modules belong.
  - Depends on: completion of Phases 1-2.

### Phase Exit (Shippable)
- Repository docs cover layout, routing/versioning, config behavior, and response contract.
- Future module onboarding path is explicit.

## Global Validation Gates
- `nx serve api` starts successfully.
- `nx build api` succeeds.
- Health payload and endpoint behavior match spec expectations.
- Env validation, DTO validation, exception normalization, CORS allowlist, structured logging, and public health accessibility all pass stated tests.

## Progress Tracking

### Phase 1 - Foundation Scaffold And Bootstrap Baseline
| Plan | Status | Summary | Tasks | Files | Duration |
|------|--------|---------|-------|-------|----------|
| 01-01-PLAN | Complete | [01-01-SUMMARY.md](./phases/01/01-01-SUMMARY.md) | 3 | 6 | 6m |
| 01-02-PLAN | Complete | [01-02-SUMMARY.md](./phases/01/01-02-SUMMARY.md) | 3 | 8 | 324m |

**Phase 1 Progress:** 2/2 plans complete (100%)

### Phase 2 - API Contracts And Health Readiness
| Plan | Status | Summary | Tasks | Files | Duration |
|------|--------|---------|-------|-------|----------|
| Not started | - | - | - | - | - |

### Phase 3 - Documentation And Handoff Completeness
| Plan | Status | Summary | Tasks | Files | Duration |
|------|--------|---------|-------|-------|----------|
| Not started | - | - | - | - | - |
