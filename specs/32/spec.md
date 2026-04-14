# Executive Summary
- Issue: Setup CI/CD pipeline — lint, build, test, preview, and deploy
- Source: haelabs/openclaw-team#32
- Promoted: 2026-04-14 11:32
- Handoff source: latest comment containing the handoff document

---

## 📋 Handoff Document

### Overview
This issue sets up the CI/CD pipeline for the monorepo. The goal is to give the team fast PR validation, predictable non-production deployment flow, and safe promotion to staging and production for both the web app and API.

Why this matters:
- protects mainline quality with automated validation
- creates preview and staging feedback loops for fast iteration
- makes deployments repeatable and auditable
- introduces safe migration handling for Neon/Prisma-based database changes

Important naming alignment from the latest approved direction:
- use `petabase` as the staff-facing web app name in workflow docs and conventions
- keep `api` as the backend service name
- update legacy `vet-manage` references in pipeline documentation if repo naming is changed during implementation

### Requirements
- [ ] Add CI pipeline for lint, type-check, test, and build on PR
- [ ] Use Nx affected commands where appropriate to reduce CI cost/time
- [ ] Configure preview deployment flow for the web app
- [ ] Define and implement preview strategy for the API
- [ ] Configure staging deployment on merge to `main`
- [ ] Configure production deployment on release/tag or gated manual action
- [ ] Run database migrations safely in deployment workflows
- [ ] Manage secrets via GitHub Secrets / GitHub Environments
- [ ] Add pipeline documentation and operational guidance
- [ ] Block merge when required checks fail

### Technical Spec
- **Architecture**
  - Implement the pipeline as 4 workflow layers:
    1. PR validation workflow
    2. Preview deployment workflow
    3. Staging deployment workflow
    4. Production release workflow
  - Recommended repo structure:
    - `.github/workflows/ci.yml`
    - `.github/workflows/preview.yml`
    - `.github/workflows/deploy-staging.yml`
    - `.github/workflows/deploy-production.yml`
    - `docs/devops/cicd.md`
    - optional helper scripts under `tools/ci/`
  - Use GitHub Actions as the orchestrator.
  - Use pnpm + Nx workspace caching.
  - Use GitHub Environments such as `staging` and `production` and optionally `preview`.
  - Keep web and API deploys independent, but report their status together where possible.
  - Treat database migration as a dedicated controlled job, not hidden inside application startup.

- **API Design**
  - No new product endpoints are introduced by this issue.
  - The pipeline assumes an operational health endpoint exists at:
    - `GET /api/v1/health`
  - Preview/staging/production smoke checks should use public/non-auth operational endpoints.
  - Preview status reporting should surface:
    - CI result
    - web preview URL
    - API preview URL or explicit status if API preview is intentionally deferred

- **Database Schema**
  - No business tables are added here.
  - Environment strategy should assume:
    - production DB on Neon production branch/database
    - staging DB on Neon staging branch/database
    - preview DB strategy should remain intentionally conservative for MVP
  - Recommended migration policy:
    - automatic on staging
    - gated/approved on production
    - backward-compatible migration discipline where possible
  - If per-PR DB previews are too expensive or operationally heavy, start with shared non-prod resources and document the trade-off.

### Implementation Guide
1. Create baseline GitHub Actions CI for PR validation.
2. Set up Node, pnpm install, cache restore, and Nx affected execution.
3. Add required status checks and ensure failed validation blocks merges.
4. Implement the web preview deployment flow, ideally using native Vercel previews.
5. Decide and document the API preview strategy before automating it.
6. Add sticky PR comment behavior to show deployment status and URLs.
7. Implement staging deployment on merge to `main` for both `petabase` and `api`.
8. Add staging DB migration and post-deploy smoke checks.
9. Implement production deployment via release/tag or manual dispatch with environment approval.
10. Separate production migration into a gated step.
11. Document secrets, environments, migration policy, smoke checks, rollback basics, and troubleshooting.

### Task List
- **Task 1: Create baseline CI workflow**
  - Estimate: M
  - Dependency: #28 and deployable apps available enough to validate
  - Acceptance Criteria: PRs run lint, test, build, and typecheck with Nx-aware execution; status checks are visible in GitHub.

- **Task 2: Define secrets and environment contract**
  - Estimate: S
  - Dependency: Task 1
  - Acceptance Criteria: Required secrets and environments are documented; production secrets are protected.

- **Task 3: Implement web preview deployment**
  - Estimate: M
  - Dependency: Web app deployability
  - Acceptance Criteria: Qualifying PRs receive a preview URL for the web app and the PR comment is updated rather than duplicated.

- **Task 4: Implement API preview deployment strategy**
  - Estimate: M
  - Dependency: API deployability and platform decision
  - Acceptance Criteria: Team has one documented API preview approach; preview URL/status is surfaced when enabled.

- **Task 5: Implement staging deployment workflow**
  - Estimate: M
  - Dependency: Tasks 1-4
  - Acceptance Criteria: Merge to `main` deploys web and API to staging, runs migrations, and executes smoke checks.

- **Task 6: Implement production deployment workflow**
  - Estimate: M
  - Dependency: Task 5
  - Acceptance Criteria: Production deploy requires approval or release trigger, runs gated migrations, and provides deployment traceability.

- **Task 7: Add sticky PR deployment comment behavior**
  - Estimate: S
  - Dependency: Tasks 3-4
  - Acceptance Criteria: One persistent PR comment shows CI result, preview URLs/status, and last update information.

- **Task 8: Add operational documentation**
  - Estimate: S
  - Dependency: Tasks 1-7
  - Acceptance Criteria: `docs/devops/cicd.md` documents workflows, secrets, migration policy, and troubleshooting.

### Testing
- PR validation runs successfully on a sample PR.
- `nx affected` resolves base/head correctly or falls back safely when needed.
- Failed lint/build/test/typecheck blocks merge.
- Web preview URL is generated and surfaced in PR feedback.
- API preview behavior is either working or explicitly skipped with clear status.
- Staging deploy on `main` succeeds for both app and API.
- Staging DB migrations run exactly once and fail the workflow if unsuccessful.
- Post-deploy smoke checks validate `/api/v1/health` and core web routes.
- Production deployment is gated behind GitHub Environment approval or release controls.
- No production secrets are exposed to PR workflows or forks.
- Preview cleanup/update behavior is documented.

### Decisions Made
- GitHub Actions is the CI/CD orchestrator.
- Use Nx affected to reduce PR validation scope where practical.
- Keep pipeline split across PR validation, preview, staging, and production workflows.
- Use Vercel for web deployment and Railway for API deployment.
- Use Neon staging vs production separation for safe migration handling.
- Keep migrations explicit and controlled, not implicit on app startup.
- Start simple on preview infrastructure if full isolated API previews are too expensive or fragile.
- Update workflow naming/docs to current product naming when app folders are renamed.

### Open Questions
- Should the API have true per-PR previews, or should the MVP use a simpler shared non-prod strategy first?
- Should Nx Cloud be introduced now for remote caching or deferred until CI volume grows?
- What is the exact rollback/runbook expectation for failed production deploys in the first iteration?
- Will PR comment updates be implemented via native action tooling or a lightweight custom script?
- When app folder naming changes land, should workflow identifiers also be renamed immediately or only docs/display names?
