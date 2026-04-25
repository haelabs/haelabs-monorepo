import { PageContainer } from '@petabase/components/layout/page-container';
import { PrototypePatientsPage } from '@petabase/features/prototype/components/prototype-pages';
import { ensureLocale } from '@petabase/lib/i18n/locale';

type PatientsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function PatientsPage({ params }: PatientsPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const isThai = locale === 'th';

  return (
    <PageContainer
      title={isThai ? 'จัดการคนไข้และเจ้าของ' : 'Patient and owner management'}
      description={isThai ? 'ค้นหา กรอง และเชื่อมข้อมูลเจ้าของกับโปรไฟล์คนไข้ในต้นแบบเดียวกัน' : 'Search, filter, and connect owner records to patient profiles in the same prototype surface.'}
    >
      <PrototypePatientsPage locale={locale} />
    </PageContainer>
  );
}
