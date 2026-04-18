# Roadmap: Petabase - Veterinary PIMS MVP

## Overview

This roadmap delivers Petabase MVP as a dependency-ordered set of clinic operations capabilities: secure access and org setup first, then patient records, scheduling, consultation workflows, and finally billing plus full responsive bilingual API-integrated readiness.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [ ] **Phase 1: Access Control & Clinic Setup** - Clinics can onboard organizations, branches, and staff with scoped secure access.
- [ ] **Phase 2: Patient & Owner Records** - Staff can maintain searchable patient-owner records and clinical history context.
- [ ] **Phase 3: Appointment Scheduling & Calendar** - Staff can run reliable scheduling workflows with lifecycle control and conflict prevention.
- [ ] **Phase 4: Consultation & SOAP Documentation** - Staff can capture clinical encounters and prescriptions with printable records.
- [ ] **Phase 5: Billing, Localization & Integrated MVP Readiness** - Staff can complete financial workflows in a responsive bilingual app using production APIs.

## Phase Details

### Phase 1: Access Control & Clinic Setup
**Goal**: Clinics can securely establish organization structure and role-scoped staff access.
**Depends on**: Nothing (first phase)
**Requirements**: AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, ORG-01, ORG-02, ORG-03, ORG-04
**Success Criteria** (what must be TRUE):
  1. Admin can sign up, log in, and recover account access through password reset.
  2. Admin can create/update organization profile and manage one or more branches.
  3. Admin can invite staff users and activate/deactivate staff accounts.
  4. Staff can only access actions allowed by their assigned role (Admin, Doctor, Nurse, Receptionist).
  5. Staff can only access data and actions within their authorized organization/branch scope.
**Plans**: TBD
**UI hint**: yes

### Phase 2: Patient & Owner Records
**Goal**: Staff can manage complete patient-owner records needed for downstream clinical workflows.
**Depends on**: Phase 1
**Requirements**: PATO-01, PATO-02, PATO-03, PATO-04, PATO-05
**Success Criteria** (what must be TRUE):
  1. Staff can create, update, and search patient records.
  2. Staff can create, update, and search owner records.
  3. Staff can link one owner to multiple pets and view those relationships clearly.
  4. Staff can upload/view patient profile photos and review timeline-based medical history with attached documents.
**Plans**: TBD
**UI hint**: yes

### Phase 3: Appointment Scheduling & Calendar
**Goal**: Staff can reliably schedule and manage appointments without provider slot conflicts.
**Depends on**: Phase 2
**Requirements**: APPT-01, APPT-02, APPT-03, APPT-04
**Success Criteria** (what must be TRUE):
  1. Staff can create, reschedule, and cancel appointments.
  2. Staff can move appointments through the defined lifecycle statuses.
  3. Staff can view appointments in day/week/month calendar and list views with filters.
  4. When staff attempt to book the same doctor in the same time slot, the system blocks the conflict and preserves existing booking integrity.
**Plans**: TBD
**UI hint**: yes

### Phase 4: Consultation & SOAP Documentation
**Goal**: Staff can record complete consultation encounters linked to patient history and care instructions.
**Depends on**: Phase 3
**Requirements**: SOAP-01, SOAP-02, SOAP-03, SOAP-04, SOAP-05
**Success Criteria** (what must be TRUE):
  1. Staff can start a consultation from either an appointment or a patient profile.
  2. Staff can record complete SOAP notes (Subjective, Objective, Assessment, Plan).
  3. Staff can create prescriptions with medication, dosage, frequency, and duration.
  4. Staff can review a patient’s consultation history.
  5. Staff can print consultation records in a print-friendly format.
**Plans**: TBD
**UI hint**: yes

### Phase 5: Billing, Localization & Integrated MVP Readiness
**Goal**: Staff can complete billing/payment workflows and operate all v1 workflows in responsive bilingual production-integrated mode.
**Depends on**: Phase 4
**Requirements**: BILL-01, BILL-02, BILL-03, BILL-04, BILL-05, UX-01, UX-02, UX-03
**Success Criteria** (what must be TRUE):
  1. Staff can create invoices from consultations or manually, including line items, discounts, and taxes.
  2. Staff can record full or partial payments and see invoice status changes (draft, sent, paid, overdue).
  3. Staff can view daily, weekly, and monthly revenue summaries.
  4. Staff can complete all v1 workflows on mobile and desktop responsive layouts in Thai and English.
  5. Staff can run all v1 UI modules against production API data without mock-only workflow paths.
**Plans**: TBD
**UI hint**: yes

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Access Control & Clinic Setup | 0/TBD | Not started | - |
| 2. Patient & Owner Records | 0/TBD | Not started | - |
| 3. Appointment Scheduling & Calendar | 0/TBD | Not started | - |
| 4. Consultation & SOAP Documentation | 0/TBD | Not started | - |
| 5. Billing, Localization & Integrated MVP Readiness | 0/TBD | Not started | - |
