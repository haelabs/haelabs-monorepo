import { LoadingState } from '@petabase/components/feedback/loading-state';
import { getMessages } from '@petabase/lib/i18n/dictionaries';
import { DEFAULT_LOCALE } from '@petabase/lib/i18n/config';

export default async function LocaleLoading() {
  const messages = await getMessages(DEFAULT_LOCALE);
  return <LoadingState label={messages.states.loading} />;
}
