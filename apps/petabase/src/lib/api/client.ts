import { env } from '@petabase/lib/env';

type SuccessEnvelope<TData> = {
  data: TData;
  meta?: Record<string, unknown>;
};

type ErrorEnvelope = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export async function apiRequest<TData>(
  path: string,
  init?: RequestInit,
): Promise<SuccessEnvelope<TData>> {
  const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  const payload = (await response.json()) as SuccessEnvelope<TData> | ErrorEnvelope;

  if (!response.ok || 'error' in payload) {
    const message = 'error' in payload ? payload.error.message : 'Request failed';
    throw new Error(message);
  }

  return payload;
}
