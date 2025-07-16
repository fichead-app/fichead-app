// stores/themeStore.ts
import { create } from 'zustand';
import { darkTheme, lightTheme } from '../constants/theme';
import { Theme, ThemeMode } from '../types/theme';

interface ThemeState {
    mode: ThemeMode;
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
    mode: 'light',
    theme: lightTheme,

    toggleTheme: () => {
        const currentMode = get().mode;
        const newMode = currentMode === 'light' ? 'dark' : 'light';
        const newTheme = newMode === 'light' ? lightTheme : darkTheme;

        set({
            mode: newMode,
            theme: newTheme
        });
    },

    setTheme: (mode: ThemeMode) => {
        const newTheme = mode === 'light' ? lightTheme : darkTheme;
        set({
            mode,
            theme: newTheme
        });
    },
}));