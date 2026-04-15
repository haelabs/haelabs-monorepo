# PROJECT

## What This Is

A monorepo-first backend platform foundation centered on `apps/api`, designed so future product/domain modules can be added without reworking top-level architecture or API conventions.

## Core Value

Deliver a stable, extension-ready API baseline where routing, contracts, config, health checks, and contributor handoff are predictable and documented.

## Current State

- Shipped **v1.0 API Foundation Baseline** on 2026-04-15.
- `apps/api` is operational with `/api/v1` conventions, standardized envelopes, fail-fast env validation, and public health readiness endpoint.
- Quality gates validated in milestone work (`build`, `lint`, `test`) with contract coverage for health and response normalization behavior.
- Canonical backend foundation documentation now lives in `docs/api-foundation.md` with entry-point cross-links.

## Next Milestone Goals

- Define fresh requirements for next domain-focused milestone via `/gsd-new-milestone`.
- Preserve boundary direction `apps -> packages` while introducing reusable contracts/types in `packages/*`.
- Add first business-domain modules under `apps/api/src/modules/*` without breaking v1.0 contracts.

## Constraints

- Keep setup MVP-first; avoid premature over-segmentation.
- Keep database ownership in `apps/api` until cross-app reuse is proven.
- Do not introduce secrets into tracked files.

---
*Last updated: 2026-04-15 after v1.0 milestone completion*
