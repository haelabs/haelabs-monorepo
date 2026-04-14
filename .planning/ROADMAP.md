# ROADMAP

## Phase 1 - API Foundation From Spec 31

### Summary
Deliver the backend foundation in `apps/api` as a NestJS modular monolith in the Nx + pnpm monorepo with: standardized `/api/v1` bootstrap conventions, centralized validated config, global validation and exception handling, response envelopes, env-driven CORS, structured logging, and a public deployment-ready `GET /api/v1/health` endpoint with DB-readiness-compatible payload.

### Requirements
R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19

### Milestones (Spec-Defined Dependencies)
- **Milestone 1: Scaffold API App**
  - Deliverables: NestJS app at `apps/api` with Nx/TypeScript/ESLint/Prettier integration.
  - Dependency: external issue `#28` (from spec Task 1).

- **Milestone 2: Bootstrap Baseline**
  - Deliverables: route base `/api/v1`, global validation enablement, env-driven CORS.
  - Dependency: Milestone 1.

- **Milestone 3: Foundation Layout**
  - Deliverables: `common/`, `config/`, `health/`, `modules/`, `infrastructure/`, and `shared/response/` (or equivalent) placeholders.
  - Dependency: Milestone 1.

- **Milestone 4: Config Validation Module**
  - Deliverables: centralized env loading, startup validation, fail-fast on invalid env.
  - Dependency: Milestone 2.

- **Milestone 5: Health Module**
  - Deliverables: `GET /api/v1/health` returning service status, API version, and DB readiness/connectivity or stub-compatible readiness.
  - Dependencies: Milestones 2 and 4.

- **Milestone 6: Error, Validation, and Response Contracts**
  - Deliverables: global exception filter, sanitized DTO validation behavior, consistent success envelope strategy.
  - Dependencies: Milestone 2 (plus exception handling alignment for envelope consistency).

- **Milestone 7: Structured Logging**
  - Deliverables: machine-readable startup and request lifecycle logs.
  - Dependency: Milestone 2.

- **Milestone 8: Foundation Documentation**
  - Deliverables: docs for layout, routing/versioning, config pattern, response contracts, and extension points.
  - Dependencies: Milestones 1 through 7.

### Phase 1 Exit Criteria
- `nx serve api` starts successfully.
- `nx build api` succeeds.
- `GET /api/v1/health` returns 200 for healthy state.
- Health, config validation, DTO validation, exception normalization, CORS behavior, and structured logging satisfy Spec 31 testing expectations.

### Plans
- [x] `01-01-PLAN.md` - Bootstrap baseline with fail-fast env validation, route versioning, and env-driven CORS.
- [ ] `01-02-PLAN.md` - Global response contracts, DTO validation normalization, and request-aware structured logging.
- [ ] `01-03-PLAN.md` - Public health endpoint contract plus API foundation documentation and acceptance checks.
