
// Default to localhost:5000/api if not set in environment variables
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    errors?: any[]; // For validation errors
}

/**
 * Generic HTTP client wrapper handling JSON serialization and credentials.
 */
export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const { headers, ...customConfig } = options;

    const config: RequestInit = {
        ...customConfig,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        // 'include' is crucial for sending/receiving httpOnly cookies (your JWT)
        credentials: 'include',
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            // Throw an error that matches our API error structure so UI can catch it
            throw {
                success: false,
                message: data.message || 'HTTP Error',
                errors: data.errors || undefined,
                status: response.status
            };
        }

        return data as ApiResponse<T>;
    } catch (error: any) {
        // Handle network errors or thrown api errors
        if (error.success === false) {
            throw error;
        }
        throw {
            success: false,
            message: error.message || 'Network Error',
        };
    }
}
