import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomService } from './enitity/room-service.entity';
import { Repository } from 'typeorm';
import { Menu } from 'src/menu/enitity/menu.entity';
import { KotGeneration } from 'src/kot-generation/enitity/kot-gen.entity';
import { error } from 'console';
import { CreateRoomServiceDto } from './DTO/room-service.dto';
import { CreateMenuDto } from 'src/menu/DTO/menu.dto';
import { CreateKtoDto } from 'src/kot-generation/DTO/kot.dto';

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

async createRoomService(createRoomService: CreateRoomServiceDto) {
    try {
        const newRoomService = this.roomServiceRepository.create({
            guest: { id: createRoomService.guest_id },
            staff: createRoomService.staff_ids.map(staffId => ({ staff_id: staffId })),
            table_id: createRoomService.table_id,
            menu: { menu_id: createRoomService.menu_id },
            total_bill: createRoomService.total_bill,
        });
        return await this.roomServiceRepository.save(newRoomService);
    } catch (error) {
        throw new Error(`Failed to create room service: ${error.message}`);
    }
}

async findallmenu(){
    return await this.menuRepository.find(
        { 
            relations:{
                roomServices : true,
            }
        }
    );

}




async findMenuById(id : number){
    const res = await this.menuRepository.findOne({where :{menu_id : id}});
    if(!res){
        throw new NotFoundException(`Menu with ID ${id} not found`)
    }
    return res
}


async createMenu(createMenu : CreateMenuDto){
    const newMenu = this.menuRepository.create({
        menu_type : createMenu.menu_type,
        price : createMenu.price,
        description : createMenu.description,
        
        
    });
    return await this.menuRepository.save(newMenu);
}

async findAllKot(){
    return await this.kotGenerationRepository.find({
        relations:{
            roomService : true,
        }
    }
    
)
}
async findKotById(id: number){
    const res = await this.kotGenerationRepository.findOne({where :{kot_id : id}});
    if(!res){
        throw new NotFoundException(`Kot with ID ${id} not found`)
    }
    return res


}


async createKot(createKotDto : CreateKtoDto){
    const newKot = this.kotGenerationRepository.create({
        
        order_time : createKotDto.order_time,
        servings : createKotDto.servings,
        roomService : {room_service_id : createKotDto.room_service_id},
        
    });
    return await this.kotGenerationRepository.save(newKot);
    }

}






