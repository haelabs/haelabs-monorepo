---
description: Review a feature against its plan and acceptance criteria
agent: feature-reviewer
subtask: true
---
Review the feature identified by: $ARGUMENTS

Required context:
@AGENTS.md
@.planning/features/README.md

Instructions:

1. Resolve the feature slug from the user input.
2. Read `.planning/features/<slug>/plan.md` and `.planning/features/<slug>/status.md`.
3. Review the current implementation with a code review mindset: bugs, regressions, missing validation, and acceptance-criteria gaps first.
4. Call out concrete file references where possible.
5. If the feature is complete, suggest exact status updates for `.planning/features/<slug>/status.md`.
