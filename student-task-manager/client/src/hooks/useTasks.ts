import { useState, useMemo, useCallback } from 'react';
import { Task, Priority } from '../types/task.js';
import { loadTasks, saveTasks } from '../lib/storage.js';

export type FilterType = 'all' | 'completed' | 'pending';
export type SortMode = 'dueDate' | 'priority';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('dueDate');

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    saveTasks(updated);
  }, [tasks]);

  const toggleComplete = useCallback((id: string) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    saveTasks(updated);
  }, [tasks]);

  const deleteTask = useCallback((id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    saveTasks(updated);
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (filter === 'completed') {
      result = result.filter((t) => t.completed);
    } else if (filter === 'pending') {
      result = result.filter((t) => !t.completed);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((t) => t.title.toLowerCase().includes(q));
    }

    if (sortMode === 'dueDate') {
      result.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      });
    } else if (sortMode === 'priority') {
      const priorityOrder: Record<Priority, number> = { High: 0, Medium: 1, Low: 2 };
      result.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    return result;
  }, [tasks, filter, searchQuery, sortMode]);

  return {
    tasks,
    filteredTasks,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    sortMode,
    setSortMode,
    addTask,
    toggleComplete,
    deleteTask,
  };
}
