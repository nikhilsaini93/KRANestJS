import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ProductsController } from '../../api-gateways/src/products/products.controller';
// import { UserApiController } from './users/users.controller';
import { join } from 'path';
import { UserApiController } from './user/user.controller';

@Module({
  imports: [ClientsModule.register([
    {
      name: 'PRODUCT_PACKAGE' , 
      transport: Transport.GRPC,    
      options: {
        package: 'product',
        protoPath: "../proto/product.proto",
        url: '0.0.0.0:3001',
      }
    },
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
   package: 'user',
      protoPath: "../proto/users.proto",
      url: '0.0.0.0:5001',
        },
      },
    
  ] 
  )],  
  controllers: [AppController,ProductsController, UserApiController],
  providers: [AppService],
})
export class AppModule {}
