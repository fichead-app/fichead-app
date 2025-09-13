// app/onboarding/gender.tsx - Usando dados temporários
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { OnboardingLayout } from '../../components/OnboardingLayout';
import { useThemeStore } from '../../stores/themeStore';
import { useUserStore } from '../../stores/userStore';

type Gender = 'male' | 'female' | 'not_specified';

interface GenderOption {
    value: Gender;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    description: string;
}

const genderOptions: GenderOption[] = [
    {
        value: 'male',
        label: 'Male',
        icon: 'male',
        description: 'I identify as male'
    },
    {
        value: 'female',
        label: 'Female',
        icon: 'female',
        description: 'I identify as female'
    },
    {
        value: 'not_specified',
        label: 'Prefer not to say',
        icon: 'person',
        description: 'I prefer not to specify'
    }
];

export default function OnboardingGender() {
    const router = useRouter();
    const { theme } = useThemeStore();
    const { tempUserData, updateTempUserData } = useUserStore();
    const [selectedGender, setSelectedGender] = useState<Gender | null>(
        tempUserData?.gender || null
    );

    const handleContinue = () => {
        if (selectedGender) {
            updateTempUserData({ gender: selectedGender });
            router.push('/onboarding/age');
        }
    };

    const handleSkip = () => {
        updateTempUserData({ gender: 'not_specified' });
        router.push('/onboarding/age');
    };

    const selectGender = (gender: Gender) => {
        setSelectedGender(gender);
    };

    return (
        <OnboardingLayout
            title="What's Your Gender? 👤"
            subtitle="This helps us personalize your experience and recommend content that matches your preferences"
            progressWidth="25%"
            onContinue={handleContinue}
            onSkip={handleSkip}
            showSkip={true}
            continueDisabled={!selectedGender}
        >
            <View style={styles.genderContainer}>
                {genderOptions.map((option) => (
                    <TouchableOpacity
                        key={option.value}
                        style={[
                            styles.genderOption,
                            {
                                borderColor: selectedGender === option.value
                                    ? theme.colors.primary
                                    : theme.colors.border,
                                backgroundColor: selectedGender === option.value
                                    ? theme.colors.secondary
                                    : theme.colors.surface,
                            }
                        ]}
                        onPress={() => selectGender(option.value)}
                    >
                        <View style={styles.genderContent}>
                            <View style={[
                                styles.genderIcon,
                                {
                                    backgroundColor: selectedGender === option.value
                                        ? theme.colors.primary
                                        : theme.colors.border,
                                }
                            ]}>
                                <Ionicons
                                    name={option.icon}
                                    size={24}
                                    color={selectedGender === option.value
                                        ? theme.colors.white
                                        : theme.colors.textSecondary
                                    }
                                />
                            </View>

                            <View style={styles.genderText}>
                                <Text style={[
                                    styles.genderLabel,
                                    {
                                        color: selectedGender === option.value
                                            ? theme.colors.primary
                                            : theme.colors.text,
                                        fontWeight: selectedGender === option.value ? '600' : '500'
                                    }
                                ]}>
                                    {option.label}
                                </Text>
                                <Text style={[
                                    styles.genderDescription,
                                    { color: theme.colors.textSecondary }
                                ]}>
                                    {option.description}
                                </Text>
                            </View>

                            {selectedGender === option.value && (
                                <View style={styles.selectedIndicator}>
                                    <Ionicons
                                        name="checkmark-circle"
                                        size={20}
                                        color={theme.colors.primary}
                                    />
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Privacy Info */}
            <View style={styles.privacyContainer}>
                <View style={styles.privacyHeader}>
                    <Ionicons
                        name="lock-closed"
                        size={16}
                        color={theme.colors.textSecondary}
                    />
                    <Text style={[styles.privacyTitle, { color: theme.colors.text }]}>
                        Privacy Notice
                    </Text>
                </View>
                <Text style={[styles.privacyText, { color: theme.colors.textSecondary }]}>
                    Your gender information is kept private and secure. We use this data only to improve your personalized experience and will never share it with third parties.
                </Text>
            </View>
        </OnboardingLayout>
    );
}

const styles = StyleSheet.create({
    genderContainer: {
        gap: 16,
        marginBottom: 32,
    },
    genderOption: {
        borderWidth: 2,
        borderRadius: 16,
        padding: 20,
        minHeight: 80,
    },
    genderContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    genderIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    genderText: {
        flex: 1,
    },
    genderLabel: {
        fontSize: 16,
        marginBottom: 4,
    },
    genderDescription: {
        fontSize: 14,
        lineHeight: 20,
    },
    selectedIndicator: {
        marginLeft: 8,
    },
    privacyContainer: {
        marginTop: 16,
        padding: 16,
        borderRadius: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
    },
    privacyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
    },
    privacyTitle: {
        fontSize: 14,
        fontWeight: '600',
    },
    privacyText: {
        fontSize: 13,
        lineHeight: 18,
    },
});