# API Foundation (`apps/api`)

## Purpose

`apps/api` is the NestJS backend foundation for the monorepo. It establishes shared backend bootstrap conventions before domain logic is introduced.

## Runtime and routes

- **Global prefix**: `/api`
- **URI versioning**: `v1`
- **Effective route base**: `/api/v1/*`
- **Health endpoint**: `GET /api/v1/health`

The health endpoint is public (no auth required) and returns a standardized readiness payload compatible with Railway-style deployment health checks and future database integration.

## Source structure

```
src/
├── main.ts                      # Bootstrap, versioning, CORS, global middleware/pipes/filters/interceptors
├── app.module.ts                # Root module wiring with global ConfigModule and middleware registration
├── common/                      # Cross-cutting concerns
│   ├── common.module.ts         # Exports logger, filter, interceptor
│   ├── filters/
│   │   └── http-exception.filter.ts  # Global exception filter with error envelope normalization
│   ├── interceptors/
│   │   └── response-envelope.interceptor.ts  # Global success envelope wrapper
│   └── logging/
│       ├── app-logger.service.ts        # Pino-based structured logger
│       └── request-logger.middleware.ts  # Request lifecycle logging with correlation ID
├── config/                      # Environment configuration
│   └── env.validation.ts        # Zod schema for env validation and fail-fast behavior
├── health/                      # Health check module
│   ├── health.module.ts         # Health module registration
│   ├── health.controller.ts     # Health endpoint (versioned under v1)
│   └── health.service.ts        # Health payload generation with DB readiness stub
├── modules/                     # Reserved for domain modules
│   ├── auth/                    # Future: authentication and session management
│   ├── organizations/           # Future: organization domain logic
│   ├── branches/                # Future: branch domain logic
│   ├── users/                   # Future: user domain logic
│   ├── roles/                   # Future: role/permission domain logic
│   └── permissions/             # Future: permission checking
├── infrastructure/              # Adapters for external services
│   └── (future: database, queues, external integrations)
└── shared/                      # Shared utilities and contracts
    └── response/
        └── response-envelope.ts # SuccessEnvelope and ErrorEnvelope type definitions
```

## Routing and versioning conventions

All routes inherit versioning from `main.ts`:

```typescript
app.setGlobalPrefix(API_PREFIX);  // 'api'
app.enableVersioning({
  type: VersioningType.URI,
  defaultVersion: API_VERSION,    // '1'
});
```

This results in all controllers automatically mounting under `/api/v1/*`.

Controllers can rely on global default versioning and may optionally declare `version: '1'` explicitly in the decorator when clarity is preferred.

**Example:**
```typescript
@Controller('health')  // Becomes /api/v1/health
export class HealthController { }
```

## Configuration pattern and validation

### Env validation and fail-fast behavior

`ConfigModule` loads env vars globally and validates values at startup using `zod` in `src/config/env.validation.ts`.

**Key behavior:**
- Validation occurs at application bootstrap
- Invalid env values cause immediate startup failure with readable error details
- `CORS_ORIGINS` is validated as a comma-separated list of valid http/https origins
- Invalid origin format prevents startup (security gate)

### Environment variables

| Variable | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
| `NODE_ENV` | enum | `development` | No | `development`, `test`, `production` |
| `APP_NAME` | string | `haelabs-api` | No | Service name for logging identification |
| `API_VERSION` | string | `1` | No | API version string for health endpoint |
| `PORT` | number | `3000` | No | Server port (1-65535) |
| `LOG_LEVEL` | enum | `info` | No | `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent` |
| `CORS_ORIGINS` | string | `""` | No | Comma-separated allowlist of http/https origins |

## Response contracts

### Success envelope

All successful responses are wrapped with a consistent structure:

```json
{
  "data": {},  // Actual response payload
  "meta": {
    "timestamp": "2026-04-14T11:30:00.000Z",
    "requestId": "optional-request-id"
  }
}
```

The `ResponseEnvelopeInterceptor` applies this globally. Pre-wrapped responses (already containing a `data` key) are preserved without double-wrapping. Stream responses (`StreamableFile`) pass through unchanged.

### Error envelope

All errors are normalized with a consistent structure:

```json
{
  "error": {
    "code": "HTTP_ERROR",
    "message": "Request failed",
    "details": {}
  },
  "meta": {
    "timestamp": "2026-04-14T11:30:00.000Z",
    "path": "/api/v1/health",
    "requestId": "optional-request-id"
  }
}
```

The `HttpExceptionFilter` applies this globally for all exceptions. Validation errors use code `VALIDATION_ERROR` with field-level constraint details in the `details` array. Framework and runtime exceptions are normalized to prevent information disclosure (no stack traces, secrets, or raw error objects).

**Security:** The filter sanitizes validation details to remove `target` and `value` fields, preventing sensitive data leakage.

## Health endpoint

### Contract

The controller/service health payload contract remains:

`GET /api/v1/health` returns HTTP 200 and, at the controller/service contract level, the following payload:

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

This endpoint is **public** (no authentication required) and designed for deployment orchestrators to verify service health.

At HTTP response level, successful responses are wrapped by `ResponseEnvelopeInterceptor`, so the wire response shape is:

