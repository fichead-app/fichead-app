// services/api.ts
const API_BASE_URL = 'http://192.168.1.7:8080'; // Substitua pela URL do seu backend

export interface UserRegisterRequest {
    name: string;
    email: string;
    userapp: string;
    password: string;
    dateBirth: string; // formato: "2025-01-03"
    avatarUrl: string;
    age: number;
    onboardCompleted: boolean;
    emailVerified: boolean;
    genre: 'male' | 'female' | 'empty';
    userStylePreferences: {
        romance: boolean;
        fantasy: boolean;
        sciFi: boolean;
        horror: boolean;
        mystery: boolean;
        thriller: boolean;
        psychology: boolean;
        inspiration: boolean;
        comedy: boolean;
        action: boolean;
        adventure: boolean;
        comics: boolean;
        childrens: boolean;
        art: boolean;
        food: boolean;
        biography: boolean;
        science: boolean;
        technology: boolean;
        howto: boolean;
        travel: boolean;
        epicfantasy: boolean;
    };
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface UserResponse {
    id: string;
    name: string;
    userapp: string;
    email: string;
    dateBirth: string;
    age: number;
    avatarUrl: string;
    onboardCompleted: boolean;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
    genres: {
        id: number;
        genre: string;
    };
    stylePreferences: {
        id: number;
        romance: boolean;
        fantasy: boolean;
        sciFi: boolean;
        horror: boolean;
        mystery: boolean;
        thriller: boolean;
        psychology: boolean;
        inspiration: boolean;
        comedy: boolean;
        action: boolean;
        adventure: boolean;
        comics: boolean;
        childrens: boolean;
        art: boolean;
        food: boolean;
        biography: boolean;
        science: boolean;
        technology: boolean;
        howto: boolean;
        travel: boolean;
        epicfantasy: boolean;
        created_at: string | null;
        updated_at: string | null;
    };
}

export interface AuthResponse {
    userRegister: UserResponse;
    token: string;
}

export interface ApiError {
    code: number;
    message: string;
}

class ApiService {
    private baseUrl = API_BASE_URL;

    async register(userData: UserRegisterRequest): Promise<AuthResponse> {
        console.log('userData: ', userData);

        const response = await fetch(`${this.baseUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao criar conta');
        }

        return data;
    }

    async login(credentials: LoginRequest): Promise<AuthResponse> {
        const response = await fetch(`${this.baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao fazer login');
        }

        return data;
    }

    async getUserByEmail(email: string): Promise<UserResponse> {
        const response = await fetch(`${this.baseUrl}/user/findByEmail/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Usuário não encontrado');
        }

        return data;
    }
}

export const apiService = new ApiService();