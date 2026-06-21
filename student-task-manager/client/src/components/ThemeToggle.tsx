import { Button } from 'tamagui';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
}

export function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
  return (
    <Button
      size="$2"
      backgroundColor={theme === 'light' ? 'rgba(255,255,255,0.9)' : 'rgba(30,41,59,0.9)'}
      color={theme === 'light' ? '#475569' : '#e2e8f0'}
      borderWidth={1}
      borderColor={theme === 'light' ? 'rgba(203,213,225,0.6)' : 'rgba(51,65,85,0.8)'}
      onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label="Toggle theme"
      pressStyle={{ opacity: 0.8 }}
    >
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </Button>
  );
}
