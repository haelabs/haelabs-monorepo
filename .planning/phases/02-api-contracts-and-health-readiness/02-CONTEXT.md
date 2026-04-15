# Phase 2: API Contracts And Health Readiness - Context

**Gathered:** 2026-04-15
**Status:** Ready for planning
**Source:** Assumptions Mode (Phase 1 codebase analysis)

<domain>
## Phase Boundary

Phase 2 is a **verification and validation phase** rather than new implementation. The core contracts (health, error handling, response envelopes) were implemented in Phase 1. This phase focuses on:

1. **Comprehensive contract verification** - Ensure all API contracts (health endpoint, error envelopes, success envelopes) are working as specified
2. **Build and deployment readiness** - Verify `nx build api` succeeds and the API is ready for Railway deployment
3. **Documentation completeness** - Ensure all API foundation conventions are documented for future developers
4. **End-to-end validation** - Verify the entire stack from env validation through to health endpoint works together

This is a **quality gate** phase before adding domain modules in future phases.
</domain>

<decisions>
## Implementation Decisions

### Already Implemented in Phase 1 (To be verified in Phase 2)

#### Health Endpoint (M7)
- Health endpoint exists at `GET /api/v1/health` (HealthController)
- Health payload structure:
  ```json
  {
    "status": "ok",
    "service": "haelabs-api",
    "version": "1",
    "database": {
      "ready": false,
      "status": "not_configured"
    }
  }
  ```
- Health endpoint is public (no auth middleware)
- Database readiness is stubbed for future Prisma/Neon integration (preserves clean integration point)

#### Error Handling (M5)
- Global exception filter: `HttpExceptionFilter` catches all exceptions
- Error envelope structure:
  ```json
  {
    "error": {
      "code": "VALIDATION_ERROR" | "HTTP_ERROR" | "INTERNAL_SERVER_ERROR",
      "message": "Human-readable error",
      "details": {}
    },
    "meta": {
      "timestamp": "ISO-8601",
      "path": "/api/v1/endpoint",
      "requestId": "uuid"
    }
  }
  ```
- Validation errors are sanitized (removes `target` and `value` fields to prevent data leakage)
- Request ID correlation uses response-assigned ID (canonical) or client-provided (untrusted fallback)

#### Response Envelope (M6)
- Global interceptor: `ResponseEnvelopeInterceptor` wraps all successful responses
- Success envelope structure:
  ```json
  {
    "data": {},
    "meta": {
      "timestamp": "ISO-8601",
      "requestId": "uuid"
    }
  }
  ```
- Envelope passthrough logic prevents double-wrapping (checks if response already has `data` field)
- StreamableFile responses bypass envelope wrapping

#### Validation Pipeline
- Global ValidationPipe with whitelist behavior (forbids non-whitelisted properties)
- ValidationPipe configured to transform and strip non-allowed fields
- Validation errors return standardized error envelope with field-level constraints

#### CORS Configuration
- Env-driven CORS allowlist via `CORS_ORIGINS` env var
- Strict origin validation (rejects malformed origins at startup)
- Credentials enabled for session-based auth (future compatibility)

#### Logging
- Structured logging with Pino logger
- Startup logs with machine-readable fields: `event`, `port`, `base`, `env`
- Request lifecycle logging with correlation ID middleware

### the agent's Discretion

**Testing Strategy for Phase 2:**
- Determine what additional contract tests are needed beyond existing Phase 1 tests
- Decide if integration tests are needed for end-to-end health endpoint validation
- Choose whether to add e2e tests or rely on unit tests

**Build Verification:**
- Verify `nx build api` succeeds (R20)
- Ensure build output includes all necessary production assets

**Documentation Enhancements:**
- Review existing `docs/api-foundation.md` for completeness
- Identify any missing conventions or patterns that should be documented
- Ensure documentation covers extension points for future domain modules

**Deployment Readiness:**
- Verify health endpoint is accessible for Railway-style health checks
- Ensure all environment variables are documented and validated
- Confirm the API can be deployed without manual configuration steps

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### API Foundation Documentation
- `docs/api-foundation.md` — Complete API foundation documentation covering routing, config, envelopes, health, logging, and extension points. This is the primary reference for all Phase 2 verification work.

