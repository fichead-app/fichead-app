// components/Loading.tsx
import React from 'react';
import {
    ActivityIndicator,
    Text,
    TextStyle,
    View,
    ViewStyle
} from 'react-native';
import { useThemeStore } from '../stores/themeStore';

interface LoadingProps {
    size?: 'small' | 'large';
    color?: string;
    text?: string;
    style?: ViewStyle;
}

export const Loading: React.FC<LoadingProps> = ({
    size = 'large',
    color,
    text,
    style,
}) => {
    const { theme } = useThemeStore();

    const containerStyle: ViewStyle = {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.lg,
    };

    const textStyle: TextStyle = {
        fontSize: theme.typography.fontSizes.md,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.md,
        textAlign: 'center',
    };

    return (
        <View style={[containerStyle, style]}>
            <ActivityIndicator
                size={size}
                color={color || theme.colors.primary}
            />
            {text && <Text style={textStyle}>{text}</Text>}
        </View>
    );
};

// Loading com dots animados
export const LoadingDots: React.FC<{ style?: ViewStyle }> = ({ style }) => {
    const { theme } = useThemeStore();
    const [dotCount, setDotCount] = React.useState(1);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setDotCount((prev) => (prev === 3 ? 1 : prev + 1));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const containerStyle: ViewStyle = {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.md,
    };

    const dotStyle: ViewStyle = {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.primary,
        marginHorizontal: 2,
    };

    const inactiveDotStyle: ViewStyle = {
        ...dotStyle,
        backgroundColor: theme.colors.border,
    };

    return (
        <View style={[containerStyle, style]}>
            {[1, 2, 3].map((index) => (
                <View
                    key={index}
                    style={index <= dotCount ? dotStyle : inactiveDotStyle}
                />
            ))}
        </View>
    );
};