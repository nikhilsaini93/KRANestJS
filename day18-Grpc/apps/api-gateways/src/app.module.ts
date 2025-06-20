import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsController } from './products/products.controller';
// import { ProductsController } from '../../api-gateways/src/products/products.controller';

@Module({
  imports: [ClientsModule.register([
    {
      name: 'PRODUCT_PACKAGE',
      transport: Transport.GRPC,
      options: {
        package: 'product',
        protoPath: "../proto/product.proto",
      },
    }
  ]
  )],  
  controllers: [AppController,ProductsController],
  providers: [AppService],
})
export class AppModule {}
