# CI/CD Foundation (Phase 1)

This repository uses GitHub Actions as the CI/CD orchestrator for a production-only Phase 1 release flow.

## Workflows

- PR validation: `.github/workflows/ci.yml`
- Production deployment: `.github/workflows/deploy-production.yml`

No staging or preview workflows are part of this phase.

## PR Validation Flow

`ci.yml` runs on `pull_request` to `main` and executes:

1. install dependencies with pnpm
2. resolve Nx base/head SHAs using `tools/ci/set-nx-shas.sh`
3. run `lint`, `typecheck`, `test`, and `build` through `tools/ci/run-affected.sh`

`run-affected.sh` tries `nx affected` first and falls back to `nx run-many --all` when diff resolution or affected execution fails.

## Branch Protection

Enable branch protection on `main` and mark the CI check as required:

- `Validate Monorepo`

Merges to `main` should be blocked when this check fails.

## Production Deploy Flow

`deploy-production.yml` runs on `push` to `main` (and can be triggered manually with `workflow_dispatch`).

Jobs run in this order:

1. `deploy-petabase` (Vercel production)
2. `deploy-api` (Railway production)
3. `migrate-production` (explicit migration command)
4. `smoke-checks` (`/api/v1/health` + key web route)

`deploy-petabase`, `deploy-api`, and `migrate-production` use the `production` GitHub Environment. Configure required reviewers on that environment to gate protected deployment and migration execution.

## Secrets and Variables Contract

Set the following on GitHub Environment `production`.

Variables:

- `VERCEL_DEPLOY_COMMAND`: command that deploys `apps/petabase` to Vercel production
- `VERCEL_ORG_ID`: Vercel organization identifier used by Vercel CLI
- `VERCEL_PROJECT_ID`: Vercel project identifier for `petabase`
- `RAILWAY_DEPLOY_COMMAND`: command that deploys `apps/api` to Railway production
- `RAILWAY_SERVICE_ID`: Railway service identifier for `api`
- `RAILWAY_ENVIRONMENT_ID`: Railway production environment identifier
- `PRODUCTION_MIGRATION_COMMAND`: command that runs production DB migrations
- `API_HEALTHCHECK_URL`: production API health endpoint (for example `https://api.example.com/api/v1/health`)
- `WEB_SMOKE_URL`: production web route used for smoke checks (for example `https://app.example.com/`)

Secrets:

- `VERCEL_TOKEN`: token used by the Vercel CLI
- `RAILWAY_TOKEN`: token used by Railway CLI/API calls
- `DATABASE_URL`: production database connection string used for migrations

Never commit these values.

## Recommended Command Baselines

These examples can be used when defining the environment variables above:

- `VERCEL_DEPLOY_COMMAND`:
  `pnpm dlx vercel pull --yes --environment=production --token "$VERCEL_TOKEN" && pnpm dlx vercel build --prod --token "$VERCEL_TOKEN" && pnpm dlx vercel deploy --prebuilt --prod --token "$VERCEL_TOKEN"`
- `RAILWAY_DEPLOY_COMMAND`:
  `pnpm dlx @railway/cli up --service "$RAILWAY_SERVICE_ID" --environment "$RAILWAY_ENVIRONMENT_ID" --ci`
- `PRODUCTION_MIGRATION_COMMAND`:
  `pnpm --filter @haelabs/api exec prisma migrate deploy`

## Migration Policy

- Migrations run in a dedicated job (`migrate-production`), not at app startup.
- Migration failures fail the workflow and block smoke checks.
- Prefer additive, backward-compatible schema changes.
- Avoid destructive drops in the same release as app rollout.

## Smoke Check Policy

`tools/ci/smoke-check.sh` enforces both:

- API health endpoint returns success and includes `status: ok`
- Web route responds with a `2xx` or `3xx` HTTP status

Deployment is not considered successful unless smoke checks pass.

## Rollback Basics

If deployment or post-deploy checks fail:

1. stop new changes from merging to `main`
2. redeploy the last known good Vercel release
3. redeploy the last known good Railway release
4. if migration is not backward compatible, restore from database backup/snapshot and redeploy known good app versions
5. validate recovery with the same smoke checks

Keep rollback steps conservative until a deeper release automation strategy is introduced in later phases.
