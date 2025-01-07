export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId: number;
}

export interface TasksResponse {
  tasks: Task[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}