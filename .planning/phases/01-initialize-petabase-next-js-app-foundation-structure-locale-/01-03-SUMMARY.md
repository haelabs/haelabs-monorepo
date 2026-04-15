---
phase: 01-initialize-petabase-next-js-app-foundation-structure-locale
plan: 03
subsystem: ui
tags: [nextjs, nx, locale-routing, api-client, docs]

requires:
  - phase: 01-initialize-petabase-next-js-app-foundation-structure-locale
    provides: locale/env/shell foundations from plans 01-01 and 01-02
provides:
  - Canonical locale-prefixed path normalization helper for shared client/server usage
  - Minimal env-backed typed API client baseline with reusable GET/POST helpers
  - Consolidated petabase foundation conventions for route groups, locale strategy, and extension ownership
affects: [petabase-feature-phases, staff-dashboard-flows, localization]

tech-stack:
  added: []
  patterns: [single-source locale path builder, env-backed API request helper, canonical app foundation documentation]

key-files:
  created: []
  modified:
    - apps/petabase/src/lib/navigation/locale-path.ts
    - apps/petabase/src/lib/api/client.ts
    - docs/petabase-foundation.md

key-decisions:
  - "Normalize locale paths in one helper and keep hooks as thin wrappers over it."
  - "Keep API client lightweight and typed while sourcing base URL only from validated env."
  - "Keep internal/admin flows within petabase route groups and document extension boundaries explicitly."

patterns-established:
  - "Locale URL generation should go through withLocale/useLocalePath, not local concatenation."
  - "Common app conventions are centralized in docs/petabase-foundation.md before adding new feature slices."

requirements-completed: [PB-04]

duration: 2 min
completed: 2026-04-15
---

# Phase 01 Plan 03: Consolidate common/util helpers and canonical petabase foundation documentation Summary

**Locale-aware path and API request helpers are now canonicalized with normalized inputs, and petabase extension conventions are explicitly documented for future contributors.**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-15T10:32:37Z
- **Completed:** 2026-04-15T10:35:00Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Centralized locale path normalization in `withLocale` while preserving hook delegation to the shared helper.
- Kept API client baseline minimal and typed, with env-derived base URL and reusable request method helpers.
- Expanded `docs/petabase-foundation.md` with route-group extension rules, locale/helper conventions, and petabase project command guidance.

## Task Commits

Each task was committed atomically:

1. **Task 1: Consolidate locale-path and utility helpers for shared use** - `15c3358` (feat)
2. **Task 2: Maintain minimal typed API client baseline and document extension rules** - `f11a567` (feat)

**Plan metadata:** Included in final docs commit for execution records.

## Files Created/Modified
- `apps/petabase/src/lib/navigation/locale-path.ts` - Added deterministic normalization for root/empty/query/hash/leading-slash inputs.
- `apps/petabase/src/lib/api/client.ts` - Added normalized env-backed URL construction and reusable `apiGet`/`apiPost` wrappers over `apiRequest`.
- `docs/petabase-foundation.md` - Documented canonical route groups, locale defaults, common/util ownership, and extension constraints.

## Decisions Made
- Keep locale URL construction single-source (`withLocale`) and avoid re-implementing prefix logic in hooks/routes.
- Keep API client implementation intentionally small while exposing reusable helpers for future slices.
- Enforce AGENTS.md direction by documenting that admin/internal flows remain inside `apps/petabase` route groups.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## Known Stubs

- `docs/petabase-foundation.md:39` — `auth` feature area is marked as a placeholder; intentional because concrete auth feature implementation is out of scope for this foundation plan.
- `docs/petabase-foundation.md:67` — “Auth placeholder behavior” section documents temporary guard behavior; intentional until a dedicated auth implementation phase lands.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- `PB-04` helper and documentation requirements are satisfied in code and docs.
- Petabase utility and documentation baseline is ready for follow-up feature phases.

---
*Phase: 01-initialize-petabase-next-js-app-foundation-structure-locale*
*Completed: 2026-04-15*

## Self-Check: PASSED

- FOUND: `.planning/phases/01-initialize-petabase-next-js-app-foundation-structure-locale-/01-03-SUMMARY.md`
- FOUND: `15c3358`
- FOUND: `f11a567`
