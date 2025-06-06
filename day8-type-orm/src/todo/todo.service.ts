import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entities';
import { TodoDto } from './DTO/todo.dto';
import { updateTodoDto } from './DTO/updatedto';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
    ){}



    async findAll(){
        return await this.todoRepository.find();
    }


    async findById(id: number){
        const todo = await this.todoRepository.findOne({where: {id}});
        if(!todo) {throw new NotFoundException(`Todo with id ${id} not found`);}
        return todo;
    }


    async createTodo(createTodo : TodoDto){
        const newTodo = this.todoRepository.create(createTodo);
        return await this.todoRepository.save(newTodo);

    }

    async updateDto(id : number , updatetodoDto : updateTodoDto){
        await this.todoRepository.update({id}, updatetodoDto);
        const todo = await this.findById(id);
        return todo;

    }

    async deleteTodo(id : number){
        await this.todoRepository.delete({id});
        return "Todo deleted successfully";    
    }

  async getTodosByPriority(priority: string) {
    console.log("ssssssssssssss" , priority);
    return this.todoRepository.query('SELECT * FROM get_todos_by_priority($1)', [priority]);
  }

}
