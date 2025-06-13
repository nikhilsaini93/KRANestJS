import { Module } from '@nestjs/common';
import { StaffMngController } from './staff_mng.controller';
import { StaffMngService } from './staff_mng.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffMng } from './enitity/stff-mng.entity';
import { StaffAttendance } from 'src/staff-attendance/enitity/staff-attendence.entity';
import { StaffShifts } from 'src/staff-shifts/enitity/staff-shifts.entity';
import { TaskMng } from 'src/task-mng/enitity/task-mng.entity';

@Module({
  imports : [TypeOrmModule.forFeature([StaffMng , StaffAttendance , StaffShifts, TaskMng])],
  exports: [StaffMngService],
  controllers: [StaffMngController],
  providers: [StaffMngService]
})
export class StaffMngModule {}
