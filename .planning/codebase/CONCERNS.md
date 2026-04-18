# Codebase Concerns

**Analysis Date:** 2026-04-18

## Tech Debt

**Auth flow in Petabase UI:**
- Issue: Sign-in submits a simulated delay and toast message instead of calling the API.
- Files: `apps/petabase/src/features/auth/components/sign-in-form.tsx`, `apps/petabase/src/lib/api/client.ts`
- Impact: UI indicates completion without establishing a real authenticated session.
- Fix approach: Replace the placeholder submit handler with `apiPost` login call and session state handling.

**Workspace scripts for `@haelabs/types`:**
- Issue: Package scripts call `nx <target> types`, which resolves back to the same inferred Nx target and loops recursively.
- Files: `packages/types/package.json`
- Impact: `pnpm --filter @haelabs/types run build|lint|test|typecheck` does not complete.
- Fix approach: Replace recursive Nx calls with real package-level commands or define a non-recursive project target implementation.

**API health contract:**
- Issue: Health response hardcodes `database.ready: false` and `status: 'not_configured'` while returning top-level `status: 'ok'`.
- Files: `apps/api/src/health/health.service.ts`
- Impact: Health endpoint does not represent actual dependency readiness.
- Fix approach: Add real readiness probes and derive top-level status from dependency checks.

## Known Bugs

**Root test workflow enters recursive types target execution:**
- Symptoms: `pnpm test` repeatedly executes `nx run @haelabs/types:test` via `nx test types` recursion and does not finish in normal time.
- Files: `package.json`, `tools/scripts/run-target.mjs`, `packages/types/package.json`
- Trigger: Run `pnpm test` from repository root.
- Workaround: Run tests per app (`pnpm --filter @haelabs/api run test`) and skip `@haelabs/types` until scripts are corrected.

## Security Considerations

**Auth guard disabled by default:**
- Risk: Protected path checks are inactive unless `NEXT_PUBLIC_ENABLE_AUTH_GUARD` is set to `'true'`.
- Files: `apps/petabase/src/lib/env.ts`, `apps/petabase/middleware.ts`
- Current mitigation: Optional middleware guard exists behind env toggle.
- Recommendations: Enable guard in deployed environments and validate deployment config explicitly.

**Session validation only checks cookie presence:**
- Risk: Any non-empty `petabase.session` cookie passes middleware access check for protected routes.
- Files: `apps/petabase/middleware.ts`, `apps/petabase/src/lib/auth/protection.ts`
- Current mitigation: Route prefix filtering exists for `/dashboard` and `/admin`.
- Recommendations: Validate session integrity (signed token or server session lookup) before allowing access.

**Permissive CORS default:**
- Risk: Empty `CORS_ORIGINS` allows all origins through `buildCorsOriginValidator`.
- Files: `apps/api/src/main.ts`, `apps/api/src/config/env.validation.ts`
- Current mitigation: Origin format validation exists when `CORS_ORIGINS` is provided.
- Recommendations: Require non-empty allowlist in non-local environments.

## Performance Bottlenecks

**Recursive Nx script execution in `@haelabs/types`:**
- Problem: Recursive script invocation consumes runner time and stalls CI/local target execution.
- Files: `packages/types/package.json`
- Cause: Script body calls Nx target that maps back to the same script target.
- Improvement path: Replace with direct tool commands and keep Nx target one-directional.

## Fragile Areas

**Petabase middleware path rewriting and auth branching:**
- Files: `apps/petabase/middleware.ts`, `apps/petabase/src/lib/auth/protection.ts`
- Why fragile: Locale normalization, redirect logic, and optional auth guard are coupled in one file with many branch paths.
- Safe modification: Add route-behavior tests before changing matcher, locale redirects, or guard checks.
- Test coverage: No test files detected for `apps/petabase` middleware/auth logic.

## Scaling Limits

**API readiness reporting scope:**
- Current capacity: Health endpoint reports static readiness payload only.
- Limit: Endpoint does not scale to multi-dependency readiness checks in current implementation.
- Scaling path: Add dependency probes (database/cache/queue) and aggregate readiness status in `HealthService`.

## Dependencies at Risk

**Not detected:**
- Risk: No dependency deprecation or EOL risk markers are documented in repository code/docs.
- Impact: Not applicable from current code inspection.
- Migration plan: Not applicable.

## Missing Critical Features

**Production authentication flow:**
- Problem: Login UI is placeholder-only and no real credential/session exchange is implemented.
- Blocks: End-to-end sign-in and route protection hardening.

**Petabase automated tests:**
- Problem: `apps/petabase` has no test files and test script only prints a placeholder message.
- Blocks: Safe refactoring of middleware, auth routes, and i18n routing behavior.

## Test Coverage Gaps

**Petabase app coverage gap:**
- What's not tested: All web app behavior (middleware, auth UI, locale routing, API client).
- Files: `apps/petabase/package.json`, `apps/petabase/middleware.ts`, `apps/petabase/src/features/auth/components/sign-in-form.tsx`, `apps/petabase/src/lib/api/client.ts`
- Risk: Routing/auth regressions can ship without automated detection.
- Priority: High

**API middleware/logging gap:**
- What's not tested: Request logging middleware behavior and request-id propagation path in middleware layer.
- Files: `apps/api/src/common/logging/request-logger.middleware.ts`
- Risk: Observability regressions are hard to detect before runtime.
- Priority: Medium

---

*Concerns audit: 2026-04-18*
