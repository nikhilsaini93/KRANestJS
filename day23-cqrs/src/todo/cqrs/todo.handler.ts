import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateTodoCommand,
  DeleteTodoCommand,
  UpdateTodoCommand,
} from './todo.commond';

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Todo } from '../todo.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(
    @InjectRepository(Todo) private readonly todorepo: Repository<Todo>,
  ) {}
  async execute(command: CreateTodoCommand): Promise<Todo> {
        const task = this.todorepo.create({ title: command.title });
    return await this.todorepo.save(task);
  }
}

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoHandler implements ICommandHandler<UpdateTodoCommand> {
  constructor(
    @InjectRepository(Todo) private readonly todorepo: Repository<Todo>,
  ) {}
  async execute(command: UpdateTodoCommand): Promise<Todo> {
    const todo = await this.todorepo.findOneBy({ id: command.id });
    if (!todo) throw new NotFoundException('Todo not found');
    todo.title = command.title;
    todo.done = command.done;
    return this.todorepo.save(todo);
  }
}

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoHandler implements ICommandHandler<DeleteTodoCommand> {
  constructor(
    @InjectRepository(Todo) private readonly todorepo: Repository<Todo>,
  ) {}
  async execute(command: DeleteTodoCommand) {
    const res = await this.todorepo.delete(command.id);
    if (res.affected === 0) throw new NotFoundException('Todo not found');
    return {
      message: 'Todo deleted successfully',
    }
  }
}
