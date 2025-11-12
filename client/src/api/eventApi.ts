import { apiClient, ApiResponse } from './client';

// Matches your backend Mongoose model exactly
export interface Event {
    _id: string;
    title: string;
    date: string;        // ISO string, e.g. "2025-11-11T00:00:00.000Z"
    location: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export type CreateEventData = Omit<Event, '_id' | 'createdAt' | 'updatedAt'>;

const EVENTS_URL = '/events';

export const eventApi = {
    /**
     * Fetch all events (optionally with a search filter).
     */
    getAll: (searchTerm?: string): Promise<ApiResponse<{ events: Event[] }>> => {
        let url = EVENTS_URL;
        if (searchTerm) {
            url += `?search=${encodeURIComponent(searchTerm)}`;
        }
        return apiClient(url); // same as your course API
    },

    /**
     * Fetch a single event by ID.
     */
    getById: (id: string): Promise<ApiResponse<Event>> => {
        return apiClient(`${EVENTS_URL}/${id}`);
    },

    /**
     * Create a new event.
     */
    create: (data: CreateEventData): Promise<ApiResponse<Event>> => {
        return apiClient(`${EVENTS_URL}`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    /**
     * Update an existing event by ID.
     */
    update: (id: string, data: Partial<CreateEventData>): Promise<ApiResponse<Event>> => {
        return apiClient(`${EVENTS_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    /**
     * Delete an event by ID.
     */
    delete: (id: string): Promise<ApiResponse<void>> => {
        return apiClient(`${EVENTS_URL}/${id}`, {
            method: 'DELETE',
        });
    },
};