### Phase 1 Implementation
- `.planning/phases/01/01-01-SUMMARY.md` — Phase 1 Plan 01 summary: bootstrap baseline, env validation, CORS configuration
- `.planning/phases/01/01-02-SUMMARY.md` — Phase 1 Plan 02 summary: contract tests, envelope/logging stabilization, documentation

### Code Structure
- `apps/api/src/main.ts` — Bootstrap configuration: versioning, CORS, validation pipe, global filters/interceptors
- `apps/api/src/app.module.ts` — Root module wiring with ConfigModule and middleware registration
- `apps/api/src/common/filters/http-exception.filter.ts` — Global exception filter with error envelope normalization
- `apps/api/src/common/interceptors/response-envelope.interceptor.ts` — Global success envelope wrapper
- `apps/api/src/health/health.controller.ts` — Health endpoint (versioned under v1)
- `apps/api/src/health/health.service.ts` — Health payload generation with DB readiness stub
- `apps/api/src/shared/response/response-envelope.ts` — SuccessEnvelope and ErrorEnvelope type definitions

### Test Contracts
- `apps/api/src/health/health.controller.spec.ts` — Health endpoint contract tests
- `apps/api/src/common/filters/http-exception.filter.spec.ts` — Error envelope contract tests
- `apps/api/src/common/interceptors/response-envelope.interceptor.spec.ts` — Success envelope contract tests
- `apps/api/src/config/env.validation.spec.ts` — Env validation and fail-fast tests
- `apps/api/src/main.bootstrap.spec.ts` — Bootstrap routing and CORS validation tests

### Requirements
- `.planning/REQUIREMENTS.md` — Complete requirements specification with traceability matrix

### Project Instructions
- `AGENTS.md` — Project-specific guidelines, dependency boundaries, and implementation rules

</canonical_refs>

<specifics>
## Specific Ideas

### Health Endpoint Contract
- Must return 200 status code in healthy conditions
- Must include service status ("ok"), API version, and database readiness fields
- Must be publicly accessible (no auth middleware)
- Must be compatible with Railway deployment health checks
- Database readiness must return stub-compatible shape (`ready: false`, `status: "not_configured"`) for future Prisma integration

### Response Envelope Contract
- All successful responses MUST be wrapped with `{ data, meta }` structure
- `meta` MUST include `timestamp` (ISO-8601) and `requestId` (UUID)
- Pre-wrapped responses must pass through without double-wrapping
- StreamableFile responses bypass envelope wrapping

### Error Envelope Contract
- All errors MUST return `{ error: { code, message, details }, meta }` structure
- Validation errors MUST be sanitized (no `target` or `value` fields)
- `meta` MUST include `timestamp`, `path`, and `requestId`
- Standard HTTP errors use code "HTTP_ERROR"
- Validation errors use code "VALIDATION_ERROR"
- Unexpected errors use code "INTERNAL_SERVER_ERROR"

### Request Correlation
- Response-assigned request ID in `x-request-id` header is canonical source
- Client-provided `x-request-id` is untrusted fallback
- Exception metadata MUST prefer response-assigned request ID for correlation

### Validation Pipeline
- ValidationPipe MUST be configured with `whitelist: true` and `forbidNonWhitelisted: true`
- Non-whitelisted properties MUST return 400 error with validation details
- Validation errors MUST be standardized across all endpoints

### Logging Contract
- Startup logs MUST include: `event: "api_started"`, `port`, `base`, `env`
- Request logs MUST include correlation ID and request lifecycle events
- All logs MUST be structured (key-value) for machine readability

### Build Verification
- `nx build api` MUST succeed without errors
- Build output MUST include all necessary production assets
- TypeScript compilation MUST pass with strict mode
- Linting MUST pass (`pnpm nx lint api`)

### Documentation Requirements
- All routing conventions MUST be documented
- Response envelope structure MUST be documented with examples
- Error envelope structure MUST be documented with examples
- Health endpoint contract MUST be documented
- Config pattern and env vars MUST be documented
- Extension points for future modules MUST be documented
- Module onboarding path MUST be explicit

</specifics>

<deferred>
## Deferred Ideas

None — All Phase 2 scope is within verification and validation of Phase 1 implementation.
No new features are being added in this phase.
</deferred>

---

*Phase: 02-api-contracts-and-health-readiness*
*Context gathered: 2026-04-15 via Assumptions Mode (Phase 1 codebase analysis)*
