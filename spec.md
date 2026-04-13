# Executive Summary
- Issue: Setup monorepo structure with Nx + pnpm
- Source: haelabs/openclaw-team#28
- Promoted: 2026-04-13 23:05
- Handoff source: latest comment containing the handoff document

---

## 📋 Handoff Document

### Overview
This issue establishes the monorepo foundation for the product team. The goal is to create a clean Nx + pnpm workspace with stable folder conventions, shared package boundaries, and documentation so subsequent implementation issues can proceed without repository rework.

Why this matters:
- prevents ad hoc repo sprawl as apps and shared packages are added
- gives akai a reliable base for API and web app work
- aligns the repo with the approved MVP stack and deployment direction
- reduces future migration cost by enforcing boundaries early without over-engineering

Important current naming direction from the latest approved comments:
- `apps/petabase` replaces `apps/vet-manage`
- `apps/pawscroll` replaces `apps/parent-app`
- `apps/api` remains unchanged
- internal/admin flows should stay inside `petabase` via route/path separation, not a separate `apps/admin`

### Requirements
- [ ] Initialize Nx workspace with pnpm
- [ ] Add baseline workspace files (`package.json`, `pnpm-workspace.yaml`, `nx.json`, base tsconfig)
- [ ] Establish and document top-level folders: `apps/`, `packages/`, `docs/`, `tools/`
- [ ] Configure workspace discovery for app and package directories
- [ ] Add root scripts for build, lint, test, and typecheck
- [ ] Define naming and placement conventions for apps and shared packages
- [ ] Preserve clean dependency direction between apps and packages
- [ ] Document how future apps/packages should be added
- [ ] Keep the structure MVP-friendly and avoid unnecessary early complexity
- [ ] Preserve clean paths for `apps/petabase` and `apps/api`
- [ ] Do not create a separate `apps/admin` app

### Technical Spec
- **Architecture**
  - Use an app-centric Nx monorepo on top of pnpm workspaces.
  - Top-level structure:
    - `apps/`
      - `petabase/` for clinic/staff operations web app
      - `api/` for backend API service
      - `pawscroll/` as future/optional parent-facing app path
    - `packages/`
      - `ui/`, `types/`, `sdk/`, `auth/`, `utils/`, shared config packages, and test helpers
    - `docs/`
    - `tools/`
  - Dependency direction should be: `apps -> shared/domain packages -> config/util packages`
  - Avoid circular dependencies.
  - Keep shared contracts/types in packages, not duplicated across apps.
  - Start with inferred Nx tasks and local caching. Add stricter boundary tags later when domains are clearer.

- **API Design**
  - No business endpoints are required in this issue.
  - Repo conventions must reserve:
    - `apps/api` for the deployable backend
    - `packages/types` for shared request/response contracts
    - `packages/sdk` for typed client wrappers
    - `packages/auth` only if shared auth helpers are actually needed across apps

- **Database Schema**
  - No product database schema is required in this issue.
  - Workspace layout must not block future Prisma + Neon integration.
  - Initial DB ownership should stay in `apps/api` unless real reuse justifies later extraction to a shared package.

### Implementation Guide
1. Initialize the Nx workspace using pnpm.
2. Add baseline root configuration (`package.json`, `pnpm-workspace.yaml`, `nx.json`, base TS config, ignore files as needed).
3. Create and/or document `apps/`, `packages/`, `docs/`, and `tools/`.
4. Configure pnpm and Nx workspace discovery for the chosen layout.
5. Add deterministic root scripts for build, lint, test, and typecheck.
6. Define starter package conventions for shared config, UI, types, SDK, auth, and utilities.
7. Document naming and import boundary rules.
8. Reserve product app paths for `apps/petabase` and `apps/api`. Optionally reserve `apps/pawscroll` for later, but do not force Phase 1 complexity.
9. Explicitly avoid scaffolding `apps/admin`.
10. Add repo structure documentation for developers.
11. Verify install and workspace commands run cleanly.

### Task List
- **Task 1: Initialize Nx + pnpm workspace**
  - Estimate: M
  - Dependency: None
  - Acceptance Criteria: Workspace initializes successfully, install works, Nx recognizes the workspace.

- **Task 2: Add baseline root config files**
  - Estimate: S
  - Dependency: Task 1
  - Acceptance Criteria: Root contains valid workspace config and base TS setup.

- **Task 3: Define top-level folder structure**
  - Estimate: S
  - Dependency: Task 2
  - Acceptance Criteria: `apps/`, `packages/`, `docs/`, and `tools/` exist and/or are explicitly documented.

- **Task 4: Configure workspace discovery**
  - Estimate: S
  - Dependency: Task 2
  - Acceptance Criteria: `pnpm-workspace.yaml` includes correct workspace paths.

- **Task 5: Add root scripts for build/lint/test/typecheck**
  - Estimate: S
  - Dependency: Task 2
  - Acceptance Criteria: Standard commands exist and are CI-ready.

- **Task 6: Define shared package conventions**
  - Estimate: S
  - Dependency: Task 3
  - Acceptance Criteria: Shared package purposes are documented clearly.

- **Task 7: Define dependency boundaries and import policy**
  - Estimate: M
  - Dependency: Tasks 3, 6
  - Acceptance Criteria: Clear rules exist for app-only code vs shared package code, including no-circular-deps guidance.

- **Task 8: Reserve product app structure aligned to MVP**
  - Estimate: S
  - Dependency: Task 3
  - Acceptance Criteria: Documentation explicitly supports `apps/petabase` and `apps/api`; no separate `apps/admin` is scaffolded.

- **Task 9: Add monorepo structure documentation**
  - Estimate: M
  - Dependency: Tasks 3-8
  - Acceptance Criteria: A developer can understand layout, naming, commands, and extension rules without tribal knowledge.

- **Task 10: Verification and readiness check**
  - Estimate: S
  - Dependency: All prior tasks
  - Acceptance Criteria: Workspace is ready for follow-up implementation issues without top-level restructure.

### Testing
- Clean install succeeds from a fresh checkout.
- Root build command runs without config errors.
- Root lint command runs without config errors.
- Root test command is wired correctly, even if there are few or no tests yet.
- Root typecheck command is implemented or explicitly documented.
- Nx detects the workspace and project graph correctly.
- `pnpm-workspace.yaml` includes intended directories.
- Documentation reflects actual paths and current naming (`petabase`, `pawscroll`, `api`).
- No unexpected `apps/admin` scaffold exists.
- `tools/` naming is used consistently.

### Decisions Made
- Nx + pnpm is the approved monorepo foundation.
- Top-level structure should use `apps/`, `packages/`, `docs/`, and `tools/`.
- Do not create a separate `apps/admin` app now.
- Admin/internal flows belong inside `petabase` via route/path separation.
- Phase 1 should optimize for clinic-side workflows first.
- `apps/api` and `apps/petabase` are the primary initial applications.
- Shared contracts/config should live in `packages/*`.
- Keep DB ownership in `apps/api` initially.
- Prefer a simple app-centric structure over an over-segmented enterprise monorepo.
- Latest naming update should be reflected in all docs and conventions.

### Open Questions
- Should starter shared config packages be scaffolded now or just documented?
- Should placeholder app directories be created immediately or only reserved/documented?
- What package scope naming convention should be standardized, for example `@haelabs/<name>`?
- Should Nx module boundary linting be introduced now or deferred until more packages exist?
- Should `apps/pawscroll` be reserved immediately or only when parent-facing work is closer?
