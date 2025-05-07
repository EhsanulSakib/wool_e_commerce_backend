import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SuccessResponseInterceptor } from './interceptors/v1/success-response.interceptor';
import { GlobalExceptionFilter } from './filters/v1/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  app.useGlobalInterceptors(new SuccessResponseInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.setGlobalPrefix(process.env.GLOBAL_PREFIX || 'v1/api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
