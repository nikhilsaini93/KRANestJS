import { Module } from '@nestjs/common';
import { RoomMngController } from './room_mng.controller';
import { RoomMngService } from './room_mng.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomMng } from './enitity/room-mng.entity';
import { LostFoundManagement } from 'src/lost-found-management/enitity/lost-found-mng.entity';
import { HousekeepingTask } from 'src/houseKeeping/enitity/houseKeeping.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [TypeOrmModule.forFeature([RoomMng , LostFoundManagement, HousekeepingTask]) , AuthModule],
  controllers: [RoomMngController],
  providers: [RoomMngService]
})
export class RoomMngModule {}
