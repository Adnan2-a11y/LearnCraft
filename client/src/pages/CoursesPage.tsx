import React, { useEffect, useState, useCallback } from 'react';
import { User } from '../api/auth';
import { Course, coursesApi, GetCoursesParams, CourseResponse } from '../api/courses';
import { CourseList } from '../components/CourseList';
import { CourseAddForm } from '../components/CourseAddForm';
import { CourseEditForm } from '../components/CourseEditForm'; // Import the new edit form

interface CoursesPageProps {
    user: User | null;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ user }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null); // State for the course being edited
    const [searchTerm, setSearchTerm] = useState(''); // Holds current input value
    const [currentSearchQuery, setCurrentSearchQuery] = useState(''); // Holds the term used for the *last* search

    // New states for filters and pagination
    const [department, setDepartment] = useState('');
    const [semester, setSemester] = useState('');
    const [credit, setCredit] = useState<number | undefined>(undefined);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState(1);

    // Available options (hardcoded based on your data; fetch dynamically if needed)
    const departments = [
        'Computer Science and Engineering',
        'Electrical Engineering',
        'Industrial Engineering',
        'Civil Engineering',
        'Electronics and Communication Engineering',
        'Chemical Engineering',
        'Mechanical Engineering',
        'Biomedical Engineering'
    ];

    const semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

    const creditsOptions = [1, 2, 3, 4];

    // fetchCourses remains the same
    const fetchCourses = useCallback(async () => {
        setLoading(true);
        setError(null);
        const params: GetCoursesParams = {
            search: currentSearchQuery || undefined,
            department: department || undefined,
            semester: semester || undefined,
            credit,
            page,
            limit: 9, // Adjust to match your grid (3x3)
        };
        try {
            const response = await coursesApi.getAll(params);
            if (response.success && response.data) {
                const data = response.data as CourseResponse;
                setCourses(data.courses);
                setTotal(data.total);
                setPages(data.pages);
            } else {
                setCourses([]);
            }
        } catch (err: any) {
            console.error("Error fetching courses:", err);
            setError(err.message || 'Failed to load courses. Please ensure backend is running.');
        } finally {
            setLoading(false);
        }
    }, [currentSearchQuery, department, semester, credit, page]);


    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    // Handler for the search button click
    const handleSearch = () => {
        setCurrentSearchQuery(searchTerm); // Update search query
        setPage(1); // Reset to page 1
    };

    // Handler for clearing the search
    const handleClearSearch = () => {
        setSearchTerm(''); // Clear input
        setCurrentSearchQuery(''); // Clear applied search
        setPage(1);
    };

    // New: Handler for clearing all filters
    const handleClearFilters = () => {
        setDepartment('');
        setSemester('');
        setCredit(undefined);
        setSearchTerm('');
        setCurrentSearchQuery('');
        setPage(1);
    };

    const handleCourseAdded = () => {
        fetchCourses();
        setShowAddForm(false);
    };
    
    // Handlers for editing
    const handleEditClick = (course: Course) => {
        setEditingCourse(course);
        setShowAddForm(false); // Close add form if open
    };

    const handleCourseUpdated = () => {
        setEditingCourse(null);
        fetchCourses(); // Refresh the list
    };


    const handleDeleteCourse = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            try {
                const response = await coursesApi.delete(id);
                if (response.success) {
                    // Refetch courses to update total count and pagination correctly
                    fetchCourses();
                } else {
                    // Show specific error from backend (e.g., authorization failure)
                    alert(`Deletion failed: ${response.message}`);
                }
            } catch (err: any) {
                alert(err.message || 'Failed to delete course.');
            }
        }
    };

    const isTeacher = user?.role === 'teacher';

    // Check if any filter is active for "no results" message
    const isFiltered = currentSearchQuery !== '' || department !== '' || semester !== '' || credit !== undefined;

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

            {/* Filters Section - Integrated with Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none sm:text-sm"
                                placeholder="Search courses by name or code..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch();
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                        <select
                            title="Select Department"
                            value={department}
                            onChange={(e) => {
                                setDepartment(e.target.value);
                                setPage(1);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Departments</option>
                            {departments.map((dept) => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                        <select
                            title="Select Semester"
                            value={semester}
                            onChange={(e) => {
                                setSemester(e.target.value);
                                setPage(1);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Semesters</option>
                            {semesters.map((sem) => (
                                <option key={sem} value={sem}>{sem}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Credits</label>
                        <select
                            title="Select Credits"
                            value={credit !== undefined ? credit : ''}
                            onChange={(e) => {
                                const val = e.target.value ? parseInt(e.target.value) : undefined;
                                setCredit(val);
                                setPage(1);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Credits</option>
                            {creditsOptions.map((cr) => (
                                <option key={cr} value={cr}>{cr}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mt-4 flex gap-2 justify-end">
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm"
                    >
                        Apply Search
                    </button>
                    {isFiltered && (
                        <button
                            onClick={handleClearFilters}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 sm:text-sm"
                        >
                            Clear All
                        </button>
                    )}
                </div>
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

            {editingCourse && isTeacher && (
                 <div className="animate-fade-in-down">
                    <CourseEditForm 
                        course={editingCourse}
                        onCourseUpdated={handleCourseUpdated}
                        onCancel={() => setEditingCourse(null)}
                    />
                </div>
            )}

            {loading ? (
                <div className="flex flex-col justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-gray-500">Loading courses...</p>
                </div>
            ) : (
                // IMPORTANT: Updated "No courses found" logic
                courses.length === 0 && isFiltered ? (
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8 rounded-md shadow-sm">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-yellow-800 font-medium">No courses found</p>
                                <p className="text-sm text-yellow-700 mt-1">
                                    No courses match your criteria. Try adjusting your filters or search.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <CourseList
                        courses={courses}
                        userRole={user?.role}
                        onDelete={handleDeleteCourse}
                        onEdit={handleEditClick} // Pass the edit handler
                    />
                )
            )}

            {/* Pagination Controls */}
            {pages > 1 && (
                <div className="flex justify-center items-center mt-8 space-x-4">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <span className="text-gray-700">Page {page} of {pages} ({total} total)</span>
                    <button
                        onClick={() => setPage((prev) => Math.min(prev + 1, pages))}
                        disabled={page === pages}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};