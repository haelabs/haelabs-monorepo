---
description: Create or update a repo-local feature plan
agent: feature-planner
subtask: true
---
Plan the feature request below using this repository's file-based workflow.

Feature request: $ARGUMENTS

Required context:
@AGENTS.md
@.planning/PROJECT.md
@.planning/STATE.md
@.planning/REQUIREMENTS.md
@.planning/ROADMAP.md
@.planning/features/README.md
@.planning/features/templates/feature-brief.md
@.planning/features/templates/feature-plan.md
@.planning/features/templates/feature-status.md

Instructions:

1. Derive or confirm a stable feature slug in `N-feature-name` format. For new features, use the next available integer under `.planning/features/`.
2. Reuse `.planning/features/<slug>/brief.md` when it exists; otherwise derive the brief from the request before planning.
3. Create or update `.planning/features/<slug>/plan.md` using the plan template.
4. Create or update `.planning/features/<slug>/status.md` using the status template.
5. Update `.planning/features/last.txt` to the selected slug.
6. Keep the plan repo-native and do not require Jira, story IDs, or external trackers.
7. Pull constraints from the repo context instead of inventing new process.
8. End by summarizing the chosen slug, artifact paths, and the main constraints for implementation.
