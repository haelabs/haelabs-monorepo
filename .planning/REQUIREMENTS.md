# REQUIREMENTS

Active milestone requirement registry.

## Active Requirements (PB)

### PB-01
All user-facing petabase routes must resolve under a supported locale prefix (`/th` or `/en`), with middleware redirecting non-prefixed paths to a canonical locale-prefixed path.

### PB-02
Locale preference and startup config behavior must be deterministic: locale resolution order is cookie -> `Accept-Language` -> default locale, and required public env values are validated at startup with fail-fast behavior on invalid input.

### PB-03
Petabase route architecture must separate auth flows from internal flows via route groups: auth pages render without dashboard shell chrome, while dashboard/admin pages share a locale-aware shell and localized messaging.

### PB-04
Petabase foundation must expose shared common/util building blocks and canonical extension docs: reusable locale-path helpers, baseline utility/API helpers, and a maintainer-facing foundation document aligned to workspace conventions.

## Phase Traceability Map

| Requirement ID | Plan Reference | Evidence Source Type | Notes |
| --- | --- | --- | --- |
| PB-01 | `.planning/phases/01-initialize-petabase-next-js-app-foundation-structure-locale-/01-01-PLAN.md` | Code artifacts | Locale constants, middleware matcher/redirect behavior, locale normalization helpers |
| PB-02 | `.planning/phases/01-initialize-petabase-next-js-app-foundation-structure-locale-/01-01-PLAN.md` | Code artifacts | Cookie/header/default locale precedence and zod-backed env validation/fail-fast behavior |
| PB-03 | `.planning/phases/01-initialize-petabase-next-js-app-foundation-structure-locale-/01-02-PLAN.md` | Code artifacts | `(auth)` and `(dashboard)` layout boundaries plus shared shell/message wiring |
| PB-04 | `.planning/phases/01-initialize-petabase-next-js-app-foundation-structure-locale-/01-03-PLAN.md` | Code + docs | Shared helpers in `src/lib` and canonical guidance in `docs/petabase-foundation.md` |

## Archive Boundary

Historical milestone requirements (`R1..R22`) remain archived in `.planning/milestones/v1.0-REQUIREMENTS.md` and are not the active requirement registry for this milestone.
