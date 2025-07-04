import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  await app.startAllMicroservices();
  await app.listen(process.env.port ?? 3000);

  console.log("api-gateway is running and listening on port 3000")
}
bootstrap();


