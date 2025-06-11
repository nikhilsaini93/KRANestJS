import { Module } from '@nestjs/common';
import { StaffMngController } from './staff_mng.controller';
import { StaffMngService } from './staff_mng.service';

@Module({
  controllers: [StaffMngController],
  providers: [StaffMngService]
})
export class StaffMngModule {}
