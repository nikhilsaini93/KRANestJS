import { Module } from '@nestjs/common';
import { StudentSvcController } from './student-svc.controller';
import { StudentSvcService } from './student-svc.service';

@Module({
  controllers: [StudentSvcController],
  providers: [StudentSvcService]
})
export class StudentSvcModule {}
