// app/(tabs)/profile.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import { Layout } from '../../components/Layout';
import { useThemeStore } from '../../stores/themeStore';
import { useUserStore } from '../../stores/userStore';

interface ProfileMenuItemProps {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle?: string;
    onPress: () => void;
    showArrow?: boolean;
    rightElement?: React.ReactNode;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
    icon,
    title,
    subtitle,
    onPress,
    showArrow = true,
    rightElement
}) => {
    const { theme } = useThemeStore();

    return (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.menuItemLeft}>
                <View style={[styles.iconContainer, { backgroundColor: theme.colors.surface }]}>
                    <Ionicons name={icon} size={20} color={theme.colors.primary} />
                </View>
                <View style={styles.menuItemContent}>
                    <Text style={[styles.menuItemTitle, { color: theme.colors.text }]}>
                        {title}
                    </Text>
                    {subtitle && (
                        <Text style={[styles.menuItemSubtitle, { color: theme.colors.textSecondary }]}>
                            {subtitle}
                        </Text>
                    )}
                </View>
            </View>

            <View style={styles.menuItemRight}>
                {rightElement}
                {showArrow && (
                    <Ionicons
                        name="chevron-forward"
                        size={16}
                        color={theme.colors.textSecondary}
                    />
                )}
            </View>
        </TouchableOpacity>
    );
};

const StatsCard: React.FC<{ title: string; value: string; icon: keyof typeof Ionicons.glyphMap }> = ({
    title,
    value,
    icon
}) => {
    const { theme } = useThemeStore();

    return (
        <View style={[styles.statsCard, { backgroundColor: theme.colors.surface }]}>
            <Ionicons name={icon} size={24} color={theme.colors.primary} />
            <Text style={[styles.statsValue, { color: theme.colors.text }]}>
                {value}
            </Text>
            <Text style={[styles.statsTitle, { color: theme.colors.textSecondary }]}>
                {title}
            </Text>
        </View>
    );
};

export default function ProfileScreen() {
    const router = useRouter();
    const { theme, toggleTheme, mode } = useThemeStore();
    const { user, logout } = useUserStore();

    const handleEditProfile = () => {
        console.log('Edit profile');
    };

    const handleNotifications = () => {
        console.log('Notifications settings');
    };

    const handlePrivacy = () => {
        console.log('Privacy settings');
    };

    const handleHelp = () => {
        console.log('Help & Support');
    };

    const handleAbout = () => {
        console.log('About');
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: () => {
                        logout();
                        router.replace('/auth/login');
                    }
                }
            ]
        );
    };

    return (
        <Layout scrollable>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={[styles.title, { color: theme.colors.text }]}>
                        Profile
                    </Text>
                    <TouchableOpacity>
                        <Ionicons name="settings" size={24} color={theme.colors.text} />
                    </TouchableOpacity>
                </View>

                {/* Profile Info */}
                <View style={[styles.profileCard, { backgroundColor: theme.colors.surface }]}>
                    <View style={styles.profileHeader}>
                        <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
                            <Text style={[styles.avatarText, { color: theme.colors.white }]}>
                                {user?.fullName?.charAt(0) || 'U'}
                            </Text>
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={[styles.userName, { color: theme.colors.text }]}>
                                {user?.fullName || 'User Name'}
                            </Text>
                            <Text style={[styles.userEmail, { color: theme.colors.textSecondary }]}>
                                {user?.email || 'user@email.com'}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={handleEditProfile}>
                            <Ionicons name="pencil" size={20} color={theme.colors.primary} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Stats */}
                <View style={styles.statsContainer}>
                    <StatsCard title="Books Read" value="24" icon="book" />
                    <StatsCard title="Reading Goals" value="3/5" icon="trophy" />
                    <StatsCard title="Reviews" value="12" icon="star" />
                </View>

                {/* Menu Section */}
                <View style={styles.menuSection}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                        Account
                    </Text>

                    <ProfileMenuItem
                        icon="person-outline"
                        title="Edit Profile"
                        subtitle="Update your personal information"
                        onPress={handleEditProfile}
                    />

                    <ProfileMenuItem
                        icon="notifications-outline"
                        title="Notifications"
                        subtitle="Manage your notification preferences"
                        onPress={handleNotifications}
                    />

                    <ProfileMenuItem
                        icon="shield-outline"
                        title="Privacy & Security"
                        subtitle="Control your privacy settings"
                        onPress={handlePrivacy}
                    />
                </View>

                {/* Preferences Section */}
                <View style={styles.menuSection}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                        Preferences
                    </Text>

                    <ProfileMenuItem
                        icon="moon-outline"
                        title="Dark Mode"
                        subtitle={`Currently ${mode === 'dark' ? 'enabled' : 'disabled'}`}
                        onPress={toggleTheme}
                        showArrow={false}
                        rightElement={
                            <TouchableOpacity
                                style={[
                                    styles.switch,
                                    { backgroundColor: mode === 'dark' ? theme.colors.primary : theme.colors.border }
                                ]}
                                onPress={toggleTheme}
                            >
                                <View style={[
                                    styles.switchThumb,
                                    {
                                        backgroundColor: theme.colors.white,
                                        transform: [{ translateX: mode === 'dark' ? 20 : 0 }]
                                    }
                                ]} />
                            </TouchableOpacity>
                        }
                    />

                    <ProfileMenuItem
                        icon="language-outline"
                        title="Language"
                        subtitle="English"
                        onPress={() => console.log('Language')}
                    />
                </View>

                {/* Support Section */}
                <View style={styles.menuSection}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                        Support
                    </Text>

                    <ProfileMenuItem
                        icon="help-circle-outline"
                        title="Help & Support"
                        subtitle="Get help or contact us"
                        onPress={handleHelp}
                    />

                    <ProfileMenuItem
                        icon="information-circle-outline"
                        title="About"
                        subtitle="App version and information"
                        onPress={handleAbout}
                    />
                </View>

                {/* Logout Button */}
                <Button
                    title="Logout"
                    onPress={handleLogout}
                    variant="outline"
                    style={[styles.logoutButton, { borderColor: theme.colors.error }]}
                    textStyle={{ color: theme.colors.error }}
                />
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
    },
    profileCard: {
        padding: 20,
        borderRadius: 16,
        marginBottom: 24,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    avatarText: {
        fontSize: 24,
        fontWeight: '700',
    },
    profileInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
    },
    statsContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 32,
    },
    statsCard: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    statsValue: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 8,
        marginBottom: 4,
    },
    statsTitle: {
        fontSize: 12,
        textAlign: 'center',
    },
    menuSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuItemContent: {
        flex: 1,
    },
    menuItemTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 2,
    },
    menuItemSubtitle: {
        fontSize: 12,
    },
    menuItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    switch: {
        width: 50,
        height: 30,
        borderRadius: 15,
        padding: 2,
        justifyContent: 'center',
    },
    switchThumb: {
        width: 26,
        height: 26,
        borderRadius: 13,
    },
    logoutButton: {
        marginTop: 16,
    },
});