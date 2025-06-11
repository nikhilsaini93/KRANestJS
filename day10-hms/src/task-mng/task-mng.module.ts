import { Module } from '@nestjs/common';
import { TaskMngController } from './task-mng.controller';
import { TaskMngService } from './task-mng.service';

@Module({
  controllers: [TaskMngController],
  providers: [TaskMngService]
})
export class TaskMngModule {}
