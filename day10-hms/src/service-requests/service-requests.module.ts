import { Module } from '@nestjs/common';
import { ServiceRequestsController } from './service-requests.controller';
import { ServiceRequestsService } from './service-requests.service';

@Module({
  controllers: [ServiceRequestsController],
  providers: [ServiceRequestsService]
})
export class ServiceRequestsModule {}
