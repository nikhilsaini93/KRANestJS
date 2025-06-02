import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth1Module } from 'src/auth1/auth1.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([Post]),
    Auth1Module
  ],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService]
})
export class PostsModule {}
