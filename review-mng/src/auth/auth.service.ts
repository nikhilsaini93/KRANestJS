import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer as User} from 'src/customers/entities/customer.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './DTO/login.dto';
import { Business } from 'src/bussiness/entities/bussiness.entity';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Business) private bussRepository : Repository<Business>
    ) {
        // bcrypt.hash("teacher123" , 10 ).then(console.log)
    }

    // async login(loginDto :LoginDto){
    //     try{
    //         const user = await this.usersRepository.findOne({ where: { email: loginDto.email } });
    //         if(!user){
    //             throw new NotFoundException('User not found');
    //         }
    //         const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    //         if (!isPasswordValid) {
    //             throw new NotFoundException('Invalid password');
    //         }
    //         const payload = { sub: user.id, email : user.email };
    //         const token = await this.jwtService.signAsync(payload);

    //         return {
    //             message: 'Login successful',
    //             token,  
    //         };

    //     }catch(err){
    //               console.error('Login error:', err);
    //   throw err;
    //     }
    // }
    // async loginforBussiness(loginDto :LoginDto){
    //     try{
    //         const user = await this.bussRepository.findOne({ where: { email: loginDto.email } });
    //         if(!user){
    //             throw new NotFoundException('User not found');
    //         }
    //         const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    //         if (!isPasswordValid) {
    //             throw new NotFoundException('Invalid password');
    //         }
    //         const payload = { sub: user.id, email : user.email };
    //         const token = await this.jwtService.signAsync(payload);

    //         return {
    //             message: 'Login successful',
    //             token,  
    //         };

    //     }catch(err){
    //               console.error('Login error:', err);
    //   throw err;
    //     }
    // }
async login(loginDto: LoginDto) {
  let user ;
  if (loginDto.type === 'customer') {
    user = await this.usersRepository.findOne({ where: { email: loginDto.email } });
  } else {
    user = await this.bussRepository.findOne({ where: { email: loginDto.email } });
  }

  if (!user) throw new NotFoundException('User not found');

  const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
  if (!isPasswordValid) throw new NotFoundException('Invalid password');

  const payload = {
    sub: user.id,
    email: user.email,
    type: loginDto.type,
  };

  const token = await this.jwtService.signAsync(payload);

  return {
    message: 'Login successful',
    token,
  };
}

     async findUserById(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async findUserByIdforBusiness(id: number) {
    return await this.bussRepository.findOne({ where: { id } });
  }



}
