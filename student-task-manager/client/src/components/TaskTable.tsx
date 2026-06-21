import { useState } from 'react';
import { Task, Priority } from '../types/task.js';
import {
  YStack,
  XStack,
  Button,
  Text,
  Checkbox,
} from 'tamagui';

interface TaskTableProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

function priorityColor(priority: Priority): string {
  switch (priority) {
    case 'High': return '#dc2626';
    case 'Medium': return '#d97706';
    case 'Low': return '#16a34a';
    default: return '#6b7280';
  }
}

function priorityBg(priority: Priority): string {
  switch (priority) {
    case 'High': return '#fef2f2';
    case 'Medium': return '#fffbeb';
    case 'Low': return '#f0fdf4';
    default: return '#f3f4f6';
  }
}

export function TaskTable({ tasks, onToggleComplete, onDelete }: TaskTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState('');

  if (tasks.length === 0) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center" space="$2">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="9" x2="15" y2="9" />
          <line x1="9" y1="14" x2="15" y2="14" />
          <line x1="9" y1="19" x2="12" y2="19" />
        </svg>
        <Text fontSize="$5" color="#94a3b8">No tasks found</Text>
        <Text fontSize="$2" color="#cbd5e1">Add a new task to get started</Text>
      </YStack>
    );
  }

  return (
    <YStack flex={1} overflow="hidden" position="relative">
      <div style={{ overflow: 'auto', flex: 1, width: '100%', height: '100%' }}>
        <table style={{ width: '100%', minWidth: 650, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: '8px', width: 50, color: '#64748b', fontWeight: 600, fontSize: '12px', whiteSpace: 'nowrap' }}>Done</th>
              <th style={{ textAlign: 'left', padding: '8px', color: '#64748b', fontWeight: 600, fontSize: '12px', whiteSpace: 'nowrap' }}>Title</th>
              <th style={{ textAlign: 'left', padding: '8px', color: '#64748b', fontWeight: 600, fontSize: '12px', whiteSpace: 'nowrap' }}>Description</th>
              <th style={{ textAlign: 'left', padding: '8px', width: 90, color: '#64748b', fontWeight: 600, fontSize: '12px', whiteSpace: 'nowrap' }}>Priority</th>
              <th style={{ textAlign: 'left', padding: '8px', width: 110, color: '#64748b', fontWeight: 600, fontSize: '12px', whiteSpace: 'nowrap' }}>Due Date</th>
              <th style={{ textAlign: 'left', padding: '8px', width: 70, color: '#64748b', fontWeight: 600, fontSize: '12px', whiteSpace: 'nowrap' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr
                key={task.id}
                style={{
                  opacity: task.completed ? 0.55 : 1,
                  transition: 'opacity 0.2s',
                  backgroundColor: index % 2 === 0 ? 'transparent' : 'rgba(248,250,252,0.4)',
                }}
              >
                <td style={{ padding: '8px' }}>
                  <Checkbox
                    id={`complete-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={() => onToggleComplete(task.id)}
                    aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
                  />
                </td>
                <td style={{ padding: '8px' }}>
                  <Text
                    fontWeight="bold"
                    textDecorationLine={task.completed ? 'line-through' : 'none'}
                    color={task.completed ? '#94a3b8' : '#1e293b'}
                    fontSize="$2"
                    whiteSpace="nowrap"
                  >
                    {task.title}
                  </Text>
                </td>
                <td style={{ padding: '8px' }}>
                  <Text
                    color={task.completed ? '#94a3b8' : '#475569'}
                    maxWidth={200}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    fontSize="$2"
                  >
                    {task.description || '—'}
                  </Text>
                </td>
                <td style={{ padding: '8px' }}>
                  <Text
                    padding="3px 8px"
                    borderRadius="$2"
                    backgroundColor={priorityBg(task.priority)}
                    color={priorityColor(task.priority)}
                    fontSize="$2"
                    fontWeight="600"
                  >
                    {task.priority}
                  </Text>
                </td>
                <td style={{ padding: '8px' }}>
                  <Text color={task.completed ? '#94a3b8' : '#475569'} fontSize="$2">
                    {task.dueDate || '—'}
                  </Text>
                </td>
                <td style={{ padding: '8px' }}>
                  <Button
                    size="$2"
                    backgroundColor="#fef2f2"
                    color="#dc2626"
                    borderWidth={1}
                    borderColor="#fecaca"
                    onPress={() => {
                      setDeleteId(task.id);
                      setDeleteTitle(task.title);
                    }}
                    aria-label={`Delete ${task.title}`}
                    pressStyle={{ backgroundColor: '#fee2e2' }}
                  >
                    🗑️
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Custom Delete Modal — No Tamagui Dialog, just a fixed overlay */}
      {deleteId !== null && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
          onClick={() => {
            setDeleteId(null);
            setDeleteTitle('');
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              minWidth: '320px',
              maxWidth: '90vw',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold', color: '#1e293b' }}>
              Delete Task
            </h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#64748b' }}>
              Are you sure you want to delete <strong>"{deleteTitle}"</strong>?
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f8fafc',
                  color: '#475569',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
                onClick={() => {
                  setDeleteId(null);
                  setDeleteTitle('');
                }}
              >
                Cancel
              </button>
              <button
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
                onClick={() => {
                  if (deleteId) onDelete(deleteId);
                  setDeleteId(null);
                  setDeleteTitle('');
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </YStack>
  );
}
