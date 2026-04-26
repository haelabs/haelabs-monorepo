'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

import { AnimatedCounter } from '@petabase/components/ui/animated-counter';
import { Button } from '@petabase/components/ui/button';
import { Badge } from '@petabase/components/ui/badge';
import { Card } from '@petabase/components/ui/card';
import { Input } from '@petabase/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@petabase/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@petabase/components/ui/tabs';
import { Textarea } from '@petabase/components/ui/textarea';
import { useToast } from '@petabase/components/ui/toast-provider';
import type { AppLocale } from '@petabase/lib/i18n/config';
import { withLocale } from '@petabase/lib/navigation/locale-path';
import {
  appointments,
  branches,
  consultations,
  getBranch,
  getInvoice,
  getInvoiceTotals,
  getOwner,
  getOwnerPets,
  getPatient,
  getStaff,
  invoices,
  owners,
  patients,
  staffMembers,
  type AppointmentStatus,
  type InvoiceStatus,
  type Owner,
  type PaymentMethod,
  type StaffMember,
  type StaffRole,
} from '@petabase/features/prototype/mock-data';
import {
  AlertTriangle,
  Banknote,
  FileText,
  Search,
  Syringe,
} from 'lucide-react';

function formatCurrency(value: number, locale: AppLocale) {
  return new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDateTime(value: string, locale: AppLocale) {
  return new Intl.DateTimeFormat(locale === 'th' ? 'th-TH' : 'en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function statusLabel(status: string, locale: AppLocale) {
  const isThai = locale === 'th';
  const labels: Record<string, string> = {
    scheduled: isThai ? 'นัดไว้' : 'Scheduled',
    confirmed: isThai ? 'ยืนยันแล้ว' : 'Confirmed',
    'in-progress': isThai ? 'กำลังดำเนินการ' : 'In progress',
    completed: isThai ? 'เสร็จสิ้น' : 'Completed',
    cancelled: isThai ? 'ยกเลิก' : 'Cancelled',
    'no-show': isThai ? 'ไม่มาตามนัด' : 'No-show',
    draft: isThai ? 'ร่าง' : 'Draft',
    sent: isThai ? 'ส่งแล้ว' : 'Sent',
    paid: isThai ? 'ชำระแล้ว' : 'Paid',
    overdue: isThai ? 'เกินกำหนด' : 'Overdue',
  };

  return labels[status] ?? status;
}

export function PrototypePatientsPage({ locale }: { locale: AppLocale }) {
  const isThai = locale === 'th';
  const { push } = useToast();
  const [search, setSearch] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState<'all' | 'Dog' | 'Cat' | 'Rabbit'>('all');
  const [selectedOwnerId, setSelectedOwnerId] = useState(owners[0]?.id ?? '');
  const selectedOwner = owners.find((owner) => owner.id === selectedOwnerId) ?? owners[0];
  const [ownerDraft, setOwnerDraft] = useState<Owner>(selectedOwner);

  useEffect(() => {
    if (selectedOwner) {
      setOwnerDraft(selectedOwner);
    }
  }, [selectedOwner]);

  const filteredPatients = patients.filter((patient) => {
    const owner = getOwner(patient.ownerId);
    const matchesSearch = [patient.name, patient.breed, owner?.name ?? '']
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesSpecies = speciesFilter === 'all' || patient.species === speciesFilter;

    return matchesSearch && matchesSpecies;
  });

  function saveOwner() {
    push(
      isThai
        ? `บันทึกข้อมูลเจ้าของ ${ownerDraft.name} ในโหมดต้นแบบแล้ว`
        : `Saved owner profile for ${ownerDraft.name} in prototype mode.`,
    );
  }

  function createOwner() {
    setOwnerDraft({
      id: 'owner-new',
      name: isThai ? 'เจ้าของใหม่' : 'New owner',
      phone: '',
      email: '',
      lineId: '',
      branchId: branches[0]?.id ?? 'bangkok-hq',
      address: '',
      notes: '',
    });
    push(isThai ? 'เปิดฟอร์มสร้างเจ้าของใหม่แล้ว' : 'Opened new owner form.');
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Card className="grid gap-4 border-[var(--pb-color-border-soft)] bg-[linear-gradient(145deg,rgb(255_255_255/0.98)_0%,rgb(248_251_255/1)_100%)] p-5 md:grid-cols-[1.4fr_minmax(240px,0.6fr)] md:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--pb-color-label)]">
              Patients + Owners
            </p>
            <h2 className="mt-1 text-[clamp(1.4rem,2.4vw,1.8rem)] font-light leading-tight tracking-[-0.02em] text-[var(--pb-color-heading)]">
              {isThai ? 'ค้นหาเวชระเบียน ดูประวัติ และจัดการเจ้าของสัตว์เลี้ยง' : 'Search patient records, review history, and manage owners'}
            </h2>
            <p className="mt-2 text-sm text-[var(--pb-color-body)]">
              {isThai
                ? 'หน้าเดียวสำหรับค้นหาคนไข้ เชื่อมเจ้าของ ดูประวัติการรักษา และเตรียมทางลัดไปยังนัดหมายหรือ SOAP note'
                : 'A single workspace for patient search, owner linkage, care history, and quick jumps into appointments or SOAP notes.'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 rounded-[var(--pb-radius-lg)] border border-[var(--pb-color-border)] bg-[var(--pb-color-surface-card)] p-3 shadow-[var(--pb-elevation-1)]">
            <div className="grid gap-1">
              <p className="text-xs font-medium uppercase tracking-[0.06em] text-[var(--pb-color-body)]">
                {isThai ? 'คนไข้ทั้งหมด' : 'Total patients'}
              </p>
              <p className="text-[clamp(1.5rem,3vw,1.8rem)] font-semibold leading-none tracking-[-0.02em] text-[var(--pb-color-heading)]">
                <AnimatedCounter value={patients.length} locale={locale} />
              </p>
            </div>
            <div className="grid gap-1 border-l border-[var(--pb-color-border)] pl-3">
              <p className="text-xs font-medium uppercase tracking-[0.06em] text-[var(--pb-color-body)]">
                {isThai ? 'เจ้าของที่เชื่อมแล้ว' : 'Linked owners'}
              </p>
              <p className="text-[clamp(1.5rem,3vw,1.8rem)] font-semibold leading-none tracking-[-0.02em] text-[var(--pb-color-heading)]">
                <AnimatedCounter value={owners.length} locale={locale} />
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.section
        className="grid gap-4 sm:grid-cols-2"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.06 }}
      >
        <Card className="grid gap-2">
          <div className="flex size-9 items-center justify-center rounded-[var(--pb-radius-md)] bg-[var(--pb-color-warning-soft)]">
            <Syringe className="size-4 text-[var(--pb-color-warning)]" />
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.06em] text-[var(--pb-color-body)]">
            {isThai ? 'เตือนวัคซีน' : 'Vaccination reminders'}
          </p>
          <p className="text-[clamp(1.6rem,3vw,2rem)] font-semibold leading-none tracking-[-0.02em] text-[var(--pb-color-heading)]">
            <AnimatedCounter value={2} locale={locale} />
          </p>
          <p className="text-xs text-[var(--pb-color-body)]">
            {isThai ? 'ภายใน 7 วัน' : 'Due within 7 days'}
          </p>
        </Card>
        <Card className="grid gap-2">
          <div className="flex size-9 items-center justify-center rounded-[var(--pb-radius-md)] bg-[var(--pb-color-info-soft)]">
            <FileText className="size-4 text-[var(--pb-color-info)]" />
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.06em] text-[var(--pb-color-body)]">
            {isThai ? 'เอกสารล่าสุด' : 'Recent documents'}
          </p>
          <p className="text-[clamp(1.6rem,3vw,2rem)] font-semibold leading-none tracking-[-0.02em] text-[var(--pb-color-heading)]">
            <AnimatedCounter value={4} locale={locale} />
          </p>
          <p className="text-xs text-[var(--pb-color-body)]">
            {isThai ? 'พร้อมดูจากโปรไฟล์คนไข้' : 'Accessible from patient profiles'}
          </p>
        </Card>
      </motion.section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-[var(--pb-color-heading)]">
                {isThai ? 'รายชื่อคนไข้' : 'Patient list'}
              </p>
              <p className="text-xs text-[var(--pb-color-body)]">
                {isThai ? 'ค้นหาตามชื่อ สายพันธุ์ หรือเจ้าของ' : 'Search by patient, breed, or owner'}
              </p>
            </div>
          </div>
          <div className="mb-3 grid gap-2.5 sm:grid-cols-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--pb-color-body)]" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={isThai ? 'ค้นหาคนไข้หรือเจ้าของ' : 'Search patient or owner'}
                className="pl-9"
              />
            </div>
            <Select
              value={speciesFilter}
              onValueChange={(value) => setSpeciesFilter(value as 'all' | 'Dog' | 'Cat' | 'Rabbit')}
            >
              <SelectTrigger>
                <SelectValue placeholder={isThai ? 'เลือกชนิดสัตว์' : 'Select species'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isThai ? 'ทุกประเภท' : 'All species'}</SelectItem>
                <SelectItem value="Dog">Dog</SelectItem>
                <SelectItem value="Cat">Cat</SelectItem>
                <SelectItem value="Rabbit">Rabbit</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full overflow-x-auto rounded-[var(--pb-radius-md)] border border-[var(--pb-color-border)] bg-white shadow-[var(--pb-shadow-ambient)]">
            <table className="w-full border-collapse min-w-[680px]">
              <thead className="bg-[var(--pb-color-bg-soft)]">
                <tr>
                  <th className="px-3 py-2.5 text-left text-[13px] font-normal text-[var(--pb-color-label)]">{isThai ? 'คนไข้' : 'Patient'}</th>
                  <th className="px-3 py-2.5 text-left text-[13px] font-normal text-[var(--pb-color-label)]">{isThai ? 'เจ้าของ' : 'Owner'}</th>
                  <th className="px-3 py-2.5 text-left text-[13px] font-normal text-[var(--pb-color-label)]">{isThai ? 'สาขา' : 'Branch'}</th>
                  <th className="px-3 py-2.5 text-left text-[13px] font-normal text-[var(--pb-color-label)]">{isThai ? 'นัดถัดไป' : 'Next visit'}</th>
                  <th className="px-3 py-2.5 text-left text-[13px] font-normal text-[var(--pb-color-label)]">{isThai ? 'การแจ้งเตือน' : 'Alerts'}</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient, i) => {
                  const owner = getOwner(patient.ownerId);
                  const branch = getBranch(patient.branchId);
                  return (
                    <motion.tr
                      key={patient.id}
                      className="border-b border-[var(--pb-color-border)] transition-colors duration-150 last:border-b-0 hover:bg-[rgb(246_249_252/70%)]"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                    >
                      <td className="px-3 py-2.5 text-sm font-light text-[var(--pb-color-heading)]" data-label={isThai ? 'คนไข้' : 'Patient'}>
                        <Link className="font-medium text-[var(--pb-color-primary)] hover:text-[var(--pb-color-primary-deep)]" href={withLocale(locale, `/patients/${patient.id}`)}>
                          {patient.name}
                        </Link>
                        <span className="mt-0.5 block text-xs text-[var(--pb-color-body)]">{patient.species} · {patient.breed}</span>
                      </td>
                      <td className="px-3 py-2.5 text-sm font-light text-[var(--pb-color-heading)]" data-label={isThai ? 'เจ้าของ' : 'Owner'}>{owner?.name}</td>
                      <td className="px-3 py-2.5 text-sm font-light text-[var(--pb-color-heading)]" data-label={isThai ? 'สาขา' : 'Branch'}>{branch?.name}</td>
                      <td className="px-3 py-2.5 text-sm font-light text-[var(--pb-color-heading)]" data-label={isThai ? 'นัดถัดไป' : 'Next visit'}>{formatDateTime(patient.nextVisit, locale)}</td>
                      <td className="px-3 py-2.5 text-sm font-light" data-label={isThai ? 'การแจ้งเตือน' : 'Alerts'}>
                        <div className="flex flex-wrap gap-1.5">
                          {patient.tags.map((tag) => (
                            <Badge key={tag}>{tag}</Badge>
                          ))}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <header className="grid gap-1.5 pb-3">
            <h2 className="text-lg font-light tracking-[-0.01em] text-[var(--pb-color-heading)]">
              {isThai ? 'จัดการเจ้าของสัตว์เลี้ยง' : 'Owner CRUD prototype'}
            </h2>
            <p className="text-sm text-[var(--pb-color-body)]">
              {isThai
                ? 'แก้ไขข้อมูลติดต่อ ผูกสัตว์เลี้ยงในบัญชีเดียว และจำลองการสร้างเจ้าของใหม่'
                : 'Edit contact details, review linked pets, and simulate creating a new owner.'}
            </p>
          </header>
          <div className="mb-3 grid gap-2.5 sm:grid-cols-2">
            <Select value={selectedOwnerId} onValueChange={setSelectedOwnerId}>
              <SelectTrigger>
                <SelectValue placeholder={isThai ? 'เลือกเจ้าของ' : 'Select owner'} />
              </SelectTrigger>
              <SelectContent>
                {owners.map((owner) => (
                  <SelectItem key={owner.id} value={owner.id}>{owner.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="button" variant="ghost" onClick={createOwner}>{isThai ? 'สร้างเจ้าของใหม่' : 'New owner'}</Button>
          </div>
          <form className="grid gap-3 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
            <div className="grid gap-1.5">
              <label className="text-sm font-medium text-[var(--pb-color-label)]" htmlFor="owner-name">{isThai ? 'ชื่อเจ้าของ' : 'Owner name'}</label>
              <Input id="owner-name" value={ownerDraft.name} onChange={(event) => setOwnerDraft({ ...ownerDraft, name: event.target.value })} />
            </div>
            <div className="grid gap-1.5">
              <label className="text-sm font-medium text-[var(--pb-color-label)]" htmlFor="owner-phone">{isThai ? 'โทรศัพท์' : 'Phone'}</label>
              <Input id="owner-phone" value={ownerDraft.phone} onChange={(event) => setOwnerDraft({ ...ownerDraft, phone: event.target.value })} />
            </div>
            <div className="grid gap-1.5">
              <label className="text-sm font-medium text-[var(--pb-color-label)]" htmlFor="owner-email">Email</label>
              <Input id="owner-email" value={ownerDraft.email} onChange={(event) => setOwnerDraft({ ...ownerDraft, email: event.target.value })} />
            </div>
            <div className="grid gap-1.5">
              <label className="text-sm font-medium text-[var(--pb-color-label)]" htmlFor="owner-line">LINE ID</label>
              <Input id="owner-line" value={ownerDraft.lineId} onChange={(event) => setOwnerDraft({ ...ownerDraft, lineId: event.target.value })} />
            </div>
            <div className="grid gap-1.5 sm:col-span-2">
              <label className="text-sm font-medium text-[var(--pb-color-label)]" htmlFor="owner-address">{isThai ? 'ที่อยู่' : 'Address'}</label>
              <Input id="owner-address" value={ownerDraft.address} onChange={(event) => setOwnerDraft({ ...ownerDraft, address: event.target.value })} />
            </div>
            <div className="grid gap-1.5 sm:col-span-2">
              <label className="text-sm font-medium text-[var(--pb-color-label)]" htmlFor="owner-notes">{isThai ? 'บันทึก' : 'Notes'}</label>
              <Input id="owner-notes" value={ownerDraft.notes} onChange={(event) => setOwnerDraft({ ...ownerDraft, notes: event.target.value })} />
            </div>
          </form>
          <div className="mt-3.5 grid gap-2.5 border-t border-[var(--pb-color-border)] pt-3.5">
            <p className="text-sm font-medium text-[var(--pb-color-heading)]">
              {isThai ? 'สัตว์เลี้ยงที่เชื่อมอยู่' : 'Linked pets'}
            </p>
            <ul className="grid list-none gap-2.5">
              {getOwnerPets(selectedOwner?.id ?? '').map((pet) => (
                <li
                  key={pet.id}
                  className="grid gap-1 rounded-[var(--pb-radius-md)] border border-[var(--pb-color-border-soft)] bg-[linear-gradient(135deg,#ffffff_0%,#f8faff_100%)] px-3 py-2.5 transition-all duration-[var(--pb-duration-fast)] hover:border-[var(--pb-color-border-active)] hover:shadow-[var(--pb-shadow-soft)]"
                >
                  <p className="text-sm font-medium text-[var(--pb-color-heading)]">
                    {pet.name} · {pet.species}
                  </p>
                  <p className="text-xs text-[var(--pb-color-body)]">
                    {pet.breed} · {isThai ? 'นัดถัดไป' : 'Next visit'} {formatDateTime(pet.nextVisit, locale)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap justify-end gap-2 pt-3">
            <Button type="button" variant="ghost">{isThai ? 'ลบบัญชีต้นแบบ' : 'Delete draft owner'}</Button>
            <Button type="button" onClick={saveOwner}>{isThai ? 'บันทึกข้อมูลเจ้าของ' : 'Save owner changes'}</Button>
          </div>
        </Card>
      </section>
    </>
  );
}

export function PrototypeAppointmentsPage({ locale }: { locale: AppLocale }) {
  const isThai = locale === 'th';
  const { push } = useToast();
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const [statusFilter, setStatusFilter] = useState<'all' | AppointmentStatus>('all');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(appointments[0]?.id ?? '');
  const [draftStatus, setDraftStatus] = useState<AppointmentStatus>('confirmed');

  const filteredAppointments = appointments.filter((appointment) => statusFilter === 'all' || appointment.status === statusFilter);
  const selectedAppointment = filteredAppointments.find((appointment) => appointment.id === selectedAppointmentId) ?? filteredAppointments[0] ?? appointments[0];

  useEffect(() => {
    if (selectedAppointment) {
      setDraftStatus(selectedAppointment.status);
    }
  }, [selectedAppointment]);

  function saveStatus() {
    if (!selectedAppointment) {
      return;
    }

    push(
      isThai
        ? `อัปเดตสถานะนัดหมาย ${selectedAppointment.id} เป็น ${statusLabel(draftStatus, locale)}`
        : `Updated appointment ${selectedAppointment.id} to ${statusLabel(draftStatus, locale)}.`,
    );
  }

  function createAppointment() {
    push(isThai ? 'สร้างนัดหมายต้นแบบใหม่แล้ว' : 'Created a new prototype appointment.');
  }

  function appointmentTone(status: AppointmentStatus): 'default' | 'success' | 'warning' {
    if (status === 'completed') {
      return 'success';
    }

    if (status === 'cancelled' || status === 'no-show') {
      return 'warning';
    }

    return 'default';
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Card className="grid gap-4 border-[var(--pb-color-border-soft)] bg-[linear-gradient(145deg,rgb(255_255_255/0.98)_0%,rgb(248_251_255/1)_100%)] p-5 md:grid-cols-[1.4fr_minmax(240px,0.6fr)] md:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--pb-color-label)]">
              Appointments
            </p>
            <h2 className="mt-1 text-[clamp(1.4rem,2.4vw,1.8rem)] font-light leading-tight tracking-[-0.02em] text-[var(--pb-color-heading)]">
              {isThai ? 'ปฏิทินนัดหมาย ตารางเวลา และสถานะการเข้ารับบริการ' : 'Calendar scheduling, slot grid, and appointment status flow'}
            </h2>
            <p className="mt-2 text-sm text-[var(--pb-color-body)]">
              {isThai
                ? 'เปลี่ยนมุมมองวัน/สัปดาห์/เดือน กรองตามสถานะ และผลักนัดหมายต่อไปยัง consultation ด้วยข้อมูลจำลองเดียวกัน'
                : 'Switch between day, week, and month views, filter by status, and push appointments into consultation using the same mock dataset.'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 rounded-[var(--pb-radius-lg)] border border-[var(--pb-color-border)] bg-[var(--pb-color-surface-card)] p-3 shadow-[var(--pb-elevation-1)]">
            <div className="grid gap-1">
              <p className="text-xs font-medium uppercase tracking-[0.06em] text-[var(--pb-color-body)]">
                {isThai ? 'นัดวันนี้' : 'Today appointments'}
              </p>
              <p className="text-[clamp(1.5rem,3vw,1.8rem)] font-semibold leading-none tracking-[-0.02em] text-[var(--pb-color-heading)]">
                <AnimatedCounter value={appointments.length} locale={locale} />
              </p>
            </div>
            <div className="grid gap-1 border-l border-[var(--pb-color-border)] pl-3">
              <p className="text-xs font-medium uppercase tracking-[0.06em] text-[var(--pb-color-body)]">
                {isThai ? 'กำลังตรวจ' : 'In consult'}
              </p>
              <p className="text-[clamp(1.5rem,3vw,1.8rem)] font-semibold leading-none tracking-[-0.02em] text-[var(--pb-color-heading)]">
                <AnimatedCounter value={1} locale={locale} />
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="mb-3 flex items-start justify-between gap-3 flex-wrap">
            <div>
              <p className="text-sm font-medium text-[var(--pb-color-heading)]">
                {isThai ? 'ปฏิทินและ list view' : 'Calendar and list view'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Tabs value={view} onValueChange={(value) => setView(value as 'day' | 'week' | 'month')}>
                <TabsList>
                  <TabsTrigger value="day">DAY</TabsTrigger>
                  <TabsTrigger value="week">WEEK</TabsTrigger>
                  <TabsTrigger value="month">MONTH</TabsTrigger>
                </TabsList>
              </Tabs>
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as 'all' | AppointmentStatus)}>
                <SelectTrigger className="min-w-[180px]">
                  <SelectValue placeholder={isThai ? 'เลือกสถานะ' : 'Filter status'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isThai ? 'ทุกสถานะ' : 'All statuses'}</SelectItem>
                  <SelectItem value="scheduled">{statusLabel('scheduled', locale)}</SelectItem>
                  <SelectItem value="confirmed">{statusLabel('confirmed', locale)}</SelectItem>
                  <SelectItem value="in-progress">{statusLabel('in-progress', locale)}</SelectItem>
                  <SelectItem value="completed">{statusLabel('completed', locale)}</SelectItem>
                  <SelectItem value="cancelled">{statusLabel('cancelled', locale)}</SelectItem>
                  <SelectItem value="no-show">{statusLabel('no-show', locale)}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-4 grid gap-2.5 sm:grid-cols-2" data-view={view}>
            {filteredAppointments.map((appointment, i) => {
              const patient = getPatient(appointment.patientId);
              const branch = getBranch(appointment.branchId);
              return (
                <motion.button
                  key={appointment.id}
                  type="button"
                  className={`w-full grid gap-1.5 rounded-[var(--pb-radius-md)] border p-3 text-left transition-all duration-[var(--pb-duration-fast)] hover:border-[var(--pb-color-border-active)] hover:shadow-[var(--pb-shadow-soft)] hover:-translate-y-px ${
                    appointment.id === selectedAppointment?.id
                      ? 'border-[var(--pb-color-primary)] bg-[rgb(83_58_253/5%)]'
                      : 'border-[var(--pb-color-border)] bg-white'
                  }`}
                  data-active={appointment.id === selectedAppointment?.id}
                  onClick={() => setSelectedAppointmentId(appointment.id)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                >
                  <span className="text-sm font-medium text-[var(--pb-color-heading)]">
                    {new Date(appointment.startsAt).toLocaleTimeString(locale === 'th' ? 'th-TH' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="text-xs text-[var(--pb-color-body)]">
                    {patient?.name} · {appointment.type}
                  </span>
                  <span className="text-[11px] text-[var(--pb-color-body)]">
                    {branch?.name} · {appointment.room}
                  </span>
                  <Badge variant={appointmentTone(appointment.status)}>{statusLabel(appointment.status, locale)}</Badge>
                </motion.button>
              );
            })}
          </div>

          <div className="w-full overflow-x-auto rounded-[var(--pb-radius-md)] border border-[var(--pb-color-border)] bg-white shadow-[var(--pb-shadow-ambient)]">
            <table className="w-full border-collapse min-w-[680px]">
              <thead className="bg-[var(--pb-color-bg-soft)]">
                <tr>
                  <th className="px-3 py-2.5 text-left text-[13px] font-normal text-[var(--pb-color-label)]">{isThai ? 'เวลา' : 'Time'}</th>
                  <th className="px-3 py-2.5 text-left text-[13px] font-normal text-[var(--pb-color-label)]">{isThai ? 'คนไข้' : 'Patient'}</th>
                  <th className="px-3 py-2.5 text-left text-[13px] font-normal text-[var(--pb-color-label)]">{isThai ? 'ประเภท' : 'Type'}</th>
                  <th className="px-3 py-2.5 text-left text-[13px] font-normal text-[var(--pb-color-label)]">{isThai ? 'แพทย์' : 'Doctor'}</th>
                  <th className="px-3 py-2.5 text-left text-[13px] font-normal text-[var(--pb-color-label)]">{isThai ? 'สถานะ' : 'Status'}</th>
                  <th className="px-3 py-2.5 text-left text-[13px] font-normal text-[var(--pb-color-label)]">{isThai ? 'ลิงก์งานต่อ' : 'Next step'}</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => {
                  const patient = getPatient(appointment.patientId);
                  const doctor = getStaff(appointment.doctorId);
                  return (
                    <tr key={appointment.id} className="border-b border-[var(--pb-color-border)] transition-colors duration-150 last:border-b-0 hover:bg-[rgb(246_249_252/70%)]">
                      <td className="px-3 py-2.5 text-sm font-light text-[var(--pb-color-heading)]" data-label={isThai ? 'เวลา' : 'Time'}>{formatDateTime(appointment.startsAt, locale)}</td>
                      <td className="px-3 py-2.5 text-sm font-light text-[var(--pb-color-heading)]" data-label={isThai ? 'คนไข้' : 'Patient'}>{patient?.name}</td>
                      <td className="px-3 py-2.5 text-sm font-light text-[var(--pb-color-heading)]" data-label={isThai ? 'ประเภท' : 'Type'}>{appointment.type}</td>
                      <td className="px-3 py-2.5 text-sm font-light text-[var(--pb-color-heading)]" data-label={isThai ? 'แพทย์' : 'Doctor'}>{doctor?.name}</td>
                      <td className="px-3 py-2.5 text-sm font-light" data-label={isThai ? 'สถานะ' : 'Status'}>
                        <Badge variant={appointmentTone(appointment.status)}>{statusLabel(appointment.status, locale)}</Badge>
                      </td>
                      <td className="px-3 py-2.5 text-sm font-light" data-label={isThai ? 'ลิงก์งานต่อ' : 'Next step'}>
                        <Link className="font-medium text-[var(--pb-color-primary)] hover:text-[var(--pb-color-primary-deep)]" href={withLocale(locale, '/consultations')}>
                          {isThai ? 'เปิด Consultation' : 'Open consultation'}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <header className="grid gap-1.5 pb-3">
            <h2 className="text-lg font-light tracking-[-0.01em] text-[var(--pb-color-heading)]">
              {isThai ? 'อัปเดตสถานะและสร้างนัดใหม่' : 'Update status and create appointment'}
            </h2>
            <p className="text-sm text-[var(--pb-color-body)]">
              {isThai
                ? 'จำลอง workflow ตั้งแต่นัดไว้ ยืนยัน เข้าตรวจ เสร็จสิ้น ยกเลิก และ no-show'
                : 'Simulate the full appointment workflow from scheduled through confirmed, in-progress, completed, cancelled, and no-show.'}
            </p>
          </header>
          {selectedAppointment ? (
            <div className="grid gap-3">
              <div className="grid gap-2">
                {(['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'] as AppointmentStatus[]).map((step, i) => (
                  <motion.div
                    key={step}
                    className={`flex items-center gap-2 rounded-[var(--pb-radius-md)] border px-3 py-2 transition-all duration-[var(--pb-duration-fast)] ${
                      draftStatus === step
                        ? 'border-[var(--pb-color-primary)] bg-[rgb(83_58_253/5%)]'
                        : 'border-[var(--pb-color-border)]'
                    }`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                  >
                    <div className={`size-2 rounded-full ${draftStatus === step ? 'bg-[var(--pb-color-primary)]' : 'bg-[var(--pb-color-border)]'}`} />
                    <Badge variant={appointmentTone(step)}>{statusLabel(step, locale)}</Badge>
                  </motion.div>
                ))}
              </div>
              <div className="grid gap-1.5">
                <label className="text-sm font-medium text-[var(--pb-color-label)]" htmlFor="appointment-status">{isThai ? 'สถานะปัจจุบัน' : 'Current status'}</label>
                <Select value={draftStatus} onValueChange={(value) => setDraftStatus(value as AppointmentStatus)}>
                  <SelectTrigger id="appointment-status">
                    <SelectValue placeholder={isThai ? 'เลือกสถานะ' : 'Select status'} />
                  </SelectTrigger>
                  <SelectContent>
                    {(['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'] as AppointmentStatus[]).map((step) => (
                      <SelectItem key={step} value={step}>{statusLabel(step, locale)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5 text-sm text-[var(--pb-color-heading)]">
                <div><strong>{isThai ? 'เหตุผล' : 'Reason'}:</strong> {selectedAppointment.reason}</div>
                <div><strong>{isThai ? 'หมายเหตุ' : 'Note'}:</strong> {selectedAppointment.note}</div>
              </div>
              <div className="flex flex-wrap justify-end gap-2">
                <Button asChild variant="ghost">
                  <Link href={withLocale(locale, '/consultations')}>
                    {isThai ? 'เปิด consultation' : 'Open consultation'}
                  </Link>
                </Button>
                <Button type="button" onClick={saveStatus}>{isThai ? 'บันทึกสถานะ' : 'Save status'}</Button>
              </div>
            </div>
          ) : null}

          <div className="mt-3.5 grid gap-3 border-t border-[var(--pb-color-border)] pt-3.5">
            <p className="text-sm font-medium text-[var(--pb-color-heading)]">
              {isThai ? 'ฟอร์มนัดหมายต้นแบบ' : 'Prototype appointment form'}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <label className="text-sm font-medium text-[var(--pb-color-label)]" htmlFor="new-patient">{isThai ? 'คนไข้' : 'Patient'}</label>
                <Select defaultValue={patients[0]?.id}>
                  <SelectTrigger id="new-patient">
                    <SelectValue placeholder={isThai ? 'เลือกคนไข้' : 'Select patient'} />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>{patient.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <label className="text-sm font-medium text-[var(--pb-color-label)]" htmlFor="new-type">{isThai ? 'ประเภทนัดหมาย' : 'Appointment type'}</label>
                <Select defaultValue="Consultation">
                  <SelectTrigger id="new-type">
                    <SelectValue placeholder={isThai ? 'เลือกประเภทนัดหมาย' : 'Select appointment type'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Consultation">Consultation</SelectItem>
                    <SelectItem value="Vaccination">Vaccination</SelectItem>
                    <SelectItem value="Dental">Dental</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <Button type="button" onClick={createAppointment}>{isThai ? 'สร้างนัดหมาย' : 'Create appointment'}</Button>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
}

export function PrototypeConsultationsPage({ locale }: { locale: AppLocale }) {
  const isThai = locale === 'th';
  const { push } = useToast();
  const [selectedConsultationId, setSelectedConsultationId] = useState(consultations[0]?.id ?? '');
  const selectedConsultation = consultations.find((consultation) => consultation.id === selectedConsultationId) ?? consultations[0];
  const [soapDraft, setSoapDraft] = useState(selectedConsultation?.soap);
  const [prescriptionsDraft, setPrescriptionsDraft] = useState(selectedConsultation?.prescriptions ?? []);

  useEffect(() => {
    if (selectedConsultation) {
      setSoapDraft(selectedConsultation.soap);
      setPrescriptionsDraft(selectedConsultation.prescriptions);
    }
  }, [selectedConsultation]);

  if (!selectedConsultation || !soapDraft) {
    return null;
  }

  const patient = getPatient(selectedConsultation.patientId);
  const doctor = getStaff(selectedConsultation.doctorId);
  const invoice = getInvoice(selectedConsultation.invoiceId);

  function saveSoap() {
    push(isThai ? 'บันทึก SOAP note ต้นแบบแล้ว' : 'Saved prototype SOAP note.');
  }

  function createInvoice() {
    push(isThai ? 'สร้าง draft invoice จาก consultation แล้ว' : 'Created draft invoice from consultation.');
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Card className="grid gap-4 border-[var(--pb-color-border-soft)] bg-[linear-gradient(145deg,rgb(255_255_255/0.98)_0%,rgb(248_251_255/1)_100%)] p-5 md:grid-cols-[1.4fr_minmax(240px,0.6fr)] md:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--pb-color-label)]">
              Consultations + SOAP
            </p>
            <h2 className="mt-1 text-[clamp(1.4rem,2.4vw,1.8rem)] font-light leading-tight tracking-[-0.02em] text-[var(--pb-color-heading)]">
              {isThai ? 'ไหลงานจากนัดหมายสู่ SOAP note ใบยา และใบแจ้งหนี้' : 'Move from appointments into SOAP notes, prescriptions, and invoices'}
            </h2>
            <p className="mt-2 text-sm text-[var(--pb-color-body)]">
              {isThai
                ? 'หน้าจอ consultation รวมประวัติ ตรวจปัจจุบัน SOAP form ใบยา และทางลัดไปยังใบพิมพ์หรือ billing'
                : 'The consultation workspace combines history, current exam, SOAP form, prescriptions, and quick links into print or billing flows.'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 rounded-[var(--pb-radius-lg)] border border-[var(--pb-color-border)] bg-[var(--pb-color-surface-card)] p-3 shadow-[var(--pb-elevation-1)]">
            <div className="grid gap-1">
              <p className="text-xs font-medium uppercase tracking-[0.06em] text-[var(--pb-color-body)]">
                {isThai ? 'consultations วันนี้' : 'Today consultations'}
              </p>
              <p className="text-[clamp(1.5rem,3vw,1.8rem)] font-semibold leading-none tracking-[-0.02em] text-[var(--pb-color-heading)]">
                <AnimatedCounter value={consultations.length} locale={locale} />
              </p>
            </div>
            <div className="grid gap-1 border-l border-[var(--pb-color-border)] pl-3">
              <p className="text-xs font-medium uppercase tracking-[0.06em] text-[var(--pb-color-body)]">
                {isThai ? 'พร้อมออกใบแจ้งหนี้' : 'Ready for invoice'}
              </p>
              <p className="text-[clamp(1.5rem,3vw,1.8rem)] font-semibold leading-none tracking-[-0.02em] text-[var(--pb-color-heading)]">
                <AnimatedCounter value={2} locale={locale} />
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <header className="grid gap-1.5 pb-3">
            <h2 className="text-lg font-light tracking-[-0.01em] text-[var(--pb-color-heading)]">
              {isThai ? 'ประวัติ consultation' : 'Consultation history'}
            </h2>
            <p className="text-sm text-[var(--pb-color-body)]">{isThai ? 'เลือกเคสเพื่อแก้ไข SOAP note หรือไปดู printable view' : 'Select a case to edit SOAP notes or jump into a printable view.'}</p>
          </header>
          <div className="grid gap-2.5">
            {consultations.map((consultation, i) => {
              const listPatient = getPatient(consultation.patientId);
              return (
                <motion.button
                  key={consultation.id}
                  type="button"
                  className={`w-full grid gap-1 rounded-[var(--pb-radius-md)] border p-3 text-left transition-all duration-[var(--pb-duration-fast)] hover:border-[var(--pb-color-border-active)] hover:shadow-[var(--pb-shadow-soft)] hover:-translate-y-px ${
                    consultation.id === selectedConsultationId
                      ? 'border-[var(--pb-color-primary)] bg-[rgb(83_58_253/5%)]'
                      : 'border-[var(--pb-color-border)] bg-white'
                  }`}
                  data-active={consultation.id === selectedConsultationId}
                  onClick={() => setSelectedConsultationId(consultation.id)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-[var(--pb-color-heading)]">
                        {listPatient?.name} · {consultation.diagnosis}
                      </p>
                      <p className="text-xs text-[var(--pb-color-body)]">
                        {formatDateTime(consultation.startedAt, locale)}
                      </p>
                    </div>
                    <Badge variant="success">{isThai ? 'พร้อมพิมพ์' : 'Printable'}</Badge>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </Card>

        <Card>
          <header className="grid gap-1.5 pb-3">
            <h2 className="text-lg font-light tracking-[-0.01em] text-[var(--pb-color-heading)]">
              SOAP note form
            </h2>
            <p className="text-sm text-[var(--pb-color-body)]">
              {patient?.name} · {doctor?.name}
            </p>
          </header>
          <div className="mb-3 grid gap-1.5 text-sm text-[var(--pb-color-heading)] sm:grid-cols-2">
            <div><strong>{isThai ? 'คนไข้' : 'Patient'}:</strong> {patient?.name}</div>
            <div><strong>{isThai ? 'แพทย์' : 'Doctor'}:</strong> {doctor?.name}</div>
            <div><strong>{isThai ? 'วินิจฉัย' : 'Diagnosis'}:</strong> {selectedConsultation.diagnosis}</div>
            <div><strong>Invoice:</strong> {invoice?.id}</div>
          </div>

          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <label className="text-sm font-medium text-[var(--pb-color-label)]" htmlFor="soap-subjective">Subjective</label>
              <Textarea id="soap-subjective" value={soapDraft.subjective} onChange={(event) => setSoapDraft({ ...soapDraft, subjective: event.target.value })} />
            </div>
            <div className="grid gap-1.5">
              <label className="text-sm font-medium text-[var(--pb-color-label)]" htmlFor="soap-objective">Objective</label>
              <Textarea id="soap-objective" value={soapDraft.objective} onChange={(event) => setSoapDraft({ ...soapDraft, objective: event.target.value })} />
            </div>
            <div className="grid gap-1.5">
              <label className="text-sm font-medium text-[var(--pb-color-label)]" htmlFor="soap-assessment">Assessment</label>
              <Textarea id="soap-assessment" value={soapDraft.assessment} onChange={(event) => setSoapDraft({ ...soapDraft, assessment: event.target.value })} />
            </div>
            <div className="grid gap-1.5">
              <label className="text-sm font-medium text-[var(--pb-color-label)]" htmlFor="soap-plan">Plan</label>
              <Textarea id="soap-plan" value={soapDraft.plan} onChange={(event) => setSoapDraft({ ...soapDraft, plan: event.target.value })} />
            </div>
          </div>

          <div className="mt-3.5 grid gap-2.5 border-t border-[var(--pb-color-border)] pt-3.5">
            <p className="text-sm font-medium text-[var(--pb-color-heading)]">Prescription</p>
            <ul className="grid list-none gap-2.5">
              {prescriptionsDraft.map((item) => (
                <li
                  key={item.id}
                  className="grid gap-1 rounded-[var(--pb-radius-md)] border border-[var(--pb-color-border-soft)] bg-[linear-gradient(135deg,#ffffff_0%,#f8faff_100%)] px-3 py-2.5"
                >
                  <p className="text-sm font-medium text-[var(--pb-color-heading)]">{item.medication}</p>
                  <p className="text-xs text-[var(--pb-color-body)]">{item.dosage} · {item.frequency} · {item.duration}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap justify-end gap-2 pt-3">
            <Button asChild variant="ghost">
              <Link href={withLocale(locale, `/consultations/${selectedConsultation.id}/print`)}>
                {isThai ? 'เปิดใบพิมพ์' : 'Open print view'}
              </Link>
            </Button>
            <Button type="button" variant="ghost" onClick={createInvoice}>{isThai ? 'สร้าง invoice' : 'Create invoice'}</Button>
            <Button type="button" onClick={saveSoap}>{isThai ? 'บันทึก SOAP' : 'Save SOAP'}</Button>
          </div>
        </Card>
      </section>
    </>
  );
}

export function PrototypeBillingPage({ locale }: { locale: AppLocale }) {
  const isThai = locale === 'th';
  const { push } = useToast();
  const [statusFilter, setStatusFilter] = useState<'all' | InvoiceStatus>('all');
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(invoices[0]?.id ?? '');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash');
  const [paymentAmount, setPaymentAmount] = useState('');

  const filteredInvoices = invoices.filter((invoice) => statusFilter === 'all' || invoice.status === statusFilter);
  const selectedInvoice = filteredInvoices.find((invoice) => invoice.id === selectedInvoiceId) ?? filteredInvoices[0] ?? invoices[0];
  const totals = selectedInvoice ? getInvoiceTotals(selectedInvoice) : null;

  function recordPayment() {
    push(
      isThai
        ? `บันทึกการชำระเงิน ${paymentMethod} จำนวน ${paymentAmount || '0'} บาทแล้ว`
        : `Recorded ${paymentMethod} payment for THB ${paymentAmount || '0'}.`,
    );
    setPaymentAmount('');
  }

  const summary = {
    day: invoices.reduce((sum, invoice) => sum + getInvoiceTotals(invoice).total, 0),
    week: invoices.reduce((sum, invoice) => sum + getInvoiceTotals(invoice).paid, 0),
    month: invoices.reduce((sum, invoice) => sum + getInvoiceTotals(invoice).due, 0),
  };

  function invoiceTone(status: InvoiceStatus): 'default' | 'success' | 'warning' {
    if (status === 'paid') {
      return 'success';
    }

    if (status === 'overdue') {
      return 'warning';
    }

    return 'default';
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Card className="grid gap-4 border-[var(--pb-color-border-soft)] bg-[linear-gradient(145deg,rgb(255_255_255/0.98)_0%,rgb(248_251_255/1)_100%)] p-5 md:grid-cols-[1.4fr_minmax(240px,0.6fr)] md:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--pb-color-label)]">
              Billing + Invoices
            </p>
            <h2 className="mt-1 text-[clamp(1.4rem,2.4vw,1.8rem)] font-light leading-tight tracking-[-0.02em] text-[var(--pb-color-heading)]">
              {isThai ? 'สร้าง invoice จาก consultation ติดตามสถานะ และรับชำระเงิน' : 'Create invoices from consultations, track status, and record payments'}
            </h2>
            <p className="mt-2 text-sm text-[var(--pb-color-body)]">
              {isThai
                ? 'หน้าจอนี้รวม line items ส่วนลด ภาษี การชำระเงิน และสรุปรายวัน/สัปดาห์/เดือนสำหรับทีมหน้าฟรอนต์'
                : 'This screen combines line items, discounts, tax, payments, and daily/weekly/monthly summaries for checkout teams.'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 rounded-[var(--pb-radius-lg)] border border-[var(--pb-color-border)] bg-[var(--pb-color-surface-card)] p-3 shadow-[var(--pb-elevation-1)]">
            <div className="grid gap-1">
              <p className="text-xs font-medium uppercase tracking-[0.06em] text-[var(--pb-color-body)]">
                {isThai ? 'ยอดออกบิลวันนี้' : 'Issued today'}
              </p>
              <p className="text-[clamp(1.3rem,2.5vw,1.6rem)] font-semibold leading-none tracking-[-0.02em] text-[var(--pb-color-heading)]">
                {formatCurrency(summary.day, locale)}
              </p>
            </div>
            <div className="grid gap-1 border-l border-[var(--pb-color-border)] pl-3">
              <p className="text-xs font-medium uppercase tracking-[0.06em] text-[var(--pb-color-body)]">
                {isThai ? 'คงค้าง' : 'Outstanding'}
              </p>
              <p className="text-[clamp(1.3rem,2.5vw,1.6rem)] font-semibold leading-none tracking-[-0.02em] text-[var(--pb-color-heading)]">
                {formatCurrency(summary.month, locale)}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.section
        className="grid gap-4 sm:grid-cols-2"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.06 }}
      >
        <Card className="grid gap-2">
          <div className="flex size-9 items-center justify-center rounded-[var(--pb-radius-md)] bg-[var(--pb-color-success-soft)]">
            <Banknote className="size-4 text-[var(--pb-color-success-text)]" />
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.06em] text-[var(--pb-color-body)]">
            {isThai ? 'รับชำระสัปดาห์นี้' : 'Collected this week'}
          </p>
          <p className="text-[clamp(1.6rem,3vw,2rem)] font-semibold leading-none tracking-[-0.02em] text-[var(--pb-color-heading)]">
            {formatCurrency(summary.week, locale)}
          </p>
        </Card>
        <Card className="grid gap-2">
          <div className="flex size-9 items-center justify-center rounded-[var(--pb-radius-md)] bg-[var(--pb-color-warning-soft)]">
            <AlertTriangle className="size-4 text-[var(--pb-color-warning)]" />
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.06em] text-[var(--pb-color-body)]">
            {isThai ? 'invoice ค้างชำระ' : 'Overdue invoices'}
          </p>
          <p className="text-[clamp(1.6rem,3vw,2rem)] font-semibold leading-none tracking-[-0.02em] text-[var(--pb-color-heading)]">
            <AnimatedCounter value={1} locale={locale} />
          </p>
        </Card>
      </motion.section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="mb-3 flex items-start justify-between gap-3 flex-wrap">
            <div>
              <p className="text-sm font-medium text-[var(--pb-color-heading)]">
                {isThai ? 'รายการ invoice' : 'Invoice list'}
              </p>
            </div>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as 'all' | InvoiceStatus)}>
              <SelectTrigger className="min-w-[180px]">
                <SelectValue placeholder={isThai ? 'เลือกสถานะ' : 'Filter status'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isThai ? 'ทุกสถานะ' : 'All statuses'}</SelectItem>
                <SelectItem value="draft">{statusLabel('draft', locale)}</SelectItem>
                <SelectItem value="sent">{statusLabel('sent', locale)}</SelectItem>
                <SelectItem value="paid">{statusLabel('paid', locale)}</SelectItem>
                <SelectItem value="overdue">{statusLabel('overdue', locale)}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full overflow-x-auto rounded-[var(--pb-radius-md)] border border-[var(--pb-color-border)] bg-white shadow-[var(--pb-shadow-ambient)]">
            <table className="w-full border-collapse min-w-[680px]">
              <thead className="bg-[var(--pb-color-bg-soft)]">
                <tr>
                  <th className="px-3 py-2.5 text-left text-[13px] font-normal text-[var(--pb-color-label)]">Invoice</th>
                  <th className="px-3 py-2.5 text-left text-[13px] font-normal text-[var(--pb-color-label)]">{isThai ? 'คนไข้' : 'Patient'}</th>
                  <th className="px-3 py-2.5 text-left text-[13px] font-normal text-[var(--pb-color-label)]">{isThai ? 'สถานะ' : 'Status'}</th>
                  <th className="px-3 py-2.5 text-left text-[13px] font-normal text-[var(--pb-color-label)]">{isThai ? 'ยอดรวม' : 'Total'}</th>
                  <th className="px-3 py-2.5 text-left text-[13px] font-normal text-[var(--pb-color-label)]">{isThai ? 'พิมพ์' : 'Print'}</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => {
                  const patient = getPatient(invoice.patientId);
                  const totalsForRow = getInvoiceTotals(invoice);
                  return (
                    <tr key={invoice.id} className="border-b border-[var(--pb-color-border)] transition-colors duration-150 last:border-b-0 hover:bg-[rgb(246_249_252/70%)]">
                      <td className="px-3 py-2.5 text-sm font-light" data-label="Invoice">
                        <button
                          type="button"
                          className="font-medium text-[var(--pb-color-primary)] hover:text-[var(--pb-color-primary-deep)] transition-colors"
                          onClick={() => setSelectedInvoiceId(invoice.id)}
                        >
                          {invoice.id}
                        </button>
                      </td>
                      <td className="px-3 py-2.5 text-sm font-light text-[var(--pb-color-heading)]" data-label={isThai ? 'คนไข้' : 'Patient'}>{patient?.name}</td>
                      <td className="px-3 py-2.5 text-sm font-light" data-label={isThai ? 'สถานะ' : 'Status'}>
                        <Badge variant={invoiceTone(invoice.status)}>{statusLabel(invoice.status, locale)}</Badge>
                      </td>
                      <td className="px-3 py-2.5 text-sm font-light text-[var(--pb-color-heading)]" data-label={isThai ? 'ยอดรวม' : 'Total'}>{formatCurrency(totalsForRow.total, locale)}</td>
                      <td className="px-3 py-2.5 text-sm font-light" data-label={isThai ? 'พิมพ์' : 'Print'}>
                        <Link className="font-medium text-[var(--pb-color-primary)] hover:text-[var(--pb-color-primary-deep)]" href={withLocale(locale, `/billing/invoices/${invoice.id}/print`)}>{isThai ? 'ใบพิมพ์' : 'Print view'}</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          {selectedInvoice && totals ? (
            <>
              <header className="grid gap-1.5 pb-3">
                <h2 className="text-lg font-light tracking-[-0.01em] text-[var(--pb-color-heading)]">
                  {isThai ? 'สร้างและรับชำระ invoice' : 'Invoice creation and payment recording'}
                </h2>
                <p className="text-sm text-[var(--pb-color-body)]">{selectedInvoice.id}</p>
              </header>
              <ul className="mb-3 grid list-none gap-2">
                {selectedInvoice.lineItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    className="grid gap-1 rounded-[var(--pb-radius-md)] border border-[var(--pb-color-border-soft)] bg-[linear-gradient(135deg,#ffffff_0%,#f8faff_100%)] px-3 py-2.5"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                  >
                    <p className="text-sm font-medium text-[var(--pb-color-heading)]">{item.label}</p>
                    <p className="text-xs text-[var(--pb-color-body)]">{item.category} · {item.quantity} x {formatCurrency(item.unitPrice, locale)}</p>
                  </motion.li>
                ))}
              </ul>
              <div className="mb-3 grid gap-1.5 text-sm text-[var(--pb-color-heading)] sm:grid-cols-2">
                <div><strong>Subtotal:</strong> {formatCurrency(totals.subtotal, locale)}</div>
                <div><strong>{isThai ? 'ส่วนลด' : 'Discount'}:</strong> {formatCurrency(selectedInvoice.discount, locale)}</div>
                <div><strong>Tax:</strong> {formatCurrency(totals.tax, locale)}</div>
                <div><strong>{isThai ? 'คงเหลือ' : 'Due'}:</strong> {formatCurrency(totals.due, locale)}</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <label className="text-sm font-medium text-[var(--pb-color-label)]" htmlFor="payment-method">{isThai ? 'วิธีชำระ' : 'Payment method'}</label>
                  <Select value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                    <SelectTrigger id="payment-method">
                      <SelectValue placeholder={isThai ? 'เลือกวิธีชำระ' : 'Select payment method'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Card">Card</SelectItem>
                      <SelectItem value="Transfer">Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5">
                  <label className="text-sm font-medium text-[var(--pb-color-label)]" htmlFor="payment-amount">{isThai ? 'จำนวนเงิน' : 'Amount'}</label>
                  <Input id="payment-amount" value={paymentAmount} onChange={(event) => setPaymentAmount(event.target.value)} placeholder="500" />
                </div>
              </div>
              <div className="flex flex-wrap justify-end gap-2 pt-3">
                <Button type="button" variant="ghost">{isThai ? 'ส่ง invoice' : 'Send invoice'}</Button>
                <Button type="button" onClick={recordPayment}>{isThai ? 'บันทึกการชำระเงิน' : 'Record payment'}</Button>
              </div>
            </>
          ) : null}
        </Card>
      </section>
    </>
  );
}

export function PrototypeAdminPage({ locale }: { locale: AppLocale }) {
  const isThai = locale === 'th';
  const { push } = useToast();
  const [branchDrafts, setBranchDrafts] = useState(branches);
  const [staffDrafts, setStaffDrafts] = useState(staffMembers);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<StaffRole>('Receptionist');

  function addBranch() {
    const nextBranch = {
      id: `branch-${branchDrafts.length + 1}`,
      name: `Prototype Branch ${branchDrafts.length + 1}`,
      city: 'Bangkok',
      type: 'Satellite Clinic',
      phone: '+66 2 000 0000',
      manager: 'Pending assignment',
      readiness: 'scheduled' as const,
    };
    setBranchDrafts([...branchDrafts, nextBranch]);
    push(isThai ? 'เพิ่มสาขาต้นแบบใหม่แล้ว' : 'Added a new prototype branch.');
  }

  function inviteStaff() {
    if (!inviteEmail) {
      return;
    }
    const nextStaff: StaffMember = {
      id: `staff-${staffDrafts.length + 1}`,
      name: inviteEmail.split('@')[0] || 'Invited staff',
      email: inviteEmail,
      role: inviteRole,
      branchId: branchDrafts[0]?.id ?? 'bangkok-hq',
      shift: 'Pending',
      status: 'scheduled',
    };
    setStaffDrafts([...staffDrafts, nextStaff]);
    setInviteEmail('');
    push(isThai ? 'ส่งคำเชิญทีมงานต้นแบบแล้ว' : 'Sent prototype staff invite.');
  }

  const permissionRows = [
    { role: 'Admin', access: isThai ? 'ทุกโมดูล + ตั้งค่าองค์กร' : 'All modules + org settings', scope: isThai ? 'ทุกสาขา' : 'All branches' },
    { role: 'Doctor', access: isThai ? 'นัดหมาย คนไข้ SOAP Billing preview' : 'Appointments, patients, SOAP, billing preview', scope: isThai ? 'สาขาที่ได้รับมอบหมาย' : 'Assigned branch' },
    { role: 'Nurse', access: isThai ? 'เตรียมยา ประวัติคนไข้ สถานะหัตถการ' : 'Medication prep, patient history, procedure status', scope: isThai ? 'สาขาที่ได้รับมอบหมาย' : 'Assigned branch' },
    { role: 'Receptionist', access: isThai ? 'ลงทะเบียน นัดหมาย ชำระเงิน' : 'Registration, appointments, payments', scope: isThai ? 'หน้าฟรอนต์และ checkout' : 'Front desk and checkout' },
  ] as const;

  function adminStatusTone(status: string): 'default' | 'success' | 'warning' {
    if (status === 'confirmed' || status === 'completed' || status === 'paid') {
      return 'success';
    }

    if (status === 'cancelled' || status === 'no-show' || status === 'overdue') {
      return 'warning';
    }

    return 'default';
  }

  return (
    <>
      <Card className="grid gap-4 border-[var(--pb-color-border-soft)] bg-[linear-gradient(145deg,rgb(255_255_255/0.98)_0%,rgb(248_251_255/1)_100%)] p-5 md:grid-cols-[1.4fr_minmax(240px,0.6fr)] md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.08em] text-[var(--pb-color-label)]">Organization + Users</p>
          <h2 className="text-[clamp(1.4rem,2.4vw,1.8rem)] font-light leading-tight tracking-[-0.02em] text-[var(--pb-color-heading)]">
            {isThai ? 'ตั้งค่าองค์กร สาขา ทีมงาน และสิทธิ์การเข้าถึง' : 'Configure organization, branches, staff, and permissions'}
          </h2>
          <p className="mt-2 text-sm text-[var(--pb-color-body)]">
            {isThai
              ? 'ขยายหน้าผู้ดูแลเดิมให้รองรับ branch CRUD staff invite role overview และ permission matrix แบบเชื่อมโยงกับ prototype ทั้งระบบ'
              : 'The existing admin view is expanded to cover branch CRUD, staff invites, role overview, and a permission matrix linked to the full prototype.'}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 rounded-[var(--pb-radius-lg)] border border-[var(--pb-color-border)] bg-[var(--pb-color-surface-card)] p-3 shadow-[var(--pb-elevation-1)]">
          <div className="grid gap-1">
            <p className="text-xs text-[var(--pb-color-label)]">{isThai ? 'สาขา' : 'Branches'}</p>
            <p className="text-2xl font-light tracking-[-0.22px] text-[var(--pb-color-heading)]">{branchDrafts.length}</p>
          </div>
          <div className="grid gap-1 border-l border-[var(--pb-color-border)] pl-3">
            <p className="text-xs text-[var(--pb-color-label)]">{isThai ? 'ทีมงาน' : 'Staff'}</p>
            <p className="text-2xl font-light tracking-[-0.22px] text-[var(--pb-color-heading)]">{staffDrafts.length}</p>
          </div>
        </div>
      </Card>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <header className="grid gap-1.5 mb-3">
            <h2 className="text-[22px] font-light leading-tight tracking-[-0.22px] text-[var(--pb-color-heading)]">{isThai ? 'สาขาและข้อมูลติดต่อ' : 'Branches and contact setup'}</h2>
          </header>
          <ul className="grid gap-2.5 m-0 p-0 list-none">
            {branchDrafts.map((branch) => (
              <li key={branch.id} className="border border-[var(--pb-color-border-soft)] rounded-[var(--pb-radius-md)] px-3 py-2.5 bg-[linear-gradient(135deg,#ffffff_0%,#f8faff_100%)] transition-[border-color,box-shadow,transform] duration-[180ms] hover:border-[var(--pb-color-border-active)] hover:shadow-[var(--pb-shadow-soft)] hover:-translate-y-px">
                <p className="text-sm font-normal text-[var(--pb-color-heading)]">
                  {branch.name}{' '}
                  <Badge variant={adminStatusTone(branch.readiness)}>{statusLabel(branch.readiness, locale)}</Badge>
                </p>
                <p className="mt-0.5 text-xs text-[var(--pb-color-body)]">{branch.city} • {branch.type} • {branch.manager}</p>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 justify-end flex-wrap mt-3">
            <Button type="button" onClick={addBranch}>{isThai ? 'เพิ่มสาขา' : 'Add branch'}</Button>
          </div>
        </Card>

        <Card>
          <header className="grid gap-1.5 mb-3">
            <h2 className="text-[22px] font-light leading-tight tracking-[-0.22px] text-[var(--pb-color-heading)]">{isThai ? 'เชิญทีมงานและบทบาท' : 'Staff invite and roles'}</h2>
          </header>
          <div className="grid gap-3 sm:grid-cols-2 sm:items-start">
            <div className="grid gap-1.5">
              <label htmlFor="invite-email" className="text-sm text-[var(--pb-color-body)]">Email</label>
              <Input id="invite-email" value={inviteEmail} onChange={(event) => setInviteEmail(event.target.value)} placeholder="nurse.new@clinic-demo.com" />
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="invite-role" className="text-sm text-[var(--pb-color-body)]">{isThai ? 'บทบาท' : 'Role'}</label>
              <Select value={inviteRole} onValueChange={(value) => setInviteRole(value as StaffRole)}>
                <SelectTrigger id="invite-role">
                  <SelectValue placeholder={isThai ? 'เลือกบทบาท' : 'Select role'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Doctor">Doctor</SelectItem>
                  <SelectItem value="Nurse">Nurse</SelectItem>
                  <SelectItem value="Receptionist">Receptionist</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2 justify-end flex-wrap mt-3">
            <Button type="button" onClick={inviteStaff}>{isThai ? 'ส่งคำเชิญ' : 'Send invite'}</Button>
          </div>

          <div className="mt-4 w-full overflow-x-auto border border-[var(--pb-color-border)] rounded-[var(--pb-radius-md)] bg-white shadow-[var(--pb-shadow-ambient)]">
            <table className="w-full border-collapse min-w-[680px]">
              <thead className="bg-[var(--pb-color-bg-soft)]">
                <tr>
                  <th className="px-3 py-2.5 text-left text-[13px] font-normal text-[var(--pb-color-label)] border-b border-[var(--pb-color-border)] sticky top-0 z-1">{isThai ? 'ทีมงาน' : 'Staff'}</th>
                  <th className="px-3 py-2.5 text-left text-[13px] font-normal text-[var(--pb-color-label)] border-b border-[var(--pb-color-border)] sticky top-0 z-1">{isThai ? 'บทบาท' : 'Role'}</th>
                  <th className="px-3 py-2.5 text-left text-[13px] font-normal text-[var(--pb-color-label)] border-b border-[var(--pb-color-border)] sticky top-0 z-1">{isThai ? 'ขอบเขต' : 'Scope'}</th>
                  <th className="px-3 py-2.5 text-left text-[13px] font-normal text-[var(--pb-color-label)] border-b border-[var(--pb-color-border)] sticky top-0 z-1">{isThai ? 'สถานะ' : 'Status'}</th>
                </tr>
              </thead>
              <tbody>
                {staffDrafts.map((staff) => (
                  <tr key={staff.id} className="transition-[background-color] duration-[180ms] hover:bg-[rgb(246_249_252/70%)] focus-within:bg-[rgb(83_58_253/6%)]">
                    <td className="px-3 py-2.5 text-left text-sm font-light text-[var(--pb-color-heading)] border-b border-[var(--pb-color-border)]" data-label={isThai ? 'ทีมงาน' : 'Staff'}>
                      <span className="block font-normal text-[var(--pb-color-heading)]">{staff.name}</span>
                      <span className="block mt-0.5 text-xs text-[var(--pb-color-body)]">{staff.email}</span>
                    </td>
                    <td className="px-3 py-2.5 text-left text-sm font-light text-[var(--pb-color-heading)] border-b border-[var(--pb-color-border)]" data-label={isThai ? 'บทบาท' : 'Role'}>
                      <Badge>{staff.role}</Badge>
                    </td>
                    <td className="px-3 py-2.5 text-left text-sm font-light text-[var(--pb-color-heading)] border-b border-[var(--pb-color-border)]" data-label={isThai ? 'ขอบเขต' : 'Scope'}>{getBranch(staff.branchId)?.name}</td>
                    <td className="px-3 py-2.5 text-left text-sm font-light text-[var(--pb-color-heading)] border-b border-[var(--pb-color-border)]" data-label={isThai ? 'สถานะ' : 'Status'}>
                      <Badge variant={adminStatusTone(staff.status)}>{statusLabel(staff.status, locale)}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      <Card>
        <header className="grid gap-1.5 mb-3">
          <h2 className="text-[22px] font-light leading-tight tracking-[-0.22px] text-[var(--pb-color-heading)]">{isThai ? 'Permission matrix' : 'Permission matrix'}</h2>
          <p className="text-sm text-[var(--pb-color-body)]">{isThai ? 'สรุปขอบเขตสิทธิ์ใน prototype สำหรับบทบาทหลัก' : 'A prototype-level summary of access scope for core roles.'}</p>
        </header>
        <div className="w-full overflow-x-auto border border-[var(--pb-color-border)] rounded-[var(--pb-radius-md)] bg-white shadow-[var(--pb-shadow-ambient)]">
          <table className="w-full border-collapse min-w-[680px]">
            <thead className="bg-[var(--pb-color-bg-soft)]">
              <tr>
                <th className="px-3 py-2.5 text-left text-[13px] font-normal text-[var(--pb-color-label)] border-b border-[var(--pb-color-border)] sticky top-0 z-1">{isThai ? 'บทบาท' : 'Role'}</th>
                <th className="px-3 py-2.5 text-left text-[13px] font-normal text-[var(--pb-color-label)] border-b border-[var(--pb-color-border)] sticky top-0 z-1">{isThai ? 'สิทธิ์หลัก' : 'Primary access'}</th>
                <th className="px-3 py-2.5 text-left text-[13px] font-normal text-[var(--pb-color-label)] border-b border-[var(--pb-color-border)] sticky top-0 z-1">{isThai ? 'ขอบเขต' : 'Scope'}</th>
              </tr>
            </thead>
            <tbody>
              {permissionRows.map((row) => (
                <tr key={row.role} className="transition-[background-color] duration-[180ms] hover:bg-[rgb(246_249_252/70%)] focus-within:bg-[rgb(83_58_253/6%)]">
                  <td className="px-3 py-2.5 text-left text-sm font-light text-[var(--pb-color-heading)] border-b border-[var(--pb-color-border)]" data-label={isThai ? 'บทบาท' : 'Role'}>{row.role}</td>
                  <td className="px-3 py-2.5 text-left text-sm font-light text-[var(--pb-color-heading)] border-b border-[var(--pb-color-border)]" data-label={isThai ? 'สิทธิ์หลัก' : 'Primary access'}>{row.access}</td>
                  <td className="px-3 py-2.5 text-left text-sm font-light text-[var(--pb-color-heading)] border-b border-[var(--pb-color-border)]" data-label={isThai ? 'ขอบเขต' : 'Scope'}>{row.scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
