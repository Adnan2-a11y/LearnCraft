import React from 'react';

interface HomePageProps {
    onNavigate: (path: string) => void;
    onLogout?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onLogout, user }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 md:p-12 rounded-xl shadow-lg mb-8 flex flex-col md:flex-row items-center justify-between">
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-2 leading-tight">Welcome, {user?.fullName || 'Student'}!</h1>
                    <p className="text-blue-100 text-lg md:text-xl mb-6">Your personalized learning journey starts here. Explore new courses and manage your progress.</p>
                    <button
                        onClick={() => onNavigate('/courses')}
                        className="bg-white text-blue-700 px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-100 transition-colors shadow-md"
                    >
                        Browse Courses
                    </button>
                </div>
                {onLogout && (
                    <button 
                        onClick={onLogout}
                        className="mt-6 md:mt-0 md:ml-8 text-blue-100 hover:text-white transition-colors px-4 py-2 rounded-md border border-blue-300 hover:border-white"
                    >
                        Logout
                    </button>
                )}
            </div>

            {/* Existing dashboard highlight cards (Adjusted spacing if needed) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

            {/* Suggested Courses Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Suggested Courses</h2>
                <p className="text-gray-600">Based on your interests and academic history.</p>
                {/* Placeholder for suggested course cards/list */}
                <div className="mt-4 text-gray-400 italic">No suggestions available yet.</div>
            </div>

            {/* Progress Overview Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Progress Overview</h2>
                <p className="text-gray-600">Track your achievements and see how far you've come!</p>
                {/* Placeholder for gamified progress bar/achievements */}
                <div className="mt-4 text-gray-400 italic">No progress data available yet.</div>
            </div>
        </div>
    );
};
