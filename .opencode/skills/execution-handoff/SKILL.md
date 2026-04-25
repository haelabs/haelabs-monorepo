---
name: execution-handoff
description: Shared rules for compact feature handoff and progress tracking with `.planning/features/<slug>/` artifacts.
license: MIT
compatibility: opencode
metadata:
  audience: repository contributors
  workflow: feature-delivery
---
# /execution-handoff

Use this skill when preparing a compact handoff or updating execution progress for a planned feature.

## Artifact Paths

- `.planning/features/<slug>/handoff.md`
- `.planning/features/<slug>/status.md`
- `.planning/features/last.txt`

## Core Rules

1. Read existing feature artifacts before regenerating anything.
2. Keep handoff notes concise and execution-oriented.
3. Keep acceptance and validation criteria observable.
4. Preserve blockers and open questions instead of inventing answers.
5. Do not assume Jira, Linear, or story metadata.

## References

- `references/task-schema.md`
- `references/progress-template.md`
