import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { SuccessEnvelope } from '../../shared/response/response-envelope';

@Injectable()
export class ResponseEnvelopeInterceptor<T> implements NestInterceptor<T, SuccessEnvelope<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<SuccessEnvelope<T>> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse<{ getHeader: (key: string) => unknown }>();

    return next.handle().pipe(
      map((data) => {
        if (data instanceof StreamableFile) {
          return data as unknown as SuccessEnvelope<T>;
        }

        if (this.isEnvelope(data)) {
          return data;
        }

        const requestId = response.getHeader('x-request-id');

        return {
          data,
          meta: {
            timestamp: new Date().toISOString(),
            requestId: typeof requestId === 'string' ? requestId : undefined,
          },
        };
      }),
    );
  }

  private isEnvelope(payload: unknown): payload is SuccessEnvelope<T> {
    return typeof payload === 'object' && payload !== null && 'data' in payload && 'meta' in payload;
  }
}
