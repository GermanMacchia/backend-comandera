import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { NotAllowedExceptionFilter } from './utils/notAllowedExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  const logger = new Logger('Main');

  app.set('trust proxy', 2);

  app.use(
    helmet({
      xXssProtection: false,
    }),
  );

  app.enableCors(config.get('app.cors'));

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.useGlobalFilters(new NotAllowedExceptionFilter());

  await app.listen(config.get('app.port'));

  logger.log('App started on ' + (await app.getUrl()));

  if (!config.get('throttle.active')) logger.warn('Throttle OFF');
}
bootstrap();
