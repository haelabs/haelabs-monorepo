import Link from 'next/link';

import { PageContainer } from '@petabase/components/layout/page-container';
import { AnimatedCounter } from '@petabase/components/ui/animated-counter';
import { Badge } from '@petabase/components/ui/badge';
import { Button } from '@petabase/components/ui/button';
import { Card } from '@petabase/components/ui/card';
import { StaggerGrid } from '@petabase/components/ui/stagger-grid';
import {
  activities,
  appointments,
  branches,
  getBranch,
  getPatient,
  getStaff,
  invoices,
  patients,
} from '@petabase/features/prototype/mock-data';
import { getMessages } from '@petabase/lib/i18n/dictionaries';
import { ensureLocale } from '@petabase/lib/i18n/locale';
import { withLocale } from '@petabase/lib/navigation/locale-path';

import {
  AlertTriangle,
  Banknote,
  Building2,
  CalendarDays,
  Heart,
  Receipt,
  Stethoscope,
  Users,
} from 'lucide-react';

type DashboardPageProps = {
  params: Promise<{ locale: string }>;
};

function formatTime(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'th' ? 'th-TH' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

type KpiCardProps = {
  icon: React.ReactNode;
  label: string;
  value: number;
  locale: string;
  format?: 'number' | 'currency';
  trend?: string;
};

function KpiCard({ icon, label, value, locale, format = 'number', trend }: KpiCardProps) {
  return (
    <Card className="grid gap-2">
      <div className="flex size-9 items-center justify-center rounded-[var(--pb-radius-md)] bg-[var(--pb-color-bg-soft)]">
        {icon}
      </div>
      <p className="text-xs font-medium uppercase tracking-[0.06em] text-[var(--pb-color-body)]">
        {label}
      </p>
      <p className="text-[clamp(1.6rem,3vw,2rem)] font-semibold leading-none tracking-[-0.02em] text-[var(--pb-color-heading)]">
        <AnimatedCounter value={value} locale={locale} format={format} />
      </p>
      {trend ? (
        <p className="text-xs text-[var(--pb-color-body)]">{trend}</p>
      ) : null}
    </Card>
  );
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const messages = await getMessages(locale);
  const isThai = locale === 'th';

  const staffCount =
    new Set(appointments.map((appointment) => appointment.doctorId)).size + 2;

  const todayRevenue = invoices.reduce((sum, invoice) => {
    const subtotal = invoice.lineItems.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0,
    );
    return sum + subtotal - invoice.discount;
  }, 0);

  return (
    <PageContainer title={messages.dashboard.title} description={messages.dashboard.subtitle}>
      <Card className="grid gap-5 border-[var(--pb-color-border-soft)] bg-[linear-gradient(145deg,rgb(255_255_255/0.98)_0%,rgb(248_251_255/1)_100%)] p-5 md:grid-cols-[1.4fr_minmax(240px,0.6fr)] md:items-end">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--pb-color-label)]">
            Petabase UI Prototype
          </p>
          <h2 className="mt-1 text-[clamp(1.4rem,2.4vw,1.8rem)] font-light leading-tight tracking-[-0.02em] text-[var(--pb-color-heading)]">
            {isThai
              ? 'ศูนย์ควบคุมงานคลินิกตั้งแต่การลงทะเบียนจนถึงชำระเงิน'
              : 'Clinic command center from check-in through billing'}
          </h2>
          <p className="mt-2 text-sm text-[var(--pb-color-body)]">
            {isThai
              ? 'ต้นแบบนี้เชื่อมแดชบอร์ด คนไข้ นัดหมาย การรักษา การเงิน และผู้ดูแลระบบไว้ภายใต้ locale-aware route เดียวกัน'
              : 'This prototype connects dashboard, patients, appointments, consultations, billing, and admin flows inside the same locale-aware route structure.'}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 rounded-[var(--pb-radius-lg)] border border-[var(--pb-color-border)] bg-[var(--pb-color-surface-card)] p-3 shadow-[var(--pb-elevation-1)]">
          <div className="grid gap-1">
            <p className="text-xs font-medium uppercase tracking-[0.06em] text-[var(--pb-color-body)]">
              {isThai ? 'คนไข้ทั้งหมด' : 'Patients tracked'}
            </p>
            <p className="text-[clamp(1.5rem,3vw,1.8rem)] font-semibold leading-none tracking-[-0.02em] text-[var(--pb-color-heading)]">
              <AnimatedCounter value={patients.length} locale={locale} />
            </p>
          </div>
          <div className="grid gap-1 border-l border-[var(--pb-color-border)] pl-3">
            <p className="text-xs font-medium uppercase tracking-[0.06em] text-[var(--pb-color-body)]">
              {isThai ? 'สาขาในระบบ' : 'Active branches'}
            </p>
            <p className="text-[clamp(1.5rem,3vw,1.8rem)] font-semibold leading-none tracking-[-0.02em] text-[var(--pb-color-heading)]">
              <AnimatedCounter value={branches.length} locale={locale} />
            </p>
          </div>
        </div>
      </Card>

      <StaggerGrid className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          icon={<CalendarDays className="size-4 text-[var(--pb-color-primary)]" />}
          label={isThai ? 'นัดหมายวันนี้' : 'Today appointments'}
          value={appointments.length}
          locale={locale}
          trend={isThai ? '1 เคสกำลังตรวจ' : '1 case in progress'}
        />
        <KpiCard
          icon={<Banknote className="size-4 text-[var(--pb-color-success-text)]" />}
          label={isThai ? 'รายได้ร่างวันนี้' : 'Draft revenue today'}
          value={todayRevenue}
          locale={locale}
          format="currency"
          trend="THB"
        />
        <KpiCard
          icon={<AlertTriangle className="size-4 text-[var(--pb-color-warning)]" />}
          label={isThai ? 'ใบแจ้งหนี้ค้างชำระ' : 'Overdue invoices'}
          value={1}
          locale={locale}
          trend={isThai ? 'ติดตามได้จาก Billing' : 'Follow up from Billing'}
        />
        <KpiCard
          icon={<Users className="size-4 text-[var(--pb-color-info)]" />}
          label={isThai ? 'ทีมงานพร้อมใช้งาน' : 'Staff on roster'}
          value={staffCount}
          locale={locale}
          trend={isThai ? 'ครอบคลุมหน้าฟรอนต์และแพทย์' : 'Covers front desk and doctors'}
        />
      </StaggerGrid>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <header className="grid gap-1.5 pb-3">
            <h2 className="text-lg font-light tracking-[-0.01em] text-[var(--pb-color-heading)]">
              {isThai ? 'นัดหมายวันนี้' : 'Today schedule'}
            </h2>
            <p className="text-sm text-[var(--pb-color-body)]">
              {isThai
                ? 'ดูภาพรวมแล้วเข้าโมดูลนัดหมายหรือ consultation ต่อได้ทันที'
                : 'Review today at a glance, then jump into appointments or consultation.'}
            </p>
          </header>
          <ul className="grid list-none gap-2.5">
            {appointments.map((appointment) => {
              const patient = getPatient(appointment.patientId);
              const doctor = getStaff(appointment.doctorId);
              return (
                <li
                  key={appointment.id}
                  className="grid gap-1 rounded-[var(--pb-radius-md)] border border-[var(--pb-color-border-soft)] bg-[linear-gradient(135deg,#ffffff_0%,#f8faff_100%)] px-3 py-2.5 transition-all duration-[var(--pb-duration-fast)] hover:border-[var(--pb-color-border-active)] hover:shadow-[var(--pb-shadow-soft)]"
                >
                  <p className="text-sm font-medium text-[var(--pb-color-heading)]">
                    {formatTime(appointment.startsAt, locale)} · {patient?.name} ·{' '}
                    {appointment.type}
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-[var(--pb-color-body)]">
                    {doctor?.name} · {appointment.room} ·{' '}
                    <Badge
                      className="align-middle"
                      variant={appointment.status === 'completed' ? 'success' : 'default'}
                    >
                      {appointment.status}
                    </Badge>
                  </p>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-start gap-2 pt-3">
            <Button asChild>
              <Link href={withLocale(locale, '/appointments')}>
                {isThai ? 'เปิดตารางนัดหมาย' : 'Open appointment board'}
              </Link>
            </Button>
          </div>
        </Card>

        <Card>
          <header className="grid gap-1.5 pb-3">
            <h2 className="text-lg font-light tracking-[-0.01em] text-[var(--pb-color-heading)]">
              {isThai ? 'กิจกรรมล่าสุด' : 'Recent activity'}
            </h2>
            <p className="text-sm text-[var(--pb-color-body)]">
              {isThai
                ? 'กิจกรรมข้ามโมดูลเพื่อทดสอบการเชื่อมโยงของต้นแบบ'
                : 'Cross-module activity to validate the connected prototype.'}
            </p>
          </header>
          <ul className="grid list-none gap-2.5">
            {activities.map((activity) => (
              <li
                key={activity.id}
                className="grid gap-1 rounded-[var(--pb-radius-md)] border border-[var(--pb-color-border-soft)] bg-[linear-gradient(135deg,#ffffff_0%,#f8faff_100%)] px-3 py-2.5 transition-all duration-[var(--pb-duration-fast)] hover:border-[var(--pb-color-border-active)] hover:shadow-[var(--pb-shadow-soft)]"
              >
                <p className="text-sm font-medium text-[var(--pb-color-heading)]">
                  {activity.at} · {activity.actor}
                </p>
                <p className="text-xs text-[var(--pb-color-body)]">{activity.title}</p>
                <p className="mt-0.5 text-[11px] text-[var(--pb-color-body)]">
                  {activity.detail}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <header className="grid gap-1.5 pb-3">
            <h2 className="text-lg font-light tracking-[-0.01em] text-[var(--pb-color-heading)]">
              {isThai ? 'ทางลัด workflow' : 'Workflow shortcuts'}
            </h2>
          </header>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <Link
              href={withLocale(locale, '/patients')}
              className="grid gap-1 rounded-[var(--pb-radius-md)] border border-[var(--pb-color-border)] bg-white p-3 transition-all duration-[var(--pb-duration-fast)] hover:border-[var(--pb-color-border-active)] hover:shadow-[var(--pb-shadow-soft)] hover:-translate-y-px"
            >
              <span className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-[var(--pb-radius-sm)] bg-[var(--pb-color-primary-soft)]">
                  <Heart className="size-3.5 text-[var(--pb-color-primary)]" />
                </span>
                <strong className="text-sm font-medium text-[var(--pb-color-heading)]">
                  {messages.nav.patients}
                </strong>
              </span>
              <span className="text-xs text-[var(--pb-color-body)]">
                {isThai ? 'ค้นหารายชื่อและโปรไฟล์คนไข้' : 'Browse list and patient profiles'}
              </span>
            </Link>
            <Link
              href={withLocale(locale, '/consultations')}
              className="grid gap-1 rounded-[var(--pb-radius-md)] border border-[var(--pb-color-border)] bg-white p-3 transition-all duration-[var(--pb-duration-fast)] hover:border-[var(--pb-color-border-active)] hover:shadow-[var(--pb-shadow-soft)] hover:-translate-y-px"
            >
              <span className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-[var(--pb-radius-sm)] bg-[var(--pb-color-success-soft)]">
                  <Stethoscope className="size-3.5 text-[var(--pb-color-success-text)]" />
                </span>
                <strong className="text-sm font-medium text-[var(--pb-color-heading)]">
                  {messages.nav.consultations}
                </strong>
              </span>
              <span className="text-xs text-[var(--pb-color-body)]">
                {isThai ? 'แก้ไข SOAP note และใบยา' : 'Edit SOAP notes and prescriptions'}
              </span>
            </Link>
            <Link
              href={withLocale(locale, '/billing')}
              className="grid gap-1 rounded-[var(--pb-radius-md)] border border-[var(--pb-color-border)] bg-white p-3 transition-all duration-[var(--pb-duration-fast)] hover:border-[var(--pb-color-border-active)] hover:shadow-[var(--pb-shadow-soft)] hover:-translate-y-px"
            >
              <span className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-[var(--pb-radius-sm)] bg-[var(--pb-color-warning-soft)]">
                  <Receipt className="size-3.5 text-[var(--pb-color-warning)]" />
                </span>
                <strong className="text-sm font-medium text-[var(--pb-color-heading)]">
                  {messages.nav.billing}
                </strong>
              </span>
              <span className="text-xs text-[var(--pb-color-body)]">
                {isThai ? 'ติดตาม invoice และรับชำระ' : 'Track invoices and record payments'}
              </span>
            </Link>
          </div>
        </Card>

        <Card>
          <header className="grid gap-1.5 pb-3">
            <h2 className="text-lg font-light tracking-[-0.01em] text-[var(--pb-color-heading)]">
              {isThai ? 'ความพร้อมรายสาขา' : 'Branch readiness'}
            </h2>
          </header>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {branches.map((branch) => (
              <article
                key={branch.id}
                className="grid gap-1 rounded-[var(--pb-radius-md)] border border-[var(--pb-color-border)] p-3 transition-all duration-[var(--pb-duration-fast)] hover:border-[var(--pb-color-border-soft)] hover:shadow-[var(--pb-shadow-soft)] hover:-translate-y-px"
              >
                <span className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-[var(--pb-radius-sm)] bg-[var(--pb-color-info-soft)]">
                    <Building2 className="size-3.5 text-[var(--pb-color-info)]" />
                  </span>
                  <span className="text-sm font-medium text-[var(--pb-color-heading)]">
                    {branch.name}
                  </span>
                </span>
                <p className="text-xs text-[var(--pb-color-body)]">
                  {branch.city} · {branch.type}
                </p>
                <p className="text-[11px] text-[var(--pb-color-body)]">{branch.manager}</p>
                <p>
                  <Badge variant="success">
                    {getBranch(branch.id)?.name
                      ? isThai
                        ? 'พร้อมต้นแบบ'
                        : 'Prototype ready'
                      : ''}
                  </Badge>
                </p>
              </article>
            ))}
          </div>
        </Card>
      </section>
    </PageContainer>
  );
}
