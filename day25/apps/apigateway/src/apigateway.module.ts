import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@app/common';

@Module({
  imports: [JwtModule.register({
      secret: 'mySecretKey',
      signOptions: { expiresIn: '1h' },
    }), UserModule],
  controllers: [],
  providers: [JwtStrategy],
})
export class ApigatewayModule {}
