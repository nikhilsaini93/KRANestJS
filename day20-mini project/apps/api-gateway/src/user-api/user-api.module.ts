import { Module } from '@nestjs/common';
import { UserApiService } from './user-api.service';
import { UserApiController } from './user-api.controller';
import { join } from 'path';
import { USER_SERVICE_NAME } from '@app/common/types/user';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports : [ClientsModule.register([
    {
      name : "USER_SERVICE",
      transport : Transport.GRPC,
      options :{
        package : 'user',
        protoPath :  join(__dirname , "../user.proto"),
        url : "0.0.0.0:5002"
    }
 } ])],
  controllers: [UserApiController],
  providers: [UserApiService],
})
export class UserApiModule {}
