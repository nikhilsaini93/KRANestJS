import { Module } from '@nestjs/common';
import { TypeORMError } from 'typeorm';
import { Todo } from './todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CreateTodoHandler, DeleteTodoHandler, UpdateTodoHandler } from './cqrs/todo.handler';
import { GetTodosHandler, GetTodosHandlerById } from './cqrs/query.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [TypeOrmModule.forFeature([Todo]) , CqrsModule],
  controllers: [TodoController],
  providers: [TodoService ,
     CreateTodoHandler,
    UpdateTodoHandler,
    DeleteTodoHandler,
    GetTodosHandler,
    GetTodosHandlerById
  ],
})
export class TodoModule {}
