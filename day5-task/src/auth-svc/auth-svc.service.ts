import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user-mng/enitiies/user.entity';
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './DTO/login.dto';

@Injectable()
export class AuthSvcService {
   constructor(private jwtService: JwtService ,
    @InjectRepository(User) private userRepository: Repository<User>
   ){
    //   bcrypt.hash('admin123', 10).then(console.log)
   } 


   async login(loginDto : LoginDto){
    // const payLoad = {
    //     username: user.username,
    //     sub: user.id,
    //     role: user.role
    // }
    // return {
    //     access_token: this.jwtService.sign(payLoad)
    // }
    const user = await this.userRepository.findOne({
        where: { username: loginDto.username }
    });
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
        throw new Error('Invalid email or password');
    }
    const token = this.generateToken(user);


    const { password, ...result } = user;
    return {
        message: 'Login successful',
        user: result,
        ...token
    };
   }


   

  //   async validateUser(username: string, pass: string) {
  //   const user = await this.userRepository.findOne({ where: { username } });
  //   if (user && await bcrypt.compare(pass, user.password)) {
  //     return user;
  //   }
  //   return null;
  // }

//    async validateUser(username: string, pass: string): Promise<any> {
//     const user = await this.userRepository.findOne({ where: { username } });
//     console.log(user)
//     if (user && user.password === pass) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }
async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });

    // console.log('Validating user:', user);
    // console.log('Provided password:', pass);

    if (!user || typeof user.password !== 'string' || typeof pass !== 'string') {
        console.error('Invalid user or password types for bcrypt.compare');
        return null;
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) {
        const { password, ...result } = user;
        return result;
    }

    return null;
}

async findUserById(id: number): Promise<User | null> {
  return this.userRepository.findOne({ where: { id } });
}

  
private generateToken(user: User){
    return{
        accessToken : this.genrateAccessToken(user),
   
    }
}
private genrateAccessToken(user: User): string {
    const payload = {
        sub: user.id,
        email: user.username,
        role: user.role
    };
    return this.jwtService.sign(payload,{
        secret: "mySecretKey", 
        expiresIn: '15m' 
    });
}
}


