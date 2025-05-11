import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './shared/infrastructure/env/environment';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });
  await app.listen(environment.port);
}
void bootstrap();
