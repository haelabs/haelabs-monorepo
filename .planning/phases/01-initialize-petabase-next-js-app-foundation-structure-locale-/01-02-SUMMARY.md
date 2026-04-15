---
phase: 01-initialize-petabase-next-js-app-foundation-structure-locale
plan: 02
subsystem: ui
tags: [nextjs, nx, i18n, routing, shell]
requires:
  - phase: 01-initialize-petabase-next-js-app-foundation-structure-locale
    provides: locale validation + message catalog contracts from Plan 01
provides:
  - Locale layout validates locale params and eagerly resolves message catalogs.
  - Protected shell primitives share locale-aware navigation contracts.
  - Auth and dashboard shell boundaries remain explicit for future route ownership.
affects: [01-03-plan, petabase-routing, shell-foundation]
tech-stack:
  added: []
  patterns: [locale-boundary dictionary loading, route-group shell composition, locale-path helper navigation]
key-files:
  created: []
  modified:
    - apps/petabase/src/app/[locale]/layout.tsx
    - apps/petabase/src/components/shell/app-shell.tsx
    - apps/petabase/src/components/shell/app-header.tsx
    - apps/petabase/src/components/shell/app-sidebar.tsx
key-decisions:
  - "Keep locale validation in parent [locale] layout and resolve dictionaries before child route rendering."
  - "Preserve admin flow inside petabase shell routes via locale-aware helper links rather than splitting apps."
patterns-established:
  - "Shell component contracts require locale + message catalog props."
  - "Navigation hrefs are generated with withLocale() helpers instead of hardcoded locale forks."
requirements-completed: [PB-03]
duration: 6m
completed: 2026-04-15
---

# Phase 01 Plan 02: Route-group shell architecture summary

**Locale-first route boundaries now keep auth shell-free while dashboard/admin navigation stays in shared localized shell primitives.**

## Performance

- **Duration:** 6m
- **Started:** 2026-04-15T10:33:58Z
- **Completed:** 2026-04-15T10:40:52Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Kept locale gate/validation in `app/[locale]/layout.tsx` and resolved per-locale dictionaries there.
- Preserved explicit route-group ownership where auth layout remains shell-free and protected pages keep shell composition.
- Strengthened shell contracts and locale-aware navigation wiring (`dashboard`, `admin`, and `sign-in`) through message catalogs and helper paths.

## Task Commits

Each task was committed atomically:

1. **Task 1: Enforce route-group layout boundaries for auth vs dashboard/admin** - `3826cd7` (feat)
2. **Task 2: Wire shell components to locale-aware message and navigation primitives** - `dbd310a` (feat)

**Plan metadata:** Pending final docs commit

## Files Created/Modified
- `apps/petabase/src/app/[locale]/layout.tsx` - Locale boundary validates locale and eagerly loads dictionaries before child render.
- `apps/petabase/src/components/shell/app-shell.tsx` - Exposes explicit shell prop contract for locale and message catalog.
- `apps/petabase/src/components/shell/app-header.tsx` - Uses locale path helper for localized sign-in navigation.
- `apps/petabase/src/components/shell/app-sidebar.tsx` - Uses locale-aware nav primitives for dashboard/admin links from catalog labels.

## Decisions Made
- Avoided creating a separate admin app and kept admin route links in petabase shell, consistent with AGENTS.md ownership constraints.
- Kept locale layout as the canonical locale validation/dictionary resolution boundary.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Replaced request-scoped i18n context approach that broke static build**
- **Found during:** Task 2 verification (`nx build petabase`)
- **Issue:** The initial request-context propagation strategy caused prerender failures (`Locale request context has not been initialized`).
- **Fix:** Removed request-context dependency, restored stable dashboard dictionary resolution, and retained dictionary loading at the parent locale layout boundary.
- **Files modified:** `apps/petabase/src/app/[locale]/layout.tsx`, `apps/petabase/src/app/[locale]/(dashboard)/layout.tsx`, `apps/petabase/src/lib/i18n/request-context.ts`
- **Verification:** `pnpm exec nx lint petabase && pnpm exec nx typecheck petabase && pnpm exec nx build petabase`
- **Committed in:** `dbd310a`

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Blocking fix was required for successful production build; no architectural scope expansion.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Route boundaries and shell composition contracts are stable for common/util consolidation in Plan 01-03.
- Verification suite for `petabase` (lint/typecheck/build) is green.

---
*Phase: 01-initialize-petabase-next-js-app-foundation-structure-locale*
*Completed: 2026-04-15*

## Self-Check: PASSED
