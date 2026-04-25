---
name: feature-workflow
description: Repo-local feature planning and execution workflow for this monorepo. Use when shaping, planning, handing off, executing, or reviewing feature work with `.planning/features/<slug>/` artifacts and no Jira or story integration.
license: MIT
compatibility: opencode
metadata:
  audience: repository contributors
  workflow: feature-delivery
---
# /feature-workflow

Use this skill when the work should be tracked with repo-local feature artifacts instead of an external tracker.

## Artifact Paths

- `.planning/features/<slug>/brief.md`
- `.planning/features/<slug>/plan.md`
- `.planning/features/<slug>/status.md`
- `.planning/features/<slug>/notes.md` (optional)
- `.planning/features/<slug>/handoff.md` (optional)
- `.planning/features/last.txt`

## Required Repo Context

Always ground feature work in:

- `AGENTS.md`
- `.planning/PROJECT.md`
- `.planning/STATE.md`
- `.planning/REQUIREMENTS.md`
- `.planning/ROADMAP.md`
- `.planning/features/README.md`

## Command Entry Points

- `/feature`
- `/feature-intake <request>`
- `/feature-plan <request>`
- `/feature-handoff <slug or request>`
- `/feature-progress <slug or request>`
- `/feature-resume [slug]`
- `/feature-execute <slug or request>`
- `/feature-review <slug or request>`

## Workflow Rules

1. Derive a stable slug in `N-feature-name` format using the next available integer and a lowercase kebab-case suffix.
2. Create or update the feature folder under `.planning/features/`.
3. Put bounded scope and acceptance criteria in `brief.md`.
4. Put implementation approach in `plan.md`.
5. Put progress, blockers, and validation results in `status.md`.
6. Use `handoff.md` when the work needs a compact builder-oriented resume package.
7. Keep `.planning/features/last.txt` updated with the active feature slug.
8. Keep the process file-based and repo-native.

## Tracker Policy

This workflow does not require Jira, Linear, or story IDs.

If the user provides an external reference, record it as plain text metadata inside `plan.md`. Do not change folder names, file names, or command structure to fit external tooling.

## Repo Constraints

- Preserve monorepo boundaries: `apps -> packages`.
- Keep deployable apps in `apps/` and shared code in `packages/`.
- Keep internal/admin flows inside `apps/petabase`, not a separate `apps/admin` app.
- Use existing root scripts: `pnpm build`, `pnpm lint`, `pnpm test`, `pnpm typecheck`.

See `references/artifact-paths.md` for the exact feature artifact contract.
