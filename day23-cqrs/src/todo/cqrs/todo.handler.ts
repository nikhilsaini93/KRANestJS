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
    return this.todorepo.save(this.todorepo.create({ title: command.title }));
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
  async execute(command: DeleteTodoCommand): Promise<void> {
    await this.todorepo.delete(command.id);
  }
}
