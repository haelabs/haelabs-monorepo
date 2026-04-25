---
description: Create or update a compact handoff package for a planned feature
agent: feature-orchestrator
subtask: true
---
Create or update a handoff package for: $ARGUMENTS

Required context:
@AGENTS.md
@.planning/PROJECT.md
@.planning/STATE.md
@.planning/features/README.md
@.planning/features/templates/feature-handoff.md
@.planning/features/templates/feature-status.md

Instructions:

1. Resolve the feature slug from the user input or `.planning/features/last.txt`.
2. Read `.planning/features/<slug>/brief.md`, `.planning/features/<slug>/plan.md`, and `.planning/features/<slug>/status.md` first.
3. Create or update `.planning/features/<slug>/handoff.md` using the handoff template.
4. Keep the handoff compact and builder-oriented.
5. Update `.planning/features/last.txt` to the selected slug.
6. End by summarizing the handoff path and next recommended action.
