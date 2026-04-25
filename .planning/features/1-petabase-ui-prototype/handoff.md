# Feature Handoff: Petabase UI Prototype (Mock Data Only)

## Snapshot

- Slug: `1-petabase-ui-prototype`
- Status: `ready_for_handoff`
- Updated: `2026-04-25`

## Summary

`apps/petabase` now contains a connected mock-data prototype for auth, dashboard, patients, appointments, consultations, billing, and admin/org management inside the existing locale-aware Calm Ops shell. The next builder should treat this as a validated UI-only foundation and focus on either refining the seed data or deciding which flows to harden with real tests and later backend wiring.

## Build Sequence

1. Review the implemented prototype routes under `apps/petabase` against `brief.md` and `plan.md` to confirm the handoff scope matches the shipped mock flows.
2. Choose the next execution track: dataset/content refinement, targeted UX polish, or production-enablement planning for real integrations.
3. If continuing implementation, preserve mock-first behavior and existing locale-aware routing while adding only the next approved slice.

## Validation Checklist

- `pnpm --filter @haelabs/petabase run lint`
- `pnpm --filter @haelabs/petabase run typecheck`
- `pnpm --filter @haelabs/petabase run test` *(placeholder script; currently prints `No tests yet for apps/petabase`)*
- `pnpm --filter @haelabs/petabase run build`
- Smoke check locale routing, shell navigation, and consultation/invoice print views

## Blockers

- None

## Next Recommended Step

- Decide whether the next slice is (a) seed-data refinement for demos or (b) adding real frontend test coverage for the highest-value prototype flows before any backend integration work.
