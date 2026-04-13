# Spec: Setup monorepo structure with Nx + pnpm

Source: haelabs/openclaw-team#28
Promoted: 2026-04-13 16:10

---

## Summary
Set up the project as a monorepo and define a maintainable folder structure for current and future development.

## Context
We want to standardize the repository layout early so the team can scale apps, shared packages, and documentation without ad hoc structure changes later.

Current direction:
- Use **Nx** as the monorepo tool
- Use **pnpm** as the package manager
- Main top-level folders will likely include `apps/`, `packages/`, `docs/`, and supporting directories as needed

Additional decisions:
- Use folder name **`tools/`** for workspace tooling/scripts, not `ntools`
- We likely will **not** create a separate `apps/admin` app
- Admin or internal management flows should live inside **`vet-manage`** and be separated by **URL paths / route structure** rather than a separate site

## Goals
- Establish the initial monorepo structure
- Research and confirm a suitable folder structure for the team
- Define conventions for app and package boundaries
- Ensure the structure supports future growth, shared code, and docs

## Scope
### 1) Monorepo setup
- Initialize Nx-based monorepo
- Configure pnpm workspace
- Add baseline workspace configuration

### 2) Folder structure research
- Review recommended Nx monorepo patterns
- Compare practical folder layouts for product teams
- Recommend a structure that balances clarity and scalability

### 3) Proposed initial structure
Example candidate structure:
- `apps/` for deployable applications
- `packages/` for shared libraries, UI, configs, utilities, SDKs
- `docs/` for planning, specs, and internal documentation
- `tools/` for scripts or workspace tooling if needed

Potential app direction:
- `apps/vet-manage`
- `apps/parent-app`
- `apps/api`

Notes on app boundaries:
- Do **not** assume a separate `apps/admin` unless a strong need emerges later
- Prefer keeping management/admin surfaces within `vet-manage` using route-level separation when practical

## Deliverables
- Nx + pnpm monorepo initialized in repo
- Recommended folder structure documented
- Clear naming and placement conventions for new apps/packages
- Any required bootstrap configs committed

## Acceptance Criteria
- Repository is configured to use Nx with pnpm
- Top-level workspace structure is defined and documented
- Team has guidance on where to place apps, shared packages, docs, and tools
- App boundary recommendation reflects current direction for `vet-manage`, `parent-app`, and `api`
- Structure is suitable for future expansion without major reorganization

## Notes
This issue should focus first on the workspace foundation and directory conventions, not feature implementation inside the apps/packages yet.


---

## Issue Comments

### Comment by \(.author.login)\n\(.body)\n---
### Comment by \(.author.login)\n\(.body)\n---
### Comment by \(.author.login)\n\(.body)\n---
### Comment by \(.author.login)\n\(.body)\n---
### Comment by \(.author.login)\n\(.body)\n---
### Comment by \(.author.login)\n\(.body)\n---
