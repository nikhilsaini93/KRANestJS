import { NestFactory } from '@nestjs/core';
import { BlogsModule } from './blog.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { BLOG_PACKAGE_NAME } from '@app/common/types/blog';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(BlogsModule ,{
    transport: Transport.GRPC,
    options:{
      protoPath : join(__dirname, "../blog.proto"),
      package : BLOG_PACKAGE_NAME,
      url: "0.0.0.0:5001"
    }
  });
  await app.listen();
}
bootstrap();
