// constants/theme.ts
import { Theme } from '../types/theme';

const baseTheme = {
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 40,
    },
    typography: {
        fontSizes: {
            xs: 12,
            sm: 14,
            md: 16,
            lg: 18,
            xl: 24,
            xxl: 32,
        },
        fontWeights: {
            light: '300' as const,
            regular: '400' as const,
            medium: '500' as const,
            semibold: '600' as const,
            bold: '700' as const,
        },
    },
    borderRadius: {
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
        full: 9999,
    },
};

export const lightTheme: Theme = {
    ...baseTheme,
    colors: {
        primary: '#FF8A00',
        primaryDark: '#E67700',
        secondary: '#FFF3E6',
        background: '#FFFFFF',
        surface: '#F8F9FA',
        text: '#1A1A1A',
        textSecondary: '#6B7280',
        border: '#E5E7EB',
        white: '#FFFFFF',
        black: '#000000',
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
    },
};

export const darkTheme: Theme = {
    ...baseTheme,
    colors: {
        primary: '#FF8A00',
        primaryDark: '#E67700',
        secondary: '#2D1810',
        background: '#0F172A',
        surface: '#1E293B',
        text: '#F1F5F9',
        textSecondary: '#94A3B8',
        border: '#334155',
        white: '#FFFFFF',
        black: '#000000',
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
    },
};