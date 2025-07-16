// app/_layout.tsx
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useThemeStore } from '../stores/themeStore';

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const { setTheme } = useThemeStore();

    useEffect(() => {
        // Aplicar tema baseado nas configurações do sistema
        if (colorScheme) {
            setTheme(colorScheme);
        }
    }, [colorScheme, setTheme]);

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="onboarding"
                options={{
                    headerShown: false,
                    gestureEnabled: false
                }}
            />
            <Stack.Screen
                name="auth"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="(tabs)"
                options={{
                    headerShown: false
                }}
            />
        </Stack>
    );
}