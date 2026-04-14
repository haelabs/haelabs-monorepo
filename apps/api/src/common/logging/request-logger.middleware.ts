import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { NextFunction, Request, Response } from 'express';

import { AppLogger } from './app-logger.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: AppLogger) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const requestId = request.header('x-request-id') ?? randomUUID();
    const start = process.hrtime.bigint();

    response.setHeader('x-request-id', requestId);

    response.on('finish', () => {
      const durationNs = Number(process.hrtime.bigint() - start);
      const durationMs = Math.round((durationNs / 1_000_000) * 100) / 100;

      this.logger.child({
        requestId,
        method: request.method,
        path: request.originalUrl,
        statusCode: response.statusCode,
        durationMs,
      }).info({ message: 'request_completed' });
    });

    next();
  }
}
