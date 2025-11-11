import { apiClient, ApiResponse } from './client';

// Matches your backend Mongoose model exactly
export interface Course {
    _id: string;
    courseCode: string;
    courseName: string;
    credit: number;
    department: string;
    semester: string;
    teacher?: {
        _id: string;
        fullName: string;
        email: string;
    } | string; // Can be populated object or just ID depending on backend response
}

export type CreateCourseData = Omit<Course, '_id' | 'teacher'>;

const COURSES_URL = '/course';

export const coursesApi = {
    /**
     * Fetch all courses.
     */
    getAll: (searchTerm?:string): Promise<ApiResponse<{ courses: Course[] }>> => {
        let url = COURSES_URL;
        if(searchTerm){
            url += `?search=${encodeURIComponent(searchTerm)}`;
        }
        //return apiClient<{ courses: Course[] }>(url);
        return apiClient(url);
    },

    /**
     * Create a new course.
     */
    create: (data: CreateCourseData): Promise<ApiResponse<Course>> => {
        return apiClient<Course>(`${COURSES_URL}/add`, { // Updated to /add based on your routes
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    /**
     * Delete a course by ID.
     */
    delete: (id: string): Promise<ApiResponse<void>> => {
        return apiClient<void>(`${COURSES_URL}/${id}`, {
            method: 'DELETE'
        });
    }
};