import React from 'react';
import { Course } from '../api/courses';

interface CourseListProps {
    courses: Course[];
    userRole?: string;
    onDelete?: (id: string) => void;
}

export const CourseList: React.FC<CourseListProps> = ({ courses, userRole, onDelete }) => {
    if (!courses || courses.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100 col-span-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="text-xl text-gray-500 font-medium">No courses available.</p>
                <p className="text-gray-400 mt-2">Check back later for new course offerings.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {courses.map((course) => (
                <div key={course._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                    <div className="p-6 flex-grow">
                        <div className="flex justify-between items-start mb-4">
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-semibold tracking-wide uppercase">
                                {course.courseCode}
                            </span>
                            <span className="text-gray-500 text-sm font-medium flex items-center bg-gray-100 px-2 py-1 rounded-md">
                                {course.credit} Credits
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2" title={course.courseName}>
                            {course.courseName}
                        </h3>
                        
                        <div className="space-y-1 mt-4">
                             <p className="text-sm text-gray-600 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <span className="font-medium mr-1">Dept:</span> {course.department}
                            </p>
                             <p className="text-sm text-gray-600 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="font-medium mr-1">Semester:</span> {course.semester}
                            </p>
                            {course.teacher && typeof course.teacher === 'object' && (
                                <p className="text-sm text-gray-600 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="font-medium mr-1">Instructor:</span> {course.teacher.fullName}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors">
                            View Details
                        </button>
                        {userRole === 'teacher' && onDelete && (
                            <button 
                                onClick={() => onDelete(course._id)}
                                className="text-red-500 hover:text-red-700 text-sm font-semibold transition-colors focus:outline-none bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};