import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DatabaseModule, Userr } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [DatabaseModule , TypeOrmModule.forFeature([Userr]),
JwtModule.register({ // <-- Add this block
      secret: 'mySecretKey',
      signOptions: { expiresIn: '1h' },
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
