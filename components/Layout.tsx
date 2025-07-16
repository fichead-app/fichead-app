// components/Layout.tsx
import React from 'react';
import {
    ScrollView,
    StatusBar,
    View,
    ViewStyle
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '../stores/themeStore';

interface LayoutProps {
    children: React.ReactNode;
    scrollable?: boolean;
    showHeader?: boolean;
    backgroundColor?: string;
    style?: ViewStyle;
    contentStyle?: ViewStyle;
}

export const Layout: React.FC<LayoutProps> = ({
    children,
    scrollable = false,
    showHeader = true,
    backgroundColor,
    style,
    contentStyle,
}) => {
    const { theme, mode } = useThemeStore();

    const containerStyle: ViewStyle = {
        flex: 1,
        backgroundColor: backgroundColor || theme.colors.background,
    };

    const defaultContentStyle: ViewStyle = {
        flex: scrollable ? undefined : 1,
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 0, // Remove padding bottom
    };

    const mergedContentStyle = [
        defaultContentStyle,
        contentStyle,
    ];

    const Content = scrollable ? ScrollView : View;

    return (
        <>
            <StatusBar
                barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundColor || theme.colors.background}
            />
            <SafeAreaView style={[containerStyle, style]} edges={['top', 'left', 'right']}>
                <Content
                    style={scrollable ? undefined : { flex: 1 }}
                    contentContainerStyle={scrollable ? mergedContentStyle : undefined}
                    showsVerticalScrollIndicator={false}
                >
                    {scrollable ? (
                        children
                    ) : (
                        <View style={mergedContentStyle}>
                            {children}
                        </View>
                    )}
                </Content>
            </SafeAreaView>
        </>
    );
};