# Feature Workflow Artifacts

This repo uses file-based feature planning under `.planning/features/`.

## Goals

- Keep feature context in-repo and reviewable.
- Reuse existing GSD planning context in `.planning/`.
- Avoid Jira/story dependencies for day-to-day implementation work.

## Required Paths

- `.planning/features/<slug>/brief.md` - bounded problem statement, scope, assumptions, acceptance criteria.
- `.planning/features/<slug>/plan.md` - implementation approach, touched areas, risks, validation.
- `.planning/features/<slug>/status.md` - current state, progress, blockers, validation notes.
- `.planning/features/last.txt` - latest active feature slug.

## Optional Paths

- `.planning/features/<slug>/notes.md` - working notes, discoveries, open questions.
- `.planning/features/<slug>/handoff.md` - concise resume context for a later session.

## Source Context

Every feature plan should align with these repo-level sources first:

- `AGENTS.md`
- `.planning/PROJECT.md`
- `.planning/STATE.md`
- `.planning/REQUIREMENTS.md`
- `.planning/ROADMAP.md`
- `docs/conventions.md`

Read additional app-specific docs only when the feature touches those areas.

## Slug Rules

- Use `N-feature-name` format with a numeric running prefix and lowercase kebab-case suffix.
- Pick the next available integer under `.planning/features/` when creating a new feature, e.g. `1-auth-sign-in`, `2-patient-search`.
- Keep the slug short and stable.
- Prefer domain-first names like `auth-sign-in`, `patient-search`, `appointment-calendar` after the numeric prefix.

## Workflow

1. Create or update `brief.md`.
2. Create or update `plan.md`.
3. Create or update `status.md`.
4. Optionally create `handoff.md` when work needs to be resumed or delegated.
5. Implement against the plan.
6. Record validation and any follow-up work in `status.md`.

## No External Tracker Assumption

Do not assume Jira tickets, story IDs, or external PM tooling. If the user has one, capture it inside `plan.md` as plain text metadata instead of changing the file layout.
