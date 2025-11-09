import React from 'react';

interface HomePageProps {
    onNavigate: (path: string) => void;
    onLogout?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onLogout }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
                {onLogout && (
                    <button 
                        onClick={onLogout}
                        className="text-gray-600 hover:text-red-600 transition-colors px-4 py-2 rounded-md hover:bg-gray-100"
                    >
                        Logout
                    </button>
                )}
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome back, Student!</h2>
                <p className="text-gray-600">Here's a quick overview of your academic progress this semester.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 flex flex-col">
                    <h3 className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-2">Enrolled Courses</h3>
                    <div className="flex items-end mt-auto">
                        <span className="text-4xl font-bold text-gray-900 leading-none">6</span>
                        <span className="ml-2 text-gray-500 mb-1">active</span>
                    </div>
                </div>
                
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 flex flex-col">
                    <h3 className="text-sm font-medium text-green-600 uppercase tracking-wider mb-2">Overall Attendance</h3>
                     <div className="flex items-end mt-auto">
                        <span className="text-4xl font-bold text-gray-900 leading-none">94%</span>
                         <span className="ml-2 text-green-500 mb-1">Good</span>
                    </div>
                </div>
                
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100 flex flex-col">
                    <h3 className="text-sm font-medium text-purple-600 uppercase tracking-wider mb-2">Upcoming Event</h3>
                    <div className="mt-auto">
                        <p className="text-lg font-semibold text-gray-800">Midterm Exam</p>
                        <p className="text-gray-500">Oct 25, 2023</p>
                    </div>
                </div>
            </div>

            {/* More dashboard sections could go here */}
        </div>
    );
};
