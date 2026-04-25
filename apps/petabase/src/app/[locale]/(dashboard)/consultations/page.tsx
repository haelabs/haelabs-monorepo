import { PageContainer } from '@petabase/components/layout/page-container';
import { PrototypeConsultationsPage } from '@petabase/features/prototype/components/prototype-pages';
import { ensureLocale } from '@petabase/lib/i18n/locale';

type ConsultationsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ConsultationsPage({ params }: ConsultationsPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const isThai = locale === 'th';

  return (
    <PageContainer
      title={isThai ? 'Consultation และ SOAP notes' : 'Consultation and SOAP notes'}
      description={isThai ? 'เปิดเคสจาก appointment หรือ patient profile เพื่อแก้ไข SOAP note ใบยา และสร้าง invoice ต่อได้' : 'Open cases from appointments or patient profiles to edit SOAP notes, prescriptions, and continue into invoice creation.'}
    >
      <PrototypeConsultationsPage locale={locale} />
    </PageContainer>
  );
}
