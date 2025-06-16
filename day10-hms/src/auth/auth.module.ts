import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccounts } from 'src/user-accounts/enitity/user-account.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuditLogs } from 'src/audit-logs/entity/audit-logs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAccounts , AuditLogs])  , PassportModule , JwtModule.register({
    secret: 'mySecretKey', 
      signOptions: { expiresIn: '1h' }, 
  })],
  controllers: [AuthController],
  providers: [AuthService , JwtStrategy ] , 
  exports : [PassportModule , JwtModule  ,  AuthService]
})
export class AuthModule {}
