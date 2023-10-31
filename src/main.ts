import * as dotenv from 'dotenv';
dotenv.config();
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './dispatcher/all.exceptions.filter';
import { swagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  app.enableCors();

  swagger(app);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.setGlobalPrefix('api');

  await app.listen(port);
  Logger.log(`App is listening on port ${port}`);
}
bootstrap();
