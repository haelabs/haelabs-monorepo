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

type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

function normalizeApiPath(path: string): string {
  const normalized = path.trim();

  if (normalized === '' || normalized === '/') {
    return '';
  }

  if (normalized.startsWith('?') || normalized.startsWith('#')) {
    return normalized;
  }

  return `/${normalized.replace(/^\/+/, '')}`;
}

function createApiUrl(path: string): string {
  return `${env.NEXT_PUBLIC_API_BASE_URL}${normalizeApiPath(path)}`;
}

export async function apiRequest<TData>(
  path: string,
  init?: RequestInit,
): Promise<SuccessEnvelope<TData>> {
  const response = await fetch(createApiUrl(path), {
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

export function apiGet<TData>(path: string, init?: Omit<RequestInit, 'method'>) {
  return apiRequest<TData>(path, {
    ...init,
    method: 'GET',
  });
}

export function apiPost<TData, TBody extends JsonValue = JsonValue>(
  path: string,
  body: TBody,
  init?: Omit<RequestInit, 'method' | 'body'>,
) {
  return apiRequest<TData>(path, {
    ...init,
    method: 'POST',
    body: JSON.stringify(body),
  });
}
