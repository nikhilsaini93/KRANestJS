import { Module } from '@nestjs/common';
import { RoomServiceController } from './room-service.controller';
import { RoomServiceService } from './room-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomService } from './enitity/room-service.entity';
import { Menu } from 'src/menu/enitity/menu.entity';
import { KotGeneration } from 'src/kot-generation/enitity/kot-gen.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoomService , Menu , KotGeneration]) , AuthModule],
  controllers: [RoomServiceController],
  providers: [RoomServiceService]
})
export class RoomServiceModule {}
