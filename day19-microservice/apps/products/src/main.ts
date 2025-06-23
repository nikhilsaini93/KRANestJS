import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PRODUCTS_PACKAGE_NAME } from '@app/common/types/product';

async function bootstrap() {
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ProductsModule, {
    transport:  Transport.GRPC,
    options:{
      protoPath: join(__dirname, '../product.proto'),
      package : PRODUCTS_PACKAGE_NAME,
      url : '0.0.0.0:5002',
    }

    
  });
  await app.listen();
}
bootstrap();
