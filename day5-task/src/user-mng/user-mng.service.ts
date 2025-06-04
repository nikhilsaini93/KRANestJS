import { ConsoleLogger, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from './enitiies/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './DTO/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserMngService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    // async createUser(userDto: UserDto, currentUser: User) {
    //     if (currentUser.role === Role.ADMIN && userDto.role === Role.SUPERADMIN) {
    //         return this.createSuperAdmin(userDto, currentUser);
    //     } else if (currentUser.role === Role.SUPERADMIN && userDto.role === Role.CONTROLUSER) {
    //         return this.createControlUser(userDto, currentUser);
    //     } else if (currentUser.role === Role.CONTROLUSER && userDto.role === Role.EndUser) {
    //         return this.createEndUser(userDto, currentUser);
    //     }
    //     throw new Error('Unauthorized action');
    // }

    async createUser(userDto: UserDto, currentUser: User) {
        //  ADMIN can create SUPERADMIN
        if (currentUser.role === Role.ADMIN && userDto.role === Role.SUPERADMIN) {
            return this.createUserWithRole(userDto, currentUser, Role.SUPERADMIN);
        }

        // SUPERADMIN cannot create ADMIN
        if (currentUser.role === Role.SUPERADMIN && userDto.role === Role.ADMIN) {
            throw new ForbiddenException('SuperAdmins are not allowed to create Admins.');
        }

        // SUPERADMIN can create CONTROLUSER
        if (currentUser.role === Role.SUPERADMIN && userDto.role === Role.CONTROLUSER) {
            return this.createUserWithRole(userDto, currentUser, Role.CONTROLUSER);
        }

        //  CONTROLUSER cannot create SUPERADMIN or ADMIN
        if (currentUser.role === Role.CONTROLUSER && (userDto.role === Role.SUPERADMIN || userDto.role === Role.ADMIN)) {
            throw new ForbiddenException('ControlUser cannot create SuperAdmins or Admins.');
        }

        //  CONTROLUSER can create EndUser
        if (currentUser.role === Role.CONTROLUSER && userDto.role === Role.EndUser) {
            return this.createUserWithRole(userDto, currentUser, Role.EndUser);
        }

        //  EndUser cannot create any other user
        if (currentUser.role === Role.EndUser) {
            throw new ForbiddenException('EndUser cannot create any other users.');
        }

        //  All other combinations are forbidden
        throw new ForbiddenException('You are not permitted to create this type of user.');
    }

    async findAllUsers(currentUser: User) {
        return this.userRepository.find();
    }


    // async deactivateUser(userId: number, currentUser: User): Promise<void> {
    //     const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['createdById'] });
    //     if (!user) throw new Error('User not found');

    //     if (user.createdById.id !== currentUser.id) {
    //         throw new Error('Unauthorized to deactivate this user');
    //     }

    //     user.isActive = false;
    //     await this.userRepository.save(user);

    //     if (user.role === Role.CONTROLUSER) {
    //         const endUsers = await this.userRepository.find({
    //             where: {
    //                 createdById: user.id,
    //                 role: Role.EndUser
    //             }
    //         });
    //         for (const endUser of endUsers) {
    //             endUser.isActive = false;
    //             await this.userRepository.save(endUser);

    //         }
    //     }
    //     // }



    async deactivateUser(userId: number, currentUser: User) {
        // First find the user to deactivate
        if (currentUser.role === Role.EndUser) {
            throw new ForbiddenException("EndUser cannot deactivate users.");
        }
        const userToDeactivate = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['createdById']
        });

        if (!userToDeactivate) {
            throw new NotFoundException('User not found');
        }

        // Check authorization
        if (userToDeactivate.createdById.id !== currentUser.id) {
            throw new UnauthorizedException('Unauthorized to deactivate this user');
        }

        // Start cascading deactivation
        await this.cascadeDeactivate(userToDeactivate);
    }

    private async cascadeDeactivate(user: User): Promise<void> {
        // Deactivate the current user
        user.isActive = false;
        await this.userRepository.save(user);

        // Find and deactivate all users created by this user
        if (user.role === Role.SUPERADMIN) {
            // Find all ControlUsers created by this SuperAdmin
            const controlUsers = await this.userRepository.find({
                where: {
                    createdById: { id: user.id },
                    role: Role.CONTROLUSER
                }
            });

            // Recursively deactivate each ControlUser and their EndUsers
            for (const controlUser of controlUsers) {
                await this.cascadeDeactivate(controlUser);
            }
        }
        else if (user.role === Role.CONTROLUSER) {
            // Find and deactivate all EndUsers created by this ControlUser
            const endUsers = await this.userRepository.find({
                where: {
                    createdById: { id: user.id },
                    role: Role.EndUser
                }
            });

            for (const endUser of endUsers) {
                endUser.isActive = false;
                await this.userRepository.save(endUser);
            }
        }
    }

    // private async createSuperAdmin(userDto: UserDto, currentUser: User) {
    //     if (!currentUser?.id) {
    //         throw new Error('Current user ID is required');
    //     }

    //     const hashPassword = await this.hashPassword(userDto.password);
    //     const superAdmin = this.userRepository.create({
    //         username: userDto.username,
    //         password: hashPassword,
    //         role: Role.SUPERADMIN,
    //         isActive: true,
    //         createdById: { id: currentUser.id }
    //     });

    //     return this.userRepository.save(superAdmin);
    // }

    // private async createControlUser(userDto: UserDto, currentUser: User) {
    //     if (!currentUser?.id) {
    //         throw new Error('Current user ID is required');
    //     }

    //     const hashPassword = await this.hashPassword(userDto.password);
    //     const controlUser = this.userRepository.create({
    //         username: userDto.username,
    //         password: hashPassword,
    //         role: Role.CONTROLUSER,
    //         isActive: true,
    //         createdById:{ id: currentUser.id }
    //     });

    //     return this.userRepository.save(controlUser);
    // }

    // private async createEndUser(userDto: UserDto, currentUser: User) {
    //     if (!currentUser?.id) {
    //         throw new Error('Current user ID is required');
    //     }

    //     const hashPassword = await this.hashPassword(userDto.password);
    //     const endUser = this.userRepository.create({
    //         username: userDto.username,
    //         password: hashPassword,
    //         role: Role.EndUser,
    //         isActive: true,
    //         createdById: { id: currentUser.id }
    //     });

    //     return this.userRepository.save(endUser);
    // }

    private async createUserWithRole(userDto: UserDto, currentUser: User, role: Role) {
        if (!currentUser?.id) {
            throw new Error('Current user ID is required');
        }

        const hashPassword = await this.hashPassword(userDto.password);
        const newUser = this.userRepository.create({
            username: userDto.username,
            password: hashPassword,
            role: role,
            isActive: true,
            createdById: { id: currentUser.id },
        });

        return this.userRepository.save(newUser);
    }

    private async hashPassword(password: string) {
        return bcrypt.hash(password, 10);
    }
}

