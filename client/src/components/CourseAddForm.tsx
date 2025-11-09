import React, { useState } from 'react';
import { coursesApi, CreateCourseData } from '../api/courses';

interface CourseAddFormProps {
    onCourseAdded: () => void;
}

export const CourseAddForm: React.FC<CourseAddFormProps> = ({ onCourseAdded }) => {
    const [formData, setFormData] = useState<CreateCourseData>({
        courseCode: '',
        courseName: '',
        credit: 3,
        department: '',
        semester: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'credit' ? (Number(value) || 0) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Basic client-side validation
        if (!formData.courseCode || !formData.courseName || !formData.department || !formData.semester) {
             setError("Please fill in all required fields.");
             return;
        }

        try {
            await coursesApi.create(formData);
            // Reset form on success
            setFormData({
                courseCode: '',
                courseName: '',
                credit: 3,
                department: '',
                semester: ''
            });
            onCourseAdded();
        } catch (err: any) {
            setError(err.message || 'Failed to add course. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Add New Course</h3>
            
            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="courseCode">
                            Course Code *
                        </label>
                        <input
                            id="courseCode"
                            name="courseCode"
                            type="text"
                            value={formData.courseCode}
                            onChange={handleChange}
                            placeholder="e.g. CSE101"
                            required
                            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="courseName">
                            Course Name *
                        </label>
                        <input
                            id="courseName"
                            name="courseName"
                            type="text"
                            value={formData.courseName}
                            onChange={handleChange}
                            placeholder="Introduction to Programming"
                            required
                            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="credit">
                            Credits *
                        </label>
                        <input
                            id="credit"
                            name="credit"
                            type="number"
                            min="0.5"
                            step="0.5"
                            max="10"
                            value={formData.credit}
                            onChange={handleChange}
                            required
                            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                            Department *
                        </label>
                        <input
                            id="department"
                            name="department"
                            type="text"
                            value={formData.department}
                            onChange={handleChange}
                            placeholder="CSE"
                            required
                            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="semester">
                            Semester *
                        </label>
                         <input
                            id="semester"
                            name="semester"
                            type="text"
                            value={formData.semester}
                            onChange={handleChange}
                            placeholder="Fall 2023"
                            required
                            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-6 py-2 rounded-md text-white font-medium transition-colors ${
                            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {loading ? 'Adding Course...' : 'Add Course'}
                    </button>
                </div>
            </form>
        </div>
    );
};