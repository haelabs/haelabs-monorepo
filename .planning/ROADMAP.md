# Roadmap: haelabs-monorepo

**Created:** 2026-04-13
**Requirements covered:** 12 / 12

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 1 | Workspace Foundation | Initialize the Nx + pnpm workspace, baseline config, root scripts, and primary repository docs | WS-01, WS-02, WS-03, WS-04, STR-02, DOC-01 | 4 |
| 2 | Structure Conventions | Document naming, boundaries, reserved app paths, and future package/app rules | STR-01, STR-03, STR-04, STR-05, DOC-02, DOC-03 | 4 |

## Phase 1: Workspace Foundation

**Goal:** Create a working monorepo shell that Nx recognizes and developers can install, inspect, and extend.

**Requirements:** WS-01, WS-02, WS-03, WS-04, STR-02, DOC-01

**Success criteria:**
1. Root package management and Nx configuration files exist and are valid.
2. `pnpm install` succeeds and Nx recognizes the workspace.
3. Root build, lint, test, and typecheck scripts run successfully even before product apps exist.
4. Repository documentation explains the monorepo foundation and actual folder layout.

## Phase 2: Structure Conventions

**Goal:** Lock in documented conventions for future apps and packages without over-scaffolding the repository.

**Requirements:** STR-01, STR-03, STR-04, STR-05, DOC-02, DOC-03

**Success criteria:**
1. Documentation names the approved app paths and explicitly forbids `apps/admin`.
2. Dependency direction and package ownership rules are clear and easy to follow.
3. Shared package purpose guidance is documented for types, sdk, auth, utils, ui, and config packages.
4. Future contributors can add apps and packages without guessing placement or naming.

---
*Last updated: 2026-04-13 after initialization*
