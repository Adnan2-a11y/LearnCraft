import React from 'react';

interface LandingPageProps {
    onNavigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Computer Science Student",
            content: "This platform revolutionized how I manage my academic life. Everything I need in one place!",
            avatar: "SJ"
        },
        {
            name: "Professor Davis",
            role: "Department Head",
            content: "As an educator, the attendance and grade management features have saved me hours each week.",
            avatar: "PD"
        },
        {
            name: "Michael Chen",
            role: "Engineering Student",
            content: "The intuitive interface and comprehensive features make staying on top of my studies effortless.",
            avatar: "MC"
        }
    ];

    const stats = [
        { number: "50K+", label: "Active Students" },
        { number: "100+", label: "Universities" },
        { number: "98%", label: "Satisfaction Rate" },
        { number: "24/7", label: "Support" }
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-20">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                            Your Complete University <span className="text-blue-200">Management Solution</span>
                        </h1>
                        <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-2xl">
                            Streamline your academic journey with our all-in-one platform. Manage courses, track attendance, view grades, and stay connected with your academic life seamlessly.
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <button 
                                onClick={() => onNavigate('/register')}
                                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-2xl hover:bg-gray-100 transition-all transform hover:-translate-y-1 hover:shadow-2xl"
                            >
                                Get Started Free
                            </button>
                            <button 
                                onClick={() => onNavigate('/login')}
                                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all transform hover:-translate-y-1"
                            >
                                Login to Dashboard
                            </button>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <div className="relative">
                            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-white/20 flex items-center justify-center aspect-video w-full max-w-lg">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <span className="text-white text-xl font-semibold">Interactive Dashboard Preview</span>
                                    <p className="text-blue-200 mt-2">Real-time data and analytics</p>
                                </div>
                            </div>
                            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-yellow-400 rounded-2xl rotate-12 opacity-20"></div>
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-400 rounded-full opacity-20"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white border-b">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Everything You Need to Succeed</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Comprehensive tools designed to streamline your academic experience and boost productivity
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Course Management</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Easily enroll in courses, view syllabus, access learning materials, and track your progress throughout the semester.
                            </p>
                        </div>
                        {/* Feature 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Attendance Tracking</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Keep track of your daily attendance, view comprehensive reports, and receive notifications for low attendance.
                            </p>
                        </div>
                        {/* Feature 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                            <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Result Analytics</h3>
                            <p className="text-gray-600 leading-relaxed">
                                View your grades, calculate GPA, analyze your academic performance with detailed charts and insights.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Trusted by Students & Educators</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Hear from our community about how our platform has transformed their academic experience
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-200">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 italic leading-relaxed">"{testimonial.content}"</p>
                                <div className="flex text-yellow-400 mt-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Academic Experience?</h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of students and educators who are already using our platform to streamline their academic journey.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button 
                            onClick={() => onNavigate('/register')}
                            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-2xl hover:bg-gray-100 transition-all transform hover:-translate-y-1"
                        >
                            Start Free Trial
                        </button>
                        <button 
                            onClick={() => onNavigate('/login')}
                            className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all transform hover:-translate-y-1"
                        >
                            Schedule a Demo
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};