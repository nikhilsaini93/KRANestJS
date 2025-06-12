import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChannelManagementService } from './channel-management.service';
import { CreateChannelManagementDto } from './DTO/OTA.dto';

@Controller('channel-management')
export class ChannelManagementController {

    constructor(private readonly channelManagementService: ChannelManagementService) {}

    @Get()
    async findAll(){
        return await this.channelManagementService.findAll()
}

@Post()
async createOTA(@Body() createChannelManagementDto: CreateChannelManagementDto){
    return await this.channelManagementService.createOTA(createChannelManagementDto)
}
}
