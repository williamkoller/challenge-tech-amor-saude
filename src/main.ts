import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ModelNotFoundException } from './common/filters/model-not-found.exception.filter';
import { HttpAllExceptionFilter } from './common/filters/http-all-exception.filter';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<number>('PORT');
  const appUrl = config.get<string>('APP_URL');

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(
    new ModelNotFoundException(),
    new HttpAllExceptionFilter(),
  );

  app.enableCors({
    allowedHeaders: '*',
    exposedHeaders: '*',
  });

  await app.listen(port, () =>
    logger.log(`[WEB] Server running at ${appUrl}:${port}`),
  );
}
bootstrap();
