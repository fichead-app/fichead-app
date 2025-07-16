// types/theme.ts
export interface Theme {
    colors: {
        primary: string;
        primaryDark: string;
        secondary: string;
        background: string;
        surface: string;
        text: string;
        textSecondary: string;
        border: string;
        white: string;
        black: string;
        success: string;
        error: string;
        warning: string;
        info: string;
    };
    spacing: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        xxl: number;
    };
    typography: {
        fontSizes: {
            xs: number;
            sm: number;
            md: number;
            lg: number;
            xl: number;
            xxl: number;
        };
        fontWeights: {
            light: '300';
            regular: '400';
            medium: '500';
            semibold: '600';
            bold: '700';
        };
    };
    borderRadius: {
        sm: number;
        md: number;
        lg: number;
        xl: number;
        full: number;
    };
}

export type ThemeMode = 'light' | 'dark';