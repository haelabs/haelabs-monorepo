# Feature Artifact Contract

## Required Files

Every planned feature should use this folder layout:

```text
.planning/features/<slug>/
  brief.md
  plan.md
  status.md
```

## Optional Files

Add these only when needed:

```text
.planning/features/<slug>/
  notes.md
  handoff.md
```

Latest active feature pointer:

```text
.planning/features/last.txt
```

## brief.md Must Cover

- Goal
- Why now
- In scope
- Out of scope
- Constraints
- Assumptions
- Open questions
- Acceptance criteria

## plan.md Must Cover

- Summary
- In scope
- Out of scope
- Constraints
- Dependencies
- Acceptance criteria
- Validation expectations

## status.md Must Cover

- Current status
- Progress checklist
- Completed work
- Blockers
- Validation notes
- Follow-up items

## Slug Guidance

- Use `N-feature-name` format
- Use the next available integer under `.planning/features/` when creating a new feature
- Keep the suffix lowercase kebab-case
- Stable across the feature's lifetime
- Prefer domain plus action in the suffix, such as `patient-search` or `soap-print-view`

## Repo-Specific Context Sources

- `AGENTS.md`
- `.planning/PROJECT.md`
- `.planning/STATE.md`
- `.planning/REQUIREMENTS.md`
- `.planning/ROADMAP.md`

These are the first files to consult before app-level exploration.
