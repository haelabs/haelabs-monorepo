---
description: Create or update a bounded feature brief
agent: feature-orchestrator
subtask: true
---
Create or update a repo-local feature brief for: $ARGUMENTS

Required context:
@AGENTS.md
@.planning/PROJECT.md
@.planning/STATE.md
@.planning/REQUIREMENTS.md
@.planning/ROADMAP.md
@.planning/features/README.md
@.planning/features/templates/feature-brief.md
@.planning/features/templates/feature-status.md

Instructions:

1. Derive or confirm a stable feature slug in `N-feature-name` format. For new features, use the next available integer under `.planning/features/`.
2. Create or update `.planning/features/<slug>/brief.md` using the brief template.
3. Create or update `.planning/features/<slug>/status.md` if it does not exist yet.
4. Update `.planning/features/last.txt` to the selected slug.
5. Keep the brief repo-native and do not require Jira, story IDs, or external trackers.
6. End by summarizing the chosen slug, artifact paths, and the next recommended command.
