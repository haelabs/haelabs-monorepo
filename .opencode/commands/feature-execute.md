---
description: Execute a planned feature from .planning artifacts
agent: feature-executor
subtask: true
---
Execute the planned feature identified by: $ARGUMENTS

Required context:
@AGENTS.md
@.planning/PROJECT.md
@.planning/STATE.md
@.planning/features/README.md

Instructions:

1. Resolve the feature slug from the user input. If it is ambiguous, ask one short clarification question.
2. Read `.planning/features/<slug>/plan.md` and `.planning/features/<slug>/status.md` before changing code.
3. Implement the smallest correct change that satisfies the acceptance criteria.
4. Update `.planning/features/<slug>/status.md` with progress, validation notes, and any follow-up work.
5. Keep all work inside repo boundaries documented in `AGENTS.md` and existing `.planning/` context.
6. Do not introduce Jira or story integration. Capture external references only as plain text if the user provides them.
