import React, { useState, useEffect } from 'react';
import { Course, coursesApi, UpdateCourseData } from '../api/courses';

interface CourseEditFormProps {
    course: Course;
    onCourseUpdated: () => void;
    onCancel: () => void;
}

export const CourseEditForm: React.FC<CourseEditFormProps> = ({ course, onCourseUpdated, onCancel }) => {
    const [formData, setFormData] = useState<UpdateCourseData>({
        courseCode: course.courseCode,
        courseName: course.courseName,
        credit: course.credit,
        department: course.department,
        semester: course.semester,
    });
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        // If the course prop changes, update the form data
        setFormData({
            courseCode: course.courseCode,
            courseName: course.courseName,
            credit: course.credit,
            department: course.department,
            semester: course.semester,
        });
    }, [course]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
            const response = await coursesApi.update(course._id, formData);
            if (response.success) {
                onCourseUpdated();
            } else {
                setError(response.message || 'An unknown error occurred.');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to update course. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Course: {course.courseName}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form fields are similar to CourseAddForm, pre-filled with course data */}
                <div>
                    <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">Course Name</label>
                    <input type="text" name="courseName" value={formData.courseName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                 <div>
                    <label htmlFor="courseCode" className="block text-sm font-medium text-gray-700">Course Code</label>
                    <input type="text" name="courseCode" value={formData.courseCode} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                {/* Add other fields like credit, department, semester similarly */}
                <div className="flex justify-end gap-4">
                    <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                        Cancel
                    </button>
                    <button type="submit" disabled={submitting} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300">
                        {submitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
        </div>
    );
};