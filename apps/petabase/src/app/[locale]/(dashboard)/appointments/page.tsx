import { PageContainer } from '@petabase/components/layout/page-container';
import { PrototypeAppointmentsPage } from '@petabase/features/prototype/components/prototype-pages';
import { ensureLocale } from '@petabase/lib/i18n/locale';

type AppointmentsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AppointmentsPage({ params }: AppointmentsPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const isThai = locale === 'th';

  return (
    <PageContainer
      title={isThai ? 'ตารางนัดหมาย' : 'Appointment scheduling'}
      description={isThai ? 'มุมมอง day/week/month พร้อม time slot grid รายการนัดหมาย และฟอร์มสร้างนัดในหน้าเดียว' : 'Day/week/month views with a time-slot grid, filterable list, and prototype appointment form in one screen.'}
    >
      <PrototypeAppointmentsPage locale={locale} />
    </PageContainer>
  );
}
