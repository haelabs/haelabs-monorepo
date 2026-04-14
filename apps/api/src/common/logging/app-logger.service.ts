import { Injectable, LoggerService } from '@nestjs/common';
import pino, { Logger } from 'pino';

@Injectable()
export class AppLogger implements LoggerService {
  private readonly logger: Logger;

  constructor() {
    this.logger = pino({
      level: process.env.LOG_LEVEL ?? 'info',
      base: {
        service: process.env.APP_NAME ?? 'haelabs-api',
      },
      timestamp: pino.stdTimeFunctions.isoTime,
    });
  }

  log(message: string): void {
    this.logger.info({ message });
  }

  error(message: string, trace?: string): void {
    this.logger.error({ message, trace });
  }

  warn(message: string): void {
    this.logger.warn({ message });
  }

  debug(message: string): void {
    this.logger.debug({ message });
  }

  verbose(message: string): void {
    this.logger.trace({ message });
  }

  child(bindings: Record<string, unknown>): Logger {
    return this.logger.child(bindings);
  }
}
