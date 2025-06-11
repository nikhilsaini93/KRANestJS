import { Module } from '@nestjs/common';
import { GuestMngController } from './guest-mng.controller';
import { GuestMngService } from './guest-mng.service';

@Module({
  controllers: [GuestMngController],
  providers: [GuestMngService]
})
export class GuestMngModule {}
