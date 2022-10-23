require('dotenv').config();

if (!process.env.JWT_SECRET) {
  console.error('You need to set JWT_SECRET environment variable!');
  process.exit(1);
}

import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './app.http-exception-filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
