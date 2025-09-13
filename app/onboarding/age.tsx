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
            Alert.alert('Erro', 'Por favor, insira sua idade');
            return;
        }

        if (isNaN(numericAge) || numericAge < 1 || numericAge > 120) {
            Alert.alert('Erro', 'Insira uma idade válida entre 1 e 120');
            return;
        }

        if (numericAge < 13) {
            Alert.alert('Restrição de Idade', 'Você deve ter pelo menos 13 anos para usar este aplicativo');
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
                title="Quantos anos você tem? 🎂"
                subtitle="Isso nos ajuda a recomendar conteúdos adequados para sua idade"
                progressWidth="50%"
                onContinue={handleContinue}
                onSkip={handleSkip}
                showSkip={true}
            >
                <View style={styles.inputContainer}>
                    <Input
                        label="Sua idade"
                        value={age}
                        onChangeText={setAge}
                        placeholder="Digite sua idade"
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
                            Você deve ter pelo menos 13 anos para usar este aplicativo
                        </Text>
                    </View>
                </View>

                <View style={styles.benefitsContainer}>
                    <Text style={[styles.benefitsTitle, { color: theme.colors.text }]}>
                        Por que pedimos sua idade:
                    </Text>

                    <View style={styles.benefitItem}>
                        <View style={[styles.benefitIcon, { backgroundColor: theme.colors.primary }]}>
                            <Ionicons name="book" size={16} color={theme.colors.white} />
                        </View>
                        <Text style={[styles.benefitText, { color: theme.colors.textSecondary }]}>
                            Recomendações de livros adequados para sua idade
                        </Text>
                    </View>

                    <View style={styles.benefitItem}>
                        <View style={[styles.benefitIcon, { backgroundColor: theme.colors.primary }]}>
                            <Ionicons name="shield-checkmark" size={16} color={theme.colors.white} />
                        </View>
                        <Text style={[styles.benefitText, { color: theme.colors.textSecondary }]}>
                            Filtro de conteúdo e segurança
                        </Text>
                    </View>

                    <View style={styles.benefitItem}>
                        <View style={[styles.benefitIcon, { backgroundColor: theme.colors.primary }]}>
                            <Ionicons name="trending-up" size={16} color={theme.colors.white} />
                        </View>
                        <Text style={[styles.benefitText, { color: theme.colors.textSecondary }]}>
                            Experiência de leitura personalizada
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
