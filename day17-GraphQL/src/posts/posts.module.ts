import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';

import { Post } from './Entity/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostResolver } from './post.resolver';


@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostsService , PostResolver]
})
export class PostsModule {}
