import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBussinessDto } from './dto/create-bussiness.dto';
import { UpdateBussinessDto } from './dto/update-bussiness.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './entities/bussiness.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class BussinessService {
  constructor(@InjectRepository(Business) private readonly businessRepository: Repository<Business>){}


  async create(createBussinessDto: CreateBussinessDto) {
    try{
      const hashedPassword = await bcrypt.hash(createBussinessDto.password, 10);
      if (!hashedPassword) {
        throw new ForbiddenException('Failed to hash password');
      }

      const bussiness = this.businessRepository.create({
        ...createBussinessDto,
        password: hashedPassword,
      });
      await this.businessRepository.save(bussiness);
      return{
        success : true,
        messgae : "bussiness create"
      }

    }catch(error){
       return {
      sucess : false,
      error : error.message
     }
    }
  }

  async findAll() {
   try {
    const list = await this.businessRepository.find()
   return {
    success : true,
    data : list
   }
   } catch (error) {
    return {
      sucess : false,
      error : error.message
     }
   }
  }

  async findOne(id: number) {
   try {
    const res = await this.businessRepository.findOne({where : {id}})
   if(!res){
    throw new NotFoundException("bussiness not found")
   }
   return {
    success : true,
    data : res

   }
   } catch (error) {
    return {
      sucess : false,
      error : error.message
     }
   }
 
  }

  async update(id: number, updateBussinessDto: UpdateBussinessDto) {
    try {
      const findB = this.findOne(id)
    if(!findB){
      throw new NotFoundException("bussiness not found")
    }
    await this.businessRepository.update(id,updateBussinessDto)
    return {
      success : true,
      message : "bussiness updated"
    }
    } catch (error) {
      return {
        sucess : false,
        error : error.message
       }
      
    }
  }

  async remove(id: number) {
    try {
        const findB = this.findOne(id)
    if(!findB){
      throw new NotFoundException("bussiness not found")
    }
    await this.businessRepository.delete(id)
    return{
      success : true,
      message : "bussiness deleted"
    }
    } catch (error) {
      return {
        sucess : false,
        error : error.message
       }
    }

  }
}
