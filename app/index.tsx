// app/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LoadingDots } from '../components/Loading';
import { useThemeStore } from '../stores/themeStore';
import { useUserStore } from '../stores/userStore';

export default function SplashScreen() {
    const router = useRouter();
    const { theme } = useThemeStore();
    const { isAuthenticated, onboardingCompleted } = useUserStore();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isAuthenticated && onboardingCompleted) {
                router.replace('/(tabs)');
            } else if (isAuthenticated && !onboardingCompleted) {
                router.replace('/onboarding');
            } else {
                router.replace('/onboarding');
            }
        }, 2500);

        return () => clearTimeout(timer);
    }, [isAuthenticated, onboardingCompleted]);

    return (
        <LinearGradient
            colors={[theme.colors.primary, theme.colors.primaryDark]}
            style={styles.container}
        >
            <View style={styles.content}>
                {/* Logo Icon */}
                <View style={[styles.logoContainer, { backgroundColor: theme.colors.white }]}>
                    <Ionicons
                        name="book"
                        size={48}
                        color={theme.colors.primary}
                    />
                </View>

                {/* App Name */}
                <Text style={[styles.appName, { color: theme.colors.white }]}>
                    FicHead
                </Text>

                {/* Tagline */}
                <Text style={[styles.tagline, { color: theme.colors.white }]}>
                    Your Digital Library
                </Text>
            </View>

            {/* Loading Animation */}
            <View style={styles.loadingContainer}>
                <LoadingDots />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    appName: {
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 8,
    },
    tagline: {
        fontSize: 16,
        fontWeight: '400',
        opacity: 0.8,
    },
    loadingContainer: {
        position: 'absolute',
        bottom: 100,
    },
});