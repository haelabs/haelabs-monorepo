# feature-next-step-reminder

Use this post-command hook behavior to keep the workflow moving.

## Rules

- After `/feature-intake`, suggest `/feature-plan`.
- After `/feature-plan`, suggest `/feature-handoff` or `/feature-execute`.
- After `/feature-handoff`, suggest `/feature-execute` or `/feature-progress`.
- After `/feature-review`, suggest the exact next implementation or cleanup step.
