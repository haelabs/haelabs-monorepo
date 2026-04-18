# External Integrations

**Analysis Date:** 2026-04-18

## APIs & External Services

**Application API communication:**
- Internal API service (`apps/api`) consumed by Petabase web app
  - SDK/Client: local fetch wrapper in `apps/petabase/src/lib/api/client.ts`
  - Auth: no external auth SDK; request base URL comes from `NEXT_PUBLIC_API_BASE_URL` in `apps/petabase/src/lib/env.ts`

**Deployment platforms:**
- Vercel - production web deployment for `apps/petabase`
  - SDK/Client: Vercel CLI invoked by `VERCEL_DEPLOY_COMMAND` in `.github/workflows/deploy-production.yml`
  - Auth: `VERCEL_TOKEN` secret in GitHub Environment `production` (`docs/devops/cicd.md`)
- Railway - production API deployment for `apps/api`
  - SDK/Client: Railway CLI invoked by `RAILWAY_DEPLOY_COMMAND` in `.github/workflows/deploy-production.yml`
  - Auth: `RAILWAY_TOKEN` secret in GitHub Environment `production` (`docs/devops/cicd.md`)

## Data Storage

**Databases:**
- Runtime database integration: Not configured in application code (`apps/api/src/health/health.service.ts` returns `database.status: 'not_configured'`)
  - Connection: `DATABASE_URL` is referenced for production migration job in `.github/workflows/deploy-production.yml`
  - Client: Not detected in runtime dependencies (`apps/api/package.json`)

**File Storage:**
- Local filesystem only in current app code (no S3/GCS/Blob SDK detected in `apps/api/package.json` or `apps/petabase/package.json`)

**Caching:**
- None detected (no Redis/Memcached client dependency in `apps/api/package.json` or `apps/petabase/package.json`)

## Authentication & Identity

**Auth Provider:**
- Custom placeholder auth flow in Petabase (no external identity provider SDK detected)
  - Implementation: cookie/session gate using `petabase.session` in `apps/petabase/src/lib/auth/protection.ts` and `apps/petabase/middleware.ts`

## Monitoring & Observability

**Error Tracking:**
- None detected (no Sentry/Bugsnag/Rollbar integration in `apps/*/package.json`)

**Logs:**
- API structured JSON logging with Pino in `apps/api/src/common/logging/app-logger.service.ts`
- Deployment smoke checks via HTTP probes in `tools/ci/smoke-check.sh`

## CI/CD & Deployment

**Hosting:**
- Web: Vercel (`.github/workflows/deploy-production.yml`)
- API: Railway (`.github/workflows/deploy-production.yml`)

**CI Pipeline:**
- GitHub Actions workflows at `.github/workflows/ci.yml` and `.github/workflows/deploy-production.yml`
- Nx affected/full fallback execution in `tools/ci/run-affected.sh`

## Environment Configuration

**Required env vars:**
- API runtime config keys: `NODE_ENV`, `APP_NAME`, `API_VERSION`, `PORT`, `LOG_LEVEL`, `CORS_ORIGINS` (`apps/api/src/config/env.validation.ts`)
- Petabase runtime config keys: `NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_DEFAULT_LOCALE`, `NEXT_PUBLIC_ENABLE_AUTH_GUARD` (`apps/petabase/src/lib/env.ts`)
- Production deploy/migration/smoke keys: `VERCEL_DEPLOY_COMMAND`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `RAILWAY_DEPLOY_COMMAND`, `RAILWAY_SERVICE_ID`, `RAILWAY_ENVIRONMENT_ID`, `PRODUCTION_MIGRATION_COMMAND`, `API_HEALTHCHECK_URL`, `WEB_SMOKE_URL`, `VERCEL_TOKEN`, `RAILWAY_TOKEN`, `DATABASE_URL` (`docs/devops/cicd.md`, `.github/workflows/deploy-production.yml`)

**Secrets location:**
- GitHub Environment `production` for deploy and migration secrets/vars (`docs/devops/cicd.md`, `.github/workflows/deploy-production.yml`)
- Local developer env files are not committed in current repository snapshot (`glob: .env*`, `glob: **/.env*` returned none)

## Webhooks & Callbacks

**Incoming:**
- None detected (no webhook route handlers found; `glob: apps/**/*route.ts` returned none)

**Outgoing:**
- None detected from application runtime code in `apps/api/src` and `apps/petabase/src`

---

*Integration audit: 2026-04-18*
