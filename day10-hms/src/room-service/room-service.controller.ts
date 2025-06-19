import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RoomServiceService } from './room-service.service';
import { CreateRoomServiceDto } from './DTO/room-service.dto';
import { get } from 'http';
import { CreateMenuDto } from 'src/menu/DTO/menu.dto';
import { CreateKtoDto } from 'src/kot-generation/DTO/kot.dto';
import { RolesGuard } from 'src/auth/guards/role.guards';
import { jwtAuthGuards } from 'src/auth/guards/auth.guards';
import { Role } from 'src/user-accounts/enitity/user-account.entity';
import { Roles } from 'src/auth/Decorators/roles.decorators';

@Controller('room-service')

export class RoomServiceController {
    constructor(private readonly roomServiceService: RoomServiceService) {}

    @Get()

    async findAllRoomservice() {
        return this.roomServiceService.findAllRoomservice();
    }

     @Get('menu')
    async findallmenu() {
        return this.roomServiceService.findallmenu();
    }

     @Get('menu/:id')
    async findMenuById(@Param('id') id: number) {
        return this.roomServiceService.findMenuById(+id);
    }

    
    @Get('kot')
    async findAllKot() {
        return this.roomServiceService.findAllKot();
    }

    @Get("kot/:id")
    async findKotById(@Param('id') id: number) {
        return this.roomServiceService.findKotById(+id);
    }

    @Get(':id')
    async findRoomServiceById(@Param('id') id: number) {
        return this.roomServiceService.findRoomServiceById(+id);
    }

    @Post()
 
    async createRoomService(@Body() createRoomServiceDto: CreateRoomServiceDto){
        return this.roomServiceService.createRoomService(createRoomServiceDto);
    }


   

   

    @Post('menu')
    async createMenu(@Body() createMenuDto: CreateMenuDto){
        return this.roomServiceService.createMenu(createMenuDto);
    }

@Post('kot')
    async createKot(@Body() createKotDto: CreateKtoDto){
        return this.roomServiceService.createKot(createKotDto);
    }









}
