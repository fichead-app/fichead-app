// components/Input.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { useThemeStore } from '../stores/themeStore';

interface InputProps extends Omit<TextInputProps, 'style'> {
    label?: string;
    error?: string;
    rightIcon?: keyof typeof Ionicons.glyphMap;
    onRightIconPress?: () => void;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    style?: ViewStyle; // Este será o style do container do input
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    rightIcon,
    onRightIconPress,
    containerStyle,
    inputStyle,
    style,
    secureTextEntry,
    ...props
}) => {
    const { theme } = useThemeStore();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isPassword = secureTextEntry;
    const showPassword = isPassword && !isPasswordVisible;

    const handleRightIconPress = () => {
        if (isPassword) {
            setIsPasswordVisible(!isPasswordVisible);
        } else if (onRightIconPress) {
            onRightIconPress();
        }
    };

    const getRightIcon = () => {
        if (isPassword) {
            return isPasswordVisible ? 'eye-off' : 'eye';
        }
        return rightIcon;
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {label && (
                <Text style={[styles.label, { color: theme.colors.text }]}>
                    {label}
                </Text>
            )}

            <View style={[
                styles.inputContainer,
                {
                    borderColor: error
                        ? theme.colors.error
                        : isFocused
                            ? theme.colors.primary
                            : theme.colors.border,
                    backgroundColor: theme.colors.surface,
                },
                style
            ]}>
                <TextInput
                    style={[
                        styles.input,
                        {
                            color: theme.colors.text,
                            flex: 1,
                        },
                        inputStyle
                    ]}
                    placeholderTextColor={theme.colors.textSecondary}
                    secureTextEntry={showPassword}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />

                {(rightIcon || isPassword) && (
                    <TouchableOpacity
                        onPress={handleRightIconPress}
                        style={styles.rightIcon}
                    >
                        <Ionicons
                            name={getRightIcon()!}
                            size={20}
                            color={theme.colors.textSecondary}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {error && (
                <Text style={[styles.errorText, { color: theme.colors.error }]}>
                    {error}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        minHeight: 48,
    },
    input: {
        fontSize: 16,
        paddingVertical: 12,
    },
    rightIcon: {
        padding: 4,
        marginLeft: 8,
    },
    errorText: {
        fontSize: 12,
        marginTop: 4,
    },
});