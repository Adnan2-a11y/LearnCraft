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
export type UpdateCourseData = Partial<CreateCourseData>;

export interface CourseResponse{
    courses : Course[];
    total : number;
    page : number;
    pages : number;

}

export interface GetCoursesParams{
    search?:string;
    department?: string;
    semester?: string;
    credit?: number;
    page?: number;
    limit?: number;
}

const COURSES_URL = '/course';

export const coursesApi = {
    
    getAll: (params: GetCoursesParams = {}): Promise<ApiResponse<CourseResponse>> => {
        const queryParams = new URLSearchParams();

        if (params.search) {
            queryParams.append('search', params.search);
        }
        if (params.department) {
            queryParams.append('department', params.department);
        }
        if (params.semester) {
            queryParams.append('semester', params.semester);
        }
        if (params.credit !== undefined) {
            queryParams.append('credit', params.credit.toString());
        }
        if (params.page !== undefined) {
            queryParams.append('page', params.page.toString());
        }
        if (params.limit !== undefined) {
            queryParams.append('limit', params.limit.toString());
        }

        const url = `${COURSES_URL}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        return apiClient<CourseResponse>(url);
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

    update: (id: string, data: UpdateCourseData): Promise<ApiResponse<Course>> => {
        return apiClient<Course>(`${COURSES_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },
    
    delete: (id: string): Promise<ApiResponse<void>> => {
        return apiClient<void>(`${COURSES_URL}/${id}`, {
            method: 'DELETE'
        });
    }
};