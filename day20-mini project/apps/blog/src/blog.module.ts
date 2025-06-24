import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { DatabaseModule } from '@app/common';


@Module({
  imports: [BlogModule , DatabaseModule],
  controllers: [],
  providers: [],
})
export class BlogsModule {}
