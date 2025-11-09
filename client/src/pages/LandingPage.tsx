import React from 'react';

interface LandingPageProps {
    onNavigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
    return (
        <div>
            {/* Hero Section */}
            <section className="bg-blue-600 text-white py-20">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                            Your Complete University Management Solution
                        </h1>
                        <p className="text-lg md:text-xl mb-8 text-blue-100">
                            Manage courses, track attendance, view grades, and stay connected with your academic life seamlessly.
                        </p>
                        <div className="flex space-x-4">
                            <button 
                                onClick={() => onNavigate('/register')}
                                className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:bg-gray-100 transition-transform transform hover:-translate-y-1"
                            >
                                Get Started
                            </button>
                            <button 
                                onClick={() => onNavigate('/login')}
                                className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-transform transform hover:-translate-y-1"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <div className="bg-blue-500 p-4 rounded-lg shadow-2xl border-4 border-blue-400/30 flex items-center justify-center aspect-video w-full max-w-lg">
                            <span className="text-blue-100 text-xl font-semibold opacity-80">Dashboard Preview</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Course Management</h3>
                            <p className="text-gray-600">Easily enroll in courses, view syllabus, and access learning materials.</p>
                        </div>
                        {/* Feature 2 */}
                        <div className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Attendance Tracking</h3>
                            <p className="text-gray-600">Keep track of your daily attendance and view comprehensive reports.</p>
                        </div>
                        {/* Feature 3 */}
                        <div className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Result Analytics</h3>
                            <p className="text-gray-600">View your grades, calculate GPA, and analyze your academic performance.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
