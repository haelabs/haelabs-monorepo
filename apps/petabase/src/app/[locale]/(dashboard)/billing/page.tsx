import { PageContainer } from '@petabase/components/layout/page-container';
import { PrototypeBillingPage } from '@petabase/features/prototype/components/prototype-pages';
import { ensureLocale } from '@petabase/lib/i18n/locale';

type BillingPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function BillingPage({ params }: BillingPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const isThai = locale === 'th';

  return (
    <PageContainer
      title={isThai ? 'การเงินและใบแจ้งหนี้' : 'Billing and invoicing'}
      description={isThai ? 'สร้าง invoice จาก consultation ติดตามสถานะ draft/sent/paid/overdue และบันทึกรับชำระเงิน' : 'Create invoices from consultation, track draft/sent/paid/overdue states, and record payments.'}
    >
      <PrototypeBillingPage locale={locale} />
    </PageContainer>
  );
}
