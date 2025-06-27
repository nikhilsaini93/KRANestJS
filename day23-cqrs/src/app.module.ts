import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoModule } from './todo/todo.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'mytestdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CqrsModule,
    TodoModule,
  ],
})
export class AppModule {}
