import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001);
  Logger.log(
    `Application is running on port ${process.env.PORT ?? 3001}`
  )
}
bootstrap();
