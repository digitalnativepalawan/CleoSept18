import React, { useState, useEffect } from 'react';
import { useAuth } from './auth/AuthContext';

interface HeaderProps {
    onLoginClick: () => void;
    onSignUpClick: () => void;
    onPortalClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick, onSignUpClick, onPortalClick }) => {
    const [time, setTime] = useState(new Date());
    const { currentUser, logout, loading } = useAuth();

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const formattedDate = time.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <header className="border-b border-gray-200">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <div className="relative flex justify-between items-center text-sm">
                    {/* Time/Date - Centered on mobile, left on desktop */}
                    <div className="text-center w-full md:w-auto md:text-left">
                        <div className="font-semibold text-lg">{formattedTime.replace(' ', '').toUpperCase()}</div>
                        <div className="text-gray-500">{formattedDate}</div>
                    </div>

                    {/* Centered Navigation for desktop */}
                    <nav aria-label="Primary" className="hidden md:flex items-center space-x-2 text-gray-600 absolute left-1/2 -translate-x-1/2">
                        <a href="#" className="flex items-center px-3 py-1.5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                            <span className="font-medium text-gray-800">Blog</span>
                        </a>
                        <button onClick={onPortalClick} className="flex items-center px-3 py-1.5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                            <span className="font-medium text-gray-800">Portal</span>
                        </button>
                        <a href="#" className="flex items-center px-3 py-1.5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                            <span className="font-medium text-gray-800">GitHub</span>
                        </a>
                        <button className="flex items-center px-3 py-1.5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                            <span className="font-medium text-gray-800">PHP</span>
                        </button>
                    </nav>
                    
                    {/* Right-aligned controls for desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        {loading ? (
                            <div className="h-8 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
                        ) : currentUser ? (
                            <>
                                <span className="text-gray-600">Welcome, {currentUser.email.split('@')[0]}</span>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium transition-colors"
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={onSignUpClick}
                                    className="px-4 py-2 border border-transparent rounded-lg hover:bg-gray-100 font-medium transition-colors"
                                >
                                    Sign Up
                                </button>
                                <button
                                    onClick={onLoginClick}
                                    className="bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-5 rounded-lg shadow-sm transition-colors duration-300"
                                >
                                    Log In
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;