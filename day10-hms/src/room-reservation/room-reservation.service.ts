import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomReservation } from './enitity/room-reservation';
import { Repository } from 'typeorm';
import { CreateRoomReservationDto } from './DTO/room_reservation.dto';
import { UpdateRoomReservationDto } from './DTO/update.room_reservation.dto';

@Injectable()
export class RoomReservationService {
  constructor(
    @InjectRepository(RoomReservation)
    private readonly roomReservationRepository: Repository<RoomReservation>,
  ) {}

  async findall() {
    try {
       return await this.roomReservationRepository.find({
      relations: {
        booking: true,
        channel_management: true,
        guest: true,
      },
    });
      
    } catch (error) {
      throw new BadRequestException(
        `Failed to retrieve room reservations: ${error.message}`,
      );
      
    }
   
  }

  async findById(id: number) {
    try {
      const roomReservation = await this.roomReservationRepository.findOne({
        where: { res_id: id },
        relations: {
          booking: true,
          channel_management: true,
          guest: false,
        },
      });

      if (!roomReservation) {
        throw new NotFoundException(`Room reservation with ID ${id} not found`);
      }
      return roomReservation;
    } catch (error) {
      throw new BadRequestException(
        `Failed to find room reservation: ${error.message}`,
      );
    }
  }

  async createRoomReservation(
    createRoomReservationDto: CreateRoomReservationDto,
  ) {
    try {
      const roomReservation = this.roomReservationRepository.create({
        booking: { booking_id: createRoomReservationDto.bookingId },
        booking_type: createRoomReservationDto.booking_type,
        room_reservation_status:
          createRoomReservationDto.room_reservation_status,
        is_room_available: createRoomReservationDto.is_room_available,
        check_in: createRoomReservationDto.check_in,
        check_out_time: createRoomReservationDto.check_out_time,
        extra_fees: createRoomReservationDto.extra_fees,
        channel_management:
          createRoomReservationDto.booking_type === 'offline'
            ? undefined
            : { channel_mng_id: createRoomReservationDto.channelManagementId },
      });

      const savedRoomReservation =
        await this.roomReservationRepository.save(roomReservation);

      return await this.roomReservationRepository.findOne({
        where: { res_id: savedRoomReservation.res_id },
        relations: {
          booking: true,
          channel_management: true,
          guest: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(
        `Failed to create room reservation: ${error.message}`,
      );
    }
  }

  async postCheckInTime(id: number) {
    try {
      const roomReservation = await this.findById(id);
      const updatepostdata =
        this.roomReservationRepository.merge(roomReservation);
      const istDate = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
      });
      console.log(istDate);
      updatepostdata.check_in = istDate;
      return await this.roomReservationRepository.save(updatepostdata);
    } catch (err) {
      throw new NotAcceptableException(
        `Failed to post check-in time: ${err.message}`,
      );
    }
  }
  async postCheckOutTime(id: number) {
    try {
      const roomReservation = await this.findById(id);
      console.log(roomReservation);
      const updatepostdata =
        this.roomReservationRepository.merge(roomReservation);
      const istDate = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
      });
      console.log(new Date(istDate));
      updatepostdata.check_out_time = istDate;
      return await this.roomReservationRepository.save(updatepostdata);
    } catch (err) {
      throw new NotAcceptableException(
        `Failed to post check-out time: ${err.message}`,
      );
    }
  }

  async updateRoomReservation(
    id: number,
    updateRoomReservationDto: UpdateRoomReservationDto,
  ) {
    const roomReservation = await this.findById(id);
    if (!roomReservation) {
      throw new NotFoundException(`Room reservation with ID ${id} not found`);
    }
    const updatedRoomReservation = this.roomReservationRepository.merge(
      roomReservation,
      updateRoomReservationDto,
    );
    return await this.roomReservationRepository.save(updatedRoomReservation);
  }

  async deleteRoomReservation(id: number) {
    try {
      const roomReservation = await this.findById(id);
      if (!roomReservation) {
        throw new NotFoundException(`Room reservation with ID ${id} not found`);
      }
      await this.roomReservationRepository.delete(id);
      return { message: `Room reservation with ID ${id} deleted successfully` };
    } catch (error) {
      throw new NotAcceptableException(
        `Failed to delete room reservation: ${error.message}`,
      );
    }
  }

  async changeRoomReservationStatus(id: number, status: string) {
    try {
      const roomReservation = await this.findById(id);
      if (!roomReservation) {
        throw new NotFoundException(`Room reservation with ID ${id} not found`);
      }
      roomReservation.room_reservation_status = status;
      return await this.roomReservationRepository.save(roomReservation);
    } catch (error) {
      throw new NotAcceptableException(
        `Failed to change room reservation status: ${error.message}`,
      );
    }
  }
}
