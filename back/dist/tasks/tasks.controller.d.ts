import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../auth/user.entity';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getTasks(user: User, page?: number, limit?: number): Promise<{
        tasks: import("./task.entity").Task[];
        meta: {
            total: number;
            page: any;
            limit: any;
            totalPages: number;
        };
    }>;
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<import("./task.entity").Task>;
    updateTask(id: number, updateTaskDto: UpdateTaskDto, user: User): Promise<import("./task.entity").Task>;
    deleteTask(id: number, user: User): Promise<void>;
    completeTask(id: number, user: User): Promise<import("./task.entity").Task>;
}
