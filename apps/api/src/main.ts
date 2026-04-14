import 'reflect-metadata';

import { BadRequestException, ValidationError, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AppLogger } from './common/logging/app-logger.service';
import { ResponseEnvelopeInterceptor } from './common/interceptors/response-envelope.interceptor';
import { AppEnv } from './config/env.validation';

const API_PREFIX = 'api';
const API_VERSION = '1';

export function getRouteBase(): string {
  return `/${API_PREFIX}/v${API_VERSION}`;
}

export function buildCorsOriginValidator(corsOrigins: string[]): (origin: string | undefined) => boolean {
  return (origin: string | undefined) => !origin || corsOrigins.length === 0 || corsOrigins.includes(origin);
}

export async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(AppLogger);
  const config = app.get(ConfigService<AppEnv, true>);
  app.useLogger(logger);

  app.setGlobalPrefix(API_PREFIX);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: API_VERSION,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) =>
        new BadRequestException({
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Request validation failed',
            details: errors.map((error) => ({
              field: error.property,
              constraints: Object.values(error.constraints ?? {}),
            })),
          },
        }),
      validationError: {
        target: false,
        value: false,
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseEnvelopeInterceptor());

  const corsOrigins = config.get('CORS_ORIGINS', { infer: true });
  const isAllowedOrigin = buildCorsOriginValidator(corsOrigins);

  app.enableCors({
    origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin is not allowed by CORS'));
    },
    credentials: true,
  });

  const port = config.get('PORT', { infer: true });
  await app.listen(port);
  logger.log(`api_started port=${port} base=${getRouteBase()} env=${config.get('NODE_ENV', { infer: true })}`);
}

if (require.main === module) {
  void bootstrap();
}
