'use client';

import { useState } from 'react';

import { Button } from '@petabase/components/ui/button';
import { Card } from '@petabase/components/ui/card';
import { Input } from '@petabase/components/ui/input';
import { useToast } from '@petabase/components/ui/toast-provider';
import type { MessageCatalog } from '@petabase/types/i18n';

type SignInFormProps = {
  messages: MessageCatalog;
};

export function SignInForm({ messages }: SignInFormProps) {
  const [loading, setLoading] = useState(false);
  const { push } = useToast();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 400));

    push('Auth placeholder complete. Wire API login next.');
    setLoading(false);
  }

  return (
    <Card className="pb-auth-card">
      <form className="pb-auth-form" onSubmit={onSubmit}>
        <label htmlFor="email">{messages.auth.emailLabel}</label>
        <Input id="email" type="email" name="email" required />

        <label htmlFor="password">{messages.auth.passwordLabel}</label>
        <Input id="password" type="password" name="password" required />

        <Button type="submit" disabled={loading}>
          {loading ? messages.states.loading : messages.auth.submit}
        </Button>
      </form>
    </Card>
  );
}
