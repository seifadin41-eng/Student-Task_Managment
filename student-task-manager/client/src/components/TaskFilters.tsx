import {
  YStack,
  XStack,
  Input,
  Button,
  Text,
  Label,
  Select,
} from 'tamagui';

interface TaskFiltersProps {
  filter: 'all' | 'completed' | 'pending';
  setFilter: (f: 'all' | 'completed' | 'pending') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortMode: 'dueDate' | 'priority';
  setSortMode: (s: 'dueDate' | 'priority') => void;
}

export function TaskFilters({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  sortMode,
  setSortMode,
}: TaskFiltersProps) {
  return (
    <XStack
      space="$3"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="space-between"
      padding="$3"
      backgroundColor="rgba(248,250,252,0.8)"
      borderRadius="$3"
      borderWidth={1}
      borderColor="rgba(203,213,225,0.5)"
    >
      {/* Search */}
      <XStack space="$2" alignItems="center" flex={1} minWidth={200}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: '#94a3b8', flexShrink: 0 }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <Input
          id="task-search"
          placeholder="Search tasks..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          flex={1}
          minWidth={150}
          backgroundColor="rgba(255,255,255,0.9)"
          borderColor="rgba(203,213,225,0.6)"
          focusStyle={{ borderColor: '#3b82f6', borderWidth: 2 }}
        />
      </XStack>

      {/* Filter Buttons */}
      <XStack space="$1" alignItems="center" flexWrap="wrap">
        <Text fontSize="$2" color="#64748b" marginRight="$1">Status:</Text>
        {([
          { key: 'all', label: 'All', icon: '📋' },
          { key: 'pending', label: 'Pending', icon: '⏳' },
          { key: 'completed', label: 'Completed', icon: '✅' },
        ] as const).map(({ key, label, icon }) => (
          <Button
            key={key}
            size="$2"
            backgroundColor={filter === key ? '#3b82f6' : 'rgba(255,255,255,0.9)'}
            color={filter === key ? '#ffffff' : '#475569'}
            borderWidth={1}
            borderColor={filter === key ? '#3b82f6' : 'rgba(203,213,225,0.6)'}
            onPress={() => setFilter(key)}
            pressStyle={{ opacity: 0.8 }}
          >
            {icon} {label}
          </Button>
        ))}
      </XStack>

      {/* Sort Dropdown */}
      <XStack space="$2" alignItems="center">
        <Text fontSize="$2" color="#64748b">Sort:</Text>
        <Select
          id="task-sort"
          value={sortMode}
          onValueChange={(v) => setSortMode(v as 'dueDate' | 'priority')}
        >
          <Select.Trigger width={150} backgroundColor="rgba(255,255,255,0.9)" borderColor="rgba(203,213,225,0.6)">
            <Select.Value placeholder="Sort by" />
          </Select.Trigger>
          <Select.Content>
            <Select.ScrollUpButton />
            <Select.Viewport>
              <Select.Group>
                <Select.Item value="dueDate" index={0}>
                  <Select.ItemText>📅 Due Date</Select.ItemText>
                </Select.Item>
                <Select.Item value="priority" index={1}>
                  <Select.ItemText>⚡ Priority</Select.ItemText>
                </Select.Item>
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton />
          </Select.Content>
        </Select>
      </XStack>
    </XStack>
  );
}
