---
phase: 01-initialize-petabase-next-js-app-foundation-structure-locale
verified: 2026-04-15T11:07:37Z
status: passed
score: 10/10 must-haves verified
overrides_applied: 0
re_verification:
  previous_status: gaps_found
  previous_score: 9/10
  gaps_closed:
    - "Requirement IDs from phase plans (PB-01..PB-04) are defined in REQUIREMENTS.md and can be cross-referenced to full requirement descriptions."
  gaps_remaining: []
  regressions: []
---

# Phase 1: Initialize petabase Next.js app foundation (structure, locale, common, util) Verification Report

**Phase Goal:** Establish a production-ready `apps/petabase` foundation with locale-first routing, shared shell boundaries, and reusable common/util contracts that future features can extend without top-level rework.
**Verified:** 2026-04-15T11:07:37Z
**Status:** passed
**Re-verification:** Yes — after gap closure

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
| --- | --- | --- | --- |
| 1 | Users are always routed under a supported locale prefix (`/th` or `/en`). | ✓ VERIFIED | `middleware.ts` redirects root and non-locale paths to `/${preferredLocale}` and sets matcher `'/((?!_next|api|favicon.ico|.*\\..*).*)'`; locale config is canonical in `src/lib/i18n/config.ts`. |
| 2 | Locale preference persists via cookie and falls back deterministically when absent. | ✓ VERIFIED | `getPreferredLocale()` uses cookie → `Accept-Language` → `DEFAULT_LOCALE`; middleware persists `petabase.locale` cookie on redirects and pass-through responses (`middleware.ts:14-46,72-74,82-84,102-104`). |
| 3 | Petabase startup fails fast when required public env values are invalid. | ✓ VERIFIED | `src/lib/env.ts` validates with zod `safeParse` and throws aggregated error when invalid (`lines 35-38`), preventing silent invalid config startup. |
| 4 | Auth pages render without dashboard shell chrome. | ✓ VERIFIED | `src/app/[locale]/(auth)/layout.tsx` renders `children` within `<main>` and does not import or render `AppShell`. |
| 5 | Dashboard/admin pages render with a shared locale-aware shell. | ✓ VERIFIED | Both `src/app/[locale]/(dashboard)/layout.tsx` and `src/app/[locale]/admin/layout.tsx` call `getMessages(ensureLocale(...))` then render `<AppShell locale={locale} messages={messages}>`. |
| 6 | Localized text labels render from message catalogs (no hardcoded locale forks in layout files). | ✓ VERIFIED | `src/lib/i18n/dictionaries.ts` loads `messages/en.ts` and `messages/th.ts`; shell components render `messages.common.*` and `messages.nav.*` labels. |
| 7 | Locale-aware link generation is reusable from both server and client helpers. | ✓ VERIFIED | `withLocale()` is defined in `src/lib/navigation/locale-path.ts`, used by `app-header.tsx`/`app-sidebar.tsx`, and wrapped by `useLocalePath()` in `src/hooks/use-locale-path.ts`. |
| 8 | Core utility helpers exist for class composition and baseline API client usage. | ✓ VERIFIED | `classNames(...values)` exists in `src/lib/utils/classnames.ts`; `apiRequest/apiGet/apiPost` in `src/lib/api/client.ts` are typed and env-backed via `env.NEXT_PUBLIC_API_BASE_URL`. |
| 9 | Contributors can follow one canonical doc to extend petabase structure safely. | ✓ VERIFIED | `docs/petabase-foundation.md` includes route-group model, locale strategy, env keys, ownership boundaries, and standard petabase commands. |
| 10 | Requirement IDs from plans (PB-01..PB-04) are cross-referenced against REQUIREMENTS.md with full descriptions. | ✓ VERIFIED | `.planning/REQUIREMENTS.md` now exists with PB-01..PB-04 definitions and a phase traceability map linking each ID to plans `01-01/01-02/01-03`; plan frontmatter IDs match registry entries. |

