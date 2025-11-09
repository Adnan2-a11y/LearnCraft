import React, { useState, useEffect } from 'react';
import { Header } from './src/components/Header';
import { Footer } from './src/components/Footer';
import { LandingPage } from './src/pages/LandingPage';
import { AuthPage } from './src/pages/AuthPage';
import { HomePage } from './src/pages/HomePage';
import { CoursesPage } from './src/pages/CoursesPage';
import { User } from './src/api/auth';

function App() {
    const [user, setUser] = useState<User | null>(null);
    const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');

    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener('popstate', onLocationChange);
        return () => window.removeEventListener('popstate', onLocationChange);
    }, []);

    const handleNavigate = (path: string) => {
        window.history.pushState({}, '', path);
        setCurrentPath(path);
    };

    const handleLoginSuccess = (data: { user: User }) => {
        setUser(data.user);
        handleNavigate('/dashboard');
    };

    const handleLogout = () => {
        setUser(null);
        handleNavigate('/');
    };

    // Handle redirects securely outside of render
    useEffect(() => {
        if (user && (currentPath === '/login' || currentPath === '/register')) {
            handleNavigate('/dashboard');
        }
        if (!user && currentPath === '/dashboard') {
            handleNavigate('/login');
        }
    }, [user, currentPath]);

    let pageContent: React.ReactNode;
    switch (currentPath) {
        case '/':
            pageContent = <LandingPage onNavigate={handleNavigate} />;
            break;
        case '/login':
            pageContent = !user ? <AuthPage type="login" onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} /> : null;
            break;
        case '/register':
            pageContent = !user ? <AuthPage type="register" onNavigate={handleNavigate} /> : null;
            break;
        case '/dashboard':
            pageContent = user ? <HomePage onNavigate={handleNavigate} onLogout={handleLogout} /> : null;
            break;
        case '/courses':
            pageContent = <CoursesPage user={user} />;
            break;
        default:
            pageContent = (
                <div className="flex flex-col items-center justify-center py-20">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                    <p className="text-gray-600 mb-8">Page not found</p>
                    <button 
                        onClick={() => handleNavigate('/')} 
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                        Go Home
                    </button>
                </div>
            );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header user={user} onNavigate={handleNavigate} onLogout={handleLogout} />
            <main className="flex-grow">
                {pageContent}
            </main>
            <Footer />
        </div>
    );
}

export default App;
