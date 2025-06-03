import { Module } from '@nestjs/common';
import { UserMngController } from './user-mng.controller';
import { UserMngService } from './user-mng.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './enitiies/user.entity';
import { AuthSvcModule } from 'src/auth-svc/auth-svc.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthSvcModule
    
  ]
  ,
  controllers: [UserMngController],
  providers: [UserMngService]
})
export class UserMngModule {}
