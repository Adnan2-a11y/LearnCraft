import React from 'react';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';

interface AuthPageProps {
    type: 'login' | 'register';
    onNavigate: (path: string) => void;
    onLoginSuccess?: (data: any) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ type, onNavigate, onLoginSuccess }) => {
    return (
        <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        {type === 'login' ? 'Sign in to your account' : 'Create your account'}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Or{' '}
                        <button 
                            onClick={() => onNavigate(type === 'login' ? '/register' : '/login')} 
                            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none underline transition ease-in-out duration-150"
                        >
                            {type === 'login' ? 'register for a new account' : 'sign in to existing account'}
                        </button>
                    </p>
                </div>
                
                {type === 'login' ? (
                    <LoginForm onLoginSuccess={onLoginSuccess} />
                ) : (
                    <RegisterForm />
                )}
            </div>
        </div>
    );
};
