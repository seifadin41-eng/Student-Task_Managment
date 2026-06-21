export type Priority = 'High' | 'Medium' | 'Low';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string | null;
  completed: boolean;
  createdAt: string;
}

export interface HealthResponse {
  ok: boolean;
  timestamp: string;
}
