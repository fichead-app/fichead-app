// app/auth/forgot-password.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Layout } from '../../components/Layout';
import { useThemeStore } from '../../stores/themeStore';

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const { theme } = useThemeStore();
    const [email, setEmail] = useState('andrew.ainsley@yourdomain.com');
    const [loading, setLoading] = useState(false);

    const handleBack = () => {
        router.back();
    };

    const handleContinue = async () => {
        if (!email.trim()) {
            Alert.alert('Error', 'Please enter your email address');
            return;
        }

        setLoading(true);

        // Simular envio de email
        setTimeout(() => {
            setLoading(false);
            router.push('/auth/verify-code');
        }, 2000);
    };

    return (
        <Layout>
            <View style={styles.container}>
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
                            Forgot Password 🔑
                        </Text>
                        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                            Enter your email address. We will send an OTP code for verification in the next step.
                        </Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        <Input
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                {/* Continue Button */}
                <Button
                    title="Continue"
                    onPress={handleContinue}
                    loading={loading}
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
        marginTop: 16,
    },
    continueButton: {
        marginTop: 32,
    },
});