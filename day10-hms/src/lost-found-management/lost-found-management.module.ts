import { Module } from '@nestjs/common';
import { LostFoundManagementController } from './lost-found-management.controller';
import { LostFoundManagementService } from './lost-found-management.service';

@Module({
  controllers: [LostFoundManagementController],
  providers: [LostFoundManagementService]
})
export class LostFoundManagementModule {}
