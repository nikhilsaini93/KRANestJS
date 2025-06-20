import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
    Logger.log('API nettewayservice is running on grpc');
  console.log(`API netteway is running on port 3002` );
}
bootstrap();
