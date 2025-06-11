import { Module } from '@nestjs/common';
import { ChannelManagementController } from './channel-management.controller';
import { ChannelManagementService } from './channel-management.service';

@Module({
  controllers: [ChannelManagementController],
  providers: [ChannelManagementService]
})
export class ChannelManagementModule {}
