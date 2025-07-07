import { NestFactory } from '@nestjs/core';
import { ApigatewayModule } from './apigateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApigatewayModule);
  await app.listen(process.env.port ?? 3001);
  console.log(`API Gateway is running on: http://localhost:${process.env.port ?? 3001}`);
}
bootstrap();
