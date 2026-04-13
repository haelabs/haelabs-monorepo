# haelabs-monorepo

## What This Is

This repository is the Nx + pnpm monorepo foundation for the Haelabs product team. It establishes a stable workspace structure, shared package conventions, and developer documentation so future app and API work can be added without top-level repository churn.

## Core Value

Provide a clean, MVP-friendly monorepo foundation that lets future product work start quickly without later restructuring the repository.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Initialize an Nx workspace on top of pnpm
- [ ] Establish stable top-level folders and naming conventions
- [ ] Add baseline root scripts and configuration for build, lint, test, and typecheck
- [ ] Reserve `apps/petabase`, `apps/api`, and optional `apps/pawscroll` paths without creating `apps/admin`
- [ ] Document dependency boundaries and how future apps and packages should be added

### Out of Scope

- Separate `apps/admin` application — internal/admin flows belong inside `petabase`
- Product business endpoints — this issue is repository foundation only
- Shared database package extraction — DB ownership should stay in `apps/api` until reuse is proven

## Context

The source issue is haelabs/openclaw-team#28. The approved direction is an app-centric Nx monorepo using pnpm workspaces, with deployable apps under `apps/` and shared packages under `packages/`. The initial product naming has been updated to use `petabase` and `pawscroll`, and the repository should stay deliberately simple while preserving clean package boundaries.

## Constraints

- **Tech stack**: Nx + pnpm — approved workspace foundation for this repository
- **Scope**: Foundation only — no product feature implementation in this issue
- **Structure**: App-centric layout — must preserve `apps/api` and `apps/petabase` paths
- **Complexity**: MVP-friendly — avoid premature architecture and over-segmentation

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use Nx with inferred-task-friendly root configuration | Matches the approved monorepo direction while staying light | — Pending |
| Reserve app paths with documented placeholders instead of scaffolding full apps | Keeps Phase 1 simple while preserving approved naming | — Pending |
| Keep shared package boundaries documented before enforcing strict lint tags | Avoids premature complexity while still guiding future work | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-13 after initialization*
