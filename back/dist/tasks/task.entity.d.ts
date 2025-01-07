import { User } from '../auth/user.entity';
export declare class Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    user: User;
    userId: number;
}
