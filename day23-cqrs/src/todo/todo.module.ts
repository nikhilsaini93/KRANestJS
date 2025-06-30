import { Module } from '@nestjs/common';
import { TypeORMError } from 'typeorm';
import { Todo } from './todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CreateTodoHandler, DeleteTodoHandler, LogTodoHandler, UpdateTodoHandler } from './cqrs/todo.handler';
import { GetTodosHandler, GetTodosHandlerById } from './cqrs/query.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoSagas } from './sagas/todo.saga';

@Module({
    imports: [TypeOrmModule.forFeature([Todo]) , CqrsModule],
  controllers: [TodoController],
  providers: [TodoService ,
     CreateTodoHandler,
    UpdateTodoHandler,
    DeleteTodoHandler,
    GetTodosHandler,
    GetTodosHandlerById,
    TodoSagas,
    LogTodoHandler
    

  ],
})
export class TodoModule {}
