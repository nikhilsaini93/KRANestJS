import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports : [UsersService],
  imports: [forwardRef(() => ProductsModule)],
})
export class UsersModule {

}
