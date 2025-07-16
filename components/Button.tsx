// components/Button.tsx
import React from 'react';
import {
    ActivityIndicator,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle
} from 'react-native';
import { useThemeStore } from '../stores/themeStore';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle | ViewStyle[];
    textStyle?: TextStyle | TextStyle[];
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    style,
    textStyle,
}) => {
    const { theme } = useThemeStore();

    const getButtonStyle = (): ViewStyle => {
        const baseStyle: ViewStyle = {
            borderRadius: theme.borderRadius.lg,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        };

        // Size styles
        const sizeStyles: Record<string, ViewStyle> = {
            small: {
                paddingHorizontal: theme.spacing.md,
                paddingVertical: theme.spacing.sm,
                minHeight: 36,
            },
            medium: {
                paddingHorizontal: theme.spacing.lg,
                paddingVertical: theme.spacing.md,
                minHeight: 48,
            },
            large: {
                paddingHorizontal: theme.spacing.xl,
                paddingVertical: theme.spacing.lg,
                minHeight: 56,
            },
        };

        // Variant styles
        const variantStyles: Record<string, ViewStyle> = {
            primary: {
                backgroundColor: disabled ? theme.colors.border : theme.colors.primary,
            },
            secondary: {
                backgroundColor: disabled ? theme.colors.border : theme.colors.secondary,
            },
            outline: {
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: disabled ? theme.colors.border : theme.colors.primary,
            },
            ghost: {
                backgroundColor: 'transparent',
            },
        };

        return {
            ...baseStyle,
            ...sizeStyles[size],
            ...variantStyles[variant],
        };
    };

    const getTextStyle = (): TextStyle => {
        const baseStyle: TextStyle = {
            fontWeight: theme.typography.fontWeights.semibold,
        };

        // Size styles
        const sizeStyles: Record<string, TextStyle> = {
            small: {
                fontSize: theme.typography.fontSizes.sm,
            },
            medium: {
                fontSize: theme.typography.fontSizes.md,
            },
            large: {
                fontSize: theme.typography.fontSizes.lg,
            },
        };

        // Variant styles
        const variantStyles: Record<string, TextStyle> = {
            primary: {
                color: theme.colors.white,
            },
            secondary: {
                color: theme.colors.primary,
            },
            outline: {
                color: disabled ? theme.colors.textSecondary : theme.colors.primary,
            },
            ghost: {
                color: disabled ? theme.colors.textSecondary : theme.colors.primary,
            },
        };

        return {
            ...baseStyle,
            ...sizeStyles[size],
            ...variantStyles[variant],
        };
    };

    return (
        <TouchableOpacity
            style={[getButtonStyle(), ...(Array.isArray(style) ? style : [style])].filter(Boolean)}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading && (
                <ActivityIndicator
                    size="small"
                    color={variant === 'primary' ? theme.colors.white : theme.colors.primary}
                    style={{ marginRight: theme.spacing.sm }}
                />
            )}
            <Text style={[getTextStyle(), ...(Array.isArray(textStyle) ? textStyle : [textStyle])].filter(Boolean)}>{title}</Text>
        </TouchableOpacity>
    );
};