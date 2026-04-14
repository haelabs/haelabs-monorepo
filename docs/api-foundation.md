# API Foundation (`apps/api`)

## Purpose

`apps/api` is the NestJS backend foundation for the monorepo. It establishes shared backend bootstrap conventions before domain logic is introduced.

## Runtime and routes

- Global prefix: `/api`
- URI versioning: `v1`
- Effective route base: `/api/v1/*`
- Health endpoint: `GET /api/v1/health`

## Source structure

- `src/main.ts` - bootstrap, versioning, CORS, global middleware/pipes/filters/interceptors
- `src/app.module.ts` - root module wiring
- `src/common/` - global logger, exception filter, response interceptor
- `src/config/` - environment schema and startup validation
- `src/health/` - health module, controller, and service
- `src/modules/` - reserved domain modules for `auth`, `organizations`, `branches`, `users`, `roles`, `permissions`
- `src/infrastructure/` - adapters (database, queues, external integrations)
- `src/shared/response/` - shared response contracts/utilities

## Response contracts

Success responses are wrapped with:

```json
{
  "data": {},
  "meta": {
    "timestamp": "2026-04-14T11:30:00.000Z",
    "requestId": "optional-request-id"
  }
}
```

Errors are normalized with:

```json
{
  "error": {
    "code": "HTTP_ERROR",
    "message": "Request failed",
    "details": {}
  },
  "meta": {
    "timestamp": "2026-04-14T11:30:00.000Z",
    "path": "/api/v1/health"
  }
}
```

## Config and validation

`ConfigModule` loads env vars globally and validates values at startup using `zod` in `src/config/env.validation.ts`.

If validation fails, boot fails fast with a readable error list.

Current env keys:

- `NODE_ENV`
- `APP_NAME`
- `API_VERSION`
- `PORT`
- `LOG_LEVEL`
- `CORS_ORIGINS` (comma-separated allowlist)

## Logging and CORS

- Logging uses `pino` JSON output for startup and request lifecycle events.
- Request middleware adds/propagates `x-request-id` and logs method/path/status/duration.
- CORS uses an env-driven allowlist from `CORS_ORIGINS`.

## Commands

- `pnpm exec nx serve api`
- `pnpm exec nx build api`
- `pnpm exec nx lint api`
- `pnpm exec nx typecheck api`
