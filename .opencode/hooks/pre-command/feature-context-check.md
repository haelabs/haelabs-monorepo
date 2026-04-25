# feature-context-check

Use this pre-command hook behavior for feature workflow commands that depend on existing artifacts.

## Commands

- `/feature-plan`
- `/feature-handoff`
- `/feature-progress`
- `/feature-resume`
- `/feature-execute`
- `/feature-review`

## Checks

- If the user supplied a slug, confirm `.planning/features/<slug>/` exists.
- If no slug was supplied, try `.planning/features/last.txt`.
- If neither resolves cleanly, ask one short clarification question instead of guessing.
