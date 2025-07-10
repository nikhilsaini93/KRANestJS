import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewsModule } from './reviews/reviews.module';
import { CustomersModule } from './customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BussinessModule } from './bussiness/bussiness.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'admin',
      database: 'review-mng',
      autoLoadEntities: true,
      entities: [],
      synchronize: true,
    }),
    ReviewsModule, CustomersModule, BussinessModule , AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
