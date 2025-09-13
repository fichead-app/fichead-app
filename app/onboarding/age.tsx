// app/onboarding/age.tsx - Usando dados temporários
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Input } from '../../components/Input';
import { OnboardingLayout } from '../../components/OnboardingLayout';
import { useThemeStore } from '../../stores/themeStore';
import { useUserStore } from '../../stores/userStore';

export default function OnboardingAge() {
    const router = useRouter();
    const { theme } = useThemeStore();
    const { tempUserData, updateTempUserData } = useUserStore();
    const [age, setAge] = useState(tempUserData?.age?.toString() || '');

    const handleContinue = () => {
        Keyboard.dismiss();

        const numericAge = parseInt(age);

        if (!age.trim()) {
            Alert.alert('Error', 'Please enter your age');
            return;
        }

        if (isNaN(numericAge) || numericAge < 1 || numericAge > 120) {
            Alert.alert('Error', 'Please enter a valid age between 1 and 120');
            return;
        }

        if (numericAge < 13) {
            Alert.alert('Age Restriction', 'You must be at least 13 years old to use this app');
            return;
        }

        updateTempUserData({ age: numericAge });

        setTimeout(() => {
            router.push('/onboarding/genres');
        }, 100);
    };

    const handleSkip = () => {
        Keyboard.dismiss();
        setTimeout(() => {
            router.push('/onboarding/genres');
        }, 100);
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <OnboardingLayout
                title="How Old Are You? 🎂"
                subtitle="This helps us recommend age-appropriate content for you"
                progressWidth="50%"
                onContinue={handleContinue}
                onSkip={handleSkip}
                showSkip={true}
            >
                <View style={styles.inputContainer}>
                    <Input
                        label="Your Age"
                        value={age}
                        onChangeText={setAge}
                        placeholder="Enter your age"
                        keyboardType="numeric"
                        maxLength={3}
                        returnKeyType="done"
                        onSubmitEditing={handleContinue}
                        blurOnSubmit={true}
                    />

                    <View style={styles.infoContainer}>
                        <Ionicons
                            name="information-circle-outline"
                            size={16}
                            color={theme.colors.textSecondary}
                        />
                        <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
                            You must be at least 13 years old to use this app
                        </Text>
                    </View>
                </View>

                <View style={styles.benefitsContainer}>
                    <Text style={[styles.benefitsTitle, { color: theme.colors.text }]}>
                        Why we ask for your age:
                    </Text>

                    <View style={styles.benefitItem}>
                        <View style={[styles.benefitIcon, { backgroundColor: theme.colors.primary }]}>
                            <Ionicons name="book" size={16} color={theme.colors.white} />
                        </View>
                        <Text style={[styles.benefitText, { color: theme.colors.textSecondary }]}>
                            Age-appropriate book recommendations
                        </Text>
                    </View>

                    <View style={styles.benefitItem}>
                        <View style={[styles.benefitIcon, { backgroundColor: theme.colors.primary }]}>
                            <Ionicons name="shield-checkmark" size={16} color={theme.colors.white} />
                        </View>
                        <Text style={[styles.benefitText, { color: theme.colors.textSecondary }]}>
                            Content filtering and safety
                        </Text>
                    </View>

                    <View style={styles.benefitItem}>
                        <View style={[styles.benefitIcon, { backgroundColor: theme.colors.primary }]}>
                            <Ionicons name="trending-up" size={16} color={theme.colors.white} />
                        </View>
                        <Text style={[styles.benefitText, { color: theme.colors.textSecondary }]}>
                            Personalized reading experience
                        </Text>
                    </View>
                </View>
            </OnboardingLayout>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 24,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
    },
    infoText: {
        fontSize: 14,
        flex: 1,
    },
    benefitsContainer: {
        marginTop: 8,
    },
    benefitsTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    benefitIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    benefitText: {
        fontSize: 14,
        flex: 1,
    },
});