import { ForbiddenException, Inject, Injectable } from '@nestjs/common'
import type { Task } from '@prisma/client'

import { PrismaService } from '../prisma/prisma.service'
import type { CreateTaskDto } from './dto/create-task.dto'
import type { UpdateTaskDto } from './dto/update-task.dto'

@Injectable()
export class TodoService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async getTasks(userId: number): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async getTaskById(userId: number, taskId: number): Promise<Task> {
    return this.prisma.task.findFirst({
      where: {
        userId,
        id: taskId,
      },
    })
  }

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const task = await this.prisma.task.create({
      data: {
        userId: parseInt(dto.userId),
        title: dto.title,
        description: dto.description,
      },
    })
    return task
  }

  async updateTask(taskId: number, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    })

    if (!task || task.userId !== parseInt(dto.userId))
      throw new ForbiddenException('No permission to update')

    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        userId: parseInt(dto.userId),
        title: dto.title,
        description: dto.description,
      },
    })
  }

  async deleteTaskById(userId: number, taskId: number): Promise<void> {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    })

    if (!task || task.userId !== userId)
      throw new ForbiddenException('No permission to delete')

    await this.prisma.task.delete({
      where: {
        id: taskId,
      },
    })
  }
}
