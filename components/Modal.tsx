// components/Modal.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Modal as RNModal,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
import { useThemeStore } from '../stores/themeStore';
import { Button } from './Button';

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    showCloseButton?: boolean;
    primaryButtonTitle?: string;
    onPrimaryButtonPress?: () => void;
    secondaryButtonTitle?: string;
    onSecondaryButtonPress?: () => void;
    style?: ViewStyle;
}

export const Modal: React.FC<ModalProps> = ({
    visible,
    onClose,
    title,
    children,
    showCloseButton = true,
    primaryButtonTitle,
    onPrimaryButtonPress,
    secondaryButtonTitle,
    onSecondaryButtonPress,
    style,
}) => {
    const { theme } = useThemeStore();

    const overlayStyle: ViewStyle = {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.lg,
    };

    const containerStyle: ViewStyle = {
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.lg,
        width: '100%',
        maxWidth: 400,
        maxHeight: '80%',
    };

    const headerStyle: ViewStyle = {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    };

    const titleStyle: TextStyle = {
        fontSize: theme.typography.fontSizes.lg,
        fontWeight: theme.typography.fontWeights.bold,
        color: theme.colors.text,
        flex: 1,
    };

    const contentStyle: ViewStyle = {
        marginBottom: theme.spacing.lg,
    };

    const buttonContainerStyle: ViewStyle = {
        flexDirection: 'row',
        gap: theme.spacing.md,
    };

    return (
        <RNModal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={overlayStyle}>
                <View style={[containerStyle, style]}>
                    {(title || showCloseButton) && (
                        <View style={headerStyle}>
                            {title && <Text style={titleStyle}>{title}</Text>}
                            {showCloseButton && (
                                <TouchableOpacity onPress={onClose}>
                                    <Ionicons
                                        name="close"
                                        size={24}
                                        color={theme.colors.textSecondary}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    )}

                    <View style={contentStyle}>
                        {children}
                    </View>

                    {(primaryButtonTitle || secondaryButtonTitle) && (
                        <View style={buttonContainerStyle}>
                            {secondaryButtonTitle && onSecondaryButtonPress && (
                                <Button
                                    title={secondaryButtonTitle}
                                    onPress={onSecondaryButtonPress}
                                    variant="outline"
                                    style={{ flex: 1 }}
                                />
                            )}
                            {primaryButtonTitle && onPrimaryButtonPress && (
                                <Button
                                    title={primaryButtonTitle}
                                    onPress={onPrimaryButtonPress}
                                    style={{ flex: 1 }}
                                />
                            )}
                        </View>
                    )}
                </View>
            </View>
        </RNModal>
    );
};