// app/onboarding/age.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import { Layout } from '../../components/Layout';
import { useThemeStore } from '../../stores/themeStore';
import { useUserStore } from '../../stores/userStore';

type AgeRange = '14-17' | '18-24' | '25-29' | '30-34' | '35-39' | '40-44' | '45-49' | '50+';

export default function OnboardingAge() {
    const router = useRouter();
    const { theme } = useThemeStore();
    const { updateUser } = useUserStore();
    const [selectedAge, setSelectedAge] = useState<AgeRange>('25-29');

    const handleBack = () => {
        router.back();
    };

    const handleContinue = () => {
        updateUser({ ageRange: selectedAge });
        router.push('/onboarding/genres');
    };

    const ageOptions: AgeRange[] = [
        '14-17', '18-24', '25-29', '30-34',
        '35-39', '40-44', '45-49', '50+'
    ];

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
                            width: '50%'
                        }]} />
                    </View>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.title, { color: theme.colors.text }]}>
                            Choose Your Age 🎯
                        </Text>
                        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                            Select age range for better content.
                        </Text>
                    </View>

                    <View style={styles.optionsContainer}>
                        {ageOptions.map((age, index) => (
                            <TouchableOpacity
                                key={age}
                                style={[
                                    styles.optionButton,
                                    {
                                        borderColor: selectedAge === age
                                            ? theme.colors.primary
                                            : theme.colors.border,
                                        backgroundColor: selectedAge === age
                                            ? theme.colors.primary
                                            : 'transparent',
                                    },
                                    // Arrange in 2 columns
                                    index % 2 === 0 ? styles.leftColumn : styles.rightColumn
                                ]}
                                onPress={() => setSelectedAge(age)}
                            >
                                <Text style={[
                                    styles.optionText,
                                    {
                                        color: selectedAge === age
                                            ? theme.colors.white
                                            : theme.colors.text,
                                        fontWeight: selectedAge === age ? '600' : '500'
                                    }
                                ]}>
                                    {age}
                                </Text>
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    optionButton: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 25,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 56,
    },
    leftColumn: {
        width: '48%',
    },
    rightColumn: {
        width: '48%',
    },
    optionText: {
        fontSize: 16,
    },
    continueButton: {
        marginTop: 24,
    },
});