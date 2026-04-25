import { notFound } from 'next/navigation';

import { Card } from '@petabase/components/ui/card';
import { getInvoice, getInvoiceTotals, getOwner, getPatient } from '@petabase/features/prototype/mock-data';
import { ensureLocale } from '@petabase/lib/i18n/locale';

type InvoicePrintPageProps = {
  params: Promise<{ locale: string; invoiceId: string }>;
};

function formatCurrency(value: number, locale: string) {
  return new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', {
    style: 'currency',
    currency: 'THB',
  }).format(value);
}

export default async function InvoicePrintPage({ params }: InvoicePrintPageProps) {
  const { locale: localeParam, invoiceId } = await params;
  const locale = ensureLocale(localeParam);
  const isThai = locale === 'th';
  const invoice = getInvoice(invoiceId);

  if (!invoice) {
    notFound();
  }

  const patient = getPatient(invoice.patientId);
  const owner = getOwner(invoice.ownerId);
  const totals = getInvoiceTotals(invoice);

  return (
    <main className="pb-print-page">
      <Card className="pb-print-sheet">
        <header className="pb-section-header">
          <p className="pb-sidebar-kicker">{isThai ? 'ใบแจ้งหนี้สำหรับพิมพ์' : 'Invoice print view'}</p>
          <h1>{invoice.id}</h1>
          <p>{patient?.name} • {owner?.name}</p>
        </header>
        <section className="pb-print-block">
          <h2>{isThai ? 'รายการ' : 'Line items'}</h2>
          {invoice.lineItems.map((item) => (
            <p key={item.id}>{item.label} • {item.quantity} x {formatCurrency(item.unitPrice, locale)}</p>
          ))}
        </section>
        <section className="pb-print-block">
          <h2>{isThai ? 'สรุปยอด' : 'Totals'}</h2>
          <p>{isThai ? 'Subtotal' : 'Subtotal'}: {formatCurrency(totals.subtotal, locale)}</p>
          <p>{isThai ? 'ส่วนลด' : 'Discount'}: {formatCurrency(invoice.discount, locale)}</p>
          <p>Tax: {formatCurrency(totals.tax, locale)}</p>
          <p>{isThai ? 'ยอดสุทธิ' : 'Total'}: {formatCurrency(totals.total, locale)}</p>
          <p>{isThai ? 'ชำระแล้ว' : 'Paid'}: {formatCurrency(totals.paid, locale)}</p>
          <p>{isThai ? 'คงเหลือ' : 'Due'}: {formatCurrency(totals.due, locale)}</p>
        </section>
      </Card>
    </main>
  );
}
