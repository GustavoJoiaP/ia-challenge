import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { environment } from '../../shared/infrastructure/env/environment';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: environment.databaseUrl,
        },
      },
    });
  }
}
