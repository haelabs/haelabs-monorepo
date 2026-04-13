# Requirements: haelabs-monorepo

**Defined:** 2026-04-13
**Core Value:** Provide a clean, MVP-friendly monorepo foundation that lets future product work start quickly without later restructuring the repository.

## v1 Requirements

### Workspace Foundation

- [ ] **WS-01**: Repository initializes as an Nx workspace configured for pnpm
- [ ] **WS-02**: Root contains valid workspace config files for package management, Nx, and TypeScript
- [ ] **WS-03**: Top-level `apps/`, `packages/`, `docs/`, and `tools/` directories exist or are explicitly documented
- [ ] **WS-04**: Root scripts exist for build, lint, test, and typecheck and run cleanly in an empty foundation state

### Structure and Conventions

- [ ] **STR-01**: Repository documents naming and placement conventions for deployable apps and shared packages
- [ ] **STR-02**: Workspace discovery includes application and package directories
- [ ] **STR-03**: Documentation reserves `apps/petabase` and `apps/api`, and optionally `apps/pawscroll`, without creating `apps/admin`
- [ ] **STR-04**: Dependency direction is documented as `apps -> shared/domain packages -> config/util packages`
- [ ] **STR-05**: Shared contracts and types are defined to live in `packages/*` rather than being duplicated in apps

### Developer Guidance

- [ ] **DOC-01**: Repository includes developer-facing monorepo structure documentation
- [ ] **DOC-02**: Documentation explains how future apps and packages should be added
- [ ] **DOC-03**: Documentation keeps the setup MVP-friendly and warns against premature complexity

## v2 Requirements

### Governance

- **GOV-01**: Enforce Nx module boundary tags once multiple real apps and domain packages exist
- **GOV-02**: Scaffold starter shared config packages when a real consumer exists
- **GOV-03**: Add CI workflows once projects with real targets have been introduced

## Out of Scope

| Feature | Reason |
|---------|--------|
| Separate `apps/admin` app | Approved direction is to keep internal/admin flows inside `petabase` |
| Business endpoints or product UI | This issue is monorepo foundation only |
| Shared database package extraction | DB ownership should stay in `apps/api` until reuse is justified |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| WS-01 | Phase 1 | Complete |
| WS-02 | Phase 1 | Complete |
| WS-03 | Phase 1 | Complete |
| WS-04 | Phase 1 | Complete |
| STR-01 | Phase 2 | Pending |
| STR-02 | Phase 1 | Complete |
| STR-03 | Phase 2 | Pending |
| STR-04 | Phase 2 | Pending |
| STR-05 | Phase 2 | Pending |
| DOC-01 | Phase 1 | Complete |
| DOC-02 | Phase 2 | Pending |
| DOC-03 | Phase 2 | Pending |

**Coverage:**
- v1 requirements: 12 total
- Mapped to phases: 12
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-13*
*Last updated: 2026-04-13 after Phase 1*
