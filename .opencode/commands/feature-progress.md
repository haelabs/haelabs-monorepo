---
description: Update feature execution progress and remaining work
agent: feature-orchestrator
subtask: true
---
Update the feature progress for: $ARGUMENTS

Required context:
@AGENTS.md
@.planning/features/README.md
@.planning/features/templates/feature-status.md

Instructions:

1. Resolve the feature slug from the user input or `.planning/features/last.txt`.
2. Read `.planning/features/<slug>/plan.md`, `.planning/features/<slug>/status.md`, and `.planning/features/<slug>/handoff.md` if it exists.
3. Update `.planning/features/<slug>/status.md` with completed work, current blockers, validation notes, and follow-up work.
4. Update `.planning/features/last.txt` to the selected slug.
5. End by summarizing the current status and the next recommended step.
