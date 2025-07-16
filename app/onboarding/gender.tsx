// app/onboarding/gender.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import { Layout } from '../../components/Layout';
import { useThemeStore } from '../../stores/themeStore';
import { useUserStore } from '../../stores/userStore';

type GenderOption = 'male' | 'female' | 'not_specified';

export default function OnboardingGender() {
    const router = useRouter();
    const { theme } = useThemeStore();
    const { updateUser } = useUserStore();
    const [selectedGender, setSelectedGender] = useState<GenderOption>('male');

    const handleBack = () => {
        router.back();
    };

    const handleContinue = () => {
        updateUser({ gender: selectedGender });
        router.push('/onboarding/age');
    };

    const genderOptions = [
        { value: 'male', label: 'I am male' },
        { value: 'female', label: 'I am female' },
        { value: 'not_specified', label: 'Rather not to say' },
    ] as const;

    return (
        <Layout>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color={theme.colors.text}
                        />
                    </TouchableOpacity>

                    {/* Progress Bar */}
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, {
                            backgroundColor: theme.colors.primary,
                            width: '25%'
                        }]} />
                    </View>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.title, { color: theme.colors.text }]}>
                            What is your gender? ♂️
                        </Text>
                        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                            Select gender for better content.
                        </Text>
                    </View>

                    <View style={styles.optionsContainer}>
                        {genderOptions.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                style={[
                                    styles.optionButton,
                                    {
                                        borderColor: selectedGender === option.value
                                            ? theme.colors.primary
                                            : theme.colors.border,
                                        backgroundColor: selectedGender === option.value
                                            ? theme.colors.secondary
                                            : theme.colors.surface,
                                    }
                                ]}
                                onPress={() => setSelectedGender(option.value)}
                            >
                                <View style={styles.radioContainer}>
                                    <View style={[
                                        styles.radioOuter,
                                        {
                                            borderColor: selectedGender === option.value
                                                ? theme.colors.primary
                                                : theme.colors.border
                                        }
                                    ]}>
                                        {selectedGender === option.value && (
                                            <View style={[styles.radioInner, { backgroundColor: theme.colors.primary }]} />
                                        )}
                                    </View>
                                    <Text style={[styles.optionText, { color: theme.colors.text }]}>
                                        {option.label}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Continue Button */}
                <Button
                    title="Continue"
                    onPress={handleContinue}
                    style={styles.continueButton}
                />
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
        marginBottom: 32,
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
    content: {
        flex: 1,
    },
    titleContainer: {
        marginBottom: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
    },
    optionsContainer: {
        gap: 16,
    },
    optionButton: {
        padding: 20,
        borderRadius: 12,
        borderWidth: 2,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    optionText: {
        fontSize: 16,
        fontWeight: '500',
    },
    continueButton: {
        marginTop: 24,
    },
});