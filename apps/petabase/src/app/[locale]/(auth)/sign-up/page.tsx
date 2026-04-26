import Link from 'next/link';

import { SignUpForm } from '@petabase/features/auth/components/sign-up-form';
import { getMessages } from '@petabase/lib/i18n/dictionaries';
import { ensureLocale } from '@petabase/lib/i18n/locale';
import { withLocale } from '@petabase/lib/navigation/locale-path';

type SignUpPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function SignUpPage({ params }: SignUpPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const messages = await getMessages(locale);
  const signInHref = withLocale(locale, '/sign-in');
  const isThai = locale === 'th';

  return (
    <section className="grid w-full max-w-[1120px] gap-5">
      <header className="grid gap-2 rounded-[var(--pb-radius-md)] border border-[var(--pb-color-border-soft)] bg-[linear-gradient(165deg,rgb(255_255_255/0.95),rgb(247_250_255))] p-4 text-center shadow-[var(--pb-shadow-soft)]">
        <h1 className="text-[color:var(--pb-color-heading)] text-[clamp(1.8rem,4vw,2rem)] font-light tracking-[-0.64px]">
          {isThai ? 'สร้างบัญชีผู้ดูแลและเริ่มตั้งค่าคลินิก' : 'Create owner account and start clinic setup'}
        </h1>
        <p className="mx-auto max-w-[64ch] text-[color:var(--pb-color-body)]">
          {isThai
            ? 'ตั้งค่าองค์กร สาขาแรก และทีมงานก่อนเข้าโมดูลการปฏิบัติงานจริง'
            : 'Set your organization, first branch, and initial staff before operations modules.'}
        </p>
      </header>

      <SignUpForm locale={locale} />

      <p className="text-center text-sm text-[color:var(--pb-color-body)]">
        {isThai ? 'มีบัญชีอยู่แล้ว?' : 'Already have an account?'}{' '}
        <Link
          href={signInHref}
          className="font-normal text-[color:var(--pb-color-primary)] transition-colors duration-140 hover:text-[color:var(--pb-color-primary-deep)] focus-visible:outline-[var(--pb-focus-ring)] focus-visible:outline-offset-2 focus-visible:rounded-sm"
        >
          {messages.nav.signIn}
        </Link>
      </p>
    </section>
  );
}
