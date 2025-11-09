import React, { useEffect, useState } from 'react';
import { User } from '../api/auth';
import { Course, coursesApi } from '../api/courses';
import { CourseList } from '../components/CourseList';
import { CourseAddForm } from '../components/CourseAddForm';

interface CoursesPageProps {
    user: User | null;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ user }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const fetchCourses = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await coursesApi.getAll();
            if (response.success) {
                // Handle both potential response formats: direct array in data, or nested in data.courses
                if (Array.isArray(response.data)) {
                     setCourses(response.data as any);
                } else if (response.data && Array.isArray(response.data.courses)) {
                     setCourses(response.data.courses);
                } else if ((response as any).courses && Array.isArray((response as any).courses)) {
                    // Fallback if your backend sends { success: true, courses: [] } at the top level 
                    // (though apiClient usually wraps standard non-error responses in 'data')
                    setCourses((response as any).courses);
                } else {
                    setCourses([]);
                }
            }
        } catch (err: any) {
            console.error("Error fetching courses:", err);
            setError(err.message || 'Failed to load courses. Please ensure backend is running.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleCourseAdded = () => {
        fetchCourses();
        setShowAddForm(false);
    };

    const handleDeleteCourse = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            try {
                await coursesApi.delete(id);
                // Optimistic update
                setCourses(prevCourses => prevCourses.filter(course => course._id !== id));
            } catch (err: any) {
                alert(err.message || 'Failed to delete course.');
            }
        }
    };

    const isTeacher = user?.role === 'teacher';

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Course Catalog</h1>
                    <p className="text-gray-600">Browse all available courses for the current semester.</p>
                </div>
                {isTeacher && (
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center shadow-sm ${
                            showAddForm 
                            ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                        {showAddForm ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Cancel
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Add New Course
                            </>
                        )}
                    </button>
                )}
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-md shadow-sm">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700 font-medium">Error loading courses</p>
                            <p className="text-sm text-red-600 mt-1">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {showAddForm && isTeacher && (
                <div className="animate-fade-in-down">
                    <CourseAddForm onCourseAdded={handleCourseAdded} />
                </div>
            )}

            {loading ? (
                <div className="flex flex-col justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-gray-500">Loading courses...</p>
                </div>
            ) : (
                <CourseList 
                    courses={courses} 
                    userRole={user?.role} 
                    onDelete={handleDeleteCourse} 
                />
            )}
        </div>
    );
};