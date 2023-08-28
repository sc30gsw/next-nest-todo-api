import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import type { Task } from '@prisma/client'

import type { CreateTaskDto } from './dto/create-task.dto'
import type { UpdateTaskDto } from './dto/update-task.dto'
import { TodoService } from './todo.service'

@Controller('todo')
export class TodoController {
  constructor(@Inject(TodoService) private readonly todoService: TodoService) {}

  @Get()
  getTasks(@Query('userId', ParseIntPipe) userId: number): Promise<Task[]> {
    return this.todoService.getTasks(userId)
  }

  @Get(':id')
  getTaskById(
    @Query('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) taskId: number,
  ): Promise<Task> {
    return this.todoService.getTaskById(userId, taskId)
  }

  @Post()
  createTask(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.todoService.createTask(dto)
  }

  @Patch(':id')
  updateTaskById(
    @Param('id', ParseIntPipe) taskId: number,
    @Body() dto: UpdateTaskDto,
  ): Promise<Task> {
    return this.todoService.updateTask(taskId, dto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTaskById(
    @Query('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) taskId: number,
  ): Promise<void> {
    return this.todoService.deleteTaskById(userId, taskId)
  }
}
