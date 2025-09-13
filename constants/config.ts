// constants/config.ts
import { Platform } from 'react-native';

// Descobrir o IP da sua máquina
const getLocalIP = () => {
    // Você precisa substituir por seu IP real
    // Para descobrir: ipconfig (Windows) ou ifconfig (Mac/Linux)
    return '192.168.1.100'; // ⚠️ SUBSTITUA PELO SEU IP REAL
};

// Configurações da API baseadas no ambiente
const getApiUrl = () => {
    console.log('__DEV__: ', __DEV__);

    if (__DEV__) {
        // Desenvolvimento
        if (Platform.OS === 'android') {
            // Para emulador Android, use 10.0.2.2
            // Para dispositivo físico Android, use o IP da máquina
            return `http://192.168.1.7:8080`; // Emulador
            // return `http://${getLocalIP()}:8080`; // Dispositivo físico - descomente se necessário
        } else if (Platform.OS === 'ios') {
            // Para simulador iOS, use localhost
            // Para dispositivo físico iOS, use o IP da máquina
            return 'http://localhost:8080'; // Simulador
            // return `http://${getLocalIP()}:8080`; // Dispositivo físico - descomente se necessário
        } else {
            // Web/Expo Web
            return 'http://localhost:8080';
        }
    } else {
        // Produção
        return 'https://sua-api-producao.com';
    }
};

export const API_CONFIG = {
    BASE_URL: getApiUrl(),
    TIMEOUT: 30000, // 30 segundos
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000, // 1 segundo
};

export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
    },
    USER: {
        FIND_BY_EMAIL: (email: string) => `/user/findByEmail/${email}`,
    },
} as const;

// Configurações de validação
export const VALIDATION = {
    PASSWORD_MIN_LENGTH: 6,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^\+?[\d\s-()]+$/,
} as const;

// Helper para debug
export const logApiConfig = () => {
    console.log('🔧 API Configuration:');
    console.log('Platform:', Platform.OS);
    console.log('API URL:', API_CONFIG.BASE_URL);
    console.log('Development mode:', __DEV__);
};