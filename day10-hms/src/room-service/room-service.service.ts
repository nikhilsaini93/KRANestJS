import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomService } from './enitity/room-service.entity';
import { Repository } from 'typeorm';
import { Menu } from 'src/menu/enitity/menu.entity';
import { KotGeneration } from 'src/kot-generation/enitity/kot-gen.entity';
import { error } from 'console';
import { CreateRoomServiceDto } from './DTO/room-service.dto';

@Injectable()
export class RoomServiceService {
    constructor(@InjectRepository(RoomService) private readonly roomServiceRepository: Repository<RoomService>,
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
    @InjectRepository(KotGeneration) private readonly kotGenerationRepository: Repository<KotGeneration>,
){}


async findAllRoomservice(){
    return await this.roomServiceRepository.find({
        relations:{
            guest : true,
            staff : true,
            menu : true,
            ticketOrdersid : true,
        }
    }
    );

}

async findRoomServiceById(id : number){
    const res = await this.roomServiceRepository.findOne({where :{room_service_id : id},
        relations:{
            guest : true,
            staff : true,
            menu : true,
            ticketOrdersid : true,
        }
    
    });
    if(!res){
        throw new NotFoundException(`Room service with ID ${id} not found`)
    }
    return res
}


async createRoomService(createRoomService : CreateRoomServiceDto){
    const newRoomService = this.roomServiceRepository.create({
        guest : {id : createRoomService.guest_id},
        staff : createRoomService.staff_ids.map(staffId => ({id : staffId})),
        table_id : Date.now(),
        menu : {menu_id : createRoomService.menu_id},
        total_bill : createRoomService.total_bill,

    });
    return await this.roomServiceRepository.save(newRoomService);
}

async findallmenu(){
    return await this.menuRepository.find();

}




async findMenuById(id : number){
    const res = await this.menuRepository.findOne({where :{menu_id : id}});
    if(!res){
        throw new NotFoundException(`Menu with ID ${id} not found`)
    }
    return res
}


// async createMenu(createMenu : CreateRoomServiceDto){
//     const newMenu = this.menuRepository.create({
//         menu_name : createMenu.menu_name,
//         price : createMenu.price,
//         quantity : createMenu.quantity,
        
//     });
//     return await this.menuRepository.save(newMenu);
// }




}






