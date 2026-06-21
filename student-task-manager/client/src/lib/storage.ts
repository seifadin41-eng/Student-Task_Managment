import { Task } from '../types/task.js';

const STORAGE_KEY = 'student-task-manager:tasks';

export function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      console.warn('Invalid localStorage data, resetting to []');
      return [];
    }
    return parsed as Task[];
  } catch {
    console.warn('Corrupted localStorage data, resetting to []');
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
