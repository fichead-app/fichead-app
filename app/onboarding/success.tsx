// app/onboarding/success.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Layout } from '../../components/Layout';
import { LoadingDots } from '../../components/Loading';
import { useThemeStore } from '../../stores/themeStore';
import { useUserStore } from '../../stores/userStore';

export default function OnboardingSuccess() {
    const router = useRouter();
    const { theme } = useThemeStore();
    const { completeOnboarding } = useUserStore();

    useEffect(() => {
        const timer = setTimeout(() => {
            completeOnboarding();
            router.replace('/auth/login');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Layout>
            <View style={styles.container}>
                <View style={styles.content}>
                    {/* Success Icon */}
                    <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary }]}>
                        <View style={[styles.iconBackground, { backgroundColor: theme.colors.white }]}>
                            <Ionicons
                                name="person"
                                size={32}
                                color={theme.colors.primary}
                            />
                        </View>
                        {/* Decorative dots */}
                        <View style={[styles.dot, styles.dot1, { backgroundColor: theme.colors.primary }]} />
                        <View style={[styles.dot, styles.dot2, { backgroundColor: theme.colors.primary }]} />
                        <View style={[styles.dot, styles.dot3, { backgroundColor: theme.colors.primary }]} />
                        <View style={[styles.dot, styles.dot4, { backgroundColor: theme.colors.primary }]} />
                    </View>

                    {/* Success Message */}
                    <Text style={[styles.title, { color: theme.colors.primary }]}>
                        Sign Up Successful!
                    </Text>

                    <Text style={[styles.subtitle, { color: theme.colors.text }]}>
                        Your account has been created.{'\n'}
                        Please wait a moment, we are{'\n'}
                        preparing for you...
                    </Text>
                </View>

                {/* Loading Animation */}
                <LoadingDots />
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        marginBottom: 80,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
        position: 'relative',
    },
    iconBackground: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        position: 'absolute',
    },
    dot1: {
        top: 20,
        left: 20,
    },
    dot2: {
        top: 15,
        right: 25,
    },
    dot3: {
        bottom: 25,
        left: 15,
    },
    dot4: {
        bottom: 20,
        right: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
    },
});