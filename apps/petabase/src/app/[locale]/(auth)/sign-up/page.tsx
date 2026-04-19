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
    <section className="pb-auth-stage pb-auth-stage-calm">
      <header className="pb-auth-header pb-auth-header-calm">
        <p className="pb-sidebar-kicker">Phase 1 Frontend Prototype</p>
        <h1>{isThai ? 'สร้างบัญชีผู้ดูแลและเริ่มตั้งค่าคลินิก' : 'Create owner account and start clinic setup'}</h1>
        <p>
          {isThai
            ? 'ตั้งค่าองค์กร สาขาแรก และทีมงานก่อนเข้าโมดูลการปฏิบัติงานจริง'
            : 'Set your organization, first branch, and initial staff before operations modules.'}
        </p>
      </header>

      <SignUpForm locale={locale} />

      <p className="pb-auth-inline-link">
        {isThai ? 'มีบัญชีอยู่แล้ว?' : 'Already have an account?'}{' '}
        <Link href={signInHref}>{messages.nav.signIn}</Link>
      </p>
    </section>
  );
}
