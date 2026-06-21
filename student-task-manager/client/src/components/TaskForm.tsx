import { useState, useMemo } from 'react';
import {
  YStack,
  XStack,
  Input,
  TextArea,
  Button,
  Text,
  Label,
  Select,
} from 'tamagui';
import { Task, Priority } from '../types/task.js';

interface TaskFormProps {
  onAdd: (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => void;
}

function generateYearOptions(): number[] {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 11 }, (_, i) => currentYear + i);
}

function generateMonthOptions(): { value: string; label: string }[] {
  return [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];
}

function generateDayOptions(): string[] {
  return Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [errors, setErrors] = useState<{ title?: string; dueDate?: string }>({});

  const yearOptions = useMemo(() => generateYearOptions(), []);
  const monthOptions = useMemo(() => generateMonthOptions(), []);
  const dayOptions = useMemo(() => generateDayOptions(), []);

  const dueDate = year && month && day ? `${year}-${month}-${day}` : '';
  const today = new Date().toISOString().split('T')[0];

  const validate = (): boolean => {
    const newErrors: { title?: string; dueDate?: string } = {};
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      newErrors.title = 'Title is required';
    } else if (trimmedTitle.length > 100) {
      newErrors.title = 'Title must be 100 characters or less';
    }

    if (dueDate) {
      const selected = new Date(dueDate);
      const now = new Date(today);
      if (selected < now) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onAdd({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate || null,
    });
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setYear('');
    setMonth('');
    setDay('');
    setErrors({});
  };

  const isValid = title.trim().length > 0 && (!dueDate || new Date(dueDate) >= new Date(today));

  return (
    <YStack
      space="$2"
      padding="$3"
      backgroundColor="rgba(255,255,255,0.85)"
      borderRadius="$4"
      borderWidth={1}
      borderColor="rgba(59,130,246,0.15)"
      shadowColor="rgba(0,0,0,0.06)"
      shadowOffset={{ width: 0, height: 4 }}
      shadowRadius={12}
      shadowOpacity={0.06}
    >
      {/* Header with Logo */}
      <XStack space="$2" alignItems="center" marginBottom="$2">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: '#3b82f6', flexShrink: 0 }}
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="9" x2="15" y2="9" />
          <line x1="9" y1="14" x2="15" y2="14" />
          <line x1="9" y1="19" x2="12" y2="19" />
        </svg>
        <Text fontSize="$6" fontWeight="bold" color="#1e40af">
          Add New Task
        </Text>
      </XStack>

      <YStack space="$2">
        <Label htmlFor="task-title">Title *</Label>
        <Input
          id="task-title"
          placeholder="What needs to be done?"
          value={title}
          onChangeText={setTitle}
          maxLength={100}
          borderColor={errors.title ? '$red10' : '#3b82f6'}
          focusStyle={{ borderColor: '#3b82f6', borderWidth: 2 }}
          backgroundColor="rgba(255,255,255,0.9)"
        />
        {errors.title && (
          <Text color="$red10" fontSize="$2">{errors.title}</Text>
        )}
      </YStack>

      <YStack space="$2">
        <Label htmlFor="task-description">Description</Label>
        <TextArea
          id="task-description"
          placeholder="Add details (optional)"
          value={description}
          onChangeText={setDescription}
          maxLength={500}
          rows={2}
          backgroundColor="rgba(255,255,255,0.9)"
        />
      </YStack>

      <YStack space="$2">
        <Label htmlFor="task-priority">Priority</Label>
        <Select id="task-priority" value={priority} onValueChange={(v) => setPriority(v as Priority)}>
          <Select.Trigger width="100%" backgroundColor="rgba(255,255,255,0.9)">
            <Select.Value placeholder="Priority" />
          </Select.Trigger>
          <Select.Content>
            <Select.ScrollUpButton />
            <Select.Viewport>
              <Select.Group>
                <Select.Item value="High" index={0}>
                  <Select.ItemText>🔴 High</Select.ItemText>
                </Select.Item>
                <Select.Item value="Medium" index={1}>
                  <Select.ItemText>🟡 Medium</Select.ItemText>
                </Select.Item>
                <Select.Item value="Low" index={2}>
                  <Select.ItemText>🟢 Low</Select.ItemText>
                </Select.Item>
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton />
          </Select.Content>
        </Select>
      </YStack>

      {/* Due Date: Year / Month / Day Dropdowns */}
      <YStack space="$2">
        <Label>Due Date</Label>
        <XStack space="$2">
          <YStack flex={1}>
            <Select id="due-year" value={year} onValueChange={setYear}>
              <Select.Trigger width="100%" backgroundColor="rgba(255,255,255,0.9)">
                <Select.Value placeholder="Year" />
              </Select.Trigger>
              <Select.Content>
                <Select.ScrollUpButton />
                <Select.Viewport>
                  <Select.Group>
                    {yearOptions.map((y, i) => (
                      <Select.Item key={y} value={String(y)} index={i}>
                        <Select.ItemText>{y}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
            </Select>
          </YStack>

          <YStack flex={1}>
            <Select id="due-month" value={month} onValueChange={setMonth}>
              <Select.Trigger width="100%" backgroundColor="rgba(255,255,255,0.9)">
                <Select.Value placeholder="Month" />
              </Select.Trigger>
              <Select.Content>
                <Select.ScrollUpButton />
                <Select.Viewport>
                  <Select.Group>
                    {monthOptions.map((m, i) => (
                      <Select.Item key={m.value} value={m.value} index={i}>
                        <Select.ItemText>{m.label}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
            </Select>
          </YStack>

          <YStack flex={1}>
            <Select id="due-day" value={day} onValueChange={setDay}>
              <Select.Trigger width="100%" backgroundColor="rgba(255,255,255,0.9)">
                <Select.Value placeholder="Day" />
              </Select.Trigger>
              <Select.Content>
                <Select.ScrollUpButton />
                <Select.Viewport>
                  <Select.Group>
                    {dayOptions.map((d, i) => (
                      <Select.Item key={d} value={d} index={i}>
                        <Select.ItemText>{d}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
            </Select>
          </YStack>
        </XStack>
        {errors.dueDate && (
          <Text color="$red10" fontSize="$2">{errors.dueDate}</Text>
        )}
      </YStack>

      <Button
        theme="blue"
        onPress={handleSubmit}
        disabled={!isValid}
        opacity={isValid ? 1 : 0.6}
        marginTop="$2"
      >
        ➕ Add Task
      </Button>
    </YStack>
  );
}
