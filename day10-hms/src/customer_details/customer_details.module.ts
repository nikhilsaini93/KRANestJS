import { Module } from '@nestjs/common';
import { CustomerDetailsController } from './customer_details.controller';
import { CustomerDetailsService } from './customer_details.service';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entity/customer_details.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerDetailsController],
  providers: [CustomerDetailsService],
  exports: [CustomerDetailsService],
})
export class CustomerDetailsModule {}
