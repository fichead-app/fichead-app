// stores/userStore.ts
import { create } from 'zustand';

export interface User {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    country: string;
    gender: 'male' | 'female' | 'not_specified';
    ageRange: string;
    favoriteGenres: string[];
    avatar?: string;
}

interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    onboardingCompleted: boolean;

    // Actions
    setUser: (user: User) => void;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
    completeOnboarding: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
    user: null,
    isAuthenticated: false,
    onboardingCompleted: false,

    setUser: (user: User) => {
        set({
            user,
            isAuthenticated: true
        });
    },

    login: async (email: string, password: string) => {
        // Simulação de login - aqui seria integração com API
        if (email && password) {
            const mockUser: User = {
                id: '1',
                fullName: 'Andrew Ainsley',
                email: email,
                phoneNumber: '+1-300-555-0399',
                dateOfBirth: '12/27/1995',
                country: 'United States',
                gender: 'male',
                ageRange: '25-29',
                favoriteGenres: ['Thriller', 'Comedy', 'Comics', 'Art & Photography', 'Science & Technology', 'Guide / How-to'],
            };

            set({
                user: mockUser,
                isAuthenticated: true
            });
            return true;
        }
        return false;
    },

    logout: () => {
        set({
            user: null,
            isAuthenticated: false,
            onboardingCompleted: false
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
        set({ onboardingCompleted: true });
    },
}));