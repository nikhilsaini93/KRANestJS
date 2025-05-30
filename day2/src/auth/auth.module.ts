import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    JwtModule.register({ 
      secret: 'secretKey',  // Secret key for JWT signing
      signOptions: { expiresIn: '1h' }  // Optional: Token expiry time
    }),
  UsersModule
  ],  
  controllers: [AuthController],
  providers: [AuthService , JwtStrategy]  
})
export class AuthModule {}
