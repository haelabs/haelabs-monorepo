import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

import { ErrorEnvelope } from '../../shared/response/response-envelope';

type ErrorPayload = ErrorEnvelope & {
  meta: {
    timestamp: string;
    path: string;
    requestId?: string;
  };
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const payload = this.buildPayload(exception, request, response);
    response.status(status).json(payload);
  }

  private buildPayload(exception: unknown, request: Request, response: Response): ErrorPayload {
    const responseRequestId = response.getHeader('x-request-id');
    const requestId =
      typeof responseRequestId === 'string' ? responseRequestId : request.header('x-request-id');

    if (exception instanceof HttpException) {
      const body = exception.getResponse();
      if (this.isErrorEnvelope(body)) {
        return {
          error: {
            ...body.error,
            details: this.sanitizeDetails(body.error.details),
          },
          meta: {
            timestamp: new Date().toISOString(),
            path: request.originalUrl,
            requestId,
          },
        };
      }

      const message =
        typeof body === 'string'
          ? body
          : typeof body === 'object' && body && 'message' in body
            ? String((body as { message: unknown }).message)
            : 'Request failed';

      const details = typeof body === 'object' ? body : undefined;
      return {
        error: {
          code: 'HTTP_ERROR',
          message,
          details: this.sanitizeDetails(details),
        },
        meta: {
          timestamp: new Date().toISOString(),
          path: request.originalUrl,
          requestId,
        },
      };
    }

    return {
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Unexpected error',
      },
      meta: {
        timestamp: new Date().toISOString(),
        path: request.originalUrl,
        requestId,
      },
    };
  }

  private isErrorEnvelope(
    payload: unknown,
  ): payload is { error: { code: string; message: string; details?: unknown } } {
    return (
      typeof payload === 'object' &&
      payload !== null &&
      'error' in payload &&
      typeof (payload as { error: unknown }).error === 'object' &&
      (payload as { error: unknown }).error !== null
    );
  }

  private sanitizeDetails(details: unknown): unknown {
    if (Array.isArray(details)) {
      return details.map((item) => this.sanitizeDetails(item));
    }

    if (details && typeof details === 'object') {
      const sanitized = Object.entries(details as Record<string, unknown>).reduce<Record<string, unknown>>(
        (acc, [key, value]) => {
          if (key === 'target' || key === 'value') {
            return acc;
          }

          acc[key] = this.sanitizeDetails(value);
          return acc;
        },
        {},
      );

      return sanitized;
    }

    return details;
  }
}
