import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../auth/user.entity';
export declare class TasksService {
    private taskRepository;
    constructor(taskRepository: Repository<Task>);
    getTasks(user: User, { page, limit }: {
        page: any;
        limit: any;
    }): Promise<{
        tasks: Task[];
        meta: {
            total: number;
            page: any;
            limit: any;
            totalPages: number;
        };
    }>;
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    updateTask(id: number, updateTaskDto: UpdateTaskDto, user: User): Promise<Task>;
    deleteTask(id: number, user: User): Promise<void>;
    completeTask(id: number, user: User): Promise<Task>;
}
