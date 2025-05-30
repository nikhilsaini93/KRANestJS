import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
   imports: [HttpModule, forwardRef(() => UsersModule)],
    providers: [ProductsService],
    controllers: [ProductsController],
    exports: [ProductsService]
})
export class ProductsModule {}
