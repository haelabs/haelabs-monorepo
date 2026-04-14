# Petabase Foundation (`apps/petabase`)

## Purpose

`apps/petabase` is the staff-facing Next.js App Router application. This foundation sets route structure, locale behavior, shell primitives, and shared frontend conventions for upcoming business features.

## Routes and layout model

- Locale segment: `app/[locale]`
- Supported locales: `th` (default), `en`
- Auth route group: `app/[locale]/(auth)`
- Dashboard route group: `app/[locale]/(dashboard)`
- Admin subtree: `app/[locale]/admin`

Auth pages render without the app shell. Dashboard and admin pages render with shared shell components.

## Locale strategy

- Middleware redirects unscoped paths to a locale prefix.
- Default locale is Thai.
- Locale negotiation order:
  1. `petabase.locale` cookie
  2. `Accept-Language` header
  3. fallback to `th`
- Invalid two-letter locale paths are normalized to the preferred locale.

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

## Auth placeholder behavior

- Middleware includes coarse route protection logic for `/dashboard` and `/admin`.
- Guarding is disabled by default unless `NEXT_PUBLIC_ENABLE_AUTH_GUARD=true`.
- Public auth routes remain accessible while auth implementation is still out of scope.

## Commands

- `pnpm exec nx serve petabase`
- `pnpm exec nx build petabase`
- `pnpm exec nx lint petabase`
- `pnpm exec nx typecheck petabase`
