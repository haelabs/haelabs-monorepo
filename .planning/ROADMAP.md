# ROADMAP

## Milestones

- ✅ **v1.0 API Foundation Baseline** — Phases 1-3 shipped 2026-04-15 ([archive](./milestones/v1.0-ROADMAP.md))

## Next

- Define next milestone scope and fresh requirements with `/gsd-new-milestone`.

### Phase 1: Initialize petabase Next.js app foundation (structure, locale, common, util)

**Goal:** Establish a production-ready `apps/petabase` foundation with locale-first routing, shared shell boundaries, and reusable common/util contracts that future features can extend without top-level rework.
**Requirements**: PB-01, PB-02, PB-03, PB-04
**Depends on:** Phase 0
**Plans:** 3 plans

Plans:
- [x] 01-01-PLAN.md — Lock locale + env + middleware contracts for deterministic app foundation behavior
- [x] 01-02-PLAN.md — Implement route-group shell architecture for auth vs dashboard/admin boundaries
- [ ] 01-03-PLAN.md — Consolidate common/util helpers and canonical petabase foundation documentation
