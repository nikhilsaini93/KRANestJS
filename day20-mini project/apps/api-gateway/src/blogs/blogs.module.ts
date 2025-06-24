import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BLOG_PACKAGE_NAME } from '@app/common/types/blog';
import { join } from 'path';

@Module({
  imports: [ClientsModule.register([
    {
      name : "BLOG_SERVICE",
      transport : Transport.GRPC,
      options :{
        package :BLOG_PACKAGE_NAME,
        protoPath :  join(__dirname , "../blog.proto"),
        url : "0.0.0.0:5002"
      }
    }
  ])],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