**Score:** 10/10 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
| --- | --- | --- | --- |
| `apps/petabase/src/lib/i18n/config.ts` | Canonical locale constants/types/helpers | ✓ VERIFIED | Exists, substantive, wired via imports in middleware/env/locale helpers. |
| `apps/petabase/middleware.ts` | Locale negotiation + optional auth-guard routing | ✓ VERIFIED | Exists, substantive, framework-wired (`middleware.ts` + `config.matcher`). |
| `apps/petabase/src/lib/env.ts` | Centralized zod-validated env contract | ✓ VERIFIED | Exists, substantive parse+throw behavior, wired into app and middleware. |
| `apps/petabase/src/app/[locale]/(auth)/layout.tsx` | Auth-only layout boundary | ✓ VERIFIED | Exists and shell-free; route-group wired by Next App Router convention. |
| `apps/petabase/src/app/[locale]/(dashboard)/layout.tsx` | Dashboard shell layout boundary | ✓ VERIFIED | Exists/substantive and imports/uses `AppShell`. |
| `apps/petabase/src/components/shell/app-shell.tsx` | Shared shell composition | ✓ VERIFIED | Exists/substantive and consumed by dashboard/admin layouts. |
| `apps/petabase/src/lib/navigation/locale-path.ts` | Canonical locale-prefixed path builder | ✓ VERIFIED | Exists/substantive and imported by hook/header/sidebar. |
| `apps/petabase/src/lib/api/client.ts` | Typed API client foundation tied to env | ✓ VERIFIED | Exists/substantive and linked to validated env contract (`createApiUrl` uses `env.NEXT_PUBLIC_API_BASE_URL`). |
| `docs/petabase-foundation.md` | Canonical petabase conventions doc | ✓ VERIFIED | Exists/substantive with required guidance and commands. |
| `.planning/REQUIREMENTS.md` | Active PB requirement registry + plan traceability | ✓ VERIFIED | Exists/substantive; defines PB-01..PB-04 and maps each ID to phase plans 01-01/01-02/01-03. |

### Key Link Verification

