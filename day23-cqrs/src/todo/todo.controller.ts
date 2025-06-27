import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetTodosById, GetTodosQuery } from './cqrs/todo.queries';
import {
  CreateTodoCommand,
  DeleteTodoCommand,
  UpdateTodoCommand,
} from './cqrs/todo.commond';

@Controller('todos')
export class TodoController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body('title') title: string) {
    return this.commandBus.execute(new CreateTodoCommand(title));
  }

  @Get()
  getAll() {
    return this.queryBus.execute(new GetTodosQuery());
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.queryBus.execute(new GetTodosById(+id));
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() body: { title: string; done: boolean },
  ) {
    return this.commandBus.execute(
      new UpdateTodoCommand(+id, body.title, body.done),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commandBus.execute(new DeleteTodoCommand(+id));
  }
}
