// components/OnboardingLayout.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useThemeStore } from '../stores/themeStore';
import { Button } from './Button';
import { Layout } from './Layout';

interface OnboardingLayoutProps {
    title: string;
    subtitle: string;
    progressWidth: string;
    children: React.ReactNode;
    onContinue: () => void;
    onSkip?: () => void;
    showSkip?: boolean;
    continueTitle?: string;
    skipTitle?: string;
    continueDisabled?: boolean;
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
    title,
    subtitle,
    progressWidth,
    children,
    onContinue,
    onSkip,
    showSkip = false,
    continueTitle = "Continue",
    skipTitle = "Skip",
    continueDisabled = false
}) => {
    const router = useRouter();
    const { theme } = useThemeStore();

    const handleBack = () => {
        router.back();
    };

    return (
        <Layout contentStyle={styles.layoutContent}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <View style={styles.container}>
                    {/* Header - Fixed */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                            <Ionicons
                                name="chevron-back"
                                size={24}
                                color={theme.colors.text}
                            />
                        </TouchableOpacity>

                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, {
                                backgroundColor: theme.colors.primary,
                                width: progressWidth
                            }]} />
                        </View>
                    </View>

                    {/* Content - Scrollable */}
                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.titleContainer}>
                            <Text style={[styles.title, { color: theme.colors.text }]}>
                                {title}
                            </Text>
                            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                                {subtitle}
                            </Text>
                        </View>

                        {/* Conteúdo específico da tela */}
                        <View style={styles.contentContainer}>
                            {children}
                        </View>
                    </ScrollView>

                    {/* Buttons - Fixed at bottom */}
                    <View style={[styles.buttonContainer, { borderTopColor: theme.colors.border }]}>
                        {showSkip && onSkip && (
                            <Button
                                title={skipTitle}
                                onPress={onSkip}
                                variant="ghost"
                                style={styles.skipButton}
                            />
                        )}

                        <Button
                            title={continueTitle}
                            onPress={onContinue}
                            disabled={continueDisabled}
                            style={showSkip ? styles.continueButton : styles.continueButtonFull}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    layoutContent: {
        paddingHorizontal: 0,
        paddingTop: 0,
        paddingBottom: 0,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 16,
    },
    backButton: {
        marginRight: 16,
        padding: 4,
    },
    progressBar: {
        flex: 1,
        height: 4,
        backgroundColor: '#E5E7EB',
        borderRadius: 2,
    },
    progressFill: {
        height: '100%',
        borderRadius: 2,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    titleContainer: {
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 8,
        lineHeight: 32,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
    },
    contentContainer: {
        flex: 1,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 16,
        paddingVertical: 16,
        borderTopWidth: 1,
        backgroundColor: 'transparent',
    },
    skipButton: {
        flex: 1,
    },
    continueButton: {
        flex: 1,
    },
    continueButtonFull: {
        flex: 1,
    },
});