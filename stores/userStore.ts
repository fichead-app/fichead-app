// stores/userStore.ts - Com suporte a dados temporários durante onboarding
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiService, type UserRegisterRequest, type UserResponse } from '../services/api';

interface User {
    id: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    country?: string;
    gender: 'male' | 'female' | 'not_specified';
    age?: number;
    favoriteGenres: string[];
    avatar?: string;
    userapp?: string;
    onboardingCompleted: boolean;
    emailVerified: boolean;
}

// Dados temporários coletados durante o onboarding
interface TempUserData {
    gender?: 'male' | 'female' | 'not_specified';
    age?: number;
    favoriteGenres?: string[];
}

interface UserState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    onboardingCompleted: boolean;
    loading: boolean;
    error: string | null;
    tempUserData: TempUserData | null; // Dados temporários

    // Actions
    setUser: (user: User) => void;
    setToken: (token: string) => void;
    login: (email: string, password: string) => Promise<boolean>;
    register: (userData: Partial<User>) => Promise<boolean>;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
    completeOnboarding: () => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearError: () => void;

    // Temp data actions
    setTempUserData: (data: Partial<TempUserData>) => void;
    updateTempUserData: (data: Partial<TempUserData>) => void;
    clearTempData: () => void;
}

// Função para mapear gêneros favoritos para boolean preferences
const mapGenresToPreferences = (favoriteGenres: string[]) => {
    const genreMap = {
        'Romance': 'romance',
        'Fantasy': 'fantasy',
        'Sci-Fi': 'sciFi',
        'Horror': 'horror',
        'Mystery': 'mystery',
        'Thriller': 'thriller',
        'Psychology': 'psychology',
        'Inspiration': 'inspiration',
        'Comedy': 'comedy',
        'Action': 'action',
        'Adventure': 'adventure',
        'Comics': 'comics',
        "Children's": 'childrens',
        'Art & Photography': 'art',
        'Food & Drink': 'food',
        'Biography': 'biography',
        'Science & Technology': 'science',
        'Guide / How-to': 'howto',
        'Travel': 'travel'
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

// Função para mapear User Response da API para User local
const mapApiUserToLocalUser = (apiUser: UserResponse): User => {
    // Mapear preferences para favoriteGenres
    const favoriteGenres: string[] = [];
    const preferences = apiUser.stylePreferences;

    const genreMap = {
        romance: 'Romance',
        fantasy: 'Fantasy',
        sciFi: 'Sci-Fi',
        horror: 'Horror',
        mystery: 'Mystery',
        thriller: 'Thriller',
        psychology: 'Psychology',
        inspiration: 'Inspiration',
        comedy: 'Comedy',
        action: 'Action',
        adventure: 'Adventure',
        comics: 'Comics',
        childrens: "Children's",
        art: 'Art & Photography',
        food: 'Food & Drink',
        biography: 'Biography',
        science: 'Science & Technology',
        howto: 'Guide / How-to',
        travel: 'Travel'
    } as const;

    Object.entries(preferences).forEach(([key, value]) => {
        if (value && key in genreMap) {
            favoriteGenres.push(genreMap[key as keyof typeof genreMap]);
        }
    });

    return {
        id: apiUser.id,
        fullName: apiUser.name,
        email: apiUser.email,
        dateOfBirth: apiUser.dateBirth,
        gender: apiUser.genres.genre === 'male' ? 'male' :
            apiUser.genres.genre === 'female' ? 'female' : 'not_specified',
        age: apiUser.age,
        favoriteGenres,
        avatar: apiUser.avatarUrl || undefined,
        userapp: apiUser.userapp,
        onboardingCompleted: apiUser.onboardCompleted,
        emailVerified: apiUser.emailVerified
    };
};

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            onboardingCompleted: false,
            loading: false,
            error: null,
            tempUserData: null,

            setUser: (user: User) => {
                set({
                    user,
                    isAuthenticated: true,
                    onboardingCompleted: user.onboardingCompleted
                });
            },

            setToken: (token: string) => {
                set({ token });
            },

            login: async (email: string, password: string) => {
                set({ loading: true, error: null });

                try {
                    const response = await apiService.login({ email, password });
                    const user = mapApiUserToLocalUser(response.userRegister);

                    set({
                        user,
                        token: response.token,
                        isAuthenticated: true,
                        onboardingCompleted: user.onboardingCompleted,
                        loading: false
                    });

                    return true;
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Erro no login',
                        loading: false
                    });
                    return false;
                }
            },

            register: async (userData: Partial<User>) => {
                set({ loading: true, error: null });

                try {
                    // Mapear dados do usuário local para o formato da API
                    const registerData: UserRegisterRequest = {
                        name: userData.fullName || '',
                        email: userData.email || '',
                        userapp: userData.userapp || userData.fullName?.toLowerCase().replace(/\s+/g, '') || '',
                        password: (userData as any).password || '', // Temporário
                        dateBirth: userData.dateOfBirth || new Date().toISOString().split('T')[0],
                        avatarUrl: userData.avatar || '',
                        age: userData.age || 18,
                        onboardCompleted: userData.onboardingCompleted || false,
                        emailVerified: userData.emailVerified || false,
                        genre: userData.gender === 'male' ? 'male' :
                            userData.gender === 'female' ? 'female' : 'empty',
                        userStylePreferences: mapGenresToPreferences(userData.favoriteGenres || [])
                    };

                    const response = await apiService.register(registerData);
                    const user = mapApiUserToLocalUser(response.userRegister);

                    set({
                        user,
                        token: response.token,
                        isAuthenticated: true,
                        onboardingCompleted: user.onboardingCompleted,
                        loading: false
                    });

                    return true;
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : 'Erro no cadastro',
                        loading: false
                    });
                    return false;
                }
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    onboardingCompleted: false,
                    tempUserData: null
                });
            },

            updateUser: (userData: Partial<User>) => {
                const currentUser = get().user;
                if (currentUser) {
                    set({
                        user: { ...currentUser, ...userData }
                    });
                }
            },

            completeOnboarding: () => {
                const currentUser = get().user;
                if (currentUser) {
                    set({
                        user: { ...currentUser, onboardingCompleted: true },
                        onboardingCompleted: true
                    });
                }
            },

            setLoading: (loading: boolean) => {
                set({ loading });
            },

            setError: (error: string | null) => {
                set({ error });
            },

            clearError: () => {
                set({ error: null });
            },

            // Temp data actions
            setTempUserData: (data: Partial<TempUserData>) => {
                set({ tempUserData: data as TempUserData });
            },

            updateTempUserData: (data: Partial<TempUserData>) => {
                const currentTempData = get().tempUserData;
                set({
                    tempUserData: { ...currentTempData, ...data } as TempUserData
                });
            },

            clearTempData: () => {
                set({ tempUserData: null });
            }
        }),
        {
            name: 'user-storage',
            storage: {
                getItem: async (name: string) => {
                    try {
                        const value = await AsyncStorage.getItem(name);
                        return value ? JSON.parse(value) : null;
                    } catch (error) {
                        console.warn('Error reading from AsyncStorage:', error);
                        return null;
                    }
                },
                setItem: async (name: string, value: any) => {
                    try {
                        // Garantir que o valor seja uma string
                        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
                        await AsyncStorage.setItem(name, stringValue);
                    } catch (error) {
                        console.warn('Error saving to AsyncStorage:', error);
                    }
                },
                removeItem: async (name: string) => {
                    try {
                        await AsyncStorage.removeItem(name);
                    } catch (error) {
                        console.warn('Error removing from AsyncStorage:', error);
                    }
                },
            },
            // Configurações adicionais do persist
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                onboardingCompleted: state.onboardingCompleted,
                // NÃO persistir: loading, error, tempUserData (são temporários)
            }),
        }
    )
);