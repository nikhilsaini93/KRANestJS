import { Module } from '@nestjs/common';
import { BussinessService } from './bussiness.service';
import { BussinessController } from './bussiness.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './entities/bussiness.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Business])],
  controllers: [BussinessController],
  providers: [BussinessService],
})
export class BussinessModule {}