| From | To | Via | Status | Details |
| --- | --- | --- | --- | --- |
| `apps/petabase/middleware.ts` | `apps/petabase/src/lib/i18n/config.ts` | locale constants import | ✓ WIRED | gsd-tools verified pattern in source. |
| `apps/petabase/src/lib/i18n/locale.ts` | `apps/petabase/src/lib/i18n/config.ts` | normalizeLocale delegation | ✓ WIRED | `ensureLocale()` delegates to `normalizeLocale()`. |
| `apps/petabase/src/lib/env.ts` | `apps/petabase/src/lib/i18n/config.ts` | locale enum constants in schema | ✓ WIRED | `z.enum(LOCALES)` and `DEFAULT_LOCALE` defaulting. |
| `app/[locale]/(dashboard)/layout.tsx` | `components/shell/app-shell.tsx` | layout composition import | ✓ WIRED | Manual verification: import + render of `AppShell` present. (gsd-tools false negative due non-root-relative `from` path in plan metadata). |
| `app/[locale]/layout.tsx` | `src/messages/*.ts` | dictionary loading | ✓ WIRED | Manual verification: `[locale]/layout.tsx` calls `getMessages(locale)`, and `dictionaries.ts` imports `messages/en` + `messages/th`. |
| `apps/petabase/src/hooks/use-locale-path.ts` | `apps/petabase/src/lib/navigation/locale-path.ts` | hook wrapper around `withLocale` | ✓ WIRED | gsd-tools verified pattern; direct import + delegation. |
| `apps/petabase/src/lib/api/client.ts` | `apps/petabase/src/lib/env.ts` | API base URL selection | ✓ WIRED | `createApiUrl()` uses `env.NEXT_PUBLIC_API_BASE_URL`. |
| `01-01/01-02/01-03 plan frontmatter` | `.planning/REQUIREMENTS.md` | PB ID traceability | ✓ WIRED | gsd-tools on `01-04-PLAN.md` key links: all three references verified (`Pattern found in source`). |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
| --- | --- | --- | --- | --- |
| `src/app/[locale]/layout.tsx` | `locale` / `getMessages(locale)` | route params -> `isLocale` -> dictionaries | Yes (`messages/en.ts` and `messages/th.ts` contain non-empty catalogs) | ✓ FLOWING |
| `src/app/[locale]/(dashboard)/layout.tsx` | `messages` | `getMessages(ensureLocale(params.locale))` | Yes | ✓ FLOWING |
| `src/components/shell/app-shell.tsx` | `messages` prop used by header/sidebar | Prop passed from dashboard/admin layouts | Yes (labels rendered from catalog fields) | ✓ FLOWING |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
| --- | --- | --- | --- |
| Petabase foundation compiles with current contracts | `pnpm exec nx typecheck petabase` | Success (Nx cached pass) | ✓ PASS |
| Production build works with locale/layout/shell wiring | `pnpm exec nx build petabase` | Success; static routes generated for `/th` and `/en` | ✓ PASS |
| PB requirement IDs are resolvable between plans and active registry | `rg -n "requirements...PB-01..PB-04|^### PB-01..PB-04" <plans + REQUIREMENTS.md>` | IDs found in all 3 plans and all 4 PB sections in `.planning/REQUIREMENTS.md` | ✓ PASS |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
| --- | --- | --- | --- | --- |
| PB-01 | 01-01-PLAN.md | All user-facing routes resolve under supported locale prefix with canonical redirect behavior. | ✓ SATISFIED | `middleware.ts` performs locale-prefix redirection and matcher gating; locale constants (`th`, `en`) from `i18n/config.ts`; requirement text present in `.planning/REQUIREMENTS.md`. |
| PB-02 | 01-01-PLAN.md | Deterministic locale preference + fail-fast startup config validation. | ✓ SATISFIED | `getPreferredLocale()` order is cookie → header → default; `env.ts` throws on invalid values; PB-02 definition present in `.planning/REQUIREMENTS.md`. |
| PB-03 | 01-02-PLAN.md | Auth flows are shell-free while dashboard/admin flows share locale-aware shell and localized messaging. | ✓ SATISFIED | `(auth)/layout.tsx` is shell-free; `(dashboard)/layout.tsx` and `admin/layout.tsx` compose `AppShell` with locale/messages; PB-03 definition in active registry. |
| PB-04 | 01-03-PLAN.md | Shared helpers and canonical extension docs exist for future work. | ✓ SATISFIED | `withLocale/useLocalePath`, `classNames`, env-backed `api/client.ts`, and `docs/petabase-foundation.md` are present and substantive; PB-04 definition in `.planning/REQUIREMENTS.md`. |

Orphaned requirements check: **none found** for Phase 1 PB scope (active registry is PB-01..PB-04 and all are claimed by Phase 1 plans).

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
| --- | --- | --- | --- | --- |
| `apps/petabase/src/features/auth/components/sign-in-form.tsx` | 25 | "Auth placeholder complete. Wire API login next." | ⚠️ Warning | Auth submit path is intentionally placeholder; does not block this foundation phase but is not production auth behavior. |
| `docs/petabase-foundation.md` | 39, 67 | Placeholder sections documented for auth | ℹ️ Info | Explicitly documented out-of-scope placeholder behavior for future auth phase. |

### Gaps Summary

No blocking gaps remain. The prior re-verification blocker is closed: `.planning/REQUIREMENTS.md` exists, PB-01..PB-04 are canonically defined, and requirement IDs in plans 01-01/01-02/01-03 trace cleanly to both requirement text and implementation evidence.

---

_Verified: 2026-04-15T11:07:37Z_  
_Verifier: the agent (gsd-verifier)_
