import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';

@Module({
  imports: [
     TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "admin",
      database: "mytestdb",
      entities: [Product],
      synchronize: true,
    }),
     ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class ProductsModule {}
