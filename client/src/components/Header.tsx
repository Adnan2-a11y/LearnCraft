import React from 'react';
import { User } from '../api/auth';
import logo from './student.png';

interface HeaderProps {
    user: User | null;
    onNavigate: (path: string) => void;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onNavigate, onLogout }) => {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo and Branding */}
                <div 
                    className="flex items-center cursor-pointer" 
                    onClick={() => onNavigate('/')}
                >
                    {/* Replace the SVG with your logo image */}
                    <img 
                        src={logo} // Assuming your logo is named logo.png in the public folder
                        alt="LearnCraft Logo" 
                        className="h-8 w-8 mr-2" // Adjust height, width, and margin as needed
                    />
                    <span className="text-xl font-bold text-gray-800">LearnCraft</span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">
                    <button onClick={() => onNavigate('/')} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</button>
                    <button onClick={() => onNavigate('/courses')} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Courses</button>
                    {user && (
                        <button onClick={() => onNavigate('/dashboard')} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Dashboard</button>
                    )}
                    
                </nav>

                {/* Auth Buttons */}
                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-700 hidden sm:inline">
                               
                            </span>
                            <button 
                                onClick={onLogout}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 border border-gray-300 rounded-md hover:border-red-300 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <button 
                                onClick={() => onNavigate('/login')}
                                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                Login
                            </button>
                            <button 
                                onClick={() => onNavigate('/register')}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
                            >
                                Register
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};
