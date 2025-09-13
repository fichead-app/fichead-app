// app/auth/login.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Layout } from '../../components/Layout';
import { useThemeStore } from '../../stores/themeStore';
import { useUserStore } from '../../stores/userStore';

export default function LoginScreen() {
    const router = useRouter();
    const { theme } = useThemeStore();
    const { login, loading, error, clearError } = useUserStore();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [rememberMe, setRememberMe] = useState(true);

    const handleBack = () => {
        router.back();
    };

    const handleLogin = async () => {
        if (!formData.email.trim() || !formData.password.trim()) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        clearError();

        const success = await login(formData.email.trim(), formData.password);

        if (success) {
            router.replace('/(tabs)');
        } else if (error) {
            Alert.alert('Erro', error);
        }
    };

    const handleForgotPassword = () => {
        router.push('/auth/forgot-password');
    };

    const handleSocialLogin = (provider: string) => {
        Alert.alert('Login Social', `Login com ${provider} ainda será implementado`);
    };

    return (
        <Layout scrollable={true}>
            <View style={styles.container}>
                {/* Overlay de Loading */}
                <Modal transparent visible={loading} animationType="fade">
                    <View style={styles.overlay}>
                        <ActivityIndicator size="large" color={theme.colors.primary} />
                        <Text style={styles.loadingText}>Entrando na sua conta...</Text>
                    </View>
                </Modal>

                {/* Header */}
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Ionicons
                        name="chevron-back"
                        size={24}
                        color={theme.colors.text}
                    />
                </TouchableOpacity>

                {/* Content */}
                <View style={styles.content}>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.title, { color: theme.colors.text }]}>
                            Olá 👋
                        </Text>
                        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                            Digite seu e-mail/usuário e senha para acessar sua conta.
                        </Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        <Input
                            label="Usuário / Email"
                            value={formData.email}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                            placeholder="Digite seu e-mail"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <Input
                            label="Senha"
                            value={formData.password}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                            placeholder="Digite sua senha"
                            secureTextEntry
                            rightIcon="eye"
                        />

                        {/* Remember Me */}
                        <TouchableOpacity
                            style={styles.rememberMeContainer}
                            onPress={() => setRememberMe(!rememberMe)}
                        >
                            <View style={[
                                styles.checkbox,
                                {
                                    borderColor: theme.colors.border,
                                    backgroundColor: rememberMe ? theme.colors.primary : 'transparent'
                                }
                            ]}>
                                {rememberMe && (
                                    <Ionicons
                                        name="checkmark"
                                        size={16}
                                        color={theme.colors.white}
                                    />
                                )}
                            </View>
                            <Text style={[styles.rememberMeText, { color: theme.colors.text }]}>
                                Lembrar-me
                            </Text>
                        </TouchableOpacity>

                        {/* Forgot Password */}
                        <TouchableOpacity onPress={handleForgotPassword}>
                            <Text style={[styles.forgotPassword, { color: theme.colors.primary }]}>
                                Esqueceu sua senha?
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    {/* Social Login */}
                    <Text style={[styles.orText, { color: theme.colors.textSecondary }]}>
                        ou entre com
                    </Text>

                    <View style={styles.socialContainer}>
                        <TouchableOpacity
                            style={[styles.socialButton, { borderColor: theme.colors.border }]}
                            onPress={() => handleSocialLogin('Google')}
                        >
                            <Text style={styles.socialIcon}>G</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.socialButton, { borderColor: theme.colors.border }]}
                            onPress={() => handleSocialLogin('Apple')}
                        >
                            <Ionicons name="logo-apple" size={24} color={theme.colors.text} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.socialButton, { borderColor: theme.colors.border }]}
                            onPress={() => handleSocialLogin('Facebook')}
                        >
                            <Ionicons name="logo-facebook" size={24} color="#1877F2" />
                        </TouchableOpacity>
                    </View>

                    <Button
                        title="Entrar"
                        onPress={handleLogin}
                        loading={loading}
                        style={styles.signInButton}
                    />

                    {/* Register Link */}
                    <View style={styles.registerContainer}>
                        <Text style={[styles.registerText, { color: theme.colors.textSecondary }]}>
                            Não tem uma conta?{' '}
                        </Text>
                        <TouchableOpacity onPress={() => router.push('/onboarding')}>
                            <Text style={[styles.registerLink, { color: theme.colors.primary }]}>
                                Criar conta
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    loadingText: {
        marginTop: 16,
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    backButton: {
        alignSelf: 'flex-start',
        padding: 4,
        marginBottom: 24,
    },
    content: {
        flex: 1,
    },
    titleContainer: {
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
    },
    form: {
        gap: 8,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rememberMeText: {
        fontSize: 16,
        fontWeight: '500',
    },
    forgotPassword: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 8,
    },
    buttonContainer: {
        gap: 16,
        marginTop: 32,
    },
    orText: {
        textAlign: 'center',
        fontSize: 14,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
    },
    socialButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialIcon: {
        fontSize: 18,
        fontWeight: '700',
        color: '#4285F4',
    },
    signInButton: {
        marginTop: 8,
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    registerText: {
        fontSize: 16,
    },
    registerLink: {
        fontSize: 16,
        fontWeight: '600',
    },
});
