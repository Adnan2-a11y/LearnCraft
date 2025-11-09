
import { apiClient, ApiResponse } from './client';

// --- Types based on your backend ---

export type UserRole = 'student' | 'teacher';

export interface User {
    id: string;
    username: string;
    email: string;
    role: UserRole;
}

// Structure of 'data' in a successful auth response
export interface AuthData {
    user: User;
    profile?: any; // Profile data is returned on register
}

// Login Request Payload
export interface LoginCredentials {
    email: string;
    password: string;
}

// Register Request Payload
export interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
    role?: UserRole;
    // Student Profile Fields
    fullName?: string;
    studentId?: string;
    department?: string;
    batch?: string;
    phone?: string;
    [key: string]: any; // Allow additional future profile fields
}

// --- API Methods ---

const AUTH_URL = '/auth';

export const authApi = {
    /**
     * Register a new user (Student or Teacher).
     */
    register: (credentials: RegisterCredentials): Promise<ApiResponse<AuthData>> => {
        return apiClient<AuthData>(`${AUTH_URL}/register`, {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    },

    /**
     * Login an existing user.
     */
    login: (credentials: LoginCredentials): Promise<ApiResponse<AuthData>> => {
        return apiClient<AuthData>(`${AUTH_URL}/login`, {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    },

    /**
     * Logout the current user.
     */
    logout: (): Promise<ApiResponse<void>> => {
        return apiClient<void>(`${AUTH_URL}/logout`, {
            method: 'POST',
        });
    },
};
