# Petabase Foundation (`apps/petabase`)

## Purpose

`apps/petabase` is the staff-facing Next.js App Router application. This foundation sets route structure, locale behavior, shell primitives, and shared frontend conventions for upcoming business features.

## Routes and layout model

- Locale segment: `app/[locale]`
- Supported locales: `th` (default), `en`
- Auth route group: `app/[locale]/(auth)`
- Dashboard route group: `app/[locale]/(dashboard)`
- Admin subtree: `app/[locale]/admin`

### Route-group extension rules

- Keep all internal/admin flows inside `apps/petabase` route groups.
- Do not create a separate `apps/admin` app.
- New authenticated staff flows should live under `app/[locale]/(dashboard)` or `app/[locale]/admin`.
- Public sign-in/recovery flows stay under `app/[locale]/(auth)`.

Auth pages render without the app shell. Dashboard and admin pages render with shared shell components.

## Locale strategy

- Middleware redirects unscoped paths to a locale prefix.
- Default locale is Thai (`th`).
- Locale negotiation order:
  1. `petabase.locale` cookie
  2. `Accept-Language` header
  3. fallback to default locale `th`
- Invalid two-letter locale paths are normalized to the preferred locale.
- Locale path generation should use shared `withLocale` and `useLocalePath` helpers from `src/lib/navigation` and `src/hooks`.

## Source structure

- `src/app/` - App Router routes, layouts, loading, error boundaries
- `src/components/` - shell, layout, ui, feedback primitives
- `src/features/` - feature-scoped UI/composition (`auth` placeholder)
- `src/lib/` - i18n, env, api client, auth protection, utilities
- `src/hooks/` - locale/auth/toast hooks
- `src/styles/` - design tokens
- `src/types/` - app-local types
- `src/messages/` - locale message catalogs (`th`, `en`)

## Environment handling

Environment access is centralized in `src/lib/env.ts` and validated with `zod`.

Current keys:

- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_DEFAULT_LOCALE`
- `NEXT_PUBLIC_ENABLE_AUTH_GUARD`

If values are invalid, startup fails with a clear aggregated error.

## Common/util ownership and extension guidance

- `src/lib/` is the canonical home for framework-agnostic shared helpers (navigation, env, api, utilities).
- `src/hooks/` wraps shared helpers for client usage (for example `useLocalePath` over `withLocale`).
- Keep one canonical implementation per concern; avoid duplicating locale path or fetch helpers in routes/components.
- Add new shared contracts to `packages/*` only when cross-app reuse is proven. Until then, keep petabase-specific helpers in `apps/petabase/src/lib`.
- Keep API client baseline lightweight (`apiRequest` + thin method helpers) and derive base URL from validated env (`NEXT_PUBLIC_API_BASE_URL`).

## Auth placeholder behavior

- Middleware includes coarse route protection logic for `/dashboard` and `/admin`.
- Guarding is disabled by default unless `NEXT_PUBLIC_ENABLE_AUTH_GUARD=true`.
- Public auth routes remain accessible while auth implementation is still out of scope.

## Commands

Project-level commands for `petabase`:

- `pnpm exec nx serve petabase`
- `pnpm exec nx build petabase`
- `pnpm exec nx lint petabase`
- `pnpm exec nx typecheck petabase`
