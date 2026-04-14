export type SuccessEnvelope<T> = {
  data: T;
  meta?: {
    timestamp?: string;
    requestId?: string;
  };
};

export type ErrorEnvelope = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    timestamp?: string;
    path?: string;
    requestId?: string;
  };
};
