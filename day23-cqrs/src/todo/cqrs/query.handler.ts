import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetTodosQuery , GetTodosById } from "./todo.queries";
import { InjectRepository } from "@nestjs/typeorm";
import { Todo } from "../todo.entity";
import { Repository } from "typeorm";



@QueryHandler(GetTodosQuery)
export class GetTodosHandler implements IQueryHandler<GetTodosQuery> {
  constructor(@InjectRepository(Todo) private readonly todorepo: Repository<Todo>) {}
  async execute(): Promise<Todo[]> {
    return this.todorepo.find();
  }
}

@QueryHandler(GetTodosById)
export class GetTodosHandlerById implements IQueryHandler<GetTodosById>  {
  constructor(@InjectRepository(Todo) private readonly todorepo: Repository<Todo>) {}

  async execute(query: GetTodosById): Promise<Todo | null> {
    return this.todorepo.findOneBy({ id : query.id });
  }
}