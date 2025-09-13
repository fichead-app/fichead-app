// app/onboarding/profile.tsx - Coleta dados temporários e cria usuário
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Input } from '../../components/Input';
import { OnboardingLayout } from '../../components/OnboardingLayout';
import { apiService } from '../../services/api';
import { useThemeStore } from '../../stores/themeStore';
import { useUserStore } from '../../stores/userStore';

export default function OnboardingProfile() {
    const router = useRouter();
    const { theme } = useThemeStore();
    const {
        setUser,
        setToken,
        completeOnboarding,
        tempUserData,
        clearTempData
    } = useUserStore();

    const [registering, setRegistering] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        country: 'Brasil',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateForm = () => {
        if (!formData.fullName.trim()) {
            Alert.alert('Erro', 'Por favor, digite seu nome completo');
            return false;
        }

        if (!formData.email.trim()) {
            Alert.alert('Erro', 'Por favor, digite seu e-mail');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            Alert.alert('Erro', 'Por favor, digite um e-mail válido');
            return false;
        }

        if (!formData.dateOfBirth.trim()) {
            Alert.alert('Erro', 'Por favor, digite sua data de nascimento');
            return false;
        }

        if (!formData.password.trim()) {
            Alert.alert('Erro', 'Por favor, digite uma senha');
            return false;
        }

        if (formData.password.length < 6) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem');
            return false;
        }

        return true;
    };

    const handleContinue = async () => {
        if (!validateForm()) return;

        setRegistering(true);

        try {
            const birthDate = new Date(formData.dateOfBirth);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            const registerData = {
                name: formData.fullName.trim(),
                email: formData.email.trim().toLowerCase(),
                userapp: formData.fullName.toLowerCase().replace(/\s+/g, ''),
                password: formData.password,
                dateBirth: formData.dateOfBirth,
                avatarUrl: '',
                age: age,
                onboardCompleted: true,
                emailVerified: false,
                genre: tempUserData?.gender === 'male' ? 'male' :
                    tempUserData?.gender === 'female' ? 'female' : 'empty',
                userStylePreferences: mapGenresToPreferences(tempUserData?.favoriteGenres || [])
            };

            console.log('Dados enviados para API:', registerData);

            const response = await apiService.register(registerData);

            console.log('Resposta da API:', response);

            const newUser = {
                id: response.userRegister.id,
                fullName: response.userRegister.name,
                email: response.userRegister.email,
                phoneNumber: formData.phoneNumber,
                dateOfBirth: formData.dateOfBirth,
                country: formData.country,
                gender: tempUserData?.gender || 'not_specified',
                age: response.userRegister.age,
                favoriteGenres: tempUserData?.favoriteGenres || [],
                avatar: response.userRegister.avatarUrl || undefined,
                userapp: response.userRegister.userapp,
                onboardingCompleted: true,
                emailVerified: response.userRegister.emailVerified
            };

            setUser(newUser);
            setToken(response.token);
            completeOnboarding();
            clearTempData();

            Alert.alert(
                'Sucesso!',
                'Sua conta foi criada com sucesso!',
                [{
                    text: 'OK',
                    onPress: () => router.push('/onboarding/success')
                }]
            );

        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            Alert.alert(
                'Erro',
                error instanceof Error ? error.message : 'Erro ao criar conta. Tente novamente.'
            );
        } finally {
            setRegistering(false);
        }
    };

    const mapGenresToPreferences = (favoriteGenres: string[]) => {
        const genreMap = {
            'Romance': 'romance',
            'Fantasia': 'fantasy',
            'Ficção Científica': 'sciFi',
            'Terror': 'horror',
            'Mistério': 'mystery',
            'Suspense': 'thriller',
            'Psicologia': 'psychology',
            'Inspiração': 'inspiration',
            'Comédia': 'comedy',
            'Ação': 'action',
            'Aventura': 'adventure',
            'Quadrinhos': 'comics',
            "Infantil": 'childrens',
            'Arte & Fotografia': 'art',
            'Culinária & Bebidas': 'food',
            'Biografia': 'biography',
            'Ciência & Tecnologia': 'science',
            'Guias / Como Fazer': 'howto',
            'Viagem': 'travel'
        } as const;

        const preferences = {
            romance: false,
            fantasy: false,
            sciFi: false,
            horror: false,
            mystery: false,
            thriller: false,
            psychology: false,
            inspiration: false,
            comedy: false,
            action: false,
            adventure: false,
            comics: false,
            childrens: false,
            art: false,
            food: false,
            biography: false,
            science: false,
            technology: false,
            howto: false,
            travel: false,
            epicfantasy: false
        };

        favoriteGenres.forEach(genre => {
            const key = genreMap[genre as keyof typeof genreMap];
            if (key && key in preferences) {
                (preferences as any)[key] = true;
            }
        });

        return preferences;
    };

    const handleAvatarPress = () => {
        Alert.alert('Avatar', 'Seleção de avatar será implementada');
    };

    return (
        <OnboardingLayout
            title="Complete Seu Perfil 📝"
            subtitle="Preencha seus dados pessoais para finalizar a criação da sua conta."
            progressWidth="100%"
            onContinue={handleContinue}
            continueDisabled={registering}
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
                    label="Nome Completo"
                    value={formData.fullName}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, fullName: text }))}
                    placeholder="Digite seu nome completo"
                    autoCapitalize="words"
                />

                <Input
                    label="E-mail"
                    value={formData.email}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                    placeholder="Digite seu e-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Input
                    label="Telefone"
                    value={formData.phoneNumber}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, phoneNumber: text }))}
                    placeholder="Digite seu telefone"
                    keyboardType="phone-pad"
                />

                <Input
                    label="Data de Nascimento"
                    value={formData.dateOfBirth}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, dateOfBirth: text }))}
                    placeholder="AAAA-MM-DD"
                    rightIcon="calendar"
                />

                <Input
                    label="Senha"
                    value={formData.password}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                    placeholder="Digite sua senha"
                    secureTextEntry={!showPassword}
                    rightIcon={showPassword ? "eye-off" : "eye"}
                    onRightIconPress={() => setShowPassword(!showPassword)}
                />

                <Input
                    label="Confirmar Senha"
                    value={formData.confirmPassword}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
                    placeholder="Confirme sua senha"
                    secureTextEntry={!showConfirmPassword}
                    rightIcon={showConfirmPassword ? "eye-off" : "eye"}
                    onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />

                <View style={styles.countryContainer}>
                    <Text style={[styles.countryLabel, { color: theme.colors.text }]}>
                        País
                    </Text>
                    <TouchableOpacity
                        style={[styles.countrySelector, {
                            borderColor: theme.colors.border,
                            backgroundColor: theme.colors.surface
                        }]}
                        onPress={() => Alert.alert('Seleção de País', 'Seleção de país será implementada')}
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

            {/* Loading indicator */}
            {registering && (
                <View style={styles.loadingContainer}>
                    <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
                        Criando sua conta...
                    </Text>
                </View>
            )}
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
    loadingContainer: {
        alignItems: 'center',
        marginTop: 16,
    },
    loadingText: {
        fontSize: 14,
        fontStyle: 'italic',
    },
});
