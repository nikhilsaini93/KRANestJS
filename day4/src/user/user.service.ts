// import { Injectable } from '@nestjs/common';
// // import { UserDto } from './user.dto';

// @Injectable()
// export class UserService {
//     private users : {
//         id: number ;
//         username: string;
//         password: string;

//     }[] =[]


//     signup(username: string, password: string) {
//         const exist = this.users.find(user => user.username === username);
//         if (exist) {
//             throw new Error('User already exists');
//         }
//         const newUser = {
//             id: this.users.length + 1,
//             username,
//             password,
//         };
//         this.users.push(newUser);
//         return newUser;
//     }
//     login(username: string, password: string) {
//         const user = this.users.find(user => user.username === username && user.password === password);
//         if (!user) {
//             throw new Error('Invalid credentials');
//         }
//         return user;
//     }
//     findById(id: number) {
//     return this.users.find(u => u.id === id);
//   }
// }
 

//usee db 
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';


@Injectable()
export class UserService {
constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}


  async signup(username: string, password: string): Promise<User | null> {
    const exists = await this.userRepository.findOne({ where: { username } });
    if (exists) return null;
    const newUser = this.userRepository.create({ username, password });
    return await this.userRepository.save(newUser);
  }
  async validateUser(username: string, password: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username, password } });
  }
    async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }
}