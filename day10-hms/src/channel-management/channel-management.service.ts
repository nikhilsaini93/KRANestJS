import { Injectable } from '@nestjs/common';
import { ChannelManagement } from './entity/channel-management.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateChannelManagementDto } from './DTO/OTA.dto';

@Injectable()
export class ChannelManagementService {
constructor(@InjectRepository(ChannelManagement)
private readonly channelManagementRepository: Repository<ChannelManagement>
){}


async findAll(){
    return await this.channelManagementRepository.find({
        relations: {
            customer: true,
            payment: true,
            room_reservations: true
        }
    })
}


async createOTA(createChannelManagementDto: CreateChannelManagementDto) {
    try {
        const channelManagement = this.channelManagementRepository.create({
            customer: { customer_id: createChannelManagementDto.customerId }, // Changed from customerId to customer_id
            ota: createChannelManagementDto.ota,
            room_type: createChannelManagementDto.room_type,
            isavailability: createChannelManagementDto.isavailability,
            date: createChannelManagementDto.date,
            amenities: createChannelManagementDto.amenities,
            total_bill: createChannelManagementDto.total_bill,
            payment: { id: createChannelManagementDto.paymentId } // Changed from paymentId to id
        });

        const savedChannel = await this.channelManagementRepository.save(channelManagement);
        
        return await this.channelManagementRepository.findOne({
            where: { channel_mng_id: savedChannel.channel_mng_id },
            relations: {
                customer: true,
                payment: true
            }
        });
    } catch (error) {
        throw new Error(`Failed to create channel management: ${error.message}`);
    }
}

}
