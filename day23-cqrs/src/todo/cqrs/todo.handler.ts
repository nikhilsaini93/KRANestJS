import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateTodoCommand,
  DeleteTodoCommand,
  LogTodoCreationCommand,
  UpdateTodoCommand,
} from './todo.commond';

import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Todo } from '../todo.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { TodoCreatedEvent,  } from '../events/todo-created.event';
import { TodoUpdatedEvent } from '../events/update.todo.event';


@CommandHandler(CreateTodoCommand)
export class CreateTodoHandler implements ICommandHandler<CreateTodoCommand> {
  constructor(
    @InjectRepository(Todo) private readonly todorepo: Repository<Todo>,
    private readonly eventBus: EventBus,
  ) {}
  // async execute(command: CreateTodoCommand): Promise<Todo> {
  //       const task = this.todorepo.create({ title: command.title });
  //   return await this.todorepo.save(task);
  // }

 async execute(command: CreateTodoCommand): Promise<Todo> {
    const task = this.todorepo.create({ title: command.title });
    const saved = await this.todorepo.save(task);
    this.eventBus.publish(new TodoCreatedEvent(saved.id, saved.title));
    return saved;
  }

}

// @CommandHandler(UpdateTodoCommand)
// export class UpdateTodoHandler implements ICommandHandler<UpdateTodoCommand> {
//   constructor(
//     @InjectRepository(Todo) private readonly todorepo: Repository<Todo>,
//   ) {}
//   async execute(command: UpdateTodoCommand): Promise<Todo> {
//     const todo = await this.todorepo.findOneBy({ id: command.id });
//     if (!todo) throw new NotFoundException('Todo not found');
//     todo.title = command.title;
//     todo.done = command.done;
//     return this.todorepo.save(todo);
//   }
// }

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoHandler implements ICommandHandler<UpdateTodoCommand> {
  constructor(
    @InjectRepository(Todo) private readonly todorepo: Repository<Todo>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateTodoCommand): Promise<Todo> {
    const todo = await this.todorepo.findOneBy({ id: command.id });
    if (!todo) throw new NotFoundException('Todo not found');
    todo.title = command.title;
    todo.done = command.done;
    const updated = await this.todorepo.save(todo);
    this.eventBus.publish(new TodoUpdatedEvent(updated.id, updated.title, updated.done));
    return updated;
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

@CommandHandler(LogTodoCreationCommand)
export class LogTodoHandler implements ICommandHandler<LogTodoCreationCommand> {
  async execute(command: LogTodoCreationCommand) {
    console.log(`📝 TODO Created: [${command.id}] ${command.title}`);
  }
}


