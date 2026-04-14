import { redirect } from 'next/navigation';

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;
  redirect(`/${locale}/dashboard`);
}
