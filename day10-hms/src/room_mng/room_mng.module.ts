import { Module } from '@nestjs/common';
import { RoomMngController } from './room_mng.controller';
import { RoomMngService } from './room_mng.service';

@Module({
  controllers: [RoomMngController],
  providers: [RoomMngService]
})
export class RoomMngModule {}
