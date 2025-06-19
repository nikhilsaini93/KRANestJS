import { Module } from '@nestjs/common';
import { GuestMngController } from './guest-mng.controller';
import { GuestMngService } from './guest-mng.service';
import { TypeORMError } from 'typeorm';
import { GuestMng } from './enitity/guest-mng.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceRequests } from 'src/service-requests/enitity/service-req.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([GuestMng , ServiceRequests]) , AuthModule],
    controllers: [GuestMngController],
  providers: [GuestMngService]
})
export class GuestMngModule {}
