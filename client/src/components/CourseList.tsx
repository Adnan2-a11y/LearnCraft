import React from 'react';
import { Course } from '../api/courses';
import { UserRole } from '../api/auth';

interface CourseListProps {
    courses: Course[];
    userRole?: UserRole;
    onDelete: (id: string) => void;
    onEdit: (course: Course) => void; // Add onEdit prop
}

export const CourseList: React.FC<CourseListProps> = ({ courses, userRole, onDelete, onEdit }) => {
    const isTeacher = userRole === 'teacher';

    if (courses.length === 0) {
        return (
             <div className="text-center py-16">
                <h2 className="text-xl font-semibold text-gray-700">No Courses Available</h2>
                <p className="text-gray-500 mt-2">There are currently no courses to display. {isTeacher ? "Try adding a new one!" : ""}</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
                <div key={course._id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
                    <div className="p-6 flex-grow">
                        <div className="flex justify-between items-start">
                            <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{course.courseCode}</span>
                            <span className="text-sm font-semibold text-gray-600">{course.credit} Credits</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mt-3">{course.courseName}</h3>
                        <p className="text-gray-600 text-sm mt-1">{course.department}</p>
                        <p className="text-gray-500 text-xs mt-1">Semester: {course.semester}</p>
                    </div>
                    {isTeacher && (
                        <div className="bg-gray-50 px-6 py-3 flex justify-end items-center gap-2 border-t">
                             <button
                                onClick={() => onEdit(course)}
                                className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                Edit
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                                onClick={() => onDelete(course._id)}
                                className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};