---
description: Resume the latest or selected feature and summarize the next step
agent: feature-orchestrator
subtask: true
---
Resume the feature identified by: $ARGUMENTS

Required context:
@AGENTS.md
@.planning/features/README.md

Instructions:

1. Resolve the feature slug from the user input or `.planning/features/last.txt`.
2. Read `.planning/features/<slug>/brief.md`, `.planning/features/<slug>/plan.md`, `.planning/features/<slug>/status.md`, and `.planning/features/<slug>/handoff.md` if it exists.
3. Summarize the current state, remaining work, blockers, and best next step.
4. Do not modify implementation code.
5. Update `.planning/features/last.txt` only when the resolved slug differs from the current pointer.
