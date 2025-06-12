import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomReservation } from './enitity/room-reservation';
import { Repository } from 'typeorm';
import { CreateRoomReservationDto } from './DTO/room_reservation.dto';

@Injectable()
export class RoomReservationService {
    constructor(@InjectRepository(RoomReservation)private readonly roomReservationRepository: Repository<RoomReservation>)
{}

    async findall() {
        return await this.roomReservationRepository.find({
            relations: {
                booking: true,
                channel_management: true,
                guest: true
            }
        });
    }

    async findById(id: number) {
        const roomReservation = await this.roomReservationRepository.findOne({
            where: { res_id: id },
            relations: {
                booking: true,
                channel_management: true,
                guest: false
            }
        });

        if(!roomReservation){
            throw new NotFoundException(`Room reservation with ID ${id} not found`)

        }
        return roomReservation;

    }


async createRoomReservation(createRoomReservationDto: CreateRoomReservationDto) {
  try {
    
    const roomReservation = this.roomReservationRepository.create({
      booking: { booking_id: createRoomReservationDto.bookingId },
      booking_type: createRoomReservationDto.booking_type,
      room_reservation_status: createRoomReservationDto.room_reservation_status,
      is_room_available: createRoomReservationDto.is_room_available,
      check_in: createRoomReservationDto.check_in,
      check_out_time: createRoomReservationDto.check_out_time,
      extra_fees: createRoomReservationDto.extra_fees,
      channel_management:
        createRoomReservationDto.booking_type === 'offline'
          ? undefined 
          : { channel_mng_id: createRoomReservationDto.channelManagementId },
    });

    const savedRoomReservation = await this.roomReservationRepository.save(roomReservation);

    return await this.roomReservationRepository.findOne({
      where: { res_id: savedRoomReservation.res_id },
      relations: {
        booking: true,
        channel_management: true,
        guest: true,
      },
    });
  } catch (error) {
    throw new BadRequestException(`Failed to create room reservation: ${error.message}`);
  }
}


  async postCheckInTime(id: number){
    try {
        const roomReservation = await this.findById(id)
        const updatepostdata = this.roomReservationRepository.merge(roomReservation)
        updatepostdata.check_in = new Date().toISOString()
        return await this.roomReservationRepository.save(updatepostdata)

        
    }catch(err){

    }


  }
  async postCheckOutTime(id: number){
    try {
        const roomReservation = await this.findById(id)
        const updatepostdata = this.roomReservationRepository.merge(roomReservation)
        const istDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        updatepostdata.check_out_time = new Date(istDate).toISOString()
        return await this.roomReservationRepository.save(updatepostdata)

        
    }catch(err){

    }


  }


}
