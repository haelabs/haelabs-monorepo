import { notFound } from 'next/navigation';

import { Card } from '@petabase/components/ui/card';
import { getConsultation, getPatient, getStaff } from '@petabase/features/prototype/mock-data';
import { ensureLocale } from '@petabase/lib/i18n/locale';

type ConsultationPrintPageProps = {
  params: Promise<{ locale: string; consultationId: string }>;
};

export default async function ConsultationPrintPage({ params }: ConsultationPrintPageProps) {
  const { locale: localeParam, consultationId } = await params;
  const locale = ensureLocale(localeParam);
  const isThai = locale === 'th';
  const consultation = getConsultation(consultationId);

  if (!consultation) {
    notFound();
  }

  const patient = getPatient(consultation.patientId);
  const doctor = getStaff(consultation.doctorId);

  return (
    <main className="pb-print-page">
      <Card className="pb-print-sheet">
        <header className="pb-section-header">
          <p className="pb-sidebar-kicker">{isThai ? 'ใบพิมพ์ Consultation' : 'Consultation print view'}</p>
          <h1>{patient?.name} • {consultation.id}</h1>
          <p>{doctor?.name} • {consultation.diagnosis}</p>
        </header>
        <section className="pb-print-block">
          <h2>SOAP</h2>
          <p><strong>Subjective:</strong> {consultation.soap.subjective}</p>
          <p><strong>Objective:</strong> {consultation.soap.objective}</p>
          <p><strong>Assessment:</strong> {consultation.soap.assessment}</p>
          <p><strong>Plan:</strong> {consultation.soap.plan}</p>
        </section>
        <section className="pb-print-block">
          <h2>{isThai ? 'Prescription' : 'Prescription'}</h2>
          {consultation.prescriptions.map((item) => (
            <p key={item.id}>{item.medication} • {item.dosage} • {item.frequency} • {item.duration}</p>
          ))}
        </section>
      </Card>
    </main>
  );
}
