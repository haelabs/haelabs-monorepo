import { redirect } from 'next/navigation';

import { env } from '@petabase/lib/env';

export default function RootPage() {
  redirect(`/${env.NEXT_PUBLIC_DEFAULT_LOCALE}`);
}
