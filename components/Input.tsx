// components/Input.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Text,
    TextInput,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
import { useThemeStore } from '../stores/themeStore';

interface InputProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    error?: string;
    disabled?: boolean;
    multiline?: boolean;
    numberOfLines?: number;
    style?: ViewStyle;
    inputStyle?: TextStyle;
    leftIcon?: keyof typeof Ionicons.glyphMap;
    rightIcon?: keyof typeof Ionicons.glyphMap;
    onRightIconPress?: () => void;
}

export const Input: React.FC<InputProps> = ({
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'sentences',
    error,
    disabled = false,
    multiline = false,
    numberOfLines = 1,
    style,
    inputStyle,
    leftIcon,
    rightIcon,
    onRightIconPress,
}) => {
    const { theme } = useThemeStore();
    const [isFocused, setIsFocused] = useState(false);
    const [isSecureVisible, setIsSecureVisible] = useState(false);

    const containerStyle: ViewStyle = {
        marginVertical: theme.spacing.sm,
    };

    const labelStyle: TextStyle = {
        fontSize: theme.typography.fontSizes.sm,
        fontWeight: theme.typography.fontWeights.medium,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    };

    const inputContainerStyle: ViewStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: error
            ? theme.colors.error
            : isFocused
                ? theme.colors.primary
                : theme.colors.border,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.surface,
        paddingHorizontal: theme.spacing.md,
        minHeight: 48,
    };

    const textInputStyle: TextStyle = {
        flex: 1,
        fontSize: theme.typography.fontSizes.md,
        color: theme.colors.text,
        paddingVertical: theme.spacing.sm,
    };

    const errorStyle: TextStyle = {
        fontSize: theme.typography.fontSizes.xs,
        color: theme.colors.error,
        marginTop: theme.spacing.xs,
    };

    const iconStyle = {
        marginHorizontal: theme.spacing.xs,
    };

    const renderRightIcon = () => {
        if (secureTextEntry) {
            return (
                <TouchableOpacity
                    onPress={() => setIsSecureVisible(!isSecureVisible)}
                    style={iconStyle}
                >
                    <Ionicons
                        name={isSecureVisible ? 'eye-off' : 'eye'}
                        size={20}
                        color={theme.colors.textSecondary}
                    />
                </TouchableOpacity>
            );
        }

        if (rightIcon) {
            return (
                <TouchableOpacity onPress={onRightIconPress} style={iconStyle}>
                    <Ionicons
                        name={rightIcon}
                        size={20}
                        color={theme.colors.textSecondary}
                    />
                </TouchableOpacity>
            );
        }

        return null;
    };

    return (
        <View style={[containerStyle, style]}>
            {label && <Text style={labelStyle}>{label}</Text>}

            <View style={inputContainerStyle}>
                {leftIcon && (
                    <Ionicons
                        name={leftIcon}
                        size={20}
                        color={theme.colors.textSecondary}
                        style={iconStyle}
                    />
                )}

                <TextInput
                    style={[textInputStyle, inputStyle]}
                    placeholder={placeholder}
                    placeholderTextColor={theme.colors.textSecondary}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry && !isSecureVisible}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    editable={!disabled}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />

                {renderRightIcon()}
            </View>

            {error && <Text style={errorStyle}>{error}</Text>}
        </View>
    );
};