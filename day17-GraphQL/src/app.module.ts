import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PostsModule } from './posts/posts.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'mytestdb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      // typePaths: ['./**/*.graphql'],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
        BookModule,
        PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
