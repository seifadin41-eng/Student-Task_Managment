import { useState } from 'react';
import {
  TamaguiProvider,
  YStack,
  XStack,
  Text,
} from 'tamagui';
import config from '../tamagui.config.js';
import { TaskForm } from './components/TaskForm.js';
import { TaskTable } from './components/TaskTable.js';
import { TaskFilters } from './components/TaskFilters.js';
import { ThemeToggle } from './components/ThemeToggle.js';
import { useTasks } from './hooks/useTasks.js';

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const {
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
  } = useTasks();

  const bgGradient = theme === 'light'
    ? 'linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 25%, #f5f7ff 50%, #e0e7ff 75%, #f0f4ff 100%)'
    : 'linear-gradient(135deg, #0a0e27 0%, #0f172a 25%, #111827 50%, #0f172a 75%, #0a0e27 100%)';

  return (
    <TamaguiProvider config={config} defaultTheme={theme}>
      <YStack
        flex={1}
        height="100vh"
        overflow="hidden"
        style={{ background: bgGradient }}
      >
        {/* Top Header Bar */}
        <XStack
          padding="$3"
          backgroundColor={theme === 'light' ? '$backgroundStrong' : '#0f172a'}
          borderBottomWidth={1}
          borderColor="$borderColor"
          justifyContent="space-between"
          alignItems="center"
          shadowColor="rgba(0,0,0,0.1)"
          shadowOffset={{ width: 0, height: 2 }}
          shadowRadius={4}
          shadowOpacity={0.1}
          zIndex={100}
          flexShrink={0}
        >
          <XStack space="$2" alignItems="center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#3b82f6' }}>
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
            <Text fontSize="$6" fontWeight="bold" color={theme === 'light' ? '$color' : '#e2e8f0'}>
              Student Task Manager
            </Text>
          </XStack>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </XStack>

        {/* Main Content — No ScrollView, fits in viewport */}
        <XStack
          flex={1}
          overflow="hidden"
          padding="$4"
          space="$4"
          maxWidth={1400}
          width="100%"
          alignSelf="center"
        >
          {/* Left: Task Form */}
          <YStack
            width={380}
            flexShrink={0}
            overflow="hidden"
          >
            <TaskForm onAdd={addTask} />
          </YStack>

          {/* Right: Task List */}
          <YStack
            flex={1}
            space="$3"
            backgroundColor={theme === 'light' ? '$background' : '#1e293b'}
            padding="$4"
            borderRadius="$4"
            borderWidth={1}
            borderColor="$borderColor"
            shadowColor="rgba(0,0,0,0.06)"
            shadowOffset={{ width: 0, height: 4 }}
            shadowRadius={12}
            shadowOpacity={0.06}
            overflow="hidden"
          >
            {/* Toolbar */}
            <YStack space="$3" flexShrink={0}>
              <Text fontSize="$6" fontWeight="bold" color={theme === 'light' ? '$color' : '#e2e8f0'}>
                My Tasks
              </Text>
              <TaskFilters
                filter={filter}
                setFilter={setFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortMode={sortMode}
                setSortMode={setSortMode}
              />
            </YStack>

            {/* Table — scrollable internally if needed */}
            <YStack flex={1} overflow="hidden" marginTop="$3">
              <TaskTable
                tasks={filteredTasks}
                onToggleComplete={toggleComplete}
                onDelete={deleteTask}
              />
            </YStack>
          </YStack>
        </XStack>
      </YStack>
    </TamaguiProvider>
  );
}
