import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAccounts } from 'src/user-accounts/enitity/user-account.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './DTO/login.dto';
import * as bcrypt from 'bcrypt';
import { AuditLogs } from 'src/audit-logs/entity/audit-logs.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserAccounts)
    private readonly userAccountsRepository: Repository<UserAccounts>,
    @InjectRepository(AuditLogs)
    private readonly auditLogsRepository: Repository<AuditLogs>,
  ) {
    bcrypt.hash('admin123', 10).then(console.log);
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.userAccountsRepository.findOne({
        where: { email: loginDto.email },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new NotFoundException('Invalid password');
      }

      const token = await this.genrateToken(user);

      const { password, ...result } = user;

      this.auditLogsRepository.save({
        user: user,
        log_time: new Date(),
      });

      return {
        message: 'Login successful',
        user: result,
        ...token,
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async getAllAuditLogs() {
    return this.auditLogsRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async getAllAuditLogsOfUser(userId: number) {
    const res = this.auditLogsRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        user: true,
      },
    });

    if (!res) {
      throw new NotFoundException(
        `no Audit logs found of this user with id ${userId}`,
      );
    }

    return res;
  }

  async findAuditLogById(id: number) {
    let res = await this.auditLogsRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
      },
    });

    if (!res) {
      throw new NotFoundException(`no Audit logs found with id ${id}`);
    }

    return res;
  }

  async findUserById(id: number) {
    return await this.userAccountsRepository.findOne({ where: { id } });
  }

  async genrateToken(user: UserAccounts) {
    return {
      accessToken: this.genrateAccessToken(user),
    };
  }
  private genrateAccessToken(user: UserAccounts): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload, {
      secret: 'mySecretKey',
      expiresIn: '1h',
    });
  }
}
