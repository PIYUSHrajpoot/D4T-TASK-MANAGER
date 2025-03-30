import { Task } from '../tasks/task.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    tasks: Task[];
}
