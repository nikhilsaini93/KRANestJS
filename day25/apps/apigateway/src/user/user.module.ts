import { Module } from '@nestjs/common';

import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserApiController } from './user.controller';
import { UserApiService } from './user.service';

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
export class UserModule {}
