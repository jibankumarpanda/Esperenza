'use client';

import { Sun, Moon } from 'lucide-react';
import { Button } from './button';
import { useTheme } from '../providers/theme-provider';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/20 dark:bg-slate-900/50 dark:hover:bg-slate-900/80"
    >
      {theme === 'light' ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-blue-400" />
      )}
    </Button>
  );
};