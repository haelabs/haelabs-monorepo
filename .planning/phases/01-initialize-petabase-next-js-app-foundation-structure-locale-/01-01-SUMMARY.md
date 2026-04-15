---
phase: 01-initialize-petabase-next-js-app-foundation-structure-locale
plan: 01
subsystem: ui
tags: [nextjs, i18n, middleware, zod, env]
requires:
  - phase: 01-initialize-petabase-next-js-app-foundation-structure-locale
    provides: locale-aware route structure and petabase app shell
provides:
  - Canonical `th`/`en` locale contracts with normalization helpers
  - Middleware locale negotiation with cookie persistence and optional auth guard gate
  - Centralized zod-based public env parsing with fail-fast invalid-value handling
affects: [petabase routing, localization, auth-guard rollout]
tech-stack:
  added: []
  patterns:
    - Canonical locale constants consumed by middleware and env validation
    - Fail-fast env schema parsing with bounded error messages
key-files:
  created: []
  modified:
    - apps/petabase/src/types/i18n.ts
    - apps/petabase/src/lib/i18n/config.ts
    - apps/petabase/middleware.ts
    - apps/petabase/src/lib/env.ts
key-decisions:
  - "Keep locale source of truth in `config.ts` and normalize locale inputs before routing decisions."
  - "Use `NEXT_PUBLIC_ENABLE_AUTH_GUARD` as a coarse toggle while keeping sign-in routes publicly reachable."
  - "Treat invalid provided env values as startup errors while defaulting only truly absent values for local build stability."
patterns-established:
  - "Middleware locale order: cookie -> Accept-Language -> default"
  - "Env schema uses zod safeParse and throws bounded validation summaries"
requirements-completed: [PB-01, PB-02]
duration: 3 min
completed: 2026-04-15
---

# Phase 01 Plan 01: Initialize petabase locale foundation summary

**Petabase now has canonical `th`/`en` locale contracts, deterministic locale-prefixed middleware routing, and centralized public env validation suitable for downstream UI composition.**

## Performance

- **Duration:** 3 min
- **Started:** 2026-04-15T10:26:32Z
- **Completed:** 2026-04-15T10:29:58Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Split i18n catalog contracts into explicit section types and kept locale config canonical.
- Hardened middleware locale negotiation, locale redirects, cookie persistence, and auth guard toggle usage.
- Centralized env validation in zod with fail-fast invalid-value handling while maintaining stable local startup defaults.

## Task Commits

Each task was committed atomically:

1. **Task 1: Stabilize locale and message contracts used across petabase** - `5fb37a5` (feat)
2. **Task 2: Harden middleware locale negotiation and auth-guard toggle boundaries** - `2e847ed` (feat)

Additional deviation fix:

3. **Post-verification env fix** - `fad6f00` (fix)

**Plan metadata:** pending

## Files Created/Modified
- `apps/petabase/src/lib/i18n/config.ts` - Locale constants and normalization strengthened.
- `apps/petabase/src/types/i18n.ts` - Message catalog broken into explicit typed sections.
- `apps/petabase/middleware.ts` - Locale negotiation/auth-guard toggle wired through validated env.
- `apps/petabase/src/lib/env.ts` - zod env schema aligned to canonical locale constants and fail-fast behavior.

## Decisions Made
- Kept supported locales fixed to `th` and `en` in one canonical module consumed by both middleware and env parsing.
- Preserved coarse auth guard as an opt-in switch and explicitly excluded sign-in route protection.
- Chose defaulting for absent env values only (not invalid values) to satisfy both fail-fast correctness and build-time execution requirements.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Build failed due strict required env parsing at compile time**
- **Found during:** Final verification (`pnpm exec nx build petabase`)
- **Issue:** The initial strict required-env change caused `next build` to fail in CI/local contexts where public env vars were absent, blocking plan completion.
- **Fix:** Updated env parsing to default only missing values while continuing to reject invalid provided values via zod.
- **Files modified:** `apps/petabase/src/lib/env.ts`
- **Verification:** `pnpm exec nx lint petabase && pnpm exec nx typecheck petabase && pnpm exec nx build petabase`
- **Committed in:** `fad6f00`

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Auto-fix removed a build blocker while preserving the plan’s fail-fast invalid configuration requirement.

## Issues Encountered
- Initial env strictness blocked production build because missing env values were treated as fatal during static page data collection; resolved by defaulting absent values only.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Locale and env foundations are deterministic and ready for downstream route/layout work.
- No blockers remain for subsequent petabase plans.

## Self-Check: PASSED

---
*Phase: 01-initialize-petabase-next-js-app-foundation-structure-locale*
*Completed: 2026-04-15*
