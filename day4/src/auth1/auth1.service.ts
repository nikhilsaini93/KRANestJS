import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './DTO/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './DTO/login.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class Auth1Service {
    constructor(@InjectRepository(User)
    private userRepository: Repository<User> ,
    private readonly jwtService: JwtService, // Assuming you have JwtService injected for token generation
    ){
        bcrypt.hash('admin123', 10).then(console.log)
    }

    async register(registerDto: RegisterDto){
        const existingUser = await this.userRepository.findOne({
            where: { email: registerDto.email }})

            if(existingUser) {
                throw new Error('User already exists');
            }

            const user = new User();
       const hasedPassword = await this.hashPassword(registerDto.password);

       const newUser = this.userRepository.create({
            email: registerDto.email,
            password: hasedPassword,
           name : registerDto.name,
           role: UserRole.USER, // Default role
              createdAt: new Date(),
        });
        const saveduser = await this.userRepository.save(newUser);
        if (!saveduser) {
            throw new Error('User registration failed');
        }
        const {password , ...result} = saveduser
        return {
            message: 'User registered successfully',
            user: result
        }

        // return this.userRepository.save(newUser);

    }

async createAdmin(registerDto: RegisterDto) {
      const existingUser = await this.userRepository.findOne({
            where: { email: registerDto.email }})

            if(existingUser) {
                throw new Error('User already exists');
            }

            const user = new User();
       const hasedPassword = await this.hashPassword(registerDto.password);
          const newUser = this.userRepository.create({
            email: registerDto.email,
            password: hasedPassword,
           name : registerDto.name,
           role: UserRole.ADMIN,
              createdAt: new Date(),
        });
         const saveduser = await this.userRepository.save(newUser);
        if (!saveduser) {
            throw new Error('ADMIN registration failed');
        }
        const {password , ...result} = saveduser
        return {
            message: 'ADMIN registered successfully',
            user: result
        }

}

async login(logindto : LoginDto){
    const user = await this.userRepository.findOne({
        where: { email: logindto.email }
    });
    if (!user || !(await bcrypt.compare(logindto.password, user.password))) {
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


    async getUSerById(userId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId }
        });
        if (!user) {
            throw new Error('User not found');
        }
        const { password, ...result } = user;
        return result;
    }

    async refreshToken(userId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId }
        });
        if (!user) {
            throw new Error('User not found');
        }
        
        const token = this.generateToken(user);
        const { password, ...result } = user;
        return {
            message: 'Token refreshed successfully',
            user: result,
            ...token
        };

    }

    private async hashPassword(password: string): Promise<string> {
       return bcrypt.hash(password, 10);
}

private generateToken(user: User){
    return{
        accessToken : this.genrateAccessToken(user),
        refreshToken: this.generateRefreshToken(user)
    }
}
private genrateAccessToken(user: User): string {
    const payload = {
        sub: user.id,
        email: user.email,
        role: user.role
    };
    return this.jwtService.sign(payload,{
        secret: "your_jwt_secret", // Replace with your actual secret
        expiresIn: '15m' // Set the expiration time for the access token
    });
}
private generateRefreshToken(user: User): string {
    const payload = {
        sub: user.id,
       
    };
    return this.jwtService.sign(payload,{
        secret : "refersh_token_secret", // Replace with your actual secret
        expiresIn: '7d' // Set the expiration time for the refresh token
    })


}
}
