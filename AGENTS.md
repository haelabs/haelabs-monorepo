# AGENTS.md

## Read First
- Start here, then read only the files relevant to the task.
- For planned feature work, read `.planning/PROJECT.md`, `.planning/STATE.md`, `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, and `.planning/features/README.md` before changing code.
- For `apps/petabase` UI work, read `DESIGN.md` first. It is the source of truth for tokens, shell behavior, breakpoints, and bilingual UI direction.

## Required Workflow
- There is no active GSD command workflow in `.opencode`; do not assume `/gsd-*` commands exist.
- If the work needs in-repo planning or handoff, use the repo-local feature workflow under `.planning/features/<slug>/`.
- Feature workflow commands: `/feature`, `/feature-intake`, `/feature-plan`, `/feature-progress`, `/feature-handoff`, `/feature-resume`, `/feature-execute`, `/feature-review`.
- Feature artifacts: `brief.md`, `plan.md`, `status.md`, optional `notes.md` and `handoff.md`, plus `.planning/features/last.txt` for the active slug.
- New feature slugs should use a running-number prefix: `N-feature-name` such as `1-auth-sign-in`.
- When a feature command needs a slug, prefer `.planning/features/last.txt`; ask one short question if it does not resolve cleanly.

## Repo Shape
- Monorepo layout is enforced by Nx and pnpm: apps live in `apps/`, shared code in `packages/`, tooling packages can live in `tools/*`.
- Dependency direction is `apps -> packages`. Do not move shared contracts back into app-local copies.
- Main apps are `apps/petabase` and `apps/api`.
- Do not create `apps/admin`; internal/admin flows belong inside `apps/petabase`.
- Keep API/runtime/database ownership in `apps/api` unless reuse is already proven.

## Commands That Matter
- Install: `pnpm install`
- List projects: `pnpm exec nx show projects`
- Workspace checks use root scripts:
- `pnpm build`
- `pnpm lint`
- `pnpm test`
- `pnpm typecheck`
- These scripts call `tools/scripts/run-target.mjs`, which discovers Nx projects and skips cleanly when a target has no matching projects.
- Focused app commands:
- `pnpm exec nx serve petabase`
- `pnpm exec nx build petabase`
- `pnpm exec nx serve api`
- `pnpm exec nx build api`
- For package-scoped commands, Nx ultimately shells out to:
- `pnpm --filter @haelabs/petabase run <dev|build|lint|test|typecheck>`
- `pnpm --filter @haelabs/api run <start|start:dev|build|lint|test|typecheck>`
- Deploy:
- `cd apps/petabase && vercel --prod --yes` — deploy petabase to Vercel production (project already linked).

## Verification Order
- Follow the local CI order when doing broad validation: `lint -> typecheck -> test -> build`.
- CI is currently manual-only and the validate job is disabled in `.github/workflows/ci.yml`, so do not assume GitHub is catching regressions for you.
- `apps/petabase` currently has no real test suite; its `test` script only prints a placeholder message.
- `apps/api` tests run through Node's built-in test runner with `ts-node/register` and `reflect-metadata`.

## App Entry Points
- `apps/petabase` is the staff-facing Next.js app. Key wiring lives in `src/app/` and `middleware.ts`.
- `apps/api` is the NestJS backend. Key wiring lives in `src/main.ts` and `src/app.module.ts`.
- The frontend is locale-first and bilingual Thai/English from the start; preserve locale-aware routing and mobile-first behavior.

## Implementation Notes
- Petabase design direction is "Calm Ops": clinical, low-noise, staff-facing UI. Do not drift into marketing-site patterns.
- Reuse existing design tokens from `apps/petabase/src/styles/tokens.css`; avoid one-off colors, radii, and shadows.
- Both apps validate env shape with `zod`; keep env contract changes aligned with the existing validation files instead of reading unchecked env vars ad hoc.
- Local Node requirement in `README.md` is Node 24+, but CI uses Node 22. Avoid introducing features that only work on one of those runtimes.
