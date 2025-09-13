// app/onboarding/index.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { Layout } from '../../components/Layout';
import { useThemeStore } from '../../stores/themeStore';

export default function OnboardingWelcome() {
    const router = useRouter();
    const { theme } = useThemeStore();

    const handleGetStarted = () => {
        router.push('/onboarding/gender');
    };

    const handleContinueWithGoogle = () => {
        // Implementar login com Google
        console.log('Continuar com Google');
    };

    const handleAlreadyHaveAccount = () => {
        router.push('/auth/login');
    };

    return (
        <Layout>
            <View style={styles.container}>
                {/* Imagem do cabeçalho */}
                <View style={styles.imageContainer}>
                    <View style={[styles.bookshelfPlaceholder, { backgroundColor: theme.colors.surface }]}>
                        <Text style={[styles.imagePlaceholderText, { color: theme.colors.textSecondary }]}>
                            📚 Imagem da Estante
                        </Text>
                    </View>
                </View>

                {/* Conteúdo */}
                <View style={styles.content}>
                    <Text style={[styles.title, { color: theme.colors.text }]}>
                        Bem-vindo ao <Text style={{ color: theme.colors.primary }}>FicHead</Text> 👋
                    </Text>

                    <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                        A melhor loja e aplicativo de ebooks deste século
                    </Text>

                    {/* Indicador de progresso */}
                    <View style={styles.progressContainer}>
                        <View style={[styles.progressDot, { backgroundColor: theme.colors.primary }]} />
                        <View style={[styles.progressDot, { backgroundColor: theme.colors.border }]} />
                        <View style={[styles.progressDot, { backgroundColor: theme.colors.border }]} />
                        <View style={[styles.progressDot, { backgroundColor: theme.colors.border }]} />
                    </View>
                </View>

                {/* Botões */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Continuar com Google"
                        onPress={handleContinueWithGoogle}
                        variant="outline"
                        style={styles.googleButton}
                    />

                    <Button
                        title="Começar Agora"
                        onPress={handleGetStarted}
                        style={styles.getStartedButton}
                    />

                    <Button
                        title="Já Tenho Uma Conta"
                        onPress={handleAlreadyHaveAccount}
                        variant="ghost"
                        style={styles.loginButton}
                    />
                </View>
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    bookshelfPlaceholder: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholderText: {
        fontSize: 16,
        fontWeight: '500',
    },
    content: {
        paddingVertical: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 12,
        lineHeight: 36,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    progressDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    buttonContainer: {
        gap: 16,
        paddingBottom: 20,
    },
    googleButton: {
        marginBottom: 8,
    },
    getStartedButton: {
        marginBottom: 8,
    },
    loginButton: {
        // Estilos do botão de login
    },
});
