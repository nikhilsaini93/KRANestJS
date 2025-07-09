import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './DTO/login.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {
        bcrypt.hash("teacher123" , 10 ).then(console.log)
    }

    async login(loginDto :LoginDto){
        try{
            const user = await this.usersRepository.findOne({ where: { email: loginDto.email } });
            if(!user){
                throw new NotFoundException('User not found');
            }
            const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
            if (!isPasswordValid) {
                throw new NotFoundException('Invalid password');
            }
            const payload = { sub: user.id, role: user.role , email : user.email };
            const token = await this.jwtService.signAsync(payload);

            return {
                message: 'Login successful',
                token,  
            };

        }catch(err){
                  console.error('Login error:', err);
      throw err;
        }
    }


     async findUserById(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }


}
