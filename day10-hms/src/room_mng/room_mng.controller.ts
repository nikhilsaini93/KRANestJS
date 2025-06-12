import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoomMngService } from './room_mng.service';
import { CreateRoomMngDto } from './DTO/room-mng.dto';
import { CreateLostFoundDto } from 'src/lost-found-management/DTO/lost-found-mng.dto';

@Controller('room-mng')
export class RoomMngController {
    constructor(private readonly roomMngService: RoomMngService) {}


    @Get()
    async findAllRoomMng() {
        return await this.roomMngService.findall();
    }

    @Get("lost-found")
    async findAllLostFound() {
        return await this.roomMngService.findallLostFound();
    }


    @Get(":id")
    async findRoomMngById(@Param("id") id: number) {
        return await this.roomMngService.findRoomMngById(+id);
    }

    @Get("lost-found/:id")
    async findLostFoundById(@Param("id") id: number) {
        return await this.roomMngService.findLostFoundById(+id);
    }


    @Post()
    async createRoomMng(@Body() createRoomMngDto: CreateRoomMngDto) {
        return await this.roomMngService.createRoommng(createRoomMngDto);
    }

    @Post("lost-found")
    async createlostFound(@Body() createLostFoundDto: CreateLostFoundDto) {
        return await this.roomMngService.createlostFound(createLostFoundDto);
    }

}














