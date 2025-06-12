import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GuestMng } from './enitity/guest-mng.entity';
import { Repository } from 'typeorm';
import { CreateGuestMngDto } from './DTO/guest-mng.dto';
import { ServiceRequests } from 'src/service-requests/enitity/service-req.entity';
import { CreateServiceDto } from 'src/service-requests/DTO/service.dto';

@Injectable()
export class GuestMngService {
    constructor(@InjectRepository(GuestMng)
    private readonly guestMngRepository: Repository<GuestMng> ,
    @InjectRepository(ServiceRequests)
    private readonly serviceRequestsRepository: Repository<ServiceRequests>){}

    async findall(){
        return await this.guestMngRepository.find();
    }

    async findById(id: number){
        const res = await this.guestMngRepository.findOne({where:{id}});
        if(!res){
            throw new NotFoundException(`guest not found for this ${id}`)
        }
        return res
    }


    async createGuest(createGuestDto: CreateGuestMngDto){
        try{
         const newguest = this.guestMngRepository.create({
            room_reservation_id: createGuestDto.room_reservation_id,
            special_req_preference: createGuestDto.special_req_preference,
            vip_access: createGuestDto.vip_access,
            feedback_id: createGuestDto.feedback_id,
            room_updated: createGuestDto.room_updated
        })
        return await this.guestMngRepository.save(newguest) 
         
        }

        catch(err){
            throw new BadRequestException(`error in creating  guest ${err.message}`)

        }
       

    }
    // ............................

    async findAllservice(){
        return await this.serviceRequestsRepository.find({
            relations: {
                guest: true
            }
        });

    }

    async findAllServicebyId(id: number){
        const res = await this.serviceRequestsRepository.findOne({where:{id}});
        if(!res){
            throw new NotFoundException(`service not found for this ${id}`)
        }
        return res
    }

   async findservicebyguestid(id : number){
    const res = await this.serviceRequestsRepository.find({where:{guest:{id}}});
    if(!res){
        throw new NotFoundException(`service not found for this ${id}`)
    }
    return res
   
    }
    async createservice(createservice: CreateServiceDto){
        try{
            const newservice = this.serviceRequestsRepository.create({
                guest:  {
                    id: createservice.guest_id,
                },
                service_type: createservice.service_type,
                description: createservice.description,
                status: createservice.status
            })
            return await this.serviceRequestsRepository.save(newservice) 
             
            }
            catch(err){
                throw new BadRequestException(`error in creating  service ${err.message}`)
    
            }
    
    }





   } 








