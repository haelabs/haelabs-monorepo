import type { Plugin } from "@opencode-ai/plugin"

const FEATURE_CONTEXT_FILES = [
  "AGENTS.md",
  ".planning/PROJECT.md",
  ".planning/STATE.md",
  ".planning/REQUIREMENTS.md",
  ".planning/ROADMAP.md",
  ".planning/features/README.md",
]

export const FeatureWorkflowPlugin: Plugin = async () => {
  return {
    "shell.env": async (_input, output) => {
      output.env.FEATURE_WORKFLOW_ROOT = ".planning/features"
      output.env.FEATURE_LAST_POINTER = ".planning/features/last.txt"
      output.env.FEATURE_BRIEF_TEMPLATE = ".planning/features/templates/feature-brief.md"
      output.env.FEATURE_PLAN_TEMPLATE = ".planning/features/templates/feature-plan.md"
      output.env.FEATURE_HANDOFF_TEMPLATE = ".planning/features/templates/feature-handoff.md"
      output.env.FEATURE_STATUS_TEMPLATE = ".planning/features/templates/feature-status.md"
      output.env.FEATURE_CONTEXT_FILES = FEATURE_CONTEXT_FILES.join(":")
    },
    "experimental.session.compacting": async (_input, output) => {
      output.context.push(`## Feature Workflow Continuity
Preserve any active feature slug and the state of these repo-local artifacts:
- .planning/features/<slug>/brief.md
- .planning/features/<slug>/plan.md
- .planning/features/<slug>/status.md
- .planning/features/<slug>/handoff.md
- .planning/features/last.txt

When compacting, keep the latest acceptance criteria, blockers, validation state, and next implementation step.`)
    },
  }
}
