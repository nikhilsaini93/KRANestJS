import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomMng } from './enitity/room-mng.entity';
import { Repository } from 'typeorm';
import { LostFoundManagement } from 'src/lost-found-management/enitity/lost-found-mng.entity';
import { CreateRoomMngDto } from './DTO/room-mng.dto';
import { CreateLostFoundDto } from 'src/lost-found-management/DTO/lost-found-mng.dto';

@Injectable()
export class RoomMngService {
    constructor(@InjectRepository(RoomMng) private readonly roomMngRepository: Repository<RoomMng> ,
    @InjectRepository(LostFoundManagement) private readonly lostFoundManagementRepository: Repository<LostFoundManagement>){}



    async findall(){
        return await this.roomMngRepository.find();
    }


    async findRoomMngById(id: number){
        const res =  await this.roomMngRepository.findOne({where : {room_number : id}})
        if(!res) {
            throw new NotFoundException(`Room not found with id ${id}`)

        }
        return res
    }

    async createRoommng(createRoomMngDto: CreateRoomMngDto){
        const newRoomMng = this.roomMngRepository.create({
            
            room_status_cleaning : createRoomMngDto.room_status_cleaning,
            housekeeping_task_assign_id : createRoomMngDto.housekeeping_task_assign_id,
            room_inspection : createRoomMngDto.room_inspection,
            guest : { id : createRoomMngDto.assigned_guest_id}
        
        });
        return await this.roomMngRepository.save(newRoomMng);
    }

    async findallLostFound(){
        return await this.lostFoundManagementRepository.find();
    }


    async findLostFoundById(id: number){
        const res =  await this.lostFoundManagementRepository.findOne({where : {id : id}})
        if(!res) {
            throw new NotFoundException(`Lost Found not found with id ${id}`)

        }
        return res  
    }


    async createlostFound(createLostFoundDto: CreateLostFoundDto){
        const newLostFound = this.lostFoundManagementRepository.create({
            room : {room_number : createLostFoundDto.room_id},
            item_description : createLostFoundDto.item_description,
            date_found : createLostFoundDto.date_found,
            status : createLostFoundDto.status
        });
        return await this.lostFoundManagementRepository.save(newLostFound);
    }


}
