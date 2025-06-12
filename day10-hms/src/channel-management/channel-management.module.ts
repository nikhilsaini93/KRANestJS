import { Module } from '@nestjs/common';
import { ChannelManagementController } from './channel-management.controller';
import { ChannelManagementService } from './channel-management.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelManagement } from './entity/channel-management.entity';

@Module({
  imports : [TypeOrmModule.forFeature([ChannelManagement])],
  controllers: [ChannelManagementController],
  providers: [ChannelManagementService]
})
export class ChannelManagementModule {}
