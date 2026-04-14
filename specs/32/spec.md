# Executive Summary
- Issue: Setup CI/CD pipeline — lint, build, test, preview, and deploy
- Source: haelabs/openclaw-team#32
- Promoted: 2026-04-14 20:06
- Handoff source: latest comment containing the handoff document

---

## 📋 Handoff Document

### Overview
This issue sets up the monorepo CI/CD foundation for Haelabs with a deliberately simplified Phase 1 scope.

The current approved direction is:
- strong PR validation before merge
- one active deployment environment: production
- safe production deployment for both web and API
- explicit, gated database migration handling
- basic post-deploy smoke checks

Why this matters:
- protects `main` from broken changes
- creates a repeatable release path for `petabase` and `api`
- keeps infrastructure simple while the product is still early
- reduces deployment risk by separating validation, deployment, and migration responsibilities

### Requirements
- [ ] Add PR CI workflow for lint, type-check, test, and build
- [ ] Use Nx-aware execution (`nx affected`) where practical
- [ ] Block merge when required checks fail
- [ ] Add production deployment workflow for web and API
- [ ] Deploy `petabase` to Vercel production
- [ ] Deploy `api` to Railway production
- [ ] Run production database migrations as a dedicated gated step
- [ ] Run smoke checks after deployment
- [ ] Manage production secrets through GitHub Secrets and GitHub Environment protection
- [ ] Document CI/CD flow, secrets contract, migration policy, and rollback basics
- [ ] Do not implement staging or preview in this phase

### Technical Spec
- **Architecture**
  - Phase 1 uses 2 workflows only:
    1. `ci.yml` for PR validation
    2. `deploy-production.yml` for production deployment
  - Recommended file structure:
    - `.github/workflows/ci.yml`
    - `.github/workflows/deploy-production.yml`
    - `docs/devops/cicd.md`
    - optional helpers:
      - `tools/ci/set-nx-shas.sh`
      - `tools/ci/run-migrations.sh`
      - `tools/ci/smoke-check.sh`
  - GitHub Actions is the CI/CD orchestrator.
  - Use `pnpm` + Nx workspace conventions.
  - Use GitHub Environment `production` with required reviewers for protected deploy and migration steps.
  - Keep application deploy and migration execution separate.
  - No staging workflow and no preview workflow in the approved Phase 1 scope.

- **API Design**
  - No new product-facing API is introduced by this issue.
  - CI/CD depends on one operational endpoint:
    - `GET /api/v1/health`
  - Recommended response shape:
    ```json
    {
      "data": {
        "status": "ok",
        "services": {
          "api": "up",
          "database": "up"
        },
        "environment": "production"
      }
    }
    ```
  - Smoke checks should use non-auth operational endpoints only.
  - Production credentials must not be available to PR validation workflows.

- **Database Schema**
  - This issue does not add business tables.
  - Production uses a single Neon production database/branch in Phase 1.
  - Migration tracking should rely on the ORM migration table, expected to be Prisma `_prisma_migrations` or equivalent.
  - Production migration policy:
    - dedicated migration job/step
    - gated by protected environment and/or release control
    - fail deployment on migration error
    - prefer additive/backward-compatible schema changes
    - avoid destructive drops in the same release as app rollout

### Implementation Guide
1. Create `.github/workflows/ci.yml` for `pull_request` validation.
2. Configure checkout with sufficient git history for Nx diffing.
3. Install dependencies with pnpm and set up caching.
4. Run lint, type-check, test, and build using `nx affected` with a documented fallback to full-run.
5. Make CI checks required in branch protection for `main`.
6. Create GitHub Environment `production` with required reviewers.
7. Define and document required production secrets for Vercel, Railway, and database access.
8. Create `.github/workflows/deploy-production.yml` triggered by `push` to `main` and/or release tags.
9. Deploy `petabase` web app to Vercel production.
10. Deploy `api` service to Railway production.
11. Run gated production migration as a dedicated step after deploy control is satisfied.
12. Run smoke checks against `/api/v1/health` and at least one key web route.
13. Write `docs/devops/cicd.md` covering setup, flow, troubleshooting, and rollback basics.

### Task List
- **Task 1: Create PR CI workflow**
  - Estimate: M
  - Dependency: #28 monorepo setup and basic app/API targets available
  - Acceptance Criteria: Every PR runs lint, type-check, test, and build; failures block merge.

- **Task 2: Add Nx SHA/base-head handling**
  - Estimate: S
  - Dependency: Task 1
  - Acceptance Criteria: `nx affected` works reliably in GitHub Actions; fallback behavior is documented or implemented.

- **Task 3: Define production secrets contract**
  - Estimate: S
  - Dependency: none
  - Acceptance Criteria: `production` environment exists, required secrets are documented, and no secrets are committed in repo.

- **Task 4: Implement production deploy workflow**
  - Estimate: M
  - Dependency: deployable web app and API, Tasks 1-3
  - Acceptance Criteria: Push/release triggers production deployment for Vercel and Railway with clear job visibility.

- **Task 5: Add gated database migration step**
  - Estimate: S-M
  - Dependency: ORM migration tooling available, Task 4
  - Acceptance Criteria: Migrations run explicitly, require protected production access, and fail the workflow on error.

- **Task 6: Add post-deploy smoke checks**
  - Estimate: S
  - Dependency: Task 4 and health endpoint availability
  - Acceptance Criteria: Deployment is not considered successful unless API health and key web route checks pass.

- **Task 7: Add CI/CD documentation**
  - Estimate: S
  - Dependency: Tasks 1-6
  - Acceptance Criteria: `docs/devops/cicd.md` explains validation, deployment, secrets, migration policy, and rollback basics.

### Testing
- PR workflow runs successfully on a sample PR.
- CI blocks merge when lint, type-check, test, or build fails.
- `nx affected` resolves correctly with GitHub Actions checkout history.
- Fallback behavior is safe when affected diff resolution fails.
- Fork PRs run validation safely without deployment secrets.
- Production deploy workflow triggers correctly on approved event type.
- Vercel production deployment succeeds independently.
- Railway production deployment succeeds independently.
- Migration step runs once per intended deploy and fails safely on error.
- Smoke checks verify `GET /api/v1/health` and a key web route after release.
- Workflow logs make partial deployment failures obvious.
- Production environment approval protects secrets and migration execution.

### Decisions Made
- Phase 1 is intentionally simplified to production only.
- Staging and preview environments are explicitly deferred.
- GitHub Actions is the workflow orchestrator.
- `pnpm` + Nx monorepo conventions are the base CI model.
- Use `nx affected` for efficiency, with fallback handling when diff resolution is unreliable.
- Deploy web via Vercel and API via Railway.
- Use GitHub Environment `production` for protected deployment controls.
- Keep DB migrations separate from application startup.
- Favor additive/backward-compatible schema rollout because there is no staging safety net yet.
- `petabase` is the current staff-facing app naming direction and should be reflected where implementation naming has moved forward.

### Open Questions
- Should production deploy trigger on every push to `main`, release tags only, or support both with different protection levels?
- Should the migration step happen before app promotion or after deployment with rollback guidance?
- What exact rollback mechanism will the team support in the first production iteration?
- Should Nx Cloud be introduced now or deferred until CI volume justifies it?
- If folder/app names in the repo still use older naming, should workflow identifiers adopt current product naming immediately or later?
