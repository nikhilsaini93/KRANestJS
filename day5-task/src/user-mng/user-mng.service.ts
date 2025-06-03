import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from './enitiies/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './DTO/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserMngService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(userDto: UserDto, currentUser: User) {
        if (currentUser.role === Role.ADMIN && userDto.role === Role.SUPERADMIN) {
            return this.createSuperAdmin(userDto, currentUser);
        } else if (currentUser.role === Role.SUPERADMIN && userDto.role === Role.CONTROLUSER) {
            return this.createControlUser(userDto, currentUser);
        } else if (currentUser.role === Role.CONTROLUSER && userDto.role === Role.EndUser) {
            return this.createEndUser(userDto, currentUser);
        }
        throw new Error('Unauthorized action');
    }

    async findAllUsers(currentUser: User) {
        return this.userRepository.find();
    }


    async deactivateUser(userId: number, currentUser: User): Promise<void> {
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['createdById'] });
        if (!user) throw new Error('User not found');

        if (user.createdById !== currentUser.id) {
            throw new Error('Unauthorized to deactivate this user');
        }

        user.isActive = false;
        await this.userRepository.save(user);

        if (user.role === Role.CONTROLUSER) {
            const endUsers = await this.userRepository.find({
                where: {
                    createdById: user.id,
                    role: Role.EndUser
                }
            });
            for (const endUser of endUsers) {
                endUser.isActive = false;
                await this.userRepository.save(endUser);

            }
        }
    }


    private async createSuperAdmin(userDto: UserDto, currentUser: User) {
        if (!currentUser?.id) {
            throw new Error('Current user ID is required');
        }

        const hashPassword = await this.hashPassword(userDto.password);
        const superAdmin = this.userRepository.create({
            username: userDto.username,
            password: hashPassword,
            role: Role.SUPERADMIN,
            isActive: true,
            createdById: currentUser.id
        });

        return this.userRepository.save(superAdmin);
    }

    private async createControlUser(userDto: UserDto, currentUser: User) {
        if (!currentUser?.id) {
            throw new Error('Current user ID is required');
        }

        const hashPassword = await this.hashPassword(userDto.password);
        const controlUser = this.userRepository.create({
            username: userDto.username,
            password: hashPassword,
            role: Role.CONTROLUSER,
            isActive: true,
            createdById: currentUser.id
        });

        return this.userRepository.save(controlUser);
    }

    private async createEndUser(userDto: UserDto, currentUser: User) {
        if (!currentUser?.id) {
            throw new Error('Current user ID is required');
        }

        const hashPassword = await this.hashPassword(userDto.password);
        const endUser = this.userRepository.create({
            username: userDto.username,
            password: hashPassword,
            role: Role.EndUser,
            isActive: true,
            createdById: currentUser.id
        });

        return this.userRepository.save(endUser);
    }

    private async hashPassword(password: string) {
        return bcrypt.hash(password, 10);
    }
}

