# feature-progress-sync

Use this post-command hook behavior after substantial feature implementation work.

## Rules

- If the session changed feature code, remind the user to update `/feature-progress`.
- Prefer updating `.planning/features/<slug>/status.md` over inventing a second progress file.
- Do not silently overwrite status artifacts without an explicit command.
