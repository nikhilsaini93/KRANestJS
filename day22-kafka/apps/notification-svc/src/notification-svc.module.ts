import { Module } from '@nestjs/common';
import { NotificationSvcController } from './notification-svc.controller';
import { NotificationSvcService } from './notification-svc.service';

@Module({
  imports: [],
  controllers: [NotificationSvcController],
  providers: [NotificationSvcService],
})
export class NotificationSvcModule {}