```json
{
  "data": {
    "status": "ok",
    "service": "haelabs-api",
    "version": "1",
    "database": {
      "ready": false,
      "status": "not_configured"
    }
  },
  "meta": {
    "timestamp": "2026-04-15T00:00:00.000Z",
    "requestId": "optional-request-id"
  }
}
```

### Database readiness structure

The `database` object is stub-compatible for future Prisma/Neon integration:

- `ready`: `true` if database connectivity is healthy
- `status`: Human-readable status string (e.g., `"connected"`, `"disconnected"`, `"not_configured"`)

Future database adapter work should extend this object without changing the overall health payload contract.

## Logging conventions

### Structured logging with pino

The `AppLogger` uses `pino` for machine-readable JSON log output suitable for Railway, local development, and production log aggregators.

**Base fields (all logs):**
- `service`: Service name from `APP_NAME` env
- `timestamp`: ISO-8601 timestamp
- `level`: Log level (`info`, `error`, `warn`, etc.)

### Startup log

On successful startup, a structured log is emitted:

```json
{
  "service": "haelabs-api",
  "event": "api_started",
  "port": 3000,
  "base": "/api/v1",
  "env": "development"
}
```

### Request lifecycle logs

Each HTTP request logs completion with method, path, status, and duration:

```json
{
  "requestId": "uuid-v4",
  "method": "GET",
  "path": "/api/v1/health",
  "statusCode": 200,
  "durationMs": 42.5
}
```

### Request correlation

The `RequestLoggerMiddleware` manages request correlation:

1. Reads `x-request-id` from incoming headers
2. If missing, generates a UUID v4
3. Sets `x-request-id` on all responses
4. Propagates `requestId` to log context via `logger.child()`

The `x-request-id` header is treated as **optional untrusted input** - it may be client-provided but always replaced/validated by middleware before use.

## CORS configuration

CORS is controlled via the `CORS_ORIGINS` env variable (comma-separated origins).

**Behavior:**
- Empty `CORS_ORIGINS` or missing header: Allows all origins (no restriction)
- Non-empty `CORS_ORIGINS`: Only allows origins in the allowlist
- Invalid origin format: Startup failure (configuration error)

Credentials (`credentials: true`) are enabled by default for cookie/token-based auth in future phases.

## Extension points

### Where to add new features

| Feature type | Location | Notes |
|--------------|----------|-------|
| Authentication | `src/modules/auth/` | Guard/strategy integration, JWT handling |
| Domain logic | `src/modules/{domain}/` | One module per domain (users, organizations, etc.) |
| Database adapters | `src/infrastructure/database/` | Prisma client, connection pooling |
| External integrations | `src/infrastructure/{service}/` | Third-party API adapters |
| Queues/jobs | `src/infrastructure/queues/` | Bull/BullMQ job processing |
| DTOs/validation | Per-module `dto/` | Request/response DTOs with class-validator |

### Onboarding path for new domain modules

Use this checklist when adding a new `src/modules/{domain}` module:

1. Create module folder with `*.module.ts`, controller(s), service(s), and DTOs.
2. Register the new module in `AppModule` imports.
3. Confirm routes resolve under `/api/v1` automatically.
4. Reuse shared contracts (`common` filters/interceptors/logging) rather than duplicating logic.
5. Add/update tests and ensure `pnpm nx lint api && pnpm --filter @haelabs/api run test` pass.

### Integration guidelines

**For new domain modules:**
1. Create module under `src/modules/{name}/`
2. Register in `app.module.ts` imports
3. Routes automatically inherit `/api/v1` prefix and versioning
4. Use `AppLogger` for structured logging
5. Responses automatically wrapped with success envelope
6. Exceptions automatically normalized with error envelope

**For database integration:**
1. Add adapter code under `src/infrastructure/database/`
2. Update `HealthService.database` to return actual connection status
3. Keep database readiness structure unchanged (`ready`, `status`)
4. Register database providers in relevant modules

**For auth integration:**
1. Implement guards/strategies in `src/modules/auth/`
2. Do NOT add auth to health endpoint (must remain public)
3. Add guards to controllers that require authentication
4. Use consistent error codes and envelope structure

## Commands

```bash
# Development
pnpm exec nx serve api              # Start dev server with hot reload
pnpm exec nx run api:start:dev      # Alias for dev mode

# Building and verification
pnpm exec nx build api              # Build for production
pnpm exec nx lint api               # Run ESLint
pnpm exec nx typecheck api          # Run TypeScript type checking
pnpm --filter @haelabs/api run test # Run all tests

# Direct execution
cd apps/api && pnpm start           # Run with ts-node
cd apps/api && pnpm start:dev       # Run with ts-node-dev (watch mode)
```

## Testing

Tests use Node.js native `node:test` framework and are located alongside source files as `*.spec.ts`.

**Current test coverage:**
- Health endpoint payload contract (`src/health/health.controller.spec.ts`)
- Exception filter normalization and sanitization (`src/common/filters/http-exception.filter.spec.ts`)
- Response envelope wrapping and passthrough behavior (`src/common/interceptors/response-envelope.interceptor.spec.ts`)
- Env validation and CORS parsing (`src/config/env.validation.spec.ts`)
- Bootstrap and route versioning (`src/main.bootstrap.spec.ts`)

**Run tests:**
```bash
pnpm --filter @haelabs/api run test
```
