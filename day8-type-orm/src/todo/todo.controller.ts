import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './DTO/todo.dto';
import { updateTodoDto } from './DTO/updatedto';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService,
    ) {}


    @Get()
    async findall() {
        return await this.todoService.findAll();
    }

    @Post()
    async createTodo(@Body() createTodo: TodoDto) {
        return await this.todoService.createTodo(createTodo);
    }
     @Get('by-priority')
async getTodos(@Query('priority') priority: string) {
  return this.todoService.getTodosByPriority(priority);
}

    @Delete(":id")
    async deleteTodo(@Body() id: number) {
        return await this.todoService.deleteTodo(id);
    }

    @Get(':id')
     async findOne(@Param('id') id: number) {
    return this.todoService.findById(id);
  }

  @Put(':id')
  async updateTodo(@Param('id') id: number, @Body() updateTodoDto: updateTodoDto) {
    return this.todoService.updateDto(id, updateTodoDto);
  }




}
