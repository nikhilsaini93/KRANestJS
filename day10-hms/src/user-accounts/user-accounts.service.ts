import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAccounts } from './enitity/user-account.entity';
import { Repository } from 'typeorm';
import { CreateUserAccountDto } from './DTO/user-account.dto';

@Injectable()
export class UserAccountsService {

    constructor(@InjectRepository(UserAccounts) private readonly userAccountsRepository: Repository<UserAccounts>){}

    async findall(){
        return await this.userAccountsRepository.find({
            relations :{
                staff : true
            }
        });

    }
    async findOne(id:number){
        return await this.userAccountsRepository.findOne({
            where :{
                id : id
            },
            relations :{
                staff : true
            }
        })
    }


        async registerUser(createUserDto : CreateUserAccountDto){
            const userAccount = this.userAccountsRepository.create({
                email : createUserDto.email,
                password : createUserDto.password,
                role : createUserDto.role,
                staff : {
                    staff_id : createUserDto.staff_id
                }
            });

            return await this.userAccountsRepository.save(userAccount);
        }


        




}
