// components/ErrorMessage.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeStore } from '../stores/themeStore';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
    onDismiss?: () => void;
    type?: 'error' | 'warning' | 'info';
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
    message,
    onRetry,
    onDismiss,
    type = 'error'
}) => {
    const { theme } = useThemeStore();

    const getIconName = () => {
        switch (type) {
            case 'warning':
                return 'warning';
            case 'info':
                return 'information-circle';
            default:
                return 'alert-circle';
        }
    };

    const getBackgroundColor = () => {
        switch (type) {
            case 'warning':
                return theme.colors.warning;
            case 'info':
                return theme.colors.info;
            default:
                return theme.colors.error;
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: `${getBackgroundColor()}15` }]}>
            <View style={styles.content}>
                <Ionicons
                    name={getIconName()}
                    size={20}
                    color={getBackgroundColor()}
                    style={styles.icon}
                />
                <Text style={[styles.message, { color: getBackgroundColor() }]}>
                    {message}
                </Text>

                <View style={styles.actions}>
                    {onRetry && (
                        <TouchableOpacity
                            onPress={onRetry}
                            style={[styles.button, { borderColor: getBackgroundColor() }]}
                        >
                            <Text style={[styles.buttonText, { color: getBackgroundColor() }]}>
                                Tentar novamente
                            </Text>
                        </TouchableOpacity>
                    )}

                    {onDismiss && (
                        <TouchableOpacity
                            onPress={onDismiss}
                            style={styles.dismissButton}
                        >
                            <Ionicons
                                name="close"
                                size={16}
                                color={getBackgroundColor()}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        margin: 16,
        padding: 16,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    icon: {
        marginRight: 12,
        marginTop: 2,
    },
    message: {
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    button: {
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    buttonText: {
        fontSize: 12,
        fontWeight: '500',
    },
    dismissButton: {
        padding: 4,
    },
});