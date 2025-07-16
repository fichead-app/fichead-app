// app/notifications.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Layout } from '../components/Layout';
import { useThemeStore } from '../stores/themeStore';

interface NotificationItemProps {
    id: string;
    title: string;
    message: string;
    time: string;
    icon: keyof typeof Ionicons.glyphMap;
    iconBgColor: string;
    iconColor: string;
    isNew?: boolean;
    onPress: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
    title,
    message,
    time,
    icon,
    iconBgColor,
    iconColor,
    isNew,
    onPress
}) => {
    const { theme } = useThemeStore();

    return (
        <TouchableOpacity style={styles.notificationItem} onPress={onPress}>
            <View style={styles.notificationContent}>
                <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
                    <Ionicons name={icon} size={20} color={iconColor} />
                </View>

                <View style={styles.textContent}>
                    <View style={styles.headerRow}>
                        <Text style={[styles.title, { color: theme.colors.text }]}>
                            {title}
                        </Text>
                        {isNew && (
                            <View style={[styles.newBadge, { backgroundColor: theme.colors.primary }]}>
                                <Text style={[styles.newText, { color: theme.colors.white }]}>
                                    New
                                </Text>
                            </View>
                        )}
                    </View>

                    <Text style={[styles.time, { color: theme.colors.textSecondary }]}>
                        {time}
                    </Text>

                    <Text style={[styles.message, { color: theme.colors.textSecondary }]}>
                        {message}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const EmptyNotifications: React.FC = () => {
    const { theme } = useThemeStore();

    return (
        <View style={styles.emptyContainer}>
            <View style={styles.emptyIllustration}>
                {/* Clipboard illustration */}
                <View style={[styles.clipboard, styles.clipboardBack, { backgroundColor: theme.colors.border }]} />
                <View style={[styles.clipboard, styles.clipboardFront, { backgroundColor: theme.colors.surface }]}>
                    <View style={[styles.clipboardClip, { backgroundColor: theme.colors.primary }]} />
                </View>
            </View>

            <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
                Empty
            </Text>
            <Text style={[styles.emptyMessage, { color: theme.colors.textSecondary }]}>
                You don't have any notification at this time
            </Text>
        </View>
    );
};

export default function NotificationsScreen() {
    const router = useRouter();
    const { theme } = useThemeStore();
    const [notifications, setNotifications] = useState([
        {
            id: '1',
            title: 'Security Updates!',
            message: 'Now Erabook has a Two-Factor Authentication. Try it now to make your account more secure.',
            time: 'Today | 09:24 AM',
            icon: 'checkmark-circle' as const,
            iconBgColor: '#E3F2FD',
            iconColor: '#2196F3',
            isNew: true
        },
        {
            id: '2',
            title: 'Multiple Card Features!',
            message: 'Now you can also connect Erabook with multiple MasterCard & Visa. Try the service now.',
            time: '1 day ago | 14:43 PM',
            icon: 'card' as const,
            iconBgColor: '#FFF3E0',
            iconColor: '#FF9800',
            isNew: true
        },
        {
            id: '3',
            title: 'New Updates Available!',
            message: 'Update Erabook now to get access to the latest features for easier in buying ebook.',
            time: '2 days ago | 10:29 AM',
            icon: 'checkmark-circle' as const,
            iconBgColor: '#E8F5E8',
            iconColor: '#4CAF50'
        },
        {
            id: '4',
            title: 'Your Storage is Almost Full!',
            message: 'Your storage is almost full. Delete some items to make more space.',
            time: '5 days ago | 16:52 PM',
            icon: 'remove-circle' as const,
            iconBgColor: '#FFEBEE',
            iconColor: '#F44336'
        },
        {
            id: '5',
            title: 'Credit Card Connected!',
            message: 'Your credit card has been successfully linked with Erabook. Enjoy our services.',
            time: '6 days ago | 15:38 PM',
            icon: 'card' as const,
            iconBgColor: '#F3E5F5',
            iconColor: '#9C27B0'
        },
        {
            id: '6',
            title: 'Account Setup Successful!',
            message: 'Your account creation is successful, you can now experience our services.',
            time: '12 Dec, 2022 | 14:27 PM',
            icon: 'checkmark-circle' as const,
            iconBgColor: '#E8F5E8',
            iconColor: '#4CAF50'
        }
    ]);

    const handleBack = () => {
        router.back();
    };

    const handleSettings = () => {
        console.log('Open notification settings');
    };

    const handleNotificationPress = (id: string) => {
        console.log('Notification pressed:', id);
    };

    // Toggle between empty and filled state for demo
    const [showEmpty, setShowEmpty] = useState(false);

    return (
        <Layout>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
                    </TouchableOpacity>

                    <Text style={[styles.title, { color: theme.colors.text }]}>
                        Notification
                    </Text>

                    <TouchableOpacity onPress={handleSettings} style={styles.settingsButton}>
                        <Ionicons name="settings-outline" size={24} color={theme.colors.text} />
                    </TouchableOpacity>
                </View>

                {/* Debug Button - Remove in production */}
                <TouchableOpacity
                    style={[styles.debugButton, { backgroundColor: theme.colors.primary }]}
                    onPress={() => setShowEmpty(!showEmpty)}
                >
                    <Text style={{ color: theme.colors.white, fontSize: 12 }}>
                        Toggle Empty State (Debug)
                    </Text>
                </TouchableOpacity>

                {/* Content */}
                {showEmpty || notifications.length === 0 ? (
                    <EmptyNotifications />
                ) : (
                    <ScrollView
                        style={styles.notificationsList}
                        showsVerticalScrollIndicator={false}
                    >
                        {notifications.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                id={notification.id}
                                title={notification.title}
                                message={notification.message}
                                time={notification.time}
                                icon={notification.icon}
                                iconBgColor={notification.iconBgColor}
                                iconColor={notification.iconColor}
                                isNew={notification.isNew}
                                onPress={() => handleNotificationPress(notification.id)}
                            />
                        ))}
                    </ScrollView>
                )}
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
        paddingHorizontal: 4,
    },
    backButton: {
        padding: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 16,
    },
    settingsButton: {
        padding: 4,
    },
    debugButton: {
        alignSelf: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 16,
        marginBottom: 16,
    },
    // Empty State Styles
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    emptyIllustration: {
        position: 'relative',
        marginBottom: 48,
    },
    clipboard: {
        width: 120,
        height: 160,
        borderRadius: 8,
        position: 'relative',
    },
    clipboardBack: {
        transform: [{ rotate: '-5deg' }],
        opacity: 0.6,
    },
    clipboardFront: {
        position: 'absolute',
        top: -20,
        left: 20,
        transform: [{ rotate: '5deg' }],
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    clipboardClip: {
        position: 'absolute',
        top: -8,
        left: '50%',
        marginLeft: -20,
        width: 40,
        height: 16,
        borderRadius: 4,
    },
    emptyTitle: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 12,
    },
    emptyMessage: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
    },
    // Notifications List Styles
    notificationsList: {
        flex: 1,
    },
    notificationItem: {
        marginBottom: 24,
    },
    notificationContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContent: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    newBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    newText: {
        fontSize: 12,
        fontWeight: '600',
    },
    time: {
        fontSize: 14,
        marginBottom: 8,
    },
    message: {
        fontSize: 14,
        lineHeight: 20,
    },
});