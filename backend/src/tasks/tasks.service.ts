import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getTasks(user: User, { page, limit }) {
    const [tasks, total] = await this.taskRepository.findAndCount({
      where: { userId: user.id },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      tasks,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      userId: user.id,
    });

    return this.taskRepository.save(task);
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    if (task.userId !== user.id) {
      throw new UnauthorizedException('You can only update your own tasks');
    }

    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found or you're not authorized to delete it`);
    }
  }

  async completeTask(id: number, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    if (task.userId !== user.id) {
      throw new UnauthorizedException('You can only complete your own tasks');
    }

    task.completed = true;
    return this.taskRepository.save(task);
  }
}