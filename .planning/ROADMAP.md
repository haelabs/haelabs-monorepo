# ROADMAP

## Phase 1 - NestJS API Foundation (Spec 31)

### Summary
Deliver the Spec 31 backend foundation in `apps/api` within the Nx + pnpm monorepo: NestJS modular monolith scaffold, standardized `/api/v1` bootstrap, centralized validated config, global validation + exception handling, consistent response envelopes, env-driven CORS, structured logging, and a public deployment-ready `GET /api/v1/health` endpoint with DB-readiness-compatible payload.

### Milestones (Spec-Defined Dependencies)
- **Milestone 1: Scaffold API App**
  - Deliverables: NestJS app in `apps/api` with TypeScript/ESLint/Prettier/Nx integration.
  - Dependencies: external issue `#28`.
- **Milestone 2: Bootstrap and Versioning Baseline**
  - Deliverables: global `/api` prefix + `/v1` URI versioning, env-driven CORS, global request validation.
  - Dependencies: Milestone 1.
- **Milestone 3: Foundation Source Structure**
  - Deliverables: `common/`, `config/`, `health/`, `modules/`, plus infrastructure/shared placeholders as needed.
  - Dependencies: Milestone 1.
- **Milestone 4: Central Config + Startup Validation**
  - Deliverables: centralized env loading, startup validation, fail-fast config behavior.
  - Dependencies: Milestone 2.
- **Milestone 5: Health Module and Endpoint**
  - Deliverables: `GET /api/v1/health` with service status, API version, and DB readiness/connectivity or stub-compatible readiness.
  - Dependencies: Milestones 2 and 4.
- **Milestone 6: Cross-Cutting API Contracts**
  - Deliverables: global exception filter with consistent error envelope and base success envelope strategy.
  - Dependencies: Milestone 2.
- **Milestone 7: Structured Logging**
  - Deliverables: machine-readable startup and request lifecycle logs.
  - Dependencies: Milestone 2.
- **Milestone 8: Foundation Documentation**
  - Deliverables: documented layout, routing/versioning, config pattern, response contracts, and extension points.
  - Dependencies: Milestones 1-7.

### Exit Criteria
- `nx serve api` starts successfully.
- `nx build api` succeeds.
- `GET /api/v1/health` returns 200 under healthy conditions.
- Health payload, config validation, DTO validation behavior, exception normalization, CORS behavior, structured logging, and public health endpoint behavior match Spec 31 testing expectations.
