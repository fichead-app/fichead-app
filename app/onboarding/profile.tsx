// app/onboarding/profile.tsx - Usando OnboardingLayout
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Input } from '../../components/Input';
import { OnboardingLayout } from '../../components/OnboardingLayout';
import { useThemeStore } from '../../stores/themeStore';
import { useUserStore } from '../../stores/userStore';

export default function OnboardingProfile() {
    const router = useRouter();
    const { theme } = useThemeStore();
    const { updateUser, user } = useUserStore();

    const [formData, setFormData] = useState({
        fullName: user?.fullName || 'Andrew Ainsley',
        phoneNumber: user?.phoneNumber || '+1-300-555-0399',
        dateOfBirth: user?.dateOfBirth || '12/27/1995',
        country: user?.country || 'United States',
    });

    const handleContinue = () => {
        if (!formData.fullName.trim()) {
            Alert.alert('Error', 'Please enter your full name');
            return;
        }

        updateUser({
            fullName: formData.fullName,
            phoneNumber: formData.phoneNumber,
            dateOfBirth: formData.dateOfBirth,
            country: formData.country,
        });

        router.push('/onboarding/success');
    };

    const handleAvatarPress = () => {
        Alert.alert('Avatar', 'Avatar selection will be implemented');
    };

    return (
        <OnboardingLayout
            title="Complete Your Profile 📝"
            subtitle="Don't worry, only you can see your personal data. No one else will be able to see it."
            progressWidth="100%"
            onContinue={handleContinue}
        >
            {/* Avatar */}
            <TouchableOpacity
                style={styles.avatarContainer}
                onPress={handleAvatarPress}
            >
                <View style={[styles.avatar, { backgroundColor: theme.colors.surface }]}>
                    <Ionicons
                        name="person"
                        size={48}
                        color={theme.colors.textSecondary}
                    />
                </View>
                <View style={[styles.editIcon, { backgroundColor: theme.colors.primary }]}>
                    <Ionicons
                        name="pencil"
                        size={16}
                        color={theme.colors.white}
                    />
                </View>
            </TouchableOpacity>

            {/* Form */}
            <View style={styles.form}>
                <Input
                    label="Full Name"
                    value={formData.fullName}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, fullName: text }))}
                    placeholder="Enter your full name"
                />

                <Input
                    label="Phone Number"
                    value={formData.phoneNumber}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, phoneNumber: text }))}
                    placeholder="Enter your phone number"
                    keyboardType="phone-pad"
                />

                <Input
                    label="Date of Birth"
                    value={formData.dateOfBirth}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, dateOfBirth: text }))}
                    placeholder="MM/DD/YYYY"
                    rightIcon="calendar"
                />

                <View style={styles.countryContainer}>
                    <Text style={[styles.countryLabel, { color: theme.colors.text }]}>
                        Country
                    </Text>
                    <TouchableOpacity
                        style={[styles.countrySelector, {
                            borderColor: theme.colors.border,
                            backgroundColor: theme.colors.surface
                        }]}
                    >
                        <Text style={[styles.countryText, { color: theme.colors.text }]}>
                            {formData.country}
                        </Text>
                        <Ionicons
                            name="chevron-down"
                            size={20}
                            color={theme.colors.textSecondary}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </OnboardingLayout>
    );
}

const styles = StyleSheet.create({
    avatarContainer: {
        alignSelf: 'center',
        marginBottom: 32,
        position: 'relative',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        gap: 8,
    },
    countryContainer: {
        marginVertical: 8,
    },
    countryLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
    },
    countrySelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        minHeight: 48,
    },
    countryText: {
        fontSize: 16,
    },
});