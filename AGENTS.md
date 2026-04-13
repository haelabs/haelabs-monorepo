# AGENTS.md

## Purpose
This repository is the foundation for a Nx + pnpm monorepo.

Current priority is establishing stable workspace structure and conventions so future phases can add product code without top-level rework.

## Product Naming Direction
- Primary apps: `apps/petabase` and `apps/api`
- Optional future app path: `apps/pawscroll`
- Do not create a separate `apps/admin` app
- Internal/admin flows belong inside `petabase` via route/path separation

## Target Top-Level Layout
- `apps/`: deployable applications
- `packages/`: shared packages (ui, types, sdk, auth, utils, configs)
- `docs/`: project and architecture documentation
- `tools/`: scripts and developer tooling

## Dependency Boundaries
- Allowed direction: `apps -> packages`
- Shared contracts and types must live in `packages/*` (not duplicated in apps)
- Avoid circular dependencies across apps/packages
- Keep database ownership in `apps/api` initially unless reuse is proven

## Implementation Rules for Agents
- Keep setup MVP-first; avoid premature complexity and over-segmentation
- Prefer documented conventions when scaffolding is not yet needed
- If uncertain between adding new structure vs documenting reserved paths, choose the simpler option and document it clearly
- Preserve existing user changes; do not revert unrelated files
- Do not introduce secrets or `.env` values into tracked files

## Workspace Commands
When available, standard root scripts should be:
- `pnpm build`
- `pnpm lint`
- `pnpm test`
- `pnpm typecheck`

If scripts are not yet defined, add or document them as part of the current task instead of inventing ad hoc alternatives.

## Design Reference
- Use root `DESIGN.md` as the visual design source of truth for UI generation tasks
- When implementing frontend/UI, read and follow `DESIGN.md` tokens and rules before coding
- Preserve existing design direction unless explicitly asked to redefine it

## Definition of Done for Foundation Tasks
- Nx workspace initializes and is recognized
- pnpm workspace discovery is configured correctly
- Root scripts for build/lint/test/typecheck exist or are explicitly documented
- Repository layout and naming conventions are documented and aligned with this file
