import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppEnv } from '../config/env.validation';

@Injectable()
export class HealthService {
  constructor(private readonly config: ConfigService<AppEnv, true>) {}

  getHealth() {
    return {
      status: 'ok',
      service: this.config.get('APP_NAME', { infer: true }),
      version: this.config.get('API_VERSION', { infer: true }),
      database: {
        ready: false,
        status: 'not_configured',
      },
    };
  }
}
