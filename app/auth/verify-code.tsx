// app/auth/verify-code.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import { Layout } from '../../components/Layout';
import { useThemeStore } from '../../stores/themeStore';

export default function VerifyCodeScreen() {
    const router = useRouter();
    const { theme } = useThemeStore();
    const [code, setCode] = useState(['4', '6', '7', '', '', '']);
    const [countdown, setCountdown] = useState(55);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleBack = () => {
        router.back();
    };

    const handleCodeChange = (index: number, value: string) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
    };

    const handleConfirm = async () => {
        const fullCode = code.join('');
        if (fullCode.length !== 6) {
            Alert.alert('Error', 'Please enter the complete verification code');
            return;
        }

        setLoading(true);

        // Simular verificação
        setTimeout(() => {
            setLoading(false);
            router.push('/auth/reset-success');
        }, 2000);
    };

    const handleResendCode = () => {
        setCountdown(55);
        Alert.alert('Code Sent', 'A new verification code has been sent to your email');
    };

    const NumberPad = () => {
        const numbers = [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            ['*', '0', '⌫']
        ];

        const handleNumberPress = (num: string) => {
            if (num === '⌫') {
                // Backspace
                const lastFilledIndex = code.findLastIndex(c => c !== '');
                if (lastFilledIndex >= 0) {
                    handleCodeChange(lastFilledIndex, '');
                }
            } else if (num !== '*') {
                // Add number
                const firstEmptyIndex = code.findIndex(c => c === '');
                if (firstEmptyIndex >= 0) {
                    handleCodeChange(firstEmptyIndex, num);
                }
            }
        };

        return (
            <View style={styles.numberPad}>
                {numbers.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.numberRow}>
                        {row.map((num) => (
                            <TouchableOpacity
                                key={num}
                                style={styles.numberButton}
                                onPress={() => handleNumberPress(num)}
                            >
                                {num === '⌫' ? (
                                    <Ionicons
                                        name="backspace-outline"
                                        size={24}
                                        color={theme.colors.text}
                                    />
                                ) : (
                                    <Text style={[styles.numberText, { color: theme.colors.text }]}>
                                        {num}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
        );
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
                            You've Got Mail 📧
                        </Text>
                        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                            We have sent the OTP verification code to your email address. Check your email and enter the code below.
                        </Text>
                    </View>

                    {/* Code Input */}
                    <View style={styles.codeContainer}>
                        {code.map((digit, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.codeInput,
                                    {
                                        borderColor: digit ? theme.colors.primary : theme.colors.border,
                                        backgroundColor: digit ? theme.colors.secondary : theme.colors.surface,
                                    }
                                ]}
                            >
                                <Text style={[styles.codeText, { color: theme.colors.text }]}>
                                    {digit}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Resend Code */}
                    <View style={styles.resendContainer}>
                        <Text style={[styles.resendText, { color: theme.colors.textSecondary }]}>
                            Didn't receive email?
                        </Text>
                        <Text style={[styles.countdownText, { color: theme.colors.primary }]}>
                            You can resend code in {countdown} s
                        </Text>
                    </View>
                </View>

                {/* Confirm Button */}
                <Button
                    title="Confirm"
                    onPress={handleConfirm}
                    loading={loading}
                    style={styles.confirmButton}
                />

                {/* Number Pad */}
                <NumberPad />
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
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    codeInput: {
        width: 48,
        height: 56,
        borderRadius: 12,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    codeText: {
        fontSize: 24,
        fontWeight: '600',
    },
    resendContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    resendText: {
        fontSize: 14,
        marginBottom: 4,
    },
    countdownText: {
        fontSize: 14,
        fontWeight: '600',
    },
    confirmButton: {
        marginBottom: 24,
    },
    numberPad: {
        paddingHorizontal: 32,
    },
    numberRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    numberButton: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    numberText: {
        fontSize: 24,
        fontWeight: '500',
    },
});