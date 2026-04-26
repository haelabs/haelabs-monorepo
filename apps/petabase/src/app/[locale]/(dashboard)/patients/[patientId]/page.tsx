import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PageContainer } from '@petabase/components/layout/page-container';
import { Card } from '@petabase/components/ui/card';
import {
  getBranch,
  getOwner,
  getPatient,
  getPatientAppointments,
  getPatientConsultations,
  getPatientInvoices,
} from '@petabase/features/prototype/mock-data';
import { ensureLocale } from '@petabase/lib/i18n/locale';
import { withLocale } from '@petabase/lib/navigation/locale-path';

type PatientProfilePageProps = {
  params: Promise<{ locale: string; patientId: string }>;
};

function formatDateTime(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'th' ? 'th-TH' : 'en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default async function PatientProfilePage({ params }: PatientProfilePageProps) {
  const { locale: localeParam, patientId } = await params;
  const locale = ensureLocale(localeParam);
  const isThai = locale === 'th';
  const patient = getPatient(patientId);

  if (!patient) {
    notFound();
  }

  const owner = getOwner(patient.ownerId);
  const branch = getBranch(patient.branchId);
  const patientAppointments = getPatientAppointments(patient.id);
  const patientConsultations = getPatientConsultations(patient.id);
  const patientInvoices = getPatientInvoices(patient.id);

  return (
    <PageContainer
      title={`${patient.name} ${isThai ? 'โปรไฟล์คนไข้' : 'patient profile'}`}
      description={isThai ? 'ดูรูปคนไข้ เจ้าของ ประวัติการรักษา เอกสาร และลิงก์ workflow ต่อเนื่อง' : 'Review photo, owner card, medical history, documents, and connected workflow links.'}
    >
      <Card className="grid gap-4 border-[var(--pb-color-border-soft)] bg-[linear-gradient(145deg,rgb(255_255_255/0.98)_0%,rgb(248_251_255/1)_100%)] p-5 md:grid-cols-[1.4fr_minmax(240px,0.6fr)] md:items-end">
        <div className="flex items-center gap-4">
          <div className="inline-flex size-[72px] shrink-0 items-center justify-center rounded-[18px] border border-[var(--pb-color-border-active)] bg-[linear-gradient(160deg,rgb(255_255_255/1)_0%,rgb(237_242_255/1)_100%)] text-2xl text-[var(--pb-color-primary-deep)]">
            {patient.photoLabel}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.08em] text-[var(--pb-color-label)]">{patient.species}</p>
            <h2 className="text-[clamp(1.4rem,2.4vw,1.8rem)] font-light leading-tight tracking-[-0.02em] text-[var(--pb-color-heading)]">
              {patient.name}
            </h2>
            <p className="mt-1 text-sm text-[var(--pb-color-body)]">{patient.breed} • {patient.sex} • {patient.age} • {patient.weightKg} kg</p>
          </div>
        </div>
          <div className="grid grid-cols-2 gap-3 rounded-[var(--pb-radius-lg)] border border-[var(--pb-color-border)] bg-[var(--pb-color-surface-card)] p-3 shadow-[var(--pb-elevation-1)]">
            <div className="grid gap-1">
              <p className="text-xs text-[var(--pb-color-label)]">{isThai ? 'สาขา' : 'Branch'}</p>
              <p className="text-[18px] tracking-[-0.22px] font-light text-[var(--pb-color-heading)]">{branch?.name}</p>
            </div>
            <div className="grid gap-1 border-l border-[var(--pb-color-border)] pl-3">
              <p className="text-xs text-[var(--pb-color-label)]">{isThai ? 'นัดถัดไป' : 'Next visit'}</p>
              <p className="text-[18px] tracking-[-0.22px] font-light text-[var(--pb-color-heading)]">{formatDateTime(patient.nextVisit, locale)}</p>
            </div>
          </div>
      </Card>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <header className="grid gap-1.5 mb-3">
            <h2 className="text-[22px] font-light leading-tight tracking-[-0.22px] text-[var(--pb-color-heading)]">{isThai ? 'Owner card' : 'Owner card'}</h2>
          </header>
          <div className="grid gap-2.5 text-sm text-[var(--pb-color-heading)]">
            <div><strong>{isThai ? 'ชื่อ' : 'Name'}:</strong> {owner?.name}</div>
            <div><strong>{isThai ? 'โทรศัพท์' : 'Phone'}:</strong> {owner?.phone}</div>
            <div><strong>Email:</strong> {owner?.email}</div>
            <div><strong>LINE:</strong> {owner?.lineId}</div>
            <div><strong>{isThai ? 'หมายเหตุ' : 'Notes'}:</strong> {owner?.notes}</div>
          </div>
        </Card>
        <Card>
          <header className="grid gap-1.5 mb-3">
            <h2 className="text-[22px] font-light leading-tight tracking-[-0.22px] text-[var(--pb-color-heading)]">{isThai ? 'ข้อมูลพื้นฐาน' : 'Clinical summary'}</h2>
          </header>
          <div className="grid gap-2.5 text-sm text-[var(--pb-color-heading)]">
            <div><strong>{isThai ? 'Microchip' : 'Microchip'}:</strong> {patient.microchip}</div>
            <div><strong>{isThai ? 'สี' : 'Color'}:</strong> {patient.color}</div>
            <div><strong>{isThai ? 'แจ้งเตือน' : 'Alerts'}:</strong> {patient.alerts.join(', ')}</div>
            <div><strong>{isThai ? 'แท็ก' : 'Tags'}:</strong> {patient.tags.join(', ')}</div>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <header className="grid gap-1.5 mb-3">
            <h2 className="text-[22px] font-light leading-tight tracking-[-0.22px] text-[var(--pb-color-heading)]">{isThai ? 'Medical history timeline' : 'Medical history timeline'}</h2>
          </header>
          <ul className="grid gap-2.5 m-0 p-0 list-none">
            {patient.timeline.map((entry) => (
              <li key={entry.id} data-state={entry.status === 'confirmed' ? 'done' : entry.status === 'in-progress' ? 'in-progress' : 'scheduled'} className="border border-[var(--pb-color-border-soft)] rounded-[var(--pb-radius-md)] px-3 py-2.5 bg-[linear-gradient(135deg,#ffffff_0%,#f8faff_100%)] transition-[border-color,box-shadow,transform] duration-[180ms] hover:border-[var(--pb-color-border-active)] hover:shadow-[var(--pb-shadow-soft)] hover:-translate-y-px">
                <p className="text-sm font-normal text-[var(--pb-color-heading)]">{entry.date} • {entry.title}</p>
                <p className="mt-0.5 text-xs text-[var(--pb-color-body)]">{entry.note}</p>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <header className="grid gap-1.5 mb-3">
            <h2 className="text-[22px] font-light leading-tight tracking-[-0.22px] text-[var(--pb-color-heading)]">{isThai ? 'Documents' : 'Documents'}</h2>
          </header>
          <ul className="grid gap-2.5 m-0 p-0 list-none">
            {patient.documents.map((document) => (
              <li key={document.id} className="border border-[var(--pb-color-border-soft)] rounded-[var(--pb-radius-md)] px-3 py-2.5 bg-[linear-gradient(135deg,#ffffff_0%,#f8faff_100%)] transition-[border-color,box-shadow,transform] duration-[180ms] hover:border-[var(--pb-color-border-active)] hover:shadow-[var(--pb-shadow-soft)] hover:-translate-y-px">
                <p className="text-sm font-normal text-[var(--pb-color-heading)]">{document.name}</p>
                <p className="mt-0.5 text-xs text-[var(--pb-color-body)]">{document.kind} • {document.uploadedAt}</p>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <header className="grid gap-1.5 mb-3">
            <h2 className="text-[22px] font-light leading-tight tracking-[-0.22px] text-[var(--pb-color-heading)]">{isThai ? 'Appointments' : 'Appointments'}</h2>
          </header>
          <ul className="grid gap-2.5 m-0 p-0 list-none">
            {patientAppointments.map((appointment) => (
              <li key={appointment.id} className="border border-[var(--pb-color-border-soft)] rounded-[var(--pb-radius-md)] px-3 py-2.5 bg-[linear-gradient(135deg,#ffffff_0%,#f8faff_100%)] transition-[border-color,box-shadow,transform] duration-[180ms] hover:border-[var(--pb-color-border-active)] hover:shadow-[var(--pb-shadow-soft)] hover:-translate-y-px">
                <p className="text-sm font-normal text-[var(--pb-color-heading)]">{formatDateTime(appointment.startsAt, locale)} • {appointment.type}</p>
                <p className="mt-0.5 text-xs text-[var(--pb-color-body)]">{appointment.reason}</p>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <header className="grid gap-1.5 mb-3">
            <h2 className="text-[22px] font-light leading-tight tracking-[-0.22px] text-[var(--pb-color-heading)]">{isThai ? 'Consultations + Billing' : 'Consultations + Billing'}</h2>
          </header>
          <div className="grid gap-2.5">
            {patientConsultations.map((consultation) => (
              <Link key={consultation.id} className="grid gap-1 px-3 py-3 border border-[var(--pb-color-border)] rounded-[var(--pb-radius-md)] bg-white transition-[border-color,box-shadow,transform] duration-[180ms] hover:border-[var(--pb-color-border-active)] hover:shadow-[var(--pb-shadow-soft)] hover:-translate-y-px" href={withLocale(locale, `/consultations/${consultation.id}/print`)}>
                <strong>{consultation.id}</strong>
                <span>{consultation.diagnosis}</span>
              </Link>
            ))}
            {patientInvoices.map((invoice) => (
              <Link key={invoice.id} className="grid gap-1 px-3 py-3 border border-[var(--pb-color-border)] rounded-[var(--pb-radius-md)] bg-white transition-[border-color,box-shadow,transform] duration-[180ms] hover:border-[var(--pb-color-border-active)] hover:shadow-[var(--pb-shadow-soft)] hover:-translate-y-px" href={withLocale(locale, `/billing/invoices/${invoice.id}/print`)}>
                <strong>{invoice.id}</strong>
                <span>{isThai ? 'เปิดใบพิมพ์ invoice' : 'Open invoice print view'}</span>
              </Link>
            ))}
          </div>
        </Card>
      </section>
    </PageContainer>
  );
}
