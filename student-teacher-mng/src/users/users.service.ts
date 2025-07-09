import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import cloudinary from './claudnaryconfig/claudinary';
import { Readable } from 'stream';
import { uploadToCloudinary } from './claudnaryconfig/cloudinary-upload';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  // async create(createUserDto: CreateUserDto , currentUser : User) {
  //   try {
  //     // console.log(currentUser , createUserDto)

  //     const profilePic = createUserDto.profileImageUrl ;
  //     console.log(profilePic)

  //     let imageUrl = ""
  //     if(profilePic){
  //       const res = await cloudinary.uploader.upload(profilePic,{

  //       });
  //       imageUrl = res.secure_url;
  //     }
  //     console.log(imageUrl)

  //     const newUser = this.usersRepository.create({
  //       ...createUserDto,
  //       role : currentUser.role ,
  //       profileImageUrl : imageUrl,

  //     });
  //     console.log(newUser)
  //     return this.usersRepository.save(newUser);

  //   } catch (error) {
  //       console.error('Error creating user:', error);
  //     throw new Error('Failed to create user');
  //   }
  // }

  // ...existing code...
  async create(
    createUserDto: CreateUserDto,
    currentUser: User,
    file?: Express.Multer.File,
  ) {
    try {
      if (
        currentUser.role === UserRole.ADMIN &&
        createUserDto.role == UserRole.TEACHER
      ) {
        return this.createUserWithRole(
          createUserDto,
          currentUser,
          UserRole.TEACHER,
          file,
          
        );
      }

       if(currentUser.role === UserRole.TEACHER && createUserDto.role == UserRole.ADMIN){
        throw new ForbiddenException("Teacher not allowed to make admin ")

       }

       //teacher make student 
          if (
        currentUser.role === UserRole.TEACHER &&
        createUserDto.role == UserRole.STUDENT
      ) {
        return this.createUserWithRole(
          createUserDto,
          currentUser,
          UserRole.STUDENT,
          file,
          
        );
      }
      //admin make studendt
         if (
        currentUser.role === UserRole.ADMIN &&
        createUserDto.role == UserRole.STUDENT
      ) {
        return this.createUserWithRole(
          createUserDto,
          currentUser,
           UserRole.STUDENT,
          file,
         
        );
      }

      if(currentUser.role === UserRole.STUDENT){
        throw new ForbiddenException("Student cannot create any other users")
      }

      throw new ForbiddenException("You are not permitted to create this type of user.")

       

      
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async createUserWithRole(createUserDto : CreateUserDto , currentUser,  role :UserRole , file? : Express.Multer.File) {
    let imageUrl = '';

      if (file) {
        console.log('Uploading file to Cloudinary...');
        imageUrl = await uploadToCloudinary(file);
        console.log('Upload success:', imageUrl);
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      if (!hashedPassword) {
        throw new ForbiddenException('Failed to hash password');
      }

      const newUser = this.usersRepository.create({
        ...createUserDto,
        password: hashedPassword,
        role: role,
        profileImageUrl: imageUrl,
      });

      return await this.usersRepository.save(newUser);
  }
}
