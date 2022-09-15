import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './app.http-exception-filter';
import { ResultInterceptor } from './app.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResultInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
